import type { navigationSchema } from '~/content/config';
import type { z } from 'astro:content';
import { useState } from 'react';
import { cn } from '~/util/cn';

type NavigationProps = {
  menu: z.infer<typeof navigationSchema> | null;
};

export default function NavigationMenu({ menu }: NavigationProps) {
  const [open, setOpen] = useState(false);

  if (!menu) {
    console.error('Problem with menu format');
    return null;
  }

  const handleToggleClick = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      <button onClick={handleToggleClick} className="flex items-center gap-2">
        Menu
      </button>
      <ul
        className={cn([
          'flex gap-[1px] [&_a]:py-1 [&_a]:px-2',
          !open && 'hidden',
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
