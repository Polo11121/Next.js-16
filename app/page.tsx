import { EventCard } from "@/components/event-card";
import { ExploreButton } from "@/components/explore-button";

const EVENTS = [
  {
    image: "/images/event1.png",
    title: "Next.js Meetup Poland 2025",
    slug: "nextjs-meetup-poland-2025",
    location: "Warsaw Tech Hub",
    date: "2025-04-18",
    time: "18:00",
  },
  {
    image: "/images/event2.png",
    title: "Frontend Summit Europe",
    slug: "frontend-summit-europe",
    location: "Kraków ICE Congress Centre",
    date: "2025-06-05",
    time: "09:00",
  },
  {
    image: "/images/event3.png",
    title: "AI Hackathon 2025",
    slug: "ai-hackathon-2025",
    location: "Poznań Innovation Campus",
    date: "2025-05-11",
    time: "10:30",
  },
  {
    image: "/images/event4.png",
    title: "Web3 & Blockchain Conference",
    slug: "web3-blockchain-conference",
    location: "Wrocław Tech Arena",
    date: "2025-07-22",
    time: "11:00",
  },
  {
    image: "/images/event5.png",
    title: "DevOps Days Gdańsk",
    slug: "devops-days-gdansk",
    location: "Gdańsk Oliwa Business Center",
    date: "2025-09-15",
    time: "09:30",
  },
];

const RootPage = () => (
  <section>
    <h1 className="text-center">
      The Hub for Every Dev <br /> Event You Can't Miss
    </h1>
    <p className="text-center mt-5">
      Hackathons, Meetups, and Conferences, All in One Place
    </p>

    <ExploreButton />

    <div className="mt-20 space-y-7">
      <h3>Featured Events</h3>
      <ul className="events">
        {EVENTS.map((event) => (
          <li key={event.slug}>
            <EventCard {...event} />
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default RootPage;
