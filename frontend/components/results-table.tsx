import { Card } from '@/components/ui';
import type { CalendarRecord } from '@/lib/types';

export function ResultsTable({ records, fileName }: { records: CalendarRecord[]; fileName: string }) {
  const columns = Array.from(
    new Set(records.flatMap((record) => Object.keys(record))),
  );

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-white/10 px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Generated records</h3>
            <p className="mt-2 text-sm text-slate-300">
              {records.length > 0
                ? `Spreadsheet ready${fileName ? `: ${fileName}` : ''}`
                : 'No output yet. Generate a calendar to preview the returned rows.'}
            </p>
          </div>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="px-6 py-12 text-center text-sm text-slate-400">
          Your content calendar preview will appear here.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-white/5 text-slate-200">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="border-b border-white/10 px-4 py-4 font-semibold whitespace-nowrap">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={`${record.Day ?? 'row'}-${index}`} className="align-top even:bg-white/[0.03]">
                  {columns.map((column) => (
                    <td key={`${index}-${column}`} className="border-b border-white/5 px-4 py-4 text-slate-300">
                      <div className="max-w-[420px] whitespace-pre-wrap leading-7">{String(record[column] ?? '')}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
