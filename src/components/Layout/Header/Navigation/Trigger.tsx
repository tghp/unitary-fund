import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import Button from '~/components/Layout/Header/Navigation/Button';
import { cn } from '~/util/cn';
import { navigationOpenAtom } from '~/util/store';

export default function Trigger() {
  const [isMounted, setIsMounted] = useState(false);
  const isOpen = useStore(navigationOpenAtom);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggleClick = () => {
    navigationOpenAtom.set(!navigationOpenAtom.get());
  };

  return (
    <Button
      className={cn([
        'grid-in-trigger opacity-0 transition-opacity duration-300 z-10',
        isMounted && 'nav-mobile:opacity-100 nav-desktop:opacity-100',
        'nav-desktop:h-full nav-desktop:bg-black nav-desktop:text-white',
        'nav-mobile:h-[--navigation-trigger-height] nav-mobile:bg-gray-200 nav-mobile-open:bg-transparent nav-mobile:border-b nav-mobile:border-black nav-mobile:justify-end nav-mobile:uppercase',
        'nav-mobile:absolute nav-mobile:left-0 nav-mobile:right-0 nav-mobile:top-[calc(var(--header-pt)*2)]',
      ])}
      onClick={handleToggleClick}
      active={isOpen}
      icon={isOpen ? 'minus' : 'plus'}>
      Menu
    </Button>
  );
}
