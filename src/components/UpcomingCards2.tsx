import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, MapPin, Dot } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { api } from "@/api/client";

type EventItem = {
  sport: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  countdown: string;
  live?: boolean;
  status?: string;
};

const Badge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
    {text}
  </span>
);

const API_URL = "/event/v1/listevents";

type EventApiResponse = {
  events?: any[];
};

type UpcomingCards2Props = {
  apiUrl?: string;
  requestPayload?: any;
};

// Helper: Calculate countdown label
const getCountdownLabel = (eventTimestamp: number, status?: string): string => {
  if (status === "EVENT_STATUS_ACTIVE" || status === "EVENT_STATUS_LIVE") {
    return "LIVE";
  }

  const now = new Date();
  const eventDate = new Date(eventTimestamp * 1000);

  const diffTime = eventDate.getTime() - now.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Determine output
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
  } else {
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;
  }
};

const UpcomingCards2 = ({ apiUrl, requestPayload }: UpcomingCards2Props) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "live" | "upcoming">("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const url = apiUrl ?? API_URL;
        const defaultPayload = {
          category: "EVENT_CATEGORY_SPORTS",
          pageNumber: 1,
          eventHierarchy: "ALL_EVENTS",
          pageSize: 200,
        } as any;

        const statusByFilter: Record<typeof filter, string[]> = {
          all: ["EVENT_STATUS_UPCOMING", "EVENT_STATUS_ACTIVE", "EVENT_STATUS_COMPLETED"],
          live: ["EVENT_STATUS_ACTIVE"],
          upcoming: ["EVENT_STATUS_UPCOMING"],
        };

        const merged = { ...defaultPayload, ...(requestPayload || {}) } as any;
        merged.status = statusByFilter[filter];

        const data = await api.post<EventApiResponse>(url, merged);
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    setError(null);
    fetchEvents();
  }, [apiUrl, requestPayload, filter]);

  return (
    <section id="upcoming" className="relative py-20 bg-gray-900">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(900px_450px_at_0%_50%,rgba(16,185,129,0.18),transparent_100%)]" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">
              Upcoming <span className="text-green-500">Events</span>
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Don’t miss out on these exciting matches
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                filter === "all"
                  ? "bg-yellow-400 text-black"
                  : "border border-white/10 bg-gray-800 text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("live")}
              className={`rounded-xl px-4 py-2 text-sm ${
                filter === "live"
                  ? "bg-yellow-400 text-black"
                  : "border border-white/10 bg-gray-800 text-white"
              }`}
            >
              Live
            </button>
            <button
              onClick={() => setFilter("upcoming")}
              className={`rounded-xl px-4 py-2 text-sm ${
                filter === "upcoming"
                  ? "bg-yellow-400 text-black"
                  : "border border-white/10 bg-gray-800 text-white"
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>

        <div className="relative">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : events.length === 0 ? (
            <div>No upcoming events found.</div>
          ) : (
            <Carousel opts={{ containScroll: "trimSnaps", dragFree: false }}>
              <CarouselContent className="py-2">
                {events.map((event) => {
                  const countdownLabel = getCountdownLabel(
                    Number(event.startDate),
                    event.status
                  );

                  return (
                    <CarouselItem key={event.id} className="max-w-xs">
                      <Card className="rounded-2xl border border-white/10 bg-gray-900 p-6">
                        <div className="flex items-center justify-between">
                          <Badge text={event.sportEvent?.sportType || "Sports"} />
                          {countdownLabel === "LIVE" ? (
                            <div className="flex items-center gap-1 text-red-500 text-xs">
                              <Dot className="h-4 w-4" />
                              <span>LIVE</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">
                              {countdownLabel}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 text-white font-semibold text-lg">
                          {event.name}
                        </div>
     <div className="mt-4 space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{event.venues}</span></div>
              </div>
                        <div className="mt-6 flex items-center justify-between">
                                   
                          <div className="text-green-500 text-sm font-semibold">
                            {new Date(Number(event.startDate) * 1000).toLocaleDateString()} •{" "}
                            {new Date(Number(event.startDate) * 1000).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          <Button className="bg-green-500 hover:bg-green-600">
                            Predict
                          </Button>
                        </div>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingCards2;
