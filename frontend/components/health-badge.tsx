'use client';

import { useEffect, useState } from 'react';
import { checkBackendHealth } from '@/lib/api';
import { Card, Pill } from '@/components/ui';

export function HealthBadge() {
  const [status, setStatus] = useState<'checking' | 'healthy' | 'down'>('checking');
  const [message, setMessage] = useState('Checking generation service...');

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await checkBackendHealth();
        if (!isMounted) return;
        setStatus(data.status === 'ok' ? 'healthy' : 'down');
        setMessage(data.status === 'ok' ? 'Generation service is ready.' : 'Generation service is not ready yet.');
      } catch (error) {
        if (!isMounted) return;
        setStatus('down');
        setMessage(error instanceof Error ? error.message : 'Could not connect to the generation service.');
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Service Status</p>
          <p className="mt-1 text-sm text-slate-300">{message}</p>
        </div>
        <div>
          {status === 'checking' && <Pill>Checking</Pill>}
          {status === 'healthy' && <Pill tone="success">Healthy</Pill>}
          {status === 'down' && <Pill tone="danger">Unavailable</Pill>}
        </div>
      </div>
    </Card>
  );
}
