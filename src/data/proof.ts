import type { ProofSignal } from '@/types/site';

export const proofSignals: ProofSignal[] = [
  {
    id: 'sam-registration',
    label: 'Active SAM registration',
    shortDescription: 'UEI, CAGE code, NAICS and PSC codes on file. ISS is procurement-ready for federal and regulated-environment work.',
    category: 'registration',
    detail:
      'The Capability Statement publishes UEI/CAGE information, NAICS codes, PSC codes, and a SAM profile reference.',
    stat: { value: 18, suffix: '+' },
  },
  {
    id: 'government-delivery',
    label: 'Government and mission-program experience',
    shortDescription: 'Delivery history spanning U.S. Navy, ICE/HSI, DOI/BLM, and SPAWAR — not hypothetical capability, real program work.',
    category: 'delivery',
    detail:
      'ISS has supported U.S. Navy, SPAWAR, ICE/HSI, and DOI/BLM across modernization, intelligence, and mission-delivery programs.',
  },
  {
    id: 'credentialed-team',
    label: 'Collective credentials across team members',
    shortDescription: 'PMP, ScrumMaster, SAFe, ITIL, and Azure-aligned credentials — the delivery team holds the certifications the work requires.',
    category: 'credential',
    detail:
      'Team credentials include PMP, ScrumMaster, SAFe, ITIL, Microsoft, and Azure-aligned certifications.',
    stat: { value: 25, suffix: '+' },
  },
  {
    id: 'cloud-modernization',
    label: 'Proven modernization experience',
    shortDescription: 'Hands-on experience with enterprise platforms, cloud migration, service desks, and legacy transition programs.',
    category: 'delivery',
    detail:
      'ISS has delivered across Workday, Oracle, ServiceNow, UNIX-to-Linux migration, enterprise ticketing, and cloud governance programs.',
  },
  {
    id: 'ai-geospatial',
    label: 'AI, analytics, and geospatial capability',
    shortDescription: 'Palantir-enabled investigative support, ArcGIS Enterprise implementation, and applied AI/ML analytics — deployed in actual mission contexts.',
    category: 'delivery',
    detail:
      'ISS has delivered AI/ML analytics, Palantir-enabled investigative support, and full ArcGIS Enterprise implementations in government environments.',
  },
  {
    id: 'named-past-performance',
    label: 'Named past performance',
    shortDescription: 'Delivery examples span U.S. Navy, SPAWAR, ICE/HSI, DOI/BLM, and utility-sector programs.',
    category: 'past-performance',
    detail:
      'ISS references a mix of named and summarized past-performance examples drawn from defense, intelligence, civilian, and infrastructure programs.',
  },
];

export const featuredProofIds = [
  'sam-registration',
  'government-delivery',
  'credentialed-team',
  'ai-geospatial',
];

export const pastPerformanceHighlights = [
  {
    title: 'U.S. Navy — SIGINT and mission intelligence',
    summary:
      'Provided critical SIGINT support exploiting 20,000+ high-value targets using CAINES, OSCOPE, and Spectrum Analyzer. Spearheaded an interagency criminal intelligence database now used by CIA, DEA, ATF, DoD, and local law enforcement. Founder recognized as 2005 Sailor of the Year, NIOC San Diego.',
  },
  {
    title: 'SPAWAR — Missile-defense and network integration',
    summary:
      'Supported BMD and THAAD test events as a systems operator and network integrator. Configured Aegis Weapon Suite, SHF satellite systems, and KG-84 encryption devices. Designed alternate EHF/SHF communications paths enabling launch-on-TADIL scenarios. Received multiple government agency awards.',
  },
  {
    title: 'ICE / HSI — Digital forensics and Palantir analysis',
    summary:
      'Delivered mobile device forensic services integrated into Palantir for leadership structure mapping and intelligence packages enabling arrests. Testified in court as a digital forensics expert. Led records digitization reducing retrieval times from weeks to hours.',
  },
  {
    title: 'DOI / BLM — Enterprise modernization',
    summary:
      'Led HR benefits system adoption, GIS data conversion, and UNIX-to-Linux server migration. Directed cloud migration preparation, enterprise ticketing deployment, and EIS network migration. Delivered ePlanning modernization requirements and a national enterprise resource management prototype.',
  },
  {
    title: 'SourceGas — Service desk and infrastructure',
    summary:
      'Provided centralized Tier 1/2 service desk support for distributed corporate and field sites. Led migration from SharePoint to Exchange-based ticketing, resolving legacy backlogs within 60 days. Created SCCM imaging packages for rapid workstation provisioning across remote locations.',
  },
];
