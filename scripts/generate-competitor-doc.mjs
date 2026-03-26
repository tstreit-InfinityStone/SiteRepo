// scripts/generate-competitor-doc.mjs
// Generates a styled Word document from the competitor analysis content.
// Run: node scripts/generate-competitor-doc.mjs

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  PageBreak,
  UnderlineType,
  NumberFormat,
  convertInchesToTwip,
  ImageRun,
} from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_PATH = path.join(ROOT, 'docs', 'ISS-Competitor-Analysis.docx');

// ── Brand colours (OOXML hex, no #) ──────────────────────────────────────────
const INK       = '0D1B2A';   // near-black
const PRIMARY   = '1B4FD8';   // ISS blue
const ACCENT    = '4A9EFF';   // light blue
const SURFACE   = 'F0F4FA';   // light tint for table rows
const BORDER    = 'D1D9E6';   // soft border
const SOFT      = '5A6A80';   // body text secondary
const WHITE     = 'FFFFFF';
const WARN      = 'C1392B';   // for gap/risk cells

// ── Typography helpers ────────────────────────────────────────────────────────

function eyebrow(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        font: 'Calibri',
        size: 17,           // 8.5pt
        bold: true,
        color: ACCENT,
        characterSpacing: 80,
      }),
    ],
    spacing: { before: 280, after: 40 },
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [
      new TextRun({ text, font: 'Calibri', size: 48, bold: true, color: INK }),
    ],
    spacing: { before: 0, after: 120 },
  });
}

function h2(text, opts = {}) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [
      new TextRun({ text, font: 'Calibri', size: 32, bold: true, color: opts.color || PRIMARY }),
    ],
    spacing: { before: opts.before ?? 360, after: 100 },
    border: opts.borderBottom ? {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: BORDER, space: 4 },
    } : undefined,
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [
      new TextRun({ text, font: 'Calibri', size: 24, bold: true, color: INK }),
    ],
    spacing: { before: 220, after: 60 },
  });
}

function h4(text) {
  return new Paragraph({
    children: [
      new TextRun({ text, font: 'Calibri', size: 21, bold: true, color: SOFT }),
    ],
    spacing: { before: 160, after: 40 },
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        font: 'Calibri',
        size: 21,           // 10.5pt
        color: opts.color || SOFT,
        bold: opts.bold || false,
        italics: opts.italic || false,
      }),
    ],
    spacing: { before: opts.before ?? 0, after: opts.after ?? 80 },
    indent: opts.indent ? { left: convertInchesToTwip(0.2) } : undefined,
  });
}

function bullet(text, boldPrefix = '') {
  const runs = [];
  if (boldPrefix) {
    runs.push(new TextRun({ text: boldPrefix + ' ', font: 'Calibri', size: 21, bold: true, color: INK }));
    runs.push(new TextRun({ text, font: 'Calibri', size: 21, color: SOFT }));
  } else {
    runs.push(new TextRun({ text, font: 'Calibri', size: 21, color: SOFT }));
  }
  return new Paragraph({
    bullet: { level: 0 },
    children: runs,
    spacing: { before: 20, after: 40 },
  });
}

function divider() {
  return new Paragraph({
    children: [],
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
    },
    spacing: { before: 200, after: 200 },
  });
}

function spacer(pt = 120) {
  return new Paragraph({ children: [], spacing: { before: 0, after: pt } });
}

// ── Cover page ────────────────────────────────────────────────────────────────

function coverPage() {
  const items = [];

  // top colour bar — simulate with a thick top border on a blank para
  items.push(
    new Paragraph({
      children: [],
      border: { top: { style: BorderStyle.SINGLE, size: 48, color: PRIMARY } },
      spacing: { before: 0, after: 600 },
    })
  );

  items.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'INFINITY STONE SOLUTIONS INC.', font: 'Calibri', size: 20, bold: true, color: ACCENT, characterSpacing: 120 }),
      ],
      spacing: { before: 0, after: 80 },
    })
  );

  items.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Competitor & Market\nIntelligence Report', font: 'Calibri', size: 80, bold: true, color: INK }),
      ],
      spacing: { before: 0, after: 200 },
    })
  );

  items.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Federal IT Govcon | SDVOSB / WOSB Market Analysis', font: 'Calibri', size: 24, color: SOFT }),
      ],
      spacing: { before: 0, after: 600 },
    })
  );

  items.push(divider());

  items.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Prepared for: ', font: 'Calibri', size: 21, bold: true, color: INK }),
        new TextRun({ text: 'ISS Leadership — Internal Use Only', font: 'Calibri', size: 21, color: SOFT }),
      ],
      spacing: { before: 0, after: 60 },
    })
  );

  items.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Research Scope: ', font: 'Calibri', size: 21, bold: true, color: INK }),
        new TextRun({ text: '10 govcon IT firms + govcon B2B buyer behavior data', font: 'Calibri', size: 21, color: SOFT }),
      ],
      spacing: { before: 0, after: 60 },
    })
  );

  items.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Date: ', font: 'Calibri', size: 21, bold: true, color: INK }),
        new TextRun({ text: 'March 2026', font: 'Calibri', size: 21, color: SOFT }),
      ],
      spacing: { before: 0, after: 400 },
    })
  );

  items.push(new Paragraph({ children: [new PageBreak()] }));

  return items;
}

// ── Stats / KPI table ─────────────────────────────────────────────────────────

function statsTable(rows) {
  // rows: [{ label, value }]
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideH: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      insideV: { style: BorderStyle.NONE },
    },
    rows: rows.map((r, i) =>
      new TableRow({
        children: [
          new TableCell({
            width: { size: 38, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.SOLID, color: SURFACE, fill: SURFACE },
            borders: allNoBorder(),
            margins: cellMargins(),
            children: [
              new Paragraph({
                children: [new TextRun({ text: r.label, font: 'Calibri', size: 20, bold: true, color: INK })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 62, type: WidthType.PERCENTAGE },
            borders: allNoBorder(),
            margins: cellMargins(),
            children: [
              new Paragraph({
                children: [new TextRun({ text: r.value, font: 'Calibri', size: 20, color: SOFT })],
              }),
            ],
          }),
        ],
      })
    ),
  });
}

function twoColTable(headers, rows, firstColWidth = 30) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) =>
      new TableCell({
        width: { size: i === 0 ? firstColWidth : 100 - firstColWidth, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.SOLID, color: PRIMARY, fill: PRIMARY },
        borders: allNoBorder(),
        margins: cellMargins(),
        children: [
          new Paragraph({
            children: [new TextRun({ text: h, font: 'Calibri', size: 19, bold: true, color: WHITE })],
          }),
        ],
      })
    ),
  });

  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, ci) =>
        new TableCell({
          width: { size: ci === 0 ? firstColWidth : 100 - firstColWidth, type: WidthType.PERCENTAGE },
          shading: ri % 2 === 0
            ? { type: ShadingType.SOLID, color: WHITE, fill: WHITE }
            : { type: ShadingType.SOLID, color: SURFACE, fill: SURFACE },
          borders: allNoBorder(),
          margins: cellMargins(),
          children: [
            new Paragraph({
              children: [new TextRun({ text: cell, font: 'Calibri', size: 19, color: SOFT })],
            }),
          ],
        })
      ),
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideH: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      insideV: { style: BorderStyle.NONE },
    },
    rows: [headerRow, ...dataRows],
  });
}

function threeColTable(headers, rows) {
  const colWidths = [30, 35, 35];

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) =>
      new TableCell({
        width: { size: colWidths[i], type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.SOLID, color: PRIMARY, fill: PRIMARY },
        borders: allNoBorder(),
        margins: cellMargins(),
        children: [
          new Paragraph({
            children: [new TextRun({ text: h, font: 'Calibri', size: 19, bold: true, color: WHITE })],
          }),
        ],
      })
    ),
  });

  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, ci) =>
        new TableCell({
          width: { size: colWidths[ci], type: WidthType.PERCENTAGE },
          shading: ri % 2 === 0
            ? { type: ShadingType.SOLID, color: WHITE, fill: WHITE }
            : { type: ShadingType.SOLID, color: SURFACE, fill: SURFACE },
          borders: allNoBorder(),
          margins: cellMargins(),
          children: [
            new Paragraph({
              children: [new TextRun({ text: cell, font: 'Calibri', size: 19, color: SOFT })],
            }),
          ],
        })
      ),
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideH: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      insideV: { style: BorderStyle.NONE },
    },
    rows: [headerRow, ...dataRows],
  });
}

function gapTable() {
  const headers = ['Gap', 'Current State', 'Best Practice', 'Priority'];
  const rows = [
    ['Contract vehicle listing', 'Not visible anywhere', 'Prominently listed near certifications', 'High'],
    ['Leadership / team page', 'Does not exist', 'Cleared bios, veteran stories, executive profiles', 'High'],
    ['Case study depth', 'Past performance cards (brief)', '3–4 structured case studies with named outcomes', 'High'],
    ['Homepage certification signal', 'Only on Who We Serve', 'Hero or immediate below-fold', 'Medium'],
    ['Technology partner logos', 'Not visible', 'Palantir, Esri, AWS GovCloud if applicable', 'Medium'],
    ['Award / recognition badges', 'None', 'Inc. 5000, GSA stars, industry awards if applicable', 'Low'],
  ];

  const priorityColor = { 'High': 'C0392B', 'Medium': 'D68910', 'Low': '27AE60' };
  const colWidths = [22, 28, 34, 16];

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) =>
      new TableCell({
        width: { size: colWidths[i], type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.SOLID, color: PRIMARY, fill: PRIMARY },
        borders: allNoBorder(),
        margins: cellMargins(),
        children: [new Paragraph({ children: [new TextRun({ text: h, font: 'Calibri', size: 19, bold: true, color: WHITE })] })],
      })
    ),
  });

  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, ci) => {
        const isPriority = ci === 3;
        const color = isPriority ? (priorityColor[cell] || SOFT) : SOFT;
        return new TableCell({
          width: { size: colWidths[ci], type: WidthType.PERCENTAGE },
          shading: ri % 2 === 0
            ? { type: ShadingType.SOLID, color: WHITE, fill: WHITE }
            : { type: ShadingType.SOLID, color: SURFACE, fill: SURFACE },
          borders: allNoBorder(),
          margins: cellMargins(),
          children: [new Paragraph({ children: [new TextRun({ text: cell, font: 'Calibri', size: 19, bold: isPriority, color })] })],
        });
      }),
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideH: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      insideV: { style: BorderStyle.NONE },
    },
    rows: [headerRow, ...dataRows],
  });
}

// ── Competitor profile card ───────────────────────────────────────────────────

function competitorCard({ name, tagline, scale, certifications, strengths, weaknesses, issNote }) {
  const items = [];

  items.push(h2(name, { before: 480, borderBottom: true }));

  if (tagline) {
    items.push(
      new Paragraph({
        children: [
          new TextRun({ text: `"${tagline}"`, font: 'Calibri', size: 22, italics: true, color: PRIMARY }),
        ],
        spacing: { before: 0, after: 100 },
      })
    );
  }

  // Meta pills as a mini table
  const metaRows = [];
  if (scale)         metaRows.push({ label: 'Scale', value: scale });
  if (certifications) metaRows.push({ label: 'Certifications', value: certifications });
  if (metaRows.length) {
    items.push(spacer(60));
    items.push(statsTable(metaRows));
    items.push(spacer(100));
  }

  if (strengths && strengths.length) {
    items.push(h4('Strengths'));
    strengths.forEach(s => items.push(bullet(s)));
  }

  if (weaknesses && weaknesses.length) {
    items.push(h4('Weaknesses / Gaps'));
    weaknesses.forEach(w => items.push(bullet(w)));
  }

  if (issNote) {
    items.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'ISS Relevance  ', font: 'Calibri', size: 20, bold: true, color: PRIMARY }),
          new TextRun({ text: issNote, font: 'Calibri', size: 20, color: SOFT }),
        ],
        shading: { type: ShadingType.SOLID, color: SURFACE, fill: SURFACE },
        border: {
          left: { style: BorderStyle.SINGLE, size: 16, color: PRIMARY },
        },
        indent: { left: convertInchesToTwip(0.15), right: convertInchesToTwip(0.15) },
        spacing: { before: 160, after: 80 },
      })
    );
  }

  return items;
}

// ── Utility ───────────────────────────────────────────────────────────────────

function allNoBorder() {
  return {
    top: { style: BorderStyle.NONE },
    bottom: { style: BorderStyle.NONE },
    left: { style: BorderStyle.NONE },
    right: { style: BorderStyle.NONE },
  };
}

function cellMargins() {
  return {
    top: convertInchesToTwip(0.05),
    bottom: convertInchesToTwip(0.05),
    left: convertInchesToTwip(0.1),
    right: convertInchesToTwip(0.1),
  };
}

function sectionHeader(eyebrowText, titleText) {
  return [
    eyebrow(eyebrowText),
    h1(titleText),
    divider(),
  ];
}

// ── Build document ────────────────────────────────────────────────────────────

const children = [
  ...coverPage(),

  // ── 1. Executive Summary ──────────────────────────────────────────────────
  ...sectionHeader('Section 1', 'Executive Summary'),

  body(
    'The federal IT services market exceeded $770 billion in total government contracting in 2024, with 54% of contractors reporting higher revenue year-over-year. Small business set-aside categories — particularly SDVOSB and WOSB — represent a structurally protected slice of this market that ISS is uniquely positioned to capture.',
    { after: 120 }
  ),

  h3('Four Headline Conclusions'),

  bullet(
    'Certifications are procurement shortcuts, not marketing badges. The most effective govcon sites treat SDVOSB/WOSB status as the primary headline — because for contracting officers facing mandatory set-aside goals, it immediately answers "can I use this vendor?" before any capability discussion begins.',
    '1.'
  ),
  bullet(
    'Specificity wins trust. Vagueness loses it. Federal buyers operate in an environment of accountability. Named agencies, specific contract outcomes, and disclosed certifications outperform generic "federal experience" claims at every stage of the evaluation process.',
    '2.'
  ),
  bullet(
    'The decision is often made before the RFP. Research indicates 40–80% of government customers identify a preferred vendor before a formal solicitation is issued. Websites that invest in trust-building infrastructure shape this pre-RFP preference.',
    '3.'
  ),
  bullet(
    'Most small govcon sites underinvest in conversion architecture. Common weaknesses: buried certifications, no named past performance, no contract vehicle listings, generic hero messaging. ISS already outperforms peers in several of these areas — but specific gaps remain addressable.',
    '4.'
  ),

  spacer(200),
  new Paragraph({ children: [new PageBreak()] }),

  // ── 2. Market Context ──────────────────────────────────────────────────────
  ...sectionHeader('Section 2', 'Market Context & Statistics'),

  h2('Federal Procurement Scale', { before: 120, borderBottom: false }),
  spacer(80),
  statsTable([
    { label: 'Total federal contracting (2024)', value: '$770 billion+' },
    { label: 'Small business share goal (SBA)', value: '~23% of eligible contracts' },
    { label: 'WOSB annual contracting goal', value: '5% of eligible contract dollars' },
    { label: 'SDVOSB annual contracting goal', value: '3% of eligible contract dollars' },
    { label: 'Contractors reporting revenue growth (2024)', value: '54%' },
    { label: 'SDVOSBs registered in system', value: '35,000+' },
  ]),

  spacer(200),
  h2('Federal Buyer Behavior', { before: 120, borderBottom: false }),
  spacer(80),
  statsTable([
    { label: '82%', value: 'of federal decision-makers cite vendor websites as a top research source when evaluating contractors — higher than trade shows, referrals, or LinkedIn' },
    { label: '94%', value: 'of first impressions are design-related; a visually outdated site signals organizational risk to evaluators trained to assess vendor stability' },
    { label: '40–80%', value: 'of government customers identify a preferred vendor before a formal RFP is issued — meaning the website must win before the procurement process formally begins' },
    { label: '4–6 min', value: 'average time federal buyers spend on a govcon vendor site during due diligence, compared to ~1 minute for commercial B2B' },
  ]),

  spacer(200),
  h2('SDVOSB / WOSB Market Dynamics', { before: 120, borderBottom: false }),
  spacer(80),
  bullet("VA's Vets First rule mandates that contracting officers must give priority consideration to SDVOSB vendors before opening to full-and-open competition for all VA acquisitions."),
  bullet('SBA VetCert verification is the authoritative verification source — its presence on a website is a direct acquisition signal to contracting officers.'),
  bullet('Dual certification (SDVOSB + WOSB) is rare and strategically valuable: ISS qualifies prime contractors for both SB subcontracting credit lines simultaneously.'),
  bullet('Sole-source authority for SDVOSB/WOSB: up to $4.5M for services contracts without competition — a significant tool for agency contracting officers under time or administrative pressure.'),

  spacer(200),
  new Paragraph({ children: [new PageBreak()] }),

  // ── 3. Competitor Profiles ────────────────────────────────────────────────
  ...sectionHeader('Section 3', 'Competitor Profiles'),
  body('Research scope: 10 firms across small SDVOSB/WOSB IT integrators, mid-size govcon, geospatial specialists, and govcon-adjacent technology companies. Each profile includes tagline, positioning, trust signals, strengths, weaknesses, and ISS relevance.', { after: 80 }),

  ...competitorCard({
    name: '1. ActioNet',
    tagline: 'Turning Vision into Action',
    scale: '~500–1,000 employees, $100M+ revenue tier',
    certifications: 'CMMI, ISO certifications, SDVOSB',
    strengths: [
      'Professional presentation, CMMI credibility, established federal client base.',
      'Modern design language with clean structure.',
    ],
    weaknesses: [
      'Hero messaging is generic — "Vision into Action" does not differentiate from dozens of similar vendors.',
      'Certifications appear as footnotes rather than procurement accelerators.',
      'Limited specificity in past performance presentation.',
    ],
    issNote: 'ActioNet targets the same federal IT modernization space. ISS differentiates on dual certification, geospatial/AI specialization, and specific agency alignment (DoD, NGA, DHS). Where ActioNet competes on scale, ISS competes on specialized capability + set-aside qualification.',
  }),

  ...competitorCard({
    name: '2. Agile Defense',
    tagline: 'Always Evolving',
    scale: '~200–500 employees',
    certifications: 'SDVOSB, multiple contract vehicles',
    strengths: [
      'Three-pillar messaging (Digital Transformation, Data Analytics, Cybersecurity) is scannable and maps cleanly to federal SOW categories.',
      'Named DoD/Navy/NGA client logos prominently featured.',
      '"Agile Labs" innovation division creates a differentiated brand identity.',
      'Contract vehicle listing visible on site.',
    ],
    weaknesses: [
      '"Always Evolving" is process-oriented rather than outcome-oriented — no mission-impact language.',
      'Analytics capability not as deep as ISS\'s Palantir/GIS specialization.',
      'SDVOSB badge present but not in hero position.',
    ],
    issNote: 'Agile Defense is the closest structural analog to ISS in terms of size, certifications, and capability overlap. ISS should benchmark against their agency logo strategy and three-pillar framing. ISS\'s Palantir and ArcGIS credentials represent a depth advantage Agile Defense doesn\'t articulate.',
  }),

  ...competitorCard({
    name: '3. IronArch Technology',
    tagline: 'Inspire. Innovate. Impact.',
    scale: '~50–200 employees, founded 2013',
    certifications: 'SDVOSB (prominently featured in hero)',
    strengths: [
      'SDVOSB badge appears in hero section — best-in-class certification placement among peer group.',
      'Four detailed case studies with outcomes-focused copy at this company size.',
      'ServiceNow specialization + Section 508 creates a differentiated niche.',
      'Memorable three-word tagline.',
    ],
    weaknesses: [
      'ServiceNow/Section 508 focus limits addressable market.',
      'Limited geospatial, AI/ML, or program management presence.',
      'No WOSB dual certification.',
    ],
    issNote: 'IronArch demonstrates that a small SDVOSB can punch above its weight with case study depth and certification placement. ISS should match or exceed IronArch\'s SDVOSB hero-placement strategy and develop 3–4 structured case studies with named agencies and specific outcomes.',
  }),

  ...competitorCard({
    name: '4. Aptive Resources',
    tagline: '(Health-mission focused)',
    scale: '300+ employees',
    certifications: 'ISO 9001, ISO 27001, ISO 20000, CMMI SVC/3, Top Secret Facility Clearance; formerly WOSB/SDVOSB',
    strengths: [
      '"Women-founded / Veteran-founded" messaging signals heritage without requiring current certification status.',
      'Certification depth (ISO triple + CMMI) signals mature quality management.',
      'Inc. 5000 (multiple years) + Emmy Award add non-procurement credibility.',
      'Named VA/HHS/CMS delivery history.',
    ],
    weaknesses: [
      'Scaled beyond set-aside status — WOSB/SDVOSB certification no longer active.',
      'Health vertical focus limits applicability to DoD/Intel/DHS programs.',
      'No geospatial or Palantir capability noted.',
    ],
    issNote: "Aptive's award-badge strategy is worth studying. Inc. 5000 or similar recognition would add non-procurement credibility ISS currently lacks. The ISO certification stack is a medium-term goal that would strengthen ISS's position in health/civilian agency procurement.",
  }),

  ...competitorCard({
    name: '5. Buchanan & Edwards',
    tagline: 'Beyond Expectations',
    scale: '~200–500 employees',
    certifications: 'CMMI Level 4, ISO 9001/27001, AWS Partner, Microsoft Partner',
    strengths: [
      'CMMI Level 4 (rare at this size) is a powerful differentiator for programs with formal process-maturity requirements.',
      'Hyperscaler partner logos (AWS, Microsoft) add ecosystem credibility.',
      '"Meet the Trailblazers" leadership section humanizes the firm effectively.',
    ],
    weaknesses: [
      '"Beyond Expectations" tagline is clichéd and mission-neutral.',
      'No SDVOSB/WOSB certification visible.',
      'Limited geospatial or analytics depth.',
    ],
    issNote: "The AWS/Microsoft partner logo strategy is a near-term ISS opportunity. If ISS holds any active partner tiers with Palantir, Esri/ArcGIS, AWS GovCloud, or Azure Government, displaying those logos adds ecosystem credibility immediately. The leadership humanization approach is a gap ISS should close.",
  }),

  ...competitorCard({
    name: '6. Novetta',
    tagline: 'From Complexity to Clarity',
    scale: '1,300+ data scientists; acquired by Accenture Federal 2024',
    certifications: 'Enterprise-scale IC/DoD programs',
    strengths: [
      '"From Complexity to Clarity" is a masterclass in govcon tagline construction — outcome-oriented, addresses the intelligence community\'s core challenge, differentiates from generic "solutions" language.',
      'Heavy intelligence community focus with DoD/IC branding throughout.',
      '1,300+ data scientist figure served as a scale trust signal during growth phase.',
    ],
    weaknesses: [
      'Now part of Accenture Federal — no longer a small business competitor.',
      'Relevant as a messaging benchmark only.',
    ],
    issNote: "Novetta solved the IC analytics buyer tagline challenge. ISS's equivalent: translating geospatial, AI, cloud, and cyber into a single mission-impact phrase. Study the structure of 'From Complexity to Clarity' when refining ISS's core brand statement.",
  }),

  ...competitorCard({
    name: '7. Sentek Global',
    tagline: '(Cybersecurity / RMF focused)',
    scale: 'Mid-size SDVOSB',
    certifications: 'SDVOSB + 8(a), ISO 20000, ISO 27001',
    strengths: [
      '"Largest Risk Management Framework (RMF) provider to the federal government" — a specific, verifiable leadership claim that maps directly to a federal requirement.',
      'Dual set-aside (SDVOSB + 8(a)) creates a unique stacked acquisition pathway.',
      'ISO 20000 + 27001 combination signals process maturity for security-focused buyers.',
    ],
    weaknesses: [
      '8(a) status is time-limited (9 years); Sentek may be nearing graduation.',
      'Limited analytics or geospatial capability visible.',
      'No WOSB.',
    ],
    issNote: "Sentek demonstrates the power of owning a specific niche claim. ISS should identify its own defensible 'largest/most/only' statement — candidates include the dual WOSB+SDVOSB rarity or a specific geospatial+AI integration claim tied to named DoD programs.",
  }),

  ...competitorCard({
    name: '8. Carahsoft Technology',
    tagline: '(Government IT solutions aggregator)',
    scale: '220+ contract vehicles, 150+ awards',
    certifications: 'FedRAMP, CMMC prominently featured',
    strengths: [
      '220+ contract vehicles = maximum acquisition flexibility for buyers.',
      '150+ industry awards function as volume trust signals.',
      'Compliance framework emphasis (FedRAMP, CMMC) aligns with regulatory requirements of customer base.',
    ],
    weaknesses: [
      'Not a direct services competitor — relevant for partnership/teaming and contract vehicle research.',
    ],
    issNote: "Carahsoft's approach reinforces that contract vehicle visibility is a first-order trust signal. ISS should prominently list every active contract vehicle. Carahsoft itself may hold vehicles ISS could ride as a subcontractor — worth investigating.",
  }),

  ...competitorCard({
    name: '9. Woolpert',
    tagline: '(Geospatial / engineering firm)',
    scale: '1,000+ employees, $400M+ revenue, 100+ year heritage',
    certifications: 'Engineering licensure depth, NOAA named partnership',
    strengths: [
      'Century-plus history functions as a credibility signal unavailable to newer firms.',
      'NOAA named partnership provides mission-context for federal science agencies.',
      'Geospatial as part of a broader multi-discipline engineering portfolio.',
    ],
    weaknesses: [
      'Much larger company — not a set-aside vendor, no SDVOSB/WOSB.',
      'Geospatial focus is physical infrastructure rather than intelligence/defense analytics.',
      'Not a direct small business competitor.',
    ],
    issNote: "Woolpert sets the ceiling on geospatial credibility in the civilian/science agency market. ISS's geospatial identity should be positioned toward defense/intelligence analytics (NGA, DIA, SOCOM) where Woolpert doesn't compete — not the physical infrastructure mapping market where Woolpert dominates.",
  }),

  ...competitorCard({
    name: '10. Seerist / GeoSpark Analytics',
    tagline: '(Geospatial intelligence / threat analytics)',
    scale: 'Startup — investor-backed',
    certifications: 'NATO client logo, NGA contract, FEMA 4-year contract, Control Risks partnership',
    strengths: [
      'CEO with 30+ years defense/intelligence background prominently featured.',
      'NATO + NGA anchor client logos validate the platform in the highest-stakes buyer context.',
      'Control Risks partnership adds private-sector intelligence credibility.',
      'Highly specific niche (geospatial threat analytics) creates strong identity with IC buyers.',
    ],
    weaknesses: [
      'Startup model — no set-aside certifications.',
      'Niche focus limits breadth.',
    ],
    issNote: "Seerist demonstrates that geospatial + IC positioning can be executed at small scale with the right personnel credentials. ISS's team clearance backgrounds and NGA/DIA experience are analogous differentiators that should be featured more prominently. Even one named NGA/DIA project reference carries disproportionate credibility weight.",
  }),

  spacer(200),
  new Paragraph({ children: [new PageBreak()] }),

  // ── 4. Pattern Analysis ───────────────────────────────────────────────────
  ...sectionHeader('Section 4', 'Pattern Analysis: What High-Performing Govcon Sites Do'),

  h2('1. Outcome-First Hero Messaging', { before: 120, borderBottom: false }),
  body('Top performers lead with mission impact, not capability descriptions.', { after: 100 }),
  spacer(40),
  twoColTable(
    ['Approach', 'Effectiveness'],
    [
      ['Outcome-first  e.g. "From Complexity to Clarity" (Novetta)', 'High — immediately signals value to IC buyer'],
      ['Mission-first  e.g. "Built for the programs that can\'t afford to get it wrong" (ISS)', 'High — risk-framing resonates with federal buyers'],
      ['Abstract tagline  e.g. "Always Evolving" (Agile Defense)', 'Medium — memorable but mission-neutral'],
      ['Capability-first  e.g. "IT Modernization. Cybersecurity. Analytics."', 'Low — describes services, not outcomes'],
      ['Generic  e.g. "Your Trusted Federal Partner"', 'Very low — undifferentiated, no procurement hook'],
    ],
    50
  ),
  body('ISS\'s current hero framing ("Built for the programs that can\'t afford to get it wrong") is in the top tier. Maintain and reinforce.', { before: 120, after: 80 }),

  h2('2. Certification Placement as Procurement Signal', { before: 280, borderBottom: false }),
  body('Certifications visible above the fold or within first scroll convert at significantly higher rates than certifications buried in footers or About pages.', { after: 80 }),
  bullet('Best practice: SDVOSB + WOSB badges in hero section or immediately below, with brief procurement mechanism explanation ("enables set-aside awards up to $4.5M").'),
  bullet('Why it works: Contracting officers evaluate vendor pools early. A visible certification immediately qualifies the vendor for the officer\'s mental shortlist.'),
  bullet('ISS opportunity: Certifications are present on Who We Serve but not on the homepage hero. Homepage visitors who don\'t navigate deeper may miss this qualification signal entirely.'),

  h2('3. Trust Signal Stacking', { before: 280, borderBottom: false }),
  body('High-performing sites build credibility progressively as users scroll, rather than front-loading or burying proof. The optimal sequence mirrors how federal evaluators think:', { after: 80 }),
  bullet('Hero (tagline + certifications)'),
  bullet('Agency logo strip / named clients'),
  bullet('Capability overview with specific tools and agencies'),
  bullet('Past performance / case studies with named outcomes'),
  bullet('Leadership credentials and cleared backgrounds'),
  bullet('CTA — how to engage'),

  h2('4. Named Past Performance Over Generic Claims', { before: 280, borderBottom: false }),
  body('Every competitor that presented named past performance outperformed those using generic "federal experience" language on inferred buyer credibility.', { after: 80 }),
  body('Effective pattern: "[Outcome] for [Named Agency] — [brief scope note]"', { bold: true, after: 40 }),
  body('Example: "Delivered cloud migration roadmap for NGA\'s imagery analytics infrastructure."', { after: 80, indent: true }),
  body('Ineffective pattern: "Supporting federal agencies with IT modernization since 2015."', { bold: true, after: 40 }),

  h2('5. Contract Vehicle Visibility', { before: 280, borderBottom: false }),
  body('Federal buyers ask "how do I buy from you?" very early in the evaluation. Vendors who list active contract vehicles reduce this friction and signal procurement-readiness.', { after: 80 }),
  bullet('Top performers list GWACs, IDIQs, and BPAs prominently, often near certifications.'),
  bullet('Even a single active vehicle ("available on GSA Schedule / OASIS+") reduces perceived acquisition complexity.'),
  bullet('ISS gap: No contract vehicle information is currently visible on the site.'),

  h2('6. Leadership Humanization', { before: 280, borderBottom: false }),
  body('"Meet the team" sections with cleared backgrounds, veteran bios, and named career histories significantly increase trust with procurement officers who are personally accountable for vendor selections.', { after: 80 }),
  bullet('Procurement officers are selecting vendors they will be professionally associated with.'),
  bullet('Named cleared leadership reduces uncertainty about access and suitability.'),
  bullet('Veteran bios reinforce SDVOSB certification authenticity and ownership credibility.'),
  bullet('ISS gap: No leadership/team section currently exists on the site.'),

  h2('7. Technology Partner Logos', { before: 280, borderBottom: false }),
  body('AWS GovCloud, Azure Government, Palantir partner status, Esri/ArcGIS certification — each logo signals ecosystem alignment and technical depth to buyers who already trust these platforms.', { after: 80 }),
  bullet('Buchanan & Edwards (AWS + Microsoft) and IronArch (ServiceNow) demonstrate this effectively.'),
  bullet('The logos function as proxy credentials: "this vendor has been vetted by a platform I already trust."'),
  bullet('ISS opportunity: If ISS holds any partner tier with Palantir, Esri, AWS GovCloud, or Azure Government, these logos should appear on the homepage and capability pages.'),

  spacer(200),
  new Paragraph({ children: [new PageBreak()] }),

  // ── 5. ISS Positioning ────────────────────────────────────────────────────
  ...sectionHeader('Section 5', 'ISS Positioning Conclusions'),

  h2('Where ISS Is Well-Aligned with Best Practices', { before: 120, borderBottom: false }),
  bullet('"Built for the programs that can\'t afford to get it wrong" — outcome-first and risk-framing, top tier in the peer group.'),
  bullet('Who We Serve buyer-segment tab structure with named agencies and buyer concerns is more sophisticated than any direct competitor at this size.'),
  bullet('WOSB + SDVOSB combined procurement mechanics section is a genuine differentiator — no competitor articulates this as clearly.'),
  bullet('Privacy policy and site architecture reflect CMMC alignment — a trust signal for DoD buyers before formal evaluation begins.'),
  bullet('Five service pillars + named technology specializations (Palantir, ArcGIS, AI/ML) go deeper than generic horizontal competitors.'),

  spacer(200),
  h2('Gaps to Address', { before: 120, borderBottom: false }),
  body('Prioritized by estimated conversion impact:', { after: 100 }),
  spacer(60),
  gapTable(),

  spacer(200),
  h2('ISS Differentiators Competitors Don\'t Exploit', { before: 120, borderBottom: false }),
  spacer(60),

  ...['Dual WOSB + SDVOSB Certification', 'Geospatial + AI Convergence', 'Active Palantir Deployment Experience', 'NGA / DIA / SOCOM Program Delivery'].map((title, i) => {
    const notes = [
      'Only ISS in this peer group holds both certifications simultaneously active. This is a rare procurement advantage that competitors cannot replicate without meeting both qualifying criteria. It should be ISS\'s most prominent procurement signal.',
      'No direct competitor in the small-business set-aside tier positions specifically at the intersection of GIS/geospatial and AI/ML analytics. Woolpert has geospatial depth but no AI/set-aside. Agile Defense has analytics but no geospatial depth. ISS occupies a genuinely differentiated intersection.',
      'Palantir is embedded in DoD and IC programs in a way that creates demand for implementation partners who have deployed it in operational environments. This is a named credential that most small govcon firms cannot claim.',
      'Delivering for the hardest agencies (NGA\'s precision imagery requirements, DIA\'s analytical environment, SOCOM\'s tempo) is a quality signal that transfers to all other agency buyers. "If we can deliver for SOCOM, we can deliver for you."',
    ];
    return [
      h3(`${i + 1}. ${title}`),
      body(notes[i], { after: 100 }),
    ];
  }).flat(),

  spacer(200),
  new Paragraph({ children: [new PageBreak()] }),

  // ── 6. Recommended Actions ─────────────────────────────────────────────────
  ...sectionHeader('Section 6', 'Recommended Website Actions'),
  body('Ranked by estimated impact on contracting-officer trust and procurement conversion, from lowest effort to highest.', { after: 80 }),
  spacer(80),

  threeColTable(
    ['Priority', 'Action', 'Rationale'],
    [
      ['1 — High Impact / Low Effort', 'Contract Vehicle Page or Section', 'Immediate procurement-friction reduction. List every active GWAC, IDIQ, BPA, or GSA schedule. Include subcontractor availability if applicable.'],
      ['2 — High Impact / Medium Effort', 'Leadership / Team Page', 'Humanizes the firm, reinforces SDVOSB authenticity, provides cleared-background credibility. Even 3–4 profiles is significantly better than none.'],
      ['3 — High Impact / Medium Effort', 'Case Study Expansion', 'Develop 3–4 structured case studies: named agency, challenge, approach, measurable outcome. Converts vague past performance into the strongest available trust builder.'],
      ['4 — Medium Impact / Low Effort', 'Homepage Certification Signal', 'Add a compact SDVOSB/WOSB strip to the homepage hero or immediately below it with brief procurement-mechanism text ("Set-aside eligible. Sole-source authority up to $4.5M.").'],
      ['5 — Medium Impact / Low Effort', 'Technology Partner Logos', 'Confirm and display partner logos for Palantir, Esri/ArcGIS, AWS GovCloud, or Azure Government if applicable.'],
      ['6 — Low Impact / Low Effort', 'Specific Outcome Language', 'Review all past performance copy. Replace capability descriptions ("supported analytics work") with outcome language ("delivered X for Agency, enabling result").'],
      ['7 — High Impact / High Effort', 'Awards & Recognition', 'Apply for Inc. 5000, AFCEA awards, NCMA recognition. Display earned badges. Long-term credibility ROI is significant but requires multi-month application cycles.'],
    ]
  ),

  spacer(400),
  divider(),
  body(
    'Document prepared from competitive website research and govcon B2B buyer behavior data. All competitor observations are based on publicly accessible website content as of the research date. Competitor status (certifications, size, contracts) should be independently verified before use in competitive responses or proposals.',
    { italic: true, color: SOFT, after: 80 }
  ),
];

// ── Write output ──────────────────────────────────────────────────────────────

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: 'Calibri',
          size: 21,
          color: SOFT,
        },
        paragraph: {
          spacing: { line: 276 },
        },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1.0),
            bottom: convertInchesToTwip(1.0),
            left: convertInchesToTwip(1.1),
            right: convertInchesToTwip(1.1),
          },
        },
      },
      children,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(OUT_PATH, buffer);
console.log(`✓ Document written to: ${OUT_PATH}`);
