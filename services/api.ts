import { IEvent } from "@/database";
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
  const res = await fetch(`${API_URL}/events`);

  return handleResponse(res);
};

export const fetchEventBySlug = async (
  slug: string
): Promise<FetchEventBySlugResponse> => {
  const res = await fetch(`${API_URL}/events/${slug}`);

  return handleResponse(res);
};
