import type { CapabilityStatementData } from '@/types/site';

export const capabilityStatementData: CapabilityStatementData = {
  registration: {
    ueicage: 'UEI / CAGE: QMM4G5XMSMD7 / 0B9Q0',
    primaryNaics: '541512',
    phone: '720-432-4663',
    email: 'info@infinitystonesolutions.com',
    samProfile: 'https://sam.gov/entity/QMM4G5XMSMD7',
    naicsCodes: [
      '541512', '541511', '541519', '541513', '541330',
      '541360', '541370', '541618', '541613', '541620',
      '541690', '541910', '518210', '561499', '561611',
      '561920', '611420', '611430',
    ],
    pscCodes: ['DA01', 'DA10', 'DC01', 'DE11', 'R499', 'R706', 'R707', 'H270', 'B529', 'B544', 'B599'],
    naicsWithDescriptions: [
      { code: '541512', description: 'Computer Systems Design Services', cie: 'Computer Systems Design, Integration, IT Services' },
      { code: '541511', description: 'Custom Computer Programming Services', cie: 'Programming, Software Development, Custom Software' },
      { code: '541519', description: 'Other Computer Related Services', cie: 'IT Support, Computer Services, Technical Services' },
      { code: '541513', description: 'Computer Facilities Management Services', cie: 'Data Center, IT Management, Facilities Management' },
      { code: '541330', description: 'Engineering Services', cie: 'Engineering, Technical Services, Systems Engineering' },
      { code: '541360', description: 'Geophysical Surveying and Mapping Services', cie: 'Geophysical, Mapping, Remote Sensing' },
      { code: '541370', description: 'Surveying and Mapping Services', cie: 'Surveying, Mapping, GIS, Geospatial' },
      { code: '541618', description: 'Other Management Consulting Services', cie: 'Management Consulting, Business Consulting' },
      { code: '541613', description: 'Marketing Consulting Services', cie: 'Marketing, Consulting, Strategic Planning' },
      { code: '541620', description: 'Environmental Consulting Services', cie: 'Environmental, Consulting, Assessment' },
      { code: '541690', description: 'Other Scientific and Technical Consulting Services', cie: 'Scientific Consulting, Technical Advisory' },
      { code: '541910', description: 'Marketing Research and Public Opinion Polling', cie: 'Research, Analysis, Market Research' },
      { code: '518210', description: 'Data Processing, Hosting, and Related Services', cie: 'Data Processing, Cloud, Hosting, SaaS' },
      { code: '561499', description: 'All Other Business Support Services', cie: 'Business Support, Administrative Services' },
      { code: '561611', description: 'Investigation Services', cie: 'Investigation, Forensics, Intelligence, Security' },
      { code: '561920', description: 'Convention and Trade Show Organizers', cie: 'Events, Conferences, Trade Shows' },
      { code: '611420', description: 'Computer Training', cie: 'IT Training, Technology Education, Computer Courses' },
      { code: '611430', description: 'Professional and Management Development Training', cie: 'Training, Professional Development, Leadership' },
    ],
    pscWithDescriptions: [
      { code: 'DA01', description: 'IT — Business Application / Application Development / Programming Services' },
      { code: 'DA10', description: 'IT — IT Strategy and Architecture' },
      { code: 'DC01', description: 'IT — Data Management' },
      { code: 'DE11', description: 'IT — IT Systems Development' },
      { code: 'R499', description: 'Support — Professional: Other' },
      { code: 'R706', description: 'Support — Professional: Program Evaluation / Review / Development' },
      { code: 'R707', description: 'Support — Professional: Program Management / Support' },
      { code: 'H270', description: 'Quality Control Inspection — Information Technology' },
      { code: 'B529', description: 'Special Studies and Analysis' },
      { code: 'B544', description: 'Geophysical Studies / Analysis' },
      { code: 'B599', description: 'Investigations: Other' },
    ],
  },

  overview:
    'Infinity Stone Solutions Inc. (ISS) is a woman-veteran-owned technology firm delivering secure, innovative, and mission-focused technology and intelligence solutions to defense, intelligence, law enforcement, and civilian clients. Our team has a proven history of operational excellence across enterprise IT modernization, geospatial data solutions, artificial intelligence analytics, cybersecurity, and mission-critical system integration.',

  competencies: [
    {
      title: 'Enterprise IT Solutions',
      description:
        'End-to-end design, integration, and deployment of enterprise applications and data management platforms. Experience includes large-scale system configuration, cloud and mobile enablement, and complex data migration from legacy environments into platforms such as Workday, Oracle, and ServiceNow.',
    },
    {
      title: 'Cloud Infrastructure & Migration',
      description:
        'Specialized in Azure cloud adoption and hybrid-cloud architecture, including UNIX-to-Linux server migrations, DFS restructures, and secure governance frameworks enabling scalability, redundancy, and compliance.',
    },
    {
      title: 'AI & Advanced Analytics',
      description:
        'Development and integration of AI/ML-powered analytics, anomaly detection, and predictive intelligence for federal and commercial applications. Advanced expertise in Palantir for link analysis, pattern-of-life modeling, and investigative intelligence.',
    },
    {
      title: 'Agile Program & Project Management',
      description:
        'PMP, SAFe, Scrum, and Kanban-certified project leaders providing full lifecycle oversight, risk analysis, agile sprint execution, and multi-stakeholder coordination.',
    },
    {
      title: 'Cybersecurity & Compliance',
      description:
        'Secure architecture design and implementation aligned with NIST RMF, FISMA, and FedRAMP standards. Accessibility compliance includes VPAT creation and WCAG 2.1 AA adherence.',
    },
    {
      title: 'Geospatial Solutions',
      description:
        'Full Esri ArcGIS Enterprise implementation, schema design and QA/QC, data conversion from CAD/PDF/JPEG to GIS, custom GIS web and mobile application development, and integration of location intelligence into enterprise workflows.',
    },
  ],

  differentiators: [
    'Woman-Veteran-Owned, Service-Disabled Veteran-Owned Small Business (SDVOSB) with 20+ years of leadership in secure government IT, intelligence, and geospatial delivery',
    '25+ years of technical experience with proven support for government programs',
    'Recognized by DHS, MDA, and DOI for modernization, operational excellence, and innovation',
    'Leadership with previous Top Secret Clearance (U.S. Navy) and a Master\'s of Science in Information Systems Management',
    'Staff with deep operational experience across DoD, intelligence, and federal healthcare agencies',
    'Certified technical team with PMP, ScrumMaster, SAFe, ITIL, Microsoft, and Azure credentials',
    'Proven innovation track record, including patented technology, early adoption of mobile apps, and AI-enabled analytics',
    'Multi-sector expertise spanning defense, intelligence, law enforcement, energy, healthcare, and public sector modernization',
    'Compliance-focused delivery aligned with NIST, FedRAMP, ITIL, and federal security standards',
    'Veteran-led and mission-aligned with the Department of Veterans Affairs\' goals for service, modernization, and accountability',
  ],

  highlights: [
    {
      title: 'Mission operations and intelligence support',
      summary:
        'ISS provided SIGINT support, advanced collection workflows, and interagency intelligence enablement for real-time mission decisions.',
    },
    {
      title: 'Modernization and enterprise platforms',
      summary:
        'ISS delivered benefits-system adoption, service-desk transformation, enterprise ticketing, and cloud-preparation work across government programs.',
    },
    {
      title: 'AI, analytics, and geospatial depth',
      summary:
        'ISS has delivered Palantir-enabled analytical workflows, AI/ML support, and ArcGIS Enterprise implementation and data-conversion capability.',
    },
  ],

  pastPerformance: [
    {
      client: 'U.S. Navy',
      summary:
        'Provided critical SIGINT support, successfully exploiting over 20,000+ high-value targets using advanced collection tools including CAINES, OSCOPE, and Spectrum Analyzer. Intercepted, recorded, and decoded complex signals to deliver actionable intelligence for real-time mission decisions. Developed Personnel Qualification Standards (PQS), managed special missions with U.S. Coast Guard targeting transnational crime, and spearheaded creation of an interagency criminal intelligence database now used by CIA, DEA, ATF, DoD, and local law enforcement. Founder recognized as 2005 Sailor of the Year for Naval Information Operation Command (NIOC) San Diego, CA.',
    },
    {
      client: 'SPAWAR',
      summary:
        'Supported Ballistic Missile Defense (BMD) and THAAD test events as a systems operator and network integrator. Configured JRE, ADSI, CDMLS, Aegis Weapon Suite, routers, switches, SHF satellite systems, and KG-84 encryption devices to ensure full mission readiness. Designed alternate EHF/SHF communications paths enabling launch-on-TADIL scenarios where ships fired on ICBMs beyond their radar range. Authored comprehensive test plans, conducted post-event message accuracy analysis, and created SOP-based training programs that reduced onboarding time for technical staff. Received multiple awards from these government agencies for supporting these efforts.',
    },
    {
      client: 'Immigration and Customs Enforcement (ICE / HSI)',
      summary:
        'Delivered mobile device forensic services, extracting data from detainee devices and integrating it into Palantir for analysis and leadership structure mapping. Generated intelligence packages that enabled many arrests. Testified in court as a digital forensics expert, ensuring evidence integrity. Led a records digitization project, replacing costly NARA-bound storage with secure, searchable digital archives, reducing retrieval times from weeks to hours.',
    },
    {
      client: 'Department of Interior / Bureau of Land Management (DOI / BLM)',
      summary:
        'Led multiple modernization initiatives including HR benefits system adoptions, GIS data conversion, and reverse-engineering of state-based inspection tracking systems for national system module development. Directed cloud migration preparation activities, migrated all applications from UNIX to Linux servers to retire legacy equipment, developed a single sign-on script to assist user application access, EIS network migration, and enterprise ticketing system deployment. Delivered modernization requirements for the ePlanning system and provided strategic planning support for a resource management plan mapping prototype for the national enterprise services platform.',
    },
    {
      client: 'SourceGas',
      summary:
        'Provided centralized service desk support for a large energy provider, delivering Tier 1/2 issue resolution for distributed corporate and field sites. Led migration from SharePoint to Microsoft Exchange-based ticketing, resolving legacy ticket backlogs within 60 days. Created SCCM-based imaging and deployment packages for rapid provisioning of standardized workstations across remote locations. Received Teamwork Award for cross-functional collaboration.',
    },
    {
      client: 'Commercial & Residential Renovation',
      summary:
        'Provided IT, marketing, and project management oversight for high-end renovations. Projects included luxury flooring, deck construction, landscaping, and structural upgrades. Patented polyaspartic flake application method on cement boards and trademarked "Luxury Aspartic Flooring." Directed commercial renovations including locker room upgrades, food bank parking lot resurfacing with automated doors, and community pool house modernization.',
    },
  ],

  overviewCondensed:
    'Infinity Stone Solutions Inc. (ISS) is a woman-veteran-owned technology firm delivering secure, innovative, and mission-focused technology and intelligence solutions to defense, intelligence, law enforcement, and civilian clients.',

  pastPerformanceCondensed: [
    { client: 'U.S. Navy', outcome: 'SIGINT exploitation of 20,000+ targets; created interagency intelligence database used by CIA, DEA, ATF, and DoD' },
    { client: 'SPAWAR', outcome: 'Ballistic missile defense and THAAD test integration; designed EHF/SHF launch-on-TADIL communications paths' },
    { client: 'ICE / HSI', outcome: 'Palantir-enabled forensic analysis and leadership mapping; expert court testimony; records digitization' },
    { client: 'DOI / BLM', outcome: 'Enterprise modernization across HR, GIS, and cloud; UNIX-to-Linux migration; ArcGIS data conversion' },
  ],
};
