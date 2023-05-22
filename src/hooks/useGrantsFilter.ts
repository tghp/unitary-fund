import { useMemo } from 'react';
import type { CollectionEntry } from 'astro:content';

export type GrantFilterKey = Exclude<
  keyof CollectionEntry<'grant'>['data'],
  'day' | 'name'
>;

export default function useGrantsFilter(
  grants?: Array<CollectionEntry<'grant'>>,
  filter?: Record<GrantFilterKey, string>
) {
  return useMemo<typeof grants>(() => {
    const filteredGrants: typeof grants = [];

    if (!grants) {
      return grants;
    }

    for (const grant of grants) {
      // TODO: Filter
      filteredGrants.push(grant);
    }

    return filteredGrants;
  }, [grants, filter]);
}
