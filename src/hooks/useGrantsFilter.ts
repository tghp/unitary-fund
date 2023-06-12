import { useMemo } from 'react';
import type { CollectionEntry } from 'astro:content';

type GrantItemData = CollectionEntry<'grant'>['data'];

export type GrantFilterKey = Exclude<keyof GrantItemData, 'day' | 'name'>;

type FilterKeys = Omit<GrantItemData, 'day' | 'name'>;

export default function useGrantsFilter(
  grants?: Array<CollectionEntry<'grant'>>,
  filter?: Record<GrantFilterKey, string>
) {
  return useMemo<typeof grants>(() => {
    if (!grants || (filter && !Object.keys(filter).length)) {
      return grants;
    }

    const filteredGrants = grants.filter((item) => {
      for (const key in filter) {
        if (
          item.data[key as keyof GrantItemData] === undefined ||
          item.data[key as keyof GrantItemData] !=
            filter[key as keyof FilterKeys]
        )
          return false;
      }
      return true;
    });

    return filteredGrants;
  }, [grants, filter]);
}
