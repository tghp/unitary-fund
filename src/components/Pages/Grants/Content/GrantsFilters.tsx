import { useContext } from 'react';
import { GrantsContext } from '~/components/Pages/Grants/Content/GrantContextProvider';
import { Filter } from '~/components/Pages/Grants/Content/GrantsFilters/Filter';
import { Button } from '~/components/Ui/Form/Button';
import { grantsFilterMap } from '~/util/store';

export default function GrantsFilters() {
  const grantsContext = useContext(GrantsContext);

  if (!grantsContext) {
    throw new Error('GrantsContext is not defined');
  }

  const { filters } = grantsContext;

  const handleClearClick = () => {
    grantsFilterMap.set({});
  };

  return (
    <div className="fixed top-9 md:relative md:top-0 md:mb-20 flex flex-row flex-nowrap md:block w-full left-0">
      <div className="order-2 md:order-1 pt-8 pb-[1px] md:pt-0 md:mb-0 md:bleed-bg md:bleed-black md:text-white uppercase items-center font-mono text-lg md:grid grid-cols-filters grid-rows-filters grid-areas-filters w-1/2 md:w-full">
        <div className="uppercase font-bold  md:bleed-black h-full flex items-center w-full">
          Filter
        </div>
        <div className="flex-col h-full md:flex-row hidden md:flex">
          <div className="flex flex-col md:flex-row w-full md:gap-8 h-full ">
            {!!filters?.length &&
              filters.map(
                (filterKey) =>
                  filterKey !== 'tags' && (
                    <Filter key={filterKey} filterKey={filterKey} />
                  )
              )}
          </div>
          <div className="h-full uppercase items-center ml-4">
            <Button
              onClick={handleClearClick}
              className="p-0 h-full uppercase font-bold text-lg"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div className="order-1 md:order-2 pt-8 pb-2 md:pt-0 md:mb-0 bg-darker-grey md:bg-white flex flex-col md:text-white uppercase gap-x-8 items-center font-mono md:grid grid-cols-tag-search grid-rows-tag-search grid-areas-tag-search md:bleed-white md:bleed-border-t w-1/2 md:w-full">
        <div className="uppercase font-bold grid-in-title flex items-center bleed-bg-l md:bleed-black h-full ">
          Search by tag
        </div>
        <div className="gap-5 grid-in-search self-start hidden md:block">
          {!!filters?.length && filters.includes('tags') && (
            <Filter key="tags" filterKey="tags" />
          )}
        </div>
      </div>
    </div>
  );
}
