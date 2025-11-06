"use server";

import { Booking } from "@/database";
import connectDB from "@/lib/mongodb";

interface BookEventActionProps {
  eventId: string;
  slug: string;
  email: string;
}

export const bookEventAction = async ({
  eventId,
  slug,
  email,
}: BookEventActionProps) => {
  try {
    await connectDB();

    await Booking.create({ eventId, slug, email });

    return { success: true };
  } catch {
    console.error("Booking creation failed");

    return { success: false };
  }
};
