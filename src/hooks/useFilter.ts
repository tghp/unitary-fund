import { useMemo } from 'react';
import type { z, CollectionEntry } from 'astro:content';
import type { blogSchema, grantSchema } from '~/content/config';
import { useStore } from '@nanostores/react';
import { filterMap } from '~/util/store';

export type FilterType = 'grant' | 'blog';

type GrantSchema = z.infer<typeof grantSchema>;
export type GrantEntry = CollectionEntry<'grant'> & { data: GrantSchema };
type BlogSchema = z.infer<typeof blogSchema>;
export type BlogEntry = CollectionEntry<'blog'> & { data: BlogSchema };

export type FilterSpec = {
  grant: {
    items: Array<GrantEntry>;
    schema: GrantSchema;
    keys: keyof GrantSchema;
  };
  blog: {
    items: Array<BlogEntry>;
    schema: BlogSchema;
    keys: keyof BlogSchema;
  };
};

export default function useFilter<T extends FilterType>(
  items: FilterSpec[T]['items']
) {
  const filter = useStore(filterMap);

  return useMemo<typeof items>(() => {
    const filteredItems = [];

    if (filter) {
      for (const item of items) {
        let canAdd = true;

        const itemCheck = item as FilterSpec[T]['items'][0];
        const itemDataCheck = item.data as FilterSpec[T]['items'][0]['data'];
        const filterKeys = Object.keys(filter) as Array<keyof typeof filter>;

        for (const key of filterKeys) {
          const itemDataFilterValue =
            itemDataCheck[key as keyof typeof itemDataCheck];

          if (
            key in filter &&
            key in itemDataCheck &&
            typeof filter[key as keyof typeof filter] !== 'undefined'
          ) {
            if (
              typeof itemDataFilterValue === 'string' &&
              itemDataFilterValue !== filter[key as keyof typeof filter]
            ) {
              canAdd = false;
            } else if (
              typeof itemDataFilterValue === 'number' &&
              itemDataFilterValue !== +filter[key as keyof typeof filter]
            ) {
              canAdd = false;
            }
            break;
          }
        }

        if (canAdd) {
          filteredItems.push(itemCheck);
        }
      }

      return filteredItems as typeof items;
    }

    return items;
  }, [items, filter]);
}
