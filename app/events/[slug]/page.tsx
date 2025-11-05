import { fetchEventBySlug } from "@/services/api";
import Image from "next/image";
import { EventDetailItem } from "@/app/events/[slug]/_components/event-detail-item";
import { EventAgenda } from "@/app/events/[slug]/_components/event-agenda";
import { EventTags } from "@/app/events/[slug]/_components/event-tags";
import { BookEvent } from "@/app/events/[slug]/_components/book-event";

interface EventsSlugPageParams {
  params: Promise<{ slug: string }>;
}

export const EventsSlugPage = async ({ params }: EventsSlugPageParams) => {
  const { slug } = await params;
  const { event } = await fetchEventBySlug(slug);

  const {
    description,
    image,
    organizer,
    overview,
    date,
    time,
    mode,
    audience,
    agenda,
    tags,
    location,
  } = event;

  const bookings = 10;

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>
      <div className="details">
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>
          <EventAgenda agendaItems={agenda} />
          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>
          <EventTags tags={tags} />
        </div>
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        {/* <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => (
              <EventCard key={similarEvent.title} {...similarEvent} />
            ))}
        </div> */}
      </div>
    </section>
  );
};

export default EventsSlugPage;
