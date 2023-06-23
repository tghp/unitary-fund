import { useContext } from 'react';
import { FilterContext } from '~/components/Filter/FilterContextProvider';
import useFilter, { BlogEntry } from '~/hooks/useFilter';
import { BlogItem } from './BlogItem';

export function BlogOutput() {
  const filterContext = useContext(FilterContext);

  if (!filterContext) {
    throw new Error('FilterContext is not defined');
  }

  const { items } = filterContext;

  const filteredPosts = useFilter<'blog'>((items || []) as BlogEntry[]);

  return (
    <ul className="flex flex-wrap gap-4 py-20">
      {filteredPosts?.map((post) => (
        <BlogItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}
