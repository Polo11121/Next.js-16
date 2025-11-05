"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import posthog from "posthog-js";

interface BookEventProps {
  eventId: string;
  slug: string;
}

export const BookEvent = ({ eventId, slug }: BookEventProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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
            />
          </div>
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
