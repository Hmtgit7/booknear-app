import { WorkInProgressPage } from '@/components/common/WIP/work-in-progress-page';

export default function Home() {
  return (
    <WorkInProgressPage
      portalLabel="Admin Portal"
      eyebrow="Platform Update"
      titlePrefix="Admin Web Is"
      titleHighlight="Work In Progress"
      description="We are finalizing role-based access, audit timelines, billing controls, and production hardening. Your admin experience is actively being shaped for the first launch."
      items={[
        'Provider onboarding workflows',
        'Live appointment moderation',
        'Release readiness dashboards',
      ]}
      statusText="Provisioning production services on Vercel and AWS migration path..."
      ctaLabel="Notify Me On Launch"
      accent="teal"
    />
  );
}
