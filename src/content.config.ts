import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const capabilities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/capabilities' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    icon: z.string(),
    summary: z.string(),
    heroDescription: z.string(),
    excerpt: z.string(),
    buyerProblems: z.array(z.string()).min(3),
    outcomes: z.array(z.string()).min(3),
    includedWork: z.array(z.string()).min(3),
    idealBuyers: z.array(z.string()).min(2),
    proofReferences: z.array(z.string()).default([]),
    relatedCapabilities: z.array(z.string()).default([]),
    ctaText: z.string(),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  capabilities,
  insights,
};
