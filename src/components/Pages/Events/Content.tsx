import type { CollectionEntry } from 'astro:content';
import { parse, isPast, isFuture } from 'date-fns';
import EventItem from '~/components/Pages/Events/Content/EventItem';

export type ContentProps = {
  events?: Array<CollectionEntry<'event'>>;
};

export default function Content({ events }: ContentProps) {
  const previousEvents: Array<CollectionEntry<'event'>> = [];
  const upcomingEvents: Array<CollectionEntry<'event'>> = [];

  if (events) {
    for (const event of events) {
      const date = parse(
        `${event.data.year}-${event.data.month}-${event.data.day} 23:59`,
        'yyyy-MM-dd HH:mm',
        new Date()
      );

      if (isFuture(date)) {
        upcomingEvents.push(event);
      } else {
        previousEvents.push(event);
      }
    }
  }

  return (
    <>
      {[true, false].map((previous) => {
        return (
          <div>
            <div className="solid-heading">
              <h2>{previous ? 'Previous Events' : 'Upcoming Events'}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(previous ? previousEvents : upcomingEvents).length === 0 && (
                <>
                  There are currently no {previous ? 'previous' : 'upcoming'}
                  events
                </>
              )}
              {(previous ? previousEvents : upcomingEvents)?.map((event) => (
                <EventItem
                  key={
                    event.data.title +
                    event.data.day +
                    event.data.month +
                    event.data.year
                  }
                  event={event}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
