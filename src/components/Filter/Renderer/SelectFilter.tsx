import { cn } from '~/util/cn';
import { useSelect } from 'downshift';
import type { FilterContextValues } from '~/components/Filter/FilterContextProvider';
import { filterMap } from '~/util/store';
import {
  ISO_3166_ALPHA_2_CODES,
  ISO_3166_ALPHA_2_MAPPINGS,
} from '~/util/iso3166';

type SelectFilterProps = {
  filterKey: NonNullable<FilterContextValues['filterKeys']>[0];
  filterValues: string[];
};

function getSortedFilterValues(
  filterKey: NonNullable<FilterContextValues['filterKeys']>[0],
  filterValues: string[]
) {
  if (filterKey === 'country') {
    return filterValues.sort((a, b) => {
      const aLabel = getLabel(filterKey, a);
      const bLabel = getLabel(filterKey, b);

      return aLabel.localeCompare(bLabel);
    });
  } else {
    return filterValues.sort((a, b) => a.localeCompare(b));
  }
}

function getLabel(
  filterKey: NonNullable<FilterContextValues['filterKeys']>[0],
  value: string
) {
  if (filterKey === 'country' && ISO_3166_ALPHA_2_CODES.includes(value)) {
    return ISO_3166_ALPHA_2_MAPPINGS[
      value as (typeof ISO_3166_ALPHA_2_CODES)[number]
    ];
  } else if (filterKey === 'month') {
    return new Date(0, parseInt(value, 10)).toLocaleString('default', {
      month: 'long',
    });
  } else {
    return value;
  }
}

export default function SelectFilter({
  filterKey,
  filterValues,
}: SelectFilterProps) {
  const {
    isOpen,
    closeMenu,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: filterValues,
    selectedItem: filterMap.get()[filterKey] || '',
  });

  return (
    <div className="flex-grow relative bg-light-grey after:hidden md:after:block after:top-0 after:content-['|'] after:absolute after:-right-[1.35rem] after:font-bold last:after:hidden">
      <div className="w-100 flex flex-col gap-1 h-full select-none">
        <div
          className="flex cursor-pointer text-black  hover:text-black hover:bg-yellow-400 h-full"
          {...getToggleButtonProps()}
        >
          <span className="px-4">{isOpen ? <>&#8593;</> : <>&#8595;</>}</span>
          <span className="font-bold">
            {!!selectedItem && getLabel(filterKey, selectedItem)}
            {!selectedItem && filterKey}
          </span>
        </div>
      </div>
      <ul
        className={`md:absolute w-full mt-0  max-h-80 z-20 bg-light-grey overflow-y-scroll scrollbar-hide p-0 ${
          !isOpen && 'hidden'
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          getSortedFilterValues(filterKey, filterValues).map((item, index) => {
            const handleClick = () => {
              filterMap.setKey(filterKey, item);
              closeMenu();
            };

            return (
              <li
                className={cn(
                  highlightedIndex === index && 'bg-yellow-400',
                  selectedItem === item && 'font-bold',
                  'py-1 px-4 flex flex-col text-black cursor-pointer border-black border-b'
                )}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
                onClick={handleClick}
              >
                <span>{getLabel(filterKey, item)}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
