import CompatibilityTestPage from "@/app/test/[type]/page";

type DirectCompatibilityPageProps = {
  params: Promise<{ type: string }>;
};

export default function DirectCompatibilityPage({ params }: DirectCompatibilityPageProps) {
  return <CompatibilityTestPage params={params} />;
}
