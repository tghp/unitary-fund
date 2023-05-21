import { navigationOpenAtom } from '~/util/store';

export default function NavigationTrigger() {
  const handleToggleClick = () => {
    navigationOpenAtom.set(!navigationOpenAtom.get());
  };

  return (
    <button onClick={handleToggleClick} className="flex items-center gap-2">
      Menu
    </button>
  );
}
