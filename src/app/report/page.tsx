import { ReportWizard } from "@/components/report/report-wizard";
import { Section } from "@/components/common/section";

export default function ReportPage() {
  return (
    <Section eyebrow="Report" title="File a civic issue">
      <ReportWizard />
    </Section>
  );
}
