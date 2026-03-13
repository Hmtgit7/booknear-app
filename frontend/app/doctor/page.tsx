import { WorkInProgressPage } from '@/components/common/WIP/work-in-progress-page';

export default function Home() {
  return (
    <WorkInProgressPage
      portalLabel="Doctor Workspace"
      eyebrow="Clinical Launch Track"
      titlePrefix="Doctor Panel"
      titleHighlight="Coming Together"
      description="Consultation controls, profile verification, earnings snapshots, and secure messaging are being assembled for a dependable first release."
      items={[
        'Teleconsultation controls',
        'Prescription workflow automation',
        'Availability and calendar sync',
      ]}
      statusText="Preparing secure doctor workflows for production rollout..."
      ctaLabel="Request Early Access"
      accent="emerald"
    />
  );
}
