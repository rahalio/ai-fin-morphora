'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PartnerConcentrationGraph } from '@/components/morphora';
import {
  partnersService,
  type PartnerCriticality,
} from '@/services/domains/partners';
import { formatProblem } from '@/services/shared/http';

const CRITICALITIES: PartnerCriticality[] = [
  'low',
  'medium',
  'high',
  'systemic',
];

export default function PartnersPage() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ['partners'],
    queryFn: () => partnersService.listPartners(),
  });
  const [name, setName] = useState('');
  const [partnerType, setPartnerType] = useState('vendor');
  const [error, setError] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () =>
      partnersService.createPartner({
        name: name.trim(),
        partnerType: partnerType.trim(),
        criticality: 'medium',
        concentrationScore: 0.3,
        spof: false,
      }),
    onSuccess: () => {
      setName('');
      qc.invalidateQueries({ queryKey: ['partners'] });
    },
    onError: (e) => setError(formatProblem(e)),
  });

  const update = useMutation({
    mutationFn: ({
      partnerId,
      criticality,
      concentrationScore,
      spof,
    }: {
      partnerId: string;
      criticality: PartnerCriticality;
      concentrationScore: number;
      spof: boolean;
    }) =>
      partnersService.setCriticality(partnerId, {
        criticality,
        concentrationScore,
        spof,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['partners'] }),
    onError: (e) => setError(formatProblem(e)),
  });

  const partners = list.data ?? [];
  const breaches = partners.filter(
    (p) =>
      p.spof ||
      p.criticality === 'systemic' ||
      (p.concentrationScore ?? 0) >= 0.7,
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Ecosystem partners</h1>
        <p className="page-sub">
          Criticality, concentration, and single points of failure.
        </p>
      </header>

      {breaches.length > 0 && (
        <div
          className="rounded-md border border-breach/50 bg-breach/10 px-4 py-3 text-sm text-breach"
          role="status"
        >
          Concentration / SPOF banners: {breaches.map((p) => p.name).join(', ')}{' '}
          — dependent scale may be blocked.
        </div>
      )}

      {error && <p className="text-sm text-breach">{error}</p>}

      <form
        className="panel flex flex-wrap gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate();
        }}
      >
        <input
          className="field max-w-xs"
          placeholder="Partner name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="field max-w-[10rem]"
          placeholder="Type"
          value={partnerType}
          onChange={(e) => setPartnerType(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary" disabled={create.isPending}>
          Add partner
        </button>
      </form>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="panel">
          <h2 className="mb-3 text-sm font-semibold text-teal">
            Concentration graph
          </h2>
          <PartnerConcentrationGraph partners={partners} />
        </div>
        <ul className="space-y-2">
          {partners.map((p) => (
            <li key={p.partnerId} className="panel space-y-2">
              <div className="flex justify-between gap-2">
                <div>
                  <p className="font-medium text-ink">{p.name}</p>
                  <p className="text-xs text-steel">{p.partnerType}</p>
                </div>
                <label className="flex items-center gap-2 text-xs text-steel">
                  <input
                    type="checkbox"
                    checked={p.spof}
                    onChange={(e) =>
                      update.mutate({
                        partnerId: p.partnerId,
                        criticality: p.criticality,
                        concentrationScore: p.concentrationScore ?? 0.3,
                        spof: e.target.checked,
                      })
                    }
                  />
                  SPOF
                </label>
              </div>
              <div className="flex flex-wrap gap-1">
                {CRITICALITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase ${
                      p.criticality === c
                        ? 'border-teal text-teal'
                        : 'border-steel/40 text-steel'
                    }`}
                    onClick={() =>
                      update.mutate({
                        partnerId: p.partnerId,
                        criticality: c,
                        concentrationScore:
                          c === 'systemic'
                            ? 0.85
                            : c === 'high'
                              ? 0.65
                              : p.concentrationScore ?? 0.3,
                        spof: p.spof || c === 'systemic',
                      })
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
