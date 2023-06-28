import { cn } from '~/util/cn';
import { useState, useMemo } from 'react';
import { useMultipleSelection, useCombobox } from 'downshift';
import type { FilterContextValues } from '~/components/Filter/FilterContextProvider';

type SelectFilterProps = {
  filterKey: NonNullable<FilterContextValues['filterKeys']>[0];
  filterValues: string[];
};

export default function TagFilter({ filterKey, filterValues }: SelectFilterProps) {
  const initialSelectedItems: string[] = [];

  /**
   * State
   */

  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[] | undefined>(initialSelectedItems);

  /**
   * Hooks
   */

  const items = useMemo(() => {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return filterValues.filter((filter) => {
      return (
        selectedItems &&
        !selectedItems.includes(filter) &&
        (filter.toLowerCase().includes(lowerCasedInputValue) ||
          filter.toLowerCase().includes(lowerCasedInputValue))
      );
    });
  }, [selectedItems, inputValue]);

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems, type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          setSelectedItems(newSelectedItems);
          break;
        default:
          break;
      }
    },
  });

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items,
    itemToString(item) {
      return '';
    },
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    onStateChange({ inputValue: newInputValue, type, selectedItem: newSelectedItem }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem && selectedItems) {
            setSelectedItems([...selectedItems, newSelectedItem]);
          }
          break;

        case useCombobox.stateChangeTypes.InputChange:
          if (newInputValue) {
            setInputValue(newInputValue);
          }
          break;
        default:
          break;
      }
    },
  });

  /**
   * Render
   */

  return (
    <div className="relative">
      <div className="w-full h-[30px] bleed-black bleed-border-b">
        <div className="flex h-full">
          <input
            placeholder="Enter Tag"
            className="w-full text-black text-xs outline-none uppercase font-bold placeholder:font-normal placeholder:uppercase"
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          />
          <button
            aria-label="toggle menu"
            className="pl-2"
            type="button"
            {...getToggleButtonProps()}>
            &#8595;
          </button>
        </div>
        <ul
          className={cn([
            'absolute w-screen -left-8 z-20 bg-white border-black border border-b-0 max-h-80 overflow-y-scroll scrollbar-hide p-0 list-image-none',
            !(isOpen && items.length) && 'hidden',
          ])}
          {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <li
                className={cn(
                  highlightedIndex === index && 'bg-yellow-400',
                  selectedItem === item && 'font-bold',
                  'pr-4 flex gap-2 text-black cursor-pointer border-black border-b'
                )}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}>
                <span className="flex items-center px-0.5 bg-black text-white">+</span>
                <span className="py-[0.15rem] tracking-wider">{item}</span>
              </li>
            ))}
        </ul>
      </div>
      <div className="-ml-8 text-xs flex mt-[-1px]">
        {selectedItems?.map(function renderSelectedItem(selectedItemForRender, index) {
          return (
            <div
              className="cursor-pointer h-[27px] text-black border-black border flex items-center	hover:bg-yellow-400 group"
              key={`selected-item-${index}`}
              {...getSelectedItemProps({
                selectedItem: selectedItemForRender,
                index,
              })}
              onClick={(e) => {
                e.stopPropagation();
                removeSelectedItem(selectedItemForRender);
              }}>
              <span className="px-0.5 bg-black text-white h-full flex items-center group-hover:text-yellow-400">
                &#10005;
              </span>
              <span className="block px-3 tracking-wider">{selectedItemForRender}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
