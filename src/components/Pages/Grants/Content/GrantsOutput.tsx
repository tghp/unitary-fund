import { useStore } from '@nanostores/react';
import { useContext } from 'react';
import { GrantsContext } from '~/components/Pages/Grants/Content/GrantContextProvider';
import useGrantsByYear from '~/hooks/useGrantsByYear';
import useGrantsFilter from '~/hooks/useGrantsFilter';
import { grantsFilterMap } from '~/util/store';
import GrantItem from './GrantItem';
import { cn } from '~/util/cn';

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
      {Array.from(grantsByYear).map(([year, grants]) => (
        <div key={year}>
          <h2
            className={cn(
              'bg-yellow-400 inline-block relative font-mono text-xl pr-4 bleed-bg-l bleed-yellow-400',
              'before:block before:absolute before:w-screen before:left-[100%] before:translate-x-0 before:top-0 before:-z-10 before:box-border before:content-[""] before:border-solid before:border-b before:border-b-black'
            )}
          >
            {year}
          </h2>
          <ul className="flex flex-wrap gap-4 py-20">
            {grants?.map((grant) => (
              <GrantItem key={grant.slug} grant={grant} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
