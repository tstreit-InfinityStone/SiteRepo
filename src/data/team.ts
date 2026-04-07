export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  credentials: string[];
  background: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'founder',
    name: '[Name]',
    title: '[Title TBD]',
    bio: "With 20+ years of experience in secure government environments spanning U.S. Navy SIGINT operations, SPAWAR missile-defense programs, and federal law enforcement intelligence, ISS's founder built the firm to deliver the kind of mission-first technology support she had seen work in the field.",
    credentials: [
      'Previous Top Secret Clearance — U.S. Navy, NIOC San Diego',
      'Master of Science, Information Systems Management',
      '2005 Sailor of the Year — NIOC San Diego',
      'DHS Recognition — ICE/HSI Digital Forensics',
      'MDA Recognition — Missile Defense Test Support',
      'DOI Recognition — Enterprise Modernization & Innovation',
    ],
    background: 'U.S. Navy SIGINT · SPAWAR Missile Defense · ICE/HSI Digital Forensics · DOI/BLM Modernization',
  },
  {
    id: 'co-founder',
    name: 'Tyler Streit',
    title: '[Title TBD]',
    image: '/team/tyler-streit.png',
    bio: "Tyler Streit leads program delivery and strategic operations at ISS. His background spans federal modernization planning in the DOI/BLM environment, architecting a DOI IT Intake Process that shaped how modernization problems are evaluated and routed, and leading the documentation strategy behind a multi-million-dollar General Land Office modernization initiative spanning website modernization, GIS systems, and document-digitization workflows. He brings the operational discipline, reporting rigor, and commercial acumen that turn capability into measurable program outcomes.",
    credentials: [
      'Bachelor of Business Administration in Finance',
      '4 years of project management support in the DOI/BLM environment',
      'Major contributor to a DOI IT Intake Process for evaluating modernization needs',
      'Documentation support tied to a successful $9M+ modernization grant effort',
      'Business analysis, KPI reporting, pricing, and executive decision-support background',
      'Supplier relationship management and commercial operations experience',
      'Practical AI tool use and AI-assisted workflow integration',
    ],
    background: 'DOI / BLM Project Management · IT Intake & Modernization Planning · Procurement · Supplier Operations',
  },
];
