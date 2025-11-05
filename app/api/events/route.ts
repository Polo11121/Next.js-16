import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/database";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid JSON data format",
          error: error instanceof Error ? error.message : "Unknown",
        },
        {
          status: 400,
        }
      );
    }

    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        {
          message: "Image file is required",
        },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((res, rej) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "DevEvent",
          },
          (error, results) => {
            if (error) {
              return rej(error);
            }

            res(results);
          }
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching events by slug:", error);
    }

    if (error instanceof Error) {
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          { message: "Database configuration error" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "Failed to fetch events", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Events fetched successfully",
        events,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching events by slug:", error);
    }

    if (error instanceof Error) {
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          { message: "Database configuration error" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "Failed to fetch events", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
};
