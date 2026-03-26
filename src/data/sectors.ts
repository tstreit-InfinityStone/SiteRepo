import type { SectorEntry } from '@/types/site';

export const sectors: SectorEntry[] = [
  {
    id: 'defense-military',
    icon: '🛡️',
    title: 'Defense & Military Programs',
    summary:
      'ISS brings operational military experience, mission-tested delivery, and secure-systems integration to defense programs that cannot tolerate execution gaps.',
    agencies: ['U.S. Navy', 'SPAWAR / NAVWAR', 'Missile Defense Agency', 'Army', 'DISA'],
    buyerConcerns: [
      'Secure systems integration in high-tempo operational environments',
      'Vendors who understand classification, chain of command, and mission accountability',
      'Test event support, network configuration, and operational readiness verification',
    ],
    relevantCapabilities: [
      'cybersecurity-and-compliance',
      'ai-data-and-geospatial-intelligence',
      'program-and-requirements-support',
    ],
    proofReferences: ['government-delivery', 'named-past-performance'],
  },
  {
    id: 'intelligence-investigative',
    icon: '🔍',
    title: 'Intelligence & Investigative Agencies',
    summary:
      'From SIGINT exploitation to Palantir-enabled investigative analytics and court-defensible digital forensics, ISS has operated inside programs where data accuracy and chain of custody are mission outcomes.',
    agencies: ['ICE / HSI', 'FBI', 'DEA', 'ATF', 'Secret Service', 'NSA', 'DIA'],
    buyerConcerns: [
      'Investigative analytics platforms that connect evidence to prosecutable outcomes',
      'Digital forensics with legally defensible chain-of-custody handling',
      'Interagency intelligence workflows that cross organizational and classification boundaries',
    ],
    relevantCapabilities: [
      'ai-data-and-geospatial-intelligence',
      'cybersecurity-and-compliance',
      'enterprise-it-modernization',
    ],
    proofReferences: ['government-delivery', 'named-past-performance', 'ai-geospatial'],
  },
  {
    id: 'federal-land-science',
    icon: '🗺️',
    title: 'Federal Land, Resource & Science Agencies',
    summary:
      'ISS has delivered geospatial enterprise implementations, GIS data conversion, and cloud migration preparation for agencies where spatial and resource data drives policy, permitting, and field operations.',
    agencies: ['DOI / Bureau of Land Management', 'USGS', 'EPA', 'U.S. Forest Service', 'National Park Service', 'NGA'],
    buyerConcerns: [
      'GIS data modernization — converting legacy CAD/PDF/JPEG into enterprise-ready ArcGIS formats',
      'Enterprise platform adoption without disrupting distributed field operations',
      'Cloud migration readiness for systems that span office and remote field environments',
    ],
    relevantCapabilities: [
      'ai-data-and-geospatial-intelligence',
      'enterprise-it-modernization',
      'cloud-and-infrastructure',
    ],
    proofReferences: ['government-delivery', 'named-past-performance', 'cloud-modernization', 'ai-geospatial'],
  },
  {
    id: 'federal-civilian-modernization',
    icon: '🏛️',
    title: 'Federal Civilian Modernization Programs',
    summary:
      'ISS supports civilian agencies replacing legacy systems and adopting enterprise platforms — with the delivery discipline to keep programs on track through competing stakeholder demands and operational risk.',
    agencies: ['Department of Interior', 'Department of Veterans Affairs', 'HHS', 'USDA', 'Treasury', 'GSA'],
    buyerConcerns: [
      'Legacy system replacement without disrupting ongoing agency operations or compliance posture',
      'Enterprise platform adoption (Workday, Oracle, ServiceNow) with real end-user coordination',
      'Requirements clarity across technical, program, and policy stakeholders before implementation begins',
    ],
    relevantCapabilities: [
      'enterprise-it-modernization',
      'program-and-requirements-support',
      'cloud-and-infrastructure',
    ],
    proofReferences: ['government-delivery', 'named-past-performance', 'cloud-modernization'],
  },
  {
    id: 'regulated-infrastructure',
    icon: '⚡',
    title: 'Regulated Infrastructure & Energy',
    summary:
      'When private-sector organizations face the same security, continuity, and compliance pressures as government programs, ISS brings public-sector-aligned delivery discipline to their environment.',
    agencies: ['Natural gas & electric utilities', 'Pipeline operators', 'Water infrastructure', 'Healthcare systems', 'Financial services'],
    buyerConcerns: [
      'Service desk modernization across distributed corporate and field locations with tight SLAs',
      'Infrastructure migrations and server upgrades without taking operations offline',
      'Compliance-aligned IT support where regulatory oversight mirrors federal standards',
    ],
    relevantCapabilities: [
      'cloud-and-infrastructure',
      'enterprise-it-modernization',
      'digital-experience-and-custom-solutions',
    ],
    proofReferences: ['cloud-modernization', 'named-past-performance'],
  },
];
