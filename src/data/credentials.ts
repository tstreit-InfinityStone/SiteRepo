import type { CredentialEntry } from '@/types/site';

export const credentials: CredentialEntry[] = [
  {
    id: 'pmp',
    title: 'Project Management Professional',
    issuingBody: 'PMI',
    shortDescription: 'Program and project delivery discipline for complex stakeholder environments.',
    relevance: 'Supports roadmap execution, risk management, and accountable delivery.',
  },
  {
    id: 'safe-scrum-itil',
    title: 'SAFe, ScrumMaster, and ITIL-aligned practices',
    issuingBody: 'Industry-recognized frameworks',
    shortDescription: 'Published agile and service-management capability spanning delivery planning and operational support.',
    relevance: 'Useful for modernization initiatives that need both program rigor and practical execution.',
  },
  {
    id: 'microsoft-azure',
    title: 'Microsoft and Azure-aligned capability',
    issuingBody: 'Microsoft ecosystem',
    shortDescription: 'Published experience in enterprise platform, cloud, and governance work tied to Microsoft environments.',
    relevance: 'Relevant for cloud migration, service management, and enterprise operations.',
  },
];
