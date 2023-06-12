import { cn } from '~/util/cn';
import { useState, useMemo } from 'react';
import { useMultipleSelection, useCombobox } from 'downshift';
import type { GrantFilterKey } from '~/hooks/useGrantsFilter';

type SelectFilterProps = {
  filterKey: GrantFilterKey;
  filterValues: string[];
};

export default function MultiSelectFilter({
  filterKey,
  filterValues,
}: SelectFilterProps) {
  const initialSelectedItems: string[] = [];

  console.log(filterValues);

  function getFilteredBooks(
    selectedItems: string[] | undefined,
    inputValue: string
  ) {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return filterValues.filter((filter) => {
      return (
        selectedItems &&
        !selectedItems.includes(filter) &&
        (filter.toLowerCase().includes(lowerCasedInputValue) ||
          filter.toLowerCase().includes(lowerCasedInputValue))
      );
    });
  }

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[] | undefined>(
    initialSelectedItems
  );
  const items = useMemo(
    () => getFilteredBooks(selectedItems, inputValue),
    [selectedItems, inputValue]
  );
  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems,
      onStateChange({ selectedItems: newSelectedItems, type }) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
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
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items,
    itemToString(item) {
      return item ? item : '';
    },
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
            highlightedIndex: 0, // with the first option highlighted.
          };
        default:
          return changes;
      }
    },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
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

  return (
    <div className="relative">
      <div className="w-full h-[30px] bleed-black bleed-border-b">
        <div className="flex h-full">
          <input
            placeholder="Enter Tag"
            className="w-full  text-black text-sm outline-none uppercase font-bold placeholder:font-normal placeholder:uppercase"
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          />
          <button
            aria-label="toggle menu"
            className="pl-2"
            type="button"
            {...getToggleButtonProps()}
          >
            &#8595;
          </button>
        </div>
        <ul
          className={`absolute w-screen -left-8 z-20 bg-white border-black border border-b-0 max-h-80 overflow-y-scroll scrollbar-hide p-0 ${
            !(isOpen && items.length) && 'hidden'
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={cn(
                  highlightedIndex === index && 'bg-yellow-400',
                  selectedItem === item && 'font-bold',
                  'py-1 px-4  flex flex-col text-black cursor-pointer border-black border-b'
                )}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
        </ul>
      </div>
      <div className="-ml-5 text-sm flex mt-[-1px] flex-wra">
        {selectedItems?.map(function renderSelectedItem(
          selectedItemForRender,
          index
        ) {
          return (
            <div
              className="focus:bg-red-400 h-[30px] text-black border-black border flex items-center	"
              key={`selected-item-${index}`}
              {...getSelectedItemProps({
                selectedItem: selectedItemForRender,
                index,
              })}
            >
              <span
                className="px-1 cursor-pointer bg-black text-white h-full flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedItem(selectedItemForRender);
                }}
              >
                &#10005;
              </span>
              <span className="block px-3">{selectedItemForRender}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
