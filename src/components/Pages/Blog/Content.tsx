import type { CollectionEntry } from 'astro:content';
// import GrantsContextProvider from '~/components/Pages/Grants/Content/GrantContextProvider';
// import GrantsFilters from '~/components/Pages/Grants/Content/GrantsFilters';
// import GrantsOutput from '~/components/Pages/Grants/Content/GrantsOutput';
import type { GrantFilterKey } from '~/hooks/useGrantsFilter';

export type ContentProps = {
  filters?: Array<GrantFilterKey>;
  grants?: Array<CollectionEntry<'grant'>>;
};

export default function Content({ filters, grants }: ContentProps) {
  return (
    <p>Test</p>
    // <GrantsContextProvider filters={filters} grants={grants}>
    //   <GrantsFilters />
    //   <GrantsOutput />
    // </GrantsContextProvider>
  );
}
