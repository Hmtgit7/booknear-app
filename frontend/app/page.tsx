import { WorkInProgressPage } from '@/components/common/WIP/work-in-progress-page';

export default function Home() {
  return (
    <WorkInProgressPage
      portalLabel="Patient App"
      eyebrow="Launching Soon"
      titlePrefix="DocNear is"
      titleHighlight="Coming Together"
      description="Hyperlocal verified doctor discovery for Tier 2/3 India. Book appointments, manage prescriptions, and access your health records — all in one place."
      items={[
        'Find verified doctors near you',
        'Book appointments in seconds',
        'Access prescriptions & reports anytime',
      ]}
      statusText="Building patient experience for Nagda & beyond..."
      ctaLabel="Get Early Access"
      accent="teal"
    />
  );
}
