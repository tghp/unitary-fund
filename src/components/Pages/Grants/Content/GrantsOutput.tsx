import { useContext } from 'react';
import { FilterContext } from '~/components/Filter/FilterContextProvider';
import useGrantsByYear from '~/hooks/useGrantsByYear';
import useFilter, { GrantEntry } from '~/hooks/useFilter';
import { GrantItem } from './GrantItem';
import { cn } from '~/util/cn';

export function GrantsOutput() {
  const filterContext = useContext(FilterContext);

  if (!filterContext) {
    throw new Error('FilterContext is not defined');
  }

  const { items } = filterContext;

  const filteredGrants = useFilter<'grant'>((items || []) as GrantEntry[]);
  const grantsByYear = useGrantsByYear(filteredGrants);

  return (
    <div>
      {Array.from(grantsByYear).map(([year, grants]) => {
        const displayBackgroundNumber = grants?.length && grants?.length > 3;

        return (
          <div key={year} className="relative">
            <h2
              className={cn([
                'bg-yellow-400 inline-block relative font-mono text-xl pr-4 bleed-bg-l bleed-yellow-400 z-10',
                'before:block before:absolute before:w-screen before:left-[100%] before:translate-x-0 before:top-0 before:-z-10 before:box-border before:content-[""] before:border-solid before:border-b before:border-b-black',
              ])}>
              {year}
            </h2>
            {displayBackgroundNumber && (
              <div className="hidden lg:block sticky top-[calc(var(--logo-height))] left-0 leading-none text-[300px] opacity-[0.02] font-mono z-0">
                {year}
              </div>
            )}
            <ul
              className={cn([
                'flex flex-wrap gap-4 py-20 z-10',
                displayBackgroundNumber && 'lg:mt-[-300px]',
              ])}>
              {grants?.map((grant) => (
                <GrantItem key={grant.slug} grant={grant} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
