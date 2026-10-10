import { createFileRoute } from "@tanstack/react-router";
import { BookForm } from "@/components/book/BookForm";
import { listSessionOptions } from "@/lib/booking";

export const Route = createFileRoute("/book")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Book Your Season | DFW Sports Photography" },
      {
        name: "description",
        content:
          "Request your youth sports photography package: Athlete Spotlight, Team Portraits or full game coverage across Dallas–Fort Worth.",
      },
    ],
  }),
  // /book?package=athlete-spotlight opens with that package chosen.
  validateSearch: (search: Record<string, unknown>) => ({
    package: typeof search.package === "string" ? search.package : undefined,
  }),
  // Read on the server for the first render, and again on client navigations.
  loader: () => listSessionOptions(),
  component: BookPage,
});

function BookPage() {
  const sessions = Route.useLoaderData();
  const { package: initialPackage } = Route.useSearch();

  return (
    <div className="bg-background">
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <p className="font-display text-xs tracking-[0.3em] text-accent">BOOK YOUR SEASON</p>
          <h1 className="display-italic mt-4 text-4xl md:text-6xl">LET&rsquo;S GET YOU ON THE SCHEDULE</h1>
          <p className="mt-5 max-w-xl text-white/75">
            Choose a package and tell us about the game. We&rsquo;ll confirm the details with you, usually the same
            day, and you&rsquo;ll get a private link to your booking.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        <BookForm sessions={sessions} initialPackage={initialPackage} />
      </section>
    </div>
  );
}
