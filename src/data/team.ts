export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  credentials: string[];
  background: string;
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
    name: '[Name]',
    title: '[Title TBD]',
    bio: '',
    credentials: [],
    background: '',
  },
];
