import { useStore } from '@nanostores/react';
import type { z } from 'astro:content';
import type { navigationSchema } from '~/content/config';
import { cn } from '~/util/cn';
import { navigationOpenAtom } from '~/util/store';

type NavigationProps = {
  menu: z.infer<typeof navigationSchema> | null;
};

export default function NavigationMenu({ menu }: NavigationProps) {
  const isOpen = useStore(navigationOpenAtom);

  if (!menu) {
    console.error('Problem with menu format');
    return null;
  }

  return (
    <>
      <ul
        className={cn([
          'flex gap-[1px] [&_a]:py-1 [&_a]:px-2',
          !isOpen && 'hidden',
        ])}
      >
        {menu.items.map(({ link, text, children }) => (
          <li className="grow flex" key={link}>
            <a className="bg-gray-200 grow" href={link}>
              {text}
            </a>
            {children && (
              <ul className="flex gap-[2px]">
                {children.map(({ link, text }) => (
                  <li className="flex" key={link}>
                    <a href={link}>{text}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
