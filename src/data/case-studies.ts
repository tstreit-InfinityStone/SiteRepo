export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  tags: string[];
  summary: string;
  outcomes: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'us-navy-sigint',
    client: 'U.S. Navy',
    sector: 'Defense / Intelligence',
    tags: ['SIGINT', 'Intelligence Analysis', 'Interagency'],
    summary:
      'Provided critical SIGINT support exploiting 20,000+ high-value targets using CAINES, OSCOPE, and Spectrum Analyzer. Spearheaded an interagency criminal intelligence database now used by CIA, DEA, ATF, DoD, and local law enforcement.',
    outcomes: [
      '20,000+ high-value SIGINT targets exploited',
      'Interagency intelligence database adopted by CIA, DEA, ATF, DoD, and local law enforcement',
      'Founder recognized as 2005 Sailor of the Year, NIOC San Diego',
    ],
  },
  {
    id: 'spawar-missile-defense',
    client: 'SPAWAR',
    sector: 'Defense',
    tags: ['Missile Defense', 'Network Integration', 'Satellite Communications'],
    summary:
      'Supported BMD and THAAD test events as systems operator and network integrator. Configured Aegis Weapon Suite, SHF satellite systems, and KG-84 encryption devices. Designed alternate EHF/SHF communications paths enabling launch-on-TADIL scenarios.',
    outcomes: [
      'BMD and THAAD test events supported without schedule failure',
      'Alternate EHF/SHF communications paths designed and deployed',
      'Multiple government agency awards received',
    ],
  },
  {
    id: 'ice-hsi-forensics',
    client: 'ICE / HSI',
    sector: 'Law Enforcement / Intelligence',
    tags: ['Digital Forensics', 'Palantir', 'Court Testimony'],
    summary:
      'Delivered mobile device forensic services integrated into Palantir for leadership structure mapping and intelligence packages enabling arrests. Testified in federal court as a digital forensics expert. Led records digitization reducing retrieval times from weeks to hours.',
    outcomes: [
      'Intelligence packages delivered enabling arrests',
      'Digital forensics testimony accepted in federal court',
      'Records retrieval time reduced from weeks to hours',
      'DHS recognition for operational excellence',
    ],
  },
  {
    id: 'doi-blm-modernization',
    client: 'DOI / BLM',
    sector: 'Civilian Federal',
    tags: ['Enterprise Modernization', 'Cloud Migration', 'GIS', 'ArcGIS'],
    summary:
      'Led HR benefits system adoption, GIS data conversion, and UNIX-to-Linux server migration. Directed cloud migration preparation, enterprise ticketing deployment, and EIS network migration. Delivered ePlanning modernization requirements and a national enterprise resource management prototype.',
    outcomes: [
      'GIS data conversion and ArcGIS Enterprise implementation completed',
      'UNIX-to-Linux server migration executed',
      'National enterprise resource management prototype delivered',
      'DOI recognition for modernization and innovation',
    ],
  },
  {
    id: 'sourcegas-service-desk',
    client: 'SourceGas',
    sector: 'Regulated Private Sector',
    tags: ['Service Desk', 'Infrastructure', 'SCCM'],
    summary:
      'Provided centralized Tier 1/2 service desk support for distributed corporate and field sites. Led migration from SharePoint to Exchange-based ticketing, resolving legacy backlogs within 60 days. Created SCCM imaging packages for rapid workstation provisioning across remote locations.',
    outcomes: [
      'Legacy service desk backlog resolved within 60 days',
      'SCCM imaging packages deployed across remote locations',
      'Teamwork Award received for service desk engagement',
    ],
  },
];
