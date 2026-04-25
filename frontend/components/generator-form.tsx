'use client';

import { FormEvent, useMemo, useState } from 'react';
import { buildDownloadUrl, generateCalendar } from '@/lib/api';
import type { CalendarRecord, GenerateResponse } from '@/lib/types';
import { Card, Pill } from '@/components/ui';
import { ResultsTable } from '@/components/results-table';

export function GeneratorForm() {
  const [companyDetails, setCompanyDetails] = useState('');
  const [weeklyFocus, setWeeklyFocus] = useState('');
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const records = result?.records ?? [];
  const linkedInCount = useMemo(
    () => records.filter((item) => getPlatformValue(item).includes('linkedin')).length,
    [records],
  );
  const instagramCount = useMemo(
    () => records.filter((item) => getPlatformValue(item).includes('instagram')).length,
    [records],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateCalendar({
        company_details: companyDetails.trim(),
        weekly_focus: weeklyFocus.trim(),
        file_name: fileName.trim() || undefined,
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong while generating the calendar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="p-6 sm:p-8">
        <div className="mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Content Brief</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Share the business context and campaign direction. The clearer the brief, the more useful and specific the weekly content plan will be.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="companyDetails" className="text-sm font-medium text-slate-200">
              Company details
            </label>
            <textarea
              id="companyDetails"
              value={companyDetails}
              onChange={(event) => setCompanyDetails(event.target.value)}
              rows={8}
              placeholder="What is your company about? Describe what you sell, who you serve, your main offer, your audience, and the tone you want the content to use."
              className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-teal-300/40"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="weeklyFocus" className="text-sm font-medium text-slate-200">
              Weekly focus
            </label>
            <textarea
              id="weeklyFocus"
              value={weeklyFocus}
              onChange={(event) => setWeeklyFocus(event.target.value)}
              rows={6}
              placeholder="What should this week focus on? Add the campaign theme, audience pain point, product or service to promote, content angle, and desired call to action."
              className="min-h-[150px] w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-teal-300/40"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="fileName" className="text-sm font-medium text-slate-200">
              Excel file name
            </label>
            <input
              id="fileName"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              placeholder="Example: april-content-calendar"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-teal-300/40"
            />
            <p className="text-xs leading-6 text-slate-400">
              Optional. If left blank, the system will create a unique Excel file name automatically.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Generating calendar...' : 'Generate weekly calendar'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        )}
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Calendar Summary</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">Your generated weekly plan will appear here after the brief is submitted.</p>
            </div>
            <Pill tone={result ? 'success' : 'default'}>{result ? 'Ready' : 'Waiting'}</Pill>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <MetricCard label="Total records" value={String(records.length)} />
            <MetricCard label="LinkedIn rows" value={String(linkedInCount)} />
            <MetricCard label="Instagram rows" value={String(instagramCount)} />
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">What You Get</p>
            <p className="mt-2">A structured weekly calendar with content ideas, platform direction, and a downloadable spreadsheet for handoff or scheduling.</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Download Excel File</h3>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            After generation, download the formatted spreadsheet.
          </p>

          <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">File</p>
            <p className="mt-2 break-all text-sm font-medium text-white">
              {result?.file_name ?? 'No file generated yet'}
            </p>
          </div>

          {result ? (
            <a
              href={buildDownloadUrl(result.download_url)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Download Excel file
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 opacity-45"
            >
              Download Excel file
            </button>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Brief Checklist</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            <li>Explain what the business does and who the content is for.</li>
            <li>Share the offer, service, or topic you want to promote this week.</li>
            <li>Describe the audience problem, objection, or desire the content should address.</li>
            <li>Set the tone, such as educational, premium, direct, friendly, or technical.</li>
            <li>Include the action you want people to take after reading the content.</li>
          </ul>
        </Card>
      </div>

      <div className="xl:col-span-2">
        <ResultsTable records={records as CalendarRecord[]} fileName={result?.file_name ?? ''} />
      </div>
    </div>
  );
}

function getPlatformValue(record: CalendarRecord) {
  const platformKey = Object.keys(record).find((key) => key.toLowerCase() === 'platform');
  return String(platformKey ? record[platformKey] : '').toLowerCase().replace(/\s+/g, '');
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
