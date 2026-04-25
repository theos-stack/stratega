import { GeneratorForm } from '@/components/generator-form';
import { HealthBadge } from '@/components/health-badge';
import { Card, SectionTitle } from '@/components/ui';

const featureCards = [
  {
    title: 'Fast Generation',
    description: 'Turn a clear business brief into a full weekly content calendar in minutes, with ready-to-review ideas for each platform.',
  },
  {
    title: 'Platform-Aware Planning',
    description: 'Create content directions that fit LinkedIn and Instagram instead of recycling the same generic post across every channel.',
  },
  {
    title: 'Export-Ready Output',
    description: 'Review the calendar in the app, then download the spreadsheet for editing, scheduling, approval, or client delivery.',
  },
];

const builderPortfolioUrl = process.env.NEXT_PUBLIC_BUILDER_PORTFOLIO_URL || '#';

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="space-y-6">
        <Card className="overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5">
              <p className="inline-flex rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-teal-200">
                AI content planning workspace
              </p>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Stratega AI
                </h1>
                <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                  Plan a week of stronger social content from one focused brief. Describe the business, set the weekly direction, review the generated ideas, and export a clean calendar for execution.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {featureCards.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <HealthBadge />
      </section>

      <section className="mt-10 space-y-6">
        <SectionTitle
          eyebrow="Planner"
          title="Build a focused weekly calendar"
          description="Give the AI enough context to understand the brand, audience, offer, and campaign angle. The output is structured so it can move straight into review or scheduling."
        />
        <GeneratorForm />
      </section>

      <footer className="mt-10 border-t border-white/10 py-6 text-center text-sm text-slate-400">
        Built with love by{' '}
        <a
          href={builderPortfolioUrl}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-teal-200 transition hover:text-white"
        >
          Blessing Fawole
        </a>
      </footer>
    </main>
  );
}
