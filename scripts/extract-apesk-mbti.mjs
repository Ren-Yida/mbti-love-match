import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

const TARGET_URL = "https://www.apesk.com/mbti/dati.asp";

const versions = [
  {
    key: "love_28",
    radioSelector: "input#tishu1",
    expectedCount: 28,
    jsonFile: "questions_love_28.json",
    csvFile: "questions_love_28.csv"
  },
  {
    key: "standard_93",
    radioSelector: "input#tishu2",
    expectedCount: 93,
    jsonFile: "questions_standard_93.json",
    csvFile: "questions_standard_93.csv"
  }
];

function cleanText(value) {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripOptionPrefix(value) {
  return cleanText(value).replace(/^[A-ZＡ-Ｚ]\s*[.．、]\s*/u, "");
}

function toCsv(rows) {
  const headers = [
    "question_id",
    "question_text",
    "option_A",
    "option_B",
    "option_C",
    "dimension",
    "version"
  ];

  const escapeCell = (value) => {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  };

  return [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => escapeCell(row[header])).join(","))
  ].join("\n");
}

async function extractVisibleDomQuestions(page, version) {
  return page.evaluate(({ expectedCount, versionKey }) => {
    const cleanText = (value) =>
      String(value ?? "")
        .replace(/\u00a0/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const stripOptionPrefix = (value) =>
      cleanText(value).replace(/^[A-ZＡ-Ｚ]\s*[.．、]\s*/u, "");

    const rows = [];
    for (let index = 1; index <= expectedCount; index += 1) {
      const card = document.querySelector(`#card${index}`);
      if (!card) continue;

      const options = [...card.querySelectorAll(".option label")].map((label, optionIndex) => ({
        key: String.fromCharCode("A".charCodeAt(0) + optionIndex),
        text: stripOptionPrefix(label.innerText || label.textContent)
      }));

      rows.push({
        question_id: `q${index}`,
        question_text: cleanText(
          card.querySelector(".question")?.innerText ||
            card.querySelector(".question")?.textContent
        ),
        option_A: options[0]?.text ?? "",
        option_B: options[1]?.text ?? "",
        option_C: options[2]?.text ?? "",
        options,
        dimension: null,
        version: versionKey
      });
    }

    return rows;
  }, { expectedCount: version.expectedCount, versionKey: version.key });
}

async function enterVersion(page, version) {
  await page.goto(TARGET_URL, { waitUntil: "domcontentloaded" });
  await page.locator(version.radioSelector).check();
  await Promise.all([
    page.waitForURL(/\/mbti\/(282|93)\.asp/, { timeout: 30000 }),
    page.locator('form input[type="submit"][value*="进"]').click()
  ]);
  await page.waitForLoadState("domcontentloaded");
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const observedResponses = [];
  page.on("response", async (response) => {
    const request = response.request();
    const type = request.resourceType();
    if (["xhr", "fetch", "script", "document"].includes(type)) {
      observedResponses.push({
        url: response.url(),
        status: response.status(),
        resourceType: type
      });
    }
  });

  try {
    for (const version of versions) {
      await enterVersion(page, version);
      const rows = await extractVisibleDomQuestions(page, version);

      if (rows.length !== version.expectedCount) {
        throw new Error(
          `${version.key}: expected ${version.expectedCount} public DOM questions, got ${rows.length}. ` +
            "The page structure may have changed or the data may no longer be publicly rendered."
        );
      }

      await writeFile(version.jsonFile, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
      await writeFile(version.csvFile, `${toCsv(rows)}\n`, "utf8");

      console.log(`Wrote ${rows.length} rows: ${version.jsonFile}, ${version.csvFile}`);
    }

    console.log("Observed public document/script/xhr/fetch responses:");
    for (const response of observedResponses) {
      console.log(`${response.status} ${response.resourceType} ${response.url}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
