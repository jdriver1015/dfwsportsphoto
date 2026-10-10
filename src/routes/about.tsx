import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import portrait from "../assets/teamwork-coach.jpg";
import fieldShot from "../assets/Lions-80.jpg";
import teamShot from "../assets/CDABaseball_0295-3.jpg";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "About Us | DFW Sports Photography" },
      {
        name: "description",
        content:
          "Meet the team behind DFW Sports Photography — a Dallas–Fort Worth studio capturing youth sports action, team portraits, and game-day moments.",
      },
      { property: "og:title", content: "About Us | DFW Sports Photography" },
      {
        property: "og:description",
        content:
          "Meet the team behind DFW Sports Photography — a Dallas–Fort Worth studio capturing youth sports action, team portraits, and game-day moments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  {
    title: "Kids first",
    body: "Sessions are relaxed, fast, and fun. No stiff posing marathons — we work around the game and the kids' energy.",
  },
  {
    title: "Every athlete matters",
    body: "We shoot to highlight the whole roster so every family walks away with images they love.",
  },
  {
    title: "Editorial quality",
    body: "Natural light, real color and professional edits on every delivered frame — the kind of images worth printing.",
  },
  {
    title: "Reliable turnaround",
    body: "Preview galleries within 72 hours and fully edited galleries in under three weeks. Every time.",
  },
];

const stats = [
  { k: "200+", v: "Athletes photographed" },
  { k: "72 hrs", v: "Preview gallery delivery" },
  { k: "DFW", v: "Metroplex-wide coverage" },
];

function About() {
  return (
    <div className="bg-background">
      <section className="relative bg-ink text-white">
        <div className="absolute inset-0">
          <img
            src={fieldShot}
            alt="Youth football players walking onto the field"
            className="h-full w-full object-cover opacity-35"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="font-display text-xs tracking-[0.3em] text-accent">ABOUT US</p>
          <h1 className="display-italic mt-4 text-4xl md:text-6xl leading-[0.95]">
            THE STORY BEHIND <span className="text-accent">DFW SPORTS</span> PHOTOGRAPHY
          </h1>
          <p className="mt-6 max-w-2xl text-white/80 text-lg">
            We're a Dallas-Fort Worth photography team built around one thing: giving youth
            athletes and their families images that feel as big as the moment felt.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24 grid gap-12 md:grid-cols-2 items-center">
        <div>
          <h2 className="display-italic text-3xl md:text-4xl">HOW WE GOT HERE</h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              It started on the sidelines of our own kids' games. Between the whistles and the
              dusty slides into second, there were moments no phone camera could hold onto — the
              breakaway, the huddle, the look on a kid's face after a first home run.
            </p>
            <p>
              What began as shooting for a single team turned into leagues, tournaments, dance
              recitals, and portrait days across the Metroplex. Today we work with youth
              organizations, coaches, and families all over Dallas–Fort Worth.
            </p>
            <p>
              We're still parents in the stands. That's exactly why we know which frames matter.
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src={portrait}
            alt="Coach talking with young players on the field"
            className="w-full object-cover aspect-[4/5]"
          />
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 grid gap-8 sm:grid-cols-3 text-center">
          {stats.map((s) => (
            <div key={s.k}>
              <div className="display-italic text-4xl md:text-5xl text-accent">{s.k}</div>
              <div className="mt-2 font-display text-xs tracking-[0.25em] text-white/70">
                {s.v.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <h2 className="display-italic text-3xl md:text-4xl">WHAT WE STAND FOR</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="border-l-2 border-accent pl-5">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <h3 className="font-display text-lg tracking-wider">{v.title.toUpperCase()}</h3>
              </div>
              <p className="mt-2 text-muted-foreground leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative">
        <img
          src={teamShot}
          alt="Youth baseball team photo on the field"
          className="h-[320px] w-full object-cover md:h-[420px]"
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24 text-center">
        <h2 className="display-italic text-3xl md:text-5xl">READY TO GET ON THE SCHEDULE?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Tell us about your team, league, or athlete and we'll put together a plan for the season.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/book"
            className="inline-flex items-center bg-primary px-7 py-3 font-display tracking-widest text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            BOOK SESSION
          </a>
          <Link
            to="/"
            hash="gallery"
            className="inline-flex items-center border border-input px-7 py-3 font-display tracking-widest hover:bg-muted transition-colors"
          >
            VIEW GALLERY
          </Link>
        </div>
      </section>
    </div>
  );
}
