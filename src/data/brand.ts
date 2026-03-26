import type { BrandConfig } from '@/types/site';

export const brand: BrandConfig = {
  name: 'Infinity Stone Solutions Inc.',
  shortName: 'ISS',
  logo: {
    wordmark: '/brand/iss-logo-transparent.png',
    mark: '/brand/iss-logo-transparent.png',
  },
  colors: {
    ink: '#112235',
    inkSoft: '#42556a',
    primary: '#155fa0',
    secondary: '#1e78c8',
    accent: '#c7962f',
    surface: '#f7f9fc',
    surfaceMuted: '#eaf0f6',
    border: '#d6e1ec',
    success: '#1f7a52',
  },
  typography: {
    display: '"Merriweather", Georgia, serif',
    body: '"Source Sans 3", "Segoe UI", sans-serif',
    mono: '"IBM Plex Mono", "Cascadia Code", monospace',
  },
  ctas: {
    primary: 'Start a Capability Discussion',
    secondary: 'View Capability Statement',
    contact: 'Contact ISS',
  },
  trustBadges: [
    {
      label: 'Cleared for public-sector work',
      detail: 'SAM-registered, NAICS-coded, and actively positioned for federal, state, and local program work.',
    },
    {
      label: 'Modernization that keeps programs moving',
      detail: 'We bridge strategy and execution so your migration, platform upgrade, or enterprise transition does not stall.',
    },
    {
      label: 'Security baked in, not bolted on',
      detail: 'NIST, FISMA, FedRAMP, and accessibility aligned — security and compliance embedded from day one.',
    },
    {
      label: 'Intelligence workflows that support real decisions',
      detail: 'Palantir, ArcGIS, and applied AI/ML connected to actual mission and operational needs.',
    },
  ],
  assets: {
    socialPreview: '/brand/og-card.svg',
    capabilityStatement: '/capability-statement/print',
    capabilityStatementOnePage: '/capability-statement/one-page',
  },
};
