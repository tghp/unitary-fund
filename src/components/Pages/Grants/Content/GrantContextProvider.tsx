import { PropsWithChildren, createContext } from 'react';
import type { ContentProps } from '~/components/Pages/Grants/Content';

type GrantsContextValues = ContentProps;

export const GrantsContext = createContext<GrantsContextValues>({});

type GrantsContextProps = PropsWithChildren<GrantsContextValues>;

export default function GrantsContextProvider({
  children,
  filters,
  grants,
}: GrantsContextProps) {
  return (
    <GrantsContext.Provider value={{ filters, grants }}>
      {children}
    </GrantsContext.Provider>
  );
}
