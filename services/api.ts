import { IEvent } from "@/database";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface FetchEventsResponse {
  message: string;
  events: IEvent[];
}

interface FetchEventBySlugResponse {
  message: string;
  event: IEvent;
}

const handleResponse = async (res: Response) => {
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    const { message } = await res.json();

    throw new Error(message || "Failed to fetch data");
  }

  return res.json();
};

export const fetchEvents = async (): Promise<FetchEventsResponse> => {
  "use cache";
  cacheLife("hours");
  const res = await fetch(`${API_URL}/events`);

  return handleResponse(res);
};

export const fetchEventBySlug = async (
  slug: string
): Promise<FetchEventBySlugResponse> => {
  "use cache";
  cacheLife("hours");
  const res = await fetch(`${API_URL}/events/${slug}`, {
    next: {
      revalidate: 60,
    },
  });

  return handleResponse(res);
};
