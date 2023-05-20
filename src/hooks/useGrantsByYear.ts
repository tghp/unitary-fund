import { useMemo } from 'react';
import type { CollectionEntry } from 'astro:content';

export default function useGrantsByYear(
  grants?: Array<CollectionEntry<'grant'>>
) {
  return useMemo<Map<number, typeof grants>>(() => {
    // Create a map of grants by year, using the type of grants as we're just going to re-organise
    const grantsByYear = new Map();

    if (!grants) {
      return grantsByYear;
    }

    // Loop through the grants
    for (const grant of grants) {
      // Get the year of the grant
      const year = grant.data.year;
      // Get the grants for the year
      const grantsForYear = grantsByYear.get(year);
      // If there are no grants for the year, create an empty array
      if (!grantsForYear) {
        grantsByYear.set(year, [grant]);
      } else {
        // Add the grant to the array
        grantsByYear.get(year)?.push(grant);
      }
    }

    return grantsByYear;
  }, [grants]);
}
