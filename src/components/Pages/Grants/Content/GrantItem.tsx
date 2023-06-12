import type { CollectionEntry } from 'astro:content';

type GrantItemProps = {
  grant: CollectionEntry<'grant'>;
};

export default function GrantItem({ grant }: GrantItemProps) {
  return (
    <div className="w-[calc(100%/3-(1rem*2/3))] border-yellow-400 border-l-4">
      <time
        className="block text-sm font-mono border-black border-b -ml-1 pl-3 pb-1"
        dateTime={`${grant.data.year}-${grant.data.month}-${grant.data.day}`}
      >
        {grant.data.day}.{`${grant.data.month}`}.{grant.data.year}
      </time>
      <div className="pl-4 pt-2 pb-5 uppercase font-bold font-mono">
        {grant.data.name}
      </div>
      <div className="pl-4 min-h-[150px]">{grant.body}</div>
    </div>
  );
}
