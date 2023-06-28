import { useContext } from 'react';
import { FilterContext } from '~/components/Filter/FilterContextProvider';
import { FilterRenderer } from '~/components/Filter/Renderer/FilterRenderer';
import { Button } from '~/components/Ui/Form/Button';
import { cn } from '~/util/cn';
import { filterMap } from '~/util/store';

export function Filters() {
  const filterContext = useContext(FilterContext);

  if (!filterContext) {
    throw new Error('FilterContext is not defined');
  }

  const { filterKeys } = filterContext;

  const handleClearClick = () => {
    filterMap.set({});
  };

  return (
    <div
      className={cn([
        'fixed top-[--navigation-trigger-height] flex flex-row flex-nowrap w-full left-0',
        'md:-ml-5 md:sticky md:top-[--header-height] z-30 md:mb-20 md:block md:before:bleed-bg-r md:before:bleed-white',
        'md:before:content-[""] md:before:absolute md:before:bottom-0 md:before:left-0 md:before:w-full md:before:h-[calc(100%+var(--header-height))] md:before:bg-white md:before:-z-10',
      ])}>
      <div className="order-2 md:order-1 pt-8 pb-[1px] md:pt-0 md:mb-0 md:bleed-bg md:bleed-black md:text-white uppercase items-center font-mono md:grid grid-cols-filters grid-rows-filters grid-areas-filters w-1/2 md:w-full">
        <div className="uppercase font-bold md:bleed-black h-full flex items-center w-full">
          Filter
        </div>
        <div className="flex-col h-full md:flex-row hidden md:flex">
          <div className="flex flex-col md:flex-row w-full md:gap-8 h-full ">
            {!!filterKeys?.length &&
              filterKeys.map(
                (filterKey) =>
                  filterKey !== 'tags' && <FilterRenderer key={filterKey} filterKey={filterKey} />
              )}
          </div>
          <div className="h-full uppercase items-center ml-4">
            <Button onClick={handleClearClick} className="p-0 h-full uppercase font-bold">
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn([
          'order-1 pt-8 pb-2 flex flex-col text-xs uppercase gap-x-8 items-center font-mono w-1/2',
          'md:w-full md:order-2 md:pt-0 md:mb-0 md:bg-white md:text-white md:bleed-white md:bleed-border-t md:grid grid-cols-tag-search grid-rows-tag-search grid-areas-tag-search',
        ])}>
        <div className="uppercase font-bold grid-in-title flex items-center bleed-bg-l md:bleed-black h-full ">
          Search by tag
        </div>
        <div className="gap-5 grid-in-search self-start hidden md:block">
          {!!filterKeys?.length && filterKeys.includes('tags') && (
            <FilterRenderer key="tags" filterKey="tags" />
          )}
        </div>
      </div>
    </div>
  );
}
