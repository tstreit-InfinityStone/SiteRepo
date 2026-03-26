export type NavigationItem = {
  label: string;
  href: string;
  description?: string;
};

export type BrandConfig = {
  name: string;
  shortName: string;
  logo: {
    wordmark: string;
    mark: string;
  };
  colors: {
    ink: string;
    inkSoft: string;
    primary: string;
    secondary: string;
    accent: string;
    surface: string;
    surfaceMuted: string;
    border: string;
    success: string;
  };
  typography: {
    display: string;
    body: string;
    mono: string;
  };
  ctas: {
    primary: string;
    secondary: string;
    contact: string;
  };
  trustBadges: Array<{
    label: string;
    detail: string;
  }>;
  assets: {
    socialPreview: string;
    capabilityStatement: string;
    capabilityStatementOnePage: string;
  };
};

export type SiteConfig = {
  legalName: string;
  businessName: string;
  shortName: string;
  domain: string;
  phone: string;
  email: string;
  location: string;
  serviceArea: string;
  heroHeadline: string;
  heroSubheadline: string;
  positioning: string;
  footerSummary: string;
  contactExpectation: string;
  differentiators: Array<{
    title: string;
    description: string;
  }>;
};

export type CapabilityGroup = {
  slug: string;
  title: string;
  summary: string;
  order: number;
  icon: string;
};

export type CapabilityEntry = CapabilityGroup & {
  excerpt: string;
  heroDescription: string;
  buyerProblems: string[];
  outcomes: string[];
  includedWork: string[];
  idealBuyers: string[];
  proofReferences: string[];
  relatedCapabilities: string[];
  ctaText: string;
};

export type SectorEntry = {
  id: string;
  title: string;
  icon: string;
  summary: string;
  agencies: string[];
  buyerConcerns: string[];
  relevantCapabilities: string[];
  proofReferences: string[];
};

export type ProofSignal = {
  id: string;
  label: string;
  shortDescription: string;
  category: 'credential' | 'registration' | 'past-performance' | 'delivery';
  detail: string;
  stat?: { value: number; suffix?: string; prefix?: string };
};

export type CredentialEntry = {
  id: string;
  title: string;
  issuingBody: string;
  shortDescription: string;
  relevance: string;
};

export type ContactConfig = {
  title: string;
  intro: string;
  reassurance: string;
  successMessage: string;
};

export type InsightEntry = {
  title: string;
  description: string;
  publishDate: Date;
  draft: boolean;
};

export type CapabilityStatementData = {
  registration: {
    ueicage: string;
    primaryNaics: string;
    naicsCodes: string[];
    pscCodes: string[];
    phone: string;
    email: string;
    samProfile: string;
    naicsWithDescriptions: Array<{ code: string; description: string; cie?: string }>;
    pscWithDescriptions: Array<{ code: string; description: string }>;
  };
  overview: string;
  competencies: Array<{ title: string; description: string }>;
  differentiators: string[];
  highlights: Array<{
    title: string;
    summary: string;
  }>;
  pastPerformance: Array<{ client: string; summary: string }>;
  overviewCondensed: string;
  pastPerformanceCondensed: Array<{ client: string; outcome: string }>;
};
