import { cn } from '~/util/cn';
import { useSelect } from 'downshift';
import type { GrantFilterKey } from '~/hooks/useGrantsFilter';
import { filterHandleClick } from '~/components/Pages/Grants/Content/GrantsFilters/Filter';

type SelectFilterProps = {
  filterKey: GrantFilterKey;
  filterValues: string[];
};

export default function SelectFilter({
  filterKey,
  filterValues,
}: SelectFilterProps) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: filterValues });

  return (
    <div className="flex-grow relative bg-light-grey after:hidden md:after:block after:top-0 after:content-['|'] after:absolute after:-right-[1.35rem] after:font-bold last:after:hidden">
      <div className="w-100 flex flex-col gap-1 h-full">
        <div
          className="flex cursor-pointer text-black  hover:text-black hover:bg-yellow-400 h-full"
          {...getToggleButtonProps()}
        >
          <span className="px-4">{isOpen ? <>&#8593;</> : <>&#8595;</>}</span>
          <span className="font-bold">{filterKey}</span>
        </div>
      </div>
      <ul
        className={`md:absolute w-full mt-0  max-h-80 z-20 bg-light-grey overflow-y-scroll scrollbar-hide p-0 ${
          !isOpen && 'hidden'
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          filterValues.map((item, index) => (
            <li
              className={cn(
                highlightedIndex === index && 'bg-yellow-400',
                selectedItem === item && 'font-bold',
                'py-1 px-4  flex flex-col text-black cursor-pointer border-black border-b'
              )}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
              onClick={filterHandleClick(filterKey, item)}
            >
              <span>{item}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

{
  /* {filterValues.map((value) => (
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
        ))} */
}
