import { getCollection, type CollectionEntry } from 'astro:content';

export async function getInsights() {
  const entries = await getCollection('insights');
  return entries
    .filter((e) => !e.data.draft)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getCapabilities() {
  const entries = await getCollection('capabilities');
  return entries.sort((left, right) => left.data.order - right.data.order);
}

export async function getCapabilityBySlug(slug: string) {
  const entries = await getCapabilities();
  return entries.find((entry) => entry.id === slug);
}

export function getRelatedCapabilities(
  capabilities: CollectionEntry<'capabilities'>[],
  currentSlug: string,
  relatedSlugs: string[],
) {
  return capabilities.filter(
    (entry) => entry.id !== currentSlug && relatedSlugs.includes(entry.id),
  );
}
