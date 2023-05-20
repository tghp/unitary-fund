import { useContext } from 'react';
import { GrantsContext } from '~/components/Pages/Grants/Content/GrantContextProvider';
import { Filter } from '~/components/Pages/Grants/Content/GrantsFilters/Filter';

export default function GrantsFilters() {
  const grantsContext = useContext(GrantsContext);

  if (!grantsContext) {
    throw new Error('GrantsContext is not defined');
  }

  const { filters } = grantsContext;

  return (
    <div className="sticky top-[--header-height] bleed-bg bleed-black text-white uppercase">
      {!!filters?.length &&
        filters.map((filterKey) => (
          <Filter key={filterKey} filterKey={filterKey} />
        ))}
    </div>
  );
}
