import { useStore } from '@nanostores/react';
import { useContext, useMemo } from 'react';
import { GrantsContext } from '~/components/Pages/Grants/Content/GrantContextProvider';
import TagFilter from '~/components/Pages/Grants/Content/GrantsFilters/TagFilter';
import SelectFilter from '~/components/Pages/Grants/Content/GrantsFilters/SelectFilter';
import type { GrantFilterKey } from '~/hooks/useGrantsFilter';
import { grantsFilterMap } from '~/util/store';

type FilterProps = {
  filterKey: GrantFilterKey;
};

export function Filter({ filterKey }: FilterProps) {
  const grantsContext = useContext(GrantsContext);

  if (!grantsContext) {
    throw new Error('GrantsContext is not defined');
  }

  const { grants } = grantsContext;

  const grantsFilter = useStore(grantsFilterMap);

  const filterValues = useMemo(() => {
    const values = new Set<string>();

    grants?.forEach(({ data: grantData }) => {
      const grantDataForKey = grantData[filterKey];

      if (grantDataForKey) {
        if (
          typeof grantDataForKey === 'number' ||
          typeof grantDataForKey === 'string'
        ) {
          values.add(grantDataForKey.toString());
        } else if (Array.isArray(grantDataForKey)) {
          grantDataForKey.forEach((v) => {
            values.add(v.toString());
          });
        }
      }
    });

    return Array.from(values);
  }, [grants]);

  return filterKey === 'tags' ? (
    <TagFilter filterKey={filterKey} filterValues={filterValues} />
  ) : (
    <SelectFilter filterKey={filterKey} filterValues={filterValues} />
  );
}
