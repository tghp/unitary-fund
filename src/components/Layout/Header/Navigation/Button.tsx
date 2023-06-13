import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from 'react';
import { cn } from '~/util/cn';
import MenuPlus from '~/assets/svg/menu-plus.svg?raw';
import MenuMinus from '~/assets/svg/menu-minus.svg?raw';
import MenuChevron from '~/assets/svg/menu-chevron.svg?raw';

type HTMLButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type HTMLAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

type CommonButtonProps = {
  icon: 'plus' | 'minus' | 'chevron';
  active?: boolean;
  current?: boolean;
};

type ButtonProps = PropsWithChildren<
  | (HTMLButtonProps & { href?: never } & CommonButtonProps)
  | (HTMLAnchorProps & { href: string } & CommonButtonProps)
>;

const icons = {
  plus: MenuPlus,
  minus: MenuMinus,
  chevron: MenuChevron,
} satisfies Record<CommonButtonProps['icon'], string>;

export default function Button({
  children,
  className,
  icon,
  active,
  current,
  href,
  ...props
}: ButtonProps) {
  const buttonClassName = cn([
    'grow flex justify-between items-center bg-gray-200 text-black h-[34px] px-2 text-sm font-bold',
    'hover:bg-black hover:text-white transition-colors duration-100 ease-in-out',
    active && 'bg-black text-white',
    current && 'bg-black text-yellow-400 hover:text-yellow-400',
    className,
  ]);

  const iconOutput = (
    <>{icon && <div dangerouslySetInnerHTML={{ __html: icons[icon] }} />}</>
  );

  if (href) {
    const anchorProps = props as HTMLAnchorProps;

    return (
      <a href={href} className={buttonClassName} {...anchorProps}>
        {children}
        {iconOutput}
      </a>
    );
  } else {
    const buttonProps = props as HTMLButtonProps;

    return (
      <button className={buttonClassName} {...buttonProps}>
        {children}
        {iconOutput}
      </button>
    );
  }
}
