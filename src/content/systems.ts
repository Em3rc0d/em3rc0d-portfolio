// Compatibility projection for the sitemap and established evidence relationships.
import { systemCases } from './systems/index';
import type { SystemRecord } from '@/lib/content/types';
export const systems: readonly SystemRecord[] = systemCases.map(record => ({
  id: record.id, slug: record.slug, name: record.name, label: record.category,
  summary: record.summary, path: record.path, ownership: record.ownership,
  role: record.placement === 'FLAGSHIP' ? 'FLAGSHIP' : 'SUPPORT',
  state: record.placement === 'ARCHIVED' ? 'ARCHIVED' : 'ACTIVE_RND',
  publicability: record.publicability, href: `/systems/${record.slug}`,
}));
export const flagshipSystems = systems.filter(system => system.role === 'FLAGSHIP');
