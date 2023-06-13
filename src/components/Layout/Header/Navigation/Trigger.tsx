import { useStore } from '@nanostores/react';
import Button from '~/components/Layout/Header/Navigation/Button';
import { navigationOpenAtom } from '~/util/store';

export default function Trigger() {
  const isOpen = useStore(navigationOpenAtom);

  const handleToggleClick = () => {
    navigationOpenAtom.set(!navigationOpenAtom.get());
  };

  return (
    <Button
      className="grid-in-trigger bg-black text-yellow-400"
      onClick={handleToggleClick}
      active={isOpen}
      icon={isOpen ? 'minus' : 'plus'}
    >
      Menu
    </Button>
  );
}
