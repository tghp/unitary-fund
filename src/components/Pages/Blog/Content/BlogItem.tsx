import type { FilterSpec } from '~/hooks/useFilter';

type BlogItemProps = {
  post: FilterSpec['blog']['items'][0];
};

export function BlogItem({ post: { data: post, slug } }: BlogItemProps) {
  return (
    <article className="flex flex-col border-l border-black">
      <header className="flex  flex-col md:flex-row p-2 pl-3 mdpl-4 border-b  border-black">
        <time className="font-mono" dateTime={`${post.year}-${post.month}-${post.day}`}>
          {post.day}.{`${post.month}`}.{post.year}
        </time>
        <div className="mt-1 md:mt-0 md:ml-3 font-bold">{post.author}</div>
      </header>
      <div className="flex-grow p-2 pl-3 md:pl-4 pt-4 pb-8 md:pt-5 text-lg md:text-2xl md:min-h-[120px]">
        {post.title}
      </div>
      <footer className=" mb-0">
        <a
          className="font-bold no-underline border-l-4 block pl-4 border-black text:lg md:text-xl"
          href={`/posts/${slug}`}
          title={post.title}>
          Read More
        </a>
      </footer>
    </article>
  );
}
