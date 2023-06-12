import type { CollectionEntry } from 'astro:content';
import { cn } from '~/util/cn';

type BlogItemProps = {
  post: CollectionEntry<'blog'>;
  className?: string;
};

export default function BlogItem({ post, className }: BlogItemProps) {
  return (
    <article className={cn('flex flex-col border-l border-black', className)}>
      <header className="flex  flex-col md:flex-row p-2 pl-3 mdpl-4 border-b  border-black">
        <time
          className="font-mono"
          dateTime={`${post.data.publishYear}-${post.data.publishMonth}-${post.data.publishDay}`}
        >
          {post.data.publishDay}.{`${post.data.publishMonth}`}.
          {post.data.publishYear}
        </time>
        <div className="mt-1 md:mt-0 md:ml-3 font-bold">{post.data.author}</div>
      </header>
      <div className="p-2 pl-3 md:pl-4 pt-4 pb-8 md:pt-5 text-lg md:text-2xl md:min-h-[120px]">
        {post.data.title}
      </div>
      <footer className=" mb-0">
        <a
          className="font-bold border-l-4 block pl-4 border-black text:lg md:text-xl"
          href={`blog/${post.slug}`}
          title={post.data.title}
        >
          Read More
        </a>
      </footer>
    </article>
  );
}
