import { useStore } from '@nanostores/react';
import type { z } from 'astro:content';
import type { CSSProperties } from 'react';
import Button from '~/components/Layout/Header/Navigation/Button';
import type { navigationSchema } from '~/content/config';
import { cn } from '~/util/cn';
import { navigationActiveSubmenuAtom, navigationOpenAtom } from '~/util/store';

type NavigationProps = {
  menu: z.infer<typeof navigationSchema> | null;
};

const getMenuKey = (item: z.infer<typeof navigationSchema>['items'][0]) => {
  return item.link + item.text;
};

export default function Menu({ menu }: NavigationProps) {
  const isOpen = useStore(navigationOpenAtom);
  const activeSubmenu = useStore(navigationActiveSubmenuAtom);

  if (!menu) {
    console.error('Problem with menu format');
    return null;
  }

  let submenu = null;
  let marginPercent = 0;

  for (const item of menu.items) {
    const key = getMenuKey(item);

    if (item.children && activeSubmenu === key) {
      submenu = (
        <div
          className="grid-in-submenu relative ml-[--margin-percent] border-t border-white"
          style={
            {
              '--margin-percent': `calc((100% - var(--menu-trigger-width)) * 0.${marginPercent})`,
            } as CSSProperties
          }
        >
          <ul
            className={cn([
              'absolute top-0 left-0 w-full flex flex-wrap gap-[2px]',
              !isOpen && 'hidden',
            ])}
          >
            {item.children.map(({ link, text }) => (
              <li className="flex grow" key={link}>
                <Button
                  className="min-w-[180px]"
                  href={link}
                  active={true}
                  icon="chevron"
                >
                  {text}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      );
      break;
    }

    marginPercent += 100 / menu.items.length;
  }

  return (
    <>
      <ul
        className={cn([
          'grid-in-menu grid grid-cols-[--nav-cols]',
          !isOpen && 'hidden',
        ])}
        style={
          {
            '--nav-cols': `repeat(${menu.items.length}, 1fr)`,
          } as CSSProperties
        }
      >
        {menu.items.map(({ link, text }) => {
          const key = getMenuKey({ link, text });
          const isCurrent = activeSubmenu === key;

          const buttonClassName = cn([
            'border-r border-black hover:border-white',
            isCurrent && 'border-white',
          ]);

          const handleClick = () => {
            if (activeSubmenu === key) {
              navigationActiveSubmenuAtom.set(null);
            } else {
              navigationActiveSubmenuAtom.set(key);
            }
          };

          return (
            <li className="grow flex" key={key}>
              {!link && link !== '#' && (
                <Button
                  className={buttonClassName}
                  icon={isCurrent ? 'minus' : 'plus'}
                  onClick={handleClick}
                  active={isCurrent}
                  current={isCurrent}
                >
                  {text}
                </Button>
              )}
              {link && link !== '#' && (
                <Button href={link} className={buttonClassName} icon="chevron">
                  {text}
                </Button>
              )}
            </li>
          );
        })}
      </ul>
      {submenu}
    </>
  );
}
