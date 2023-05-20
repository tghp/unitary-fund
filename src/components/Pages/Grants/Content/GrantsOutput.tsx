import { useStore } from '@nanostores/react';
import { useContext } from 'react';
import { GrantsContext } from '~/components/Pages/Grants/Content/GrantContextProvider';
import useGrantsByYear from '~/hooks/useGrantsByYear';
import useGrantsFilter from '~/hooks/useGrantsFilter';
import { grantsFilterMap } from '~/util/store';

export default function GrantsOutput() {
  const grantsContext = useContext(GrantsContext);

  if (!grantsContext) {
    throw new Error('GrantsContext is not defined');
  }

  const { grants } = grantsContext;

  const grantsFilter = useStore(grantsFilterMap);
  const filteredGrants = useGrantsFilter(grants, grantsFilter);
  const grantsByYear = useGrantsByYear(filteredGrants);

  return (
    <div>
      <pre>{JSON.stringify(grantsFilter, null, 2)}</pre>
      {Array.from(grantsByYear).map(([year, grants]) => (
        <div key={year}>
          <h2 className="bg-yellow-400">{year}</h2>
          <ul>
            {grants?.map(({ slug, data: { name } }) => (
              <li key={slug}>{name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
