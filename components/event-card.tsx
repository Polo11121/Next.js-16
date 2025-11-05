import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const EventCard = ({
  title,
  image,
  slug,
  location,
  date,
  time,
}: EventCardProps) => (
  <Link href={`/events/${slug}`} id="event-card">
    <Image
      src={image}
      alt={title}
      width={410}
      height={300}
      className="poster"
    />
    <div className="flex flex-row gap-2">
      <Image
        src="/icons/pin.svg"
        width={14}
        height={14}
        alt={`${title} location`}
      />
      <p>{location}</p>
    </div>
    <p className="title">{title}</p>
    <div className="datetime">
      <div>
        <Image
          src="/icons/calendar.svg"
          width={14}
          height={14}
          alt={`${title} date`}
        />
        <p>{date}</p>
      </div>
      <div>
        <Image
          src="/icons/clock.svg"
          width={14}
          height={14}
          alt={`${title} time`}
        />
        <p>{time}</p>
      </div>
    </div>
  </Link>
);
