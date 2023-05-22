import { useStore } from '@nanostores/react';
import { useContext, useMemo } from 'react';
import { GrantsContext } from '~/components/Pages/Grants/Content/GrantContextProvider';
import type { GrantFilterKey } from '~/hooks/useGrantsFilter';
import { cn } from '~/util/cn';
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

  const handleClick = (value: string) => {
    return () => {
      grantsFilterMap.setKey(filterKey, value);
    };
  };

  return (
    <div>
      <div>{filterKey}</div>
      <div>
        {filterValues.map((value) => (
          <div
            key={value}
            className={cn([
              filterKey in grantsFilter &&
                grantsFilter[filterKey] === value &&
                'bg-red-500',
            ])}
            onClick={handleClick(value)}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
