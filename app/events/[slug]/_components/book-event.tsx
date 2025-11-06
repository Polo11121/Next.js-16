"use client";

import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { bookEventAction } from "@/actions/booking";
import posthog from "posthog-js";

interface BookEventProps {
  eventId: string;
  slug: string;
}

export const BookEvent = ({ eventId, slug }: BookEventProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    startTransition(async () => {
      const { success } = await bookEventAction({
        email,
        slug,
        eventId,
      });

      if (success) {
        setSubmitted(true);
        posthog.capture("event_booked", {
          email,
          slug,
          eventId,
        });
      } else {
        posthog.captureException("Booking creation failed");
      }
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              id="email"
              placeholder="Enter your email address"
              disabled={isPending}
            />
          </div>
          <button
            type="submit"
            className="button-submit"
            disabled={isPending || !email}
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};
