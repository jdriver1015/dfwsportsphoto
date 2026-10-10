import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Plus, Minus } from "lucide-react";
import heroAsset from "../assets/hero-lions-wide.jpg";
import cubsPortrait from "../assets/cubs-portrait.jpg";
import lionsTeam from "../assets/CDABaseball_0295-3.jpg";
import marinersAction from "../assets/Smiley-25-3.jpg";
import vb1 from "../assets/JV4A2424.jpg";
import vb2 from "../assets/JV4A2455.jpg";
import vb3 from "../assets/JV4A2463.jpg";
import vb4 from "../assets/JV4A2468-2.jpg";
import vb5 from "../assets/JV4A2480.jpg";
import vb6 from "../assets/JV4A2488.jpg";
import vb7 from "../assets/JV4A2495.jpg";
import vb8 from "../assets/JV4A2507.jpg";
import vb9 from "../assets/JV4A2538.jpg";
import vb10 from "../assets/JV4A2609.jpg";
import vb11 from "../assets/JV4A2643.jpg";
import vb12 from "../assets/JV4A2692.jpg";
import vb13 from "../assets/JV4A2720.jpg";
import vb14 from "../assets/JV4A2808.jpg";
import vb15 from "../assets/JV4A2812.jpg";
import vb16 from "../assets/JV4A2839.jpg";
import vb17 from "../assets/JV4A2843.jpg";
import vb18 from "../assets/JV4A2855.jpg";
import vb19 from "../assets/JV4A2864.jpg";
import vb20 from "../assets/JV4A3007.jpg";
import vb21 from "../assets/JV4A3051.jpg";
import vb22 from "../assets/JV4A3087.jpg";
import cubsCeleb1 from "../assets/Cubs-3_1_-2-2.jpg";
import bballGame1 from "../assets/CDABasketball-001.jpg";
import bballShotFollow from "../assets/CDABasketball-158.jpg";
import bballKinderShot2 from "../assets/CDAKinderBasektball-200-2.jpg";
import bballTeamPortrait from "../assets/Lions-49.jpg";
import bballJumper1 from "../assets/Lions-108-2.jpg";
import bballJumper2 from "../assets/Lions-112.jpg";
import bballFastBreak from "../assets/Lions-124.jpg";
import bballDribbleDefend from "../assets/Lions-125-2.jpg";
import bballJumpShot3 from "../assets/Lions-137-2.jpg";
import bballDriveLayup from "../assets/Lions-139.jpg";
import bballFreeThrow from "../assets/Lions-141_1.jpg";
import bballContested from "../assets/Lions-146.jpg";
import dancePurpleGroup from "../assets/JV4A0754.jpg";
import danceCabaret from "../assets/JV4A0715.jpg";
import dancePinkGroup from "../assets/JV4A0850.jpg";
import dancePinkSolo from "../assets/JV4A0757.jpg";
import danceBluePose from "../assets/JV4A0787.jpg";
import danceGreenGroup from "../assets/JV4A0835.jpg";
import danceBlueTutu from "../assets/JV4A0737.jpg";
import danceTealSolo from "../assets/JV4A0747.jpg";
import danceNavyReach from "../assets/JV4A0783.jpg";
import danceWhiteBallet from "../assets/JV4A0791.jpg";
import danceTealDuo from "../assets/JV4A0824-2.jpg";
import danceBlueDress from "../assets/JV4A0840.jpg";
import danceGlovesPair from "../assets/JV4A0888-2.jpg";
import danceSantaDuo from "../assets/JV4A0259.jpg";
import danceSantaPoint from "../assets/JV4A0267-4.jpg";
import danceHolidayGroup from "../assets/JV4A0296.jpg";
import danceShark from "../assets/JV4A0650-3.jpg";
import footballTeam from "../assets/CDAFF5th-181-2.jpg";
import footballBreakaway from "../assets/Lions-19-3.jpg";
import footballPursuit from "../assets/Lions-34-2.jpg";
import footballCloseup from "../assets/Lions-37-2.jpg";
import footballPortraitNew from "../assets/Lions-45-2.jpg";
import footballSideline from "../assets/Lions-192-2.jpg";
import footballReceiver from "../assets/CDAFF5th-020.jpg";
import footballChiefsRun from "../assets/CDAFF5th-133.jpg";
import footballSprint from "../assets/CDAFF5th-134_2.jpg";
import footballTraffic from "../assets/CDAFF5th-144.jpg";
import footballTackle from "../assets/Lions-173.jpg";
import footballBlueTeam from "../assets/Lions-204.jpg";
import footballCut from "../assets/Lions-31.jpg";
import footballOpenField from "../assets/Lions-33.jpg";
import footballRunnerNew from "../assets/Lions-35.jpg";
import soccerPortrait15 from "../assets/Soccer-418-2.jpg";
import soccerDribbleYoung from "../assets/Lions-1-2.jpg";
import soccerGlasses from "../assets/Lions-10-2.jpg";
import soccerTunnel from "../assets/Lions-13-2.jpg";
import soccerHighFive from "../assets/Lions-80-2.jpg";
import soccerDribble99 from "../assets/Soccer-706-2.jpg";
import soccerKickGreen from "../assets/Lions_0049.jpg";
import soccerPortrait71 from "../assets/Soccer-411.jpg";
import soccerBlueTeam from "../assets/Lions_0029.jpg";
import soccerGrayTeam from "../assets/Soccer-463.jpg";
import soccerRace from "../assets/Soccer-497.jpg";
import soccerChallenge from "../assets/Soccer-604.jpg";
import soccerGoalkeeper from "../assets/Soccer-658.jpg";
import soccerTouch from "../assets/Soccer-659.jpg";
import soccerCorner from "../assets/Soccer-663.jpg";
import soccerStrike from "../assets/Soccer-666.jpg";
import soccerRun from "../assets/Soccer-689.jpg";
import soccerAttack from "../assets/Soccer-715.jpg";
import soccerThrowIn from "../assets/Lions-20_1.jpg";
import soccerCelebration from "../assets/Lions-14_1.jpg";
import soccerKick from "../assets/Lions-9.jpg";
import baseballAstrosBat from "../assets/Astros-84.jpg";
import baseballPitch from "../assets/CDABaseball_0024-2.jpg";
import baseballSwing from "../assets/CDABaseball_0039.jpg";
import baseballSlideHome from "../assets/CDABaseball_0040-3.jpg";
import baseballMound from "../assets/CDABaseball_0065-3.jpg";
import baseballTagHome from "../assets/CDABaseball_0093.jpg";
import baseballReach from "../assets/CDABaseball_0122-2.jpg";
import baseballTagSecond from "../assets/CDABaseball_0130.jpg";
import baseballHuddle from "../assets/baseballedit.jpg";
import baseballTeam from "../assets/CDABaseball_0295-2.jpg";
import baseballCubsSlide from "../assets/Cubs-1-2-3.jpg";
import baseballCubsCelebrate from "../assets/Cubs-3_1_-2.jpg";
import baseballCubsRun from "../assets/Cubs-14-3-2.jpg";
import baseballCubsBat from "../assets/Cubs-45-2.jpg";
import baseballCubsPortrait from "../assets/Cubs-32-2.jpg";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "DFW Sports Photography | Youth Sports in Dallas–Fort Worth" },
      {
        name: "description",
        content:
          "Cinematic youth sports photography across Dallas, Fort Worth, and the Metroplex — action, portraits, dance, and full team coverage.",
      },
      { property: "og:title", content: "DFW Sports Photography | Youth Sports in Dallas–Fort Worth" },
      {
        property: "og:description",
        content:
          "Cinematic youth sports photography across Dallas, Fort Worth, and the Metroplex — action, portraits, dance, and full team coverage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const services = [
  {
    n: "01",
    title: "Athlete Spotlight",
    body: "A cinematic feature of a single athlete — portraits, gear and game-time action shots crafted like a magazine cover.",
    tags: ["Portraits", "Editorial", "Personal Brand"],
    img: cubsPortrait,
  },
  {
    n: "02",
    title: "Team Portraits",
    body: "Polished team and individual portraits delivered as a cohesive set worthy of the trophy case.",
    tags: ["Groups", "Individuals", "Composites"],
    img: lionsTeam,
  },
  {
    n: "03",
    title: "Multi-Player Game Coverage",
    body: "Full sideline coverage of your game or tournament — action, emotion, and the whole story of the day.",
    tags: ["Action", "Sideline", "Full Day"],
    img: marinersAction,
  },
];

const galleryItems = [
  { src: footballBreakaway, label: "Football", alt: "Flag football player cutting past a defender" },
  { src: soccerDribbleYoung, label: "Soccer", alt: "Young soccer player chasing the ball" },
  { src: baseballAstrosBat, label: "Baseball", alt: "Young Astros player posing with a bat" },
  { src: dancePurpleGroup, label: "Dance", alt: "Young dancers performing in purple costumes on stage" },
  { src: bballGame1, label: "Basketball", alt: "Youth basketball players chasing a loose ball in the gym" },
  { src: vb6, label: "Volleyball", alt: "Volleyball player mid-air on a jump serve" },
  { src: footballTeam, label: "Football", alt: "Youth flag football team posing with coaches" },
  { src: soccerPortrait15, label: "Soccer", alt: "Youth soccer player posing with a ball" },
  { src: baseballPitch, label: "Baseball", alt: "Youth baseball pitcher delivering a pitch" },
  { src: danceCabaret, label: "Dance", alt: "Young dancer performing on stage" },
  { src: bballShotFollow, label: "Basketball", alt: "Young basketball player following through on a jump shot" },
  { src: vb18, label: "Volleyball", alt: "Volleyball player ready in defensive stance" },
  { src: footballPursuit, label: "Football", alt: "Flag football ball carrier pursued by defenders" },
  { src: soccerGlasses, label: "Soccer", alt: "Young soccer player dribbling in blue glasses" },
  { src: baseballSwing, label: "Baseball", alt: "Youth baseball player swinging at a pitch" },
  { src: danceGreenGroup, label: "Dance", alt: "Group of dancers in green dresses performing" },
  { src: bballKinderShot2, label: "Basketball", alt: "Young player shooting during a kindergarten basketball game" },
  { src: vb21, label: "Volleyball", alt: "Volleyball player at the net waiting for play" },
  { src: footballCloseup, label: "Football", alt: "Flag football runner breaking a tackle" },
  { src: soccerTunnel, label: "Soccer", alt: "Young soccer players running through a high-five tunnel" },
  { src: baseballSlideHome, label: "Baseball", alt: "Baseball player sliding into home plate" },
  { src: dancePinkGroup, label: "Dance", alt: "Young dancers in pink costumes performing" },
  { src: bballTeamPortrait, label: "Basketball", alt: "Youth basketball team group portrait with basketballs" },
  { src: vb16, label: "Volleyball", alt: "Volleyball player jumping to serve" },
  { src: footballPortraitNew, label: "Football", alt: "Young flag football player ready on the sideline" },
  { src: soccerDribble99, label: "Soccer", alt: "Soccer player dribbling during a match" },
  { src: baseballMound, label: "Baseball", alt: "Youth pitcher set on the mound" },
  { src: danceBluePose, label: "Dance", alt: "Solo dancer in blue costume on stage" },
  { src: bballJumper1, label: "Basketball", alt: "Young basketball player shooting toward the hoop" },
  { src: vb8, label: "Volleyball", alt: "Volleyball teammates celebrating a point" },
  { src: footballSideline, label: "Football", alt: "Coach walking with youth flag football players" },
  { src: soccerKickGreen, label: "Soccer", alt: "Young soccer player striking a green ball" },
  { src: baseballTagHome, label: "Baseball", alt: "Catcher applying a tag at home plate" },
  { src: dancePinkSolo, label: "Dance", alt: "Young dancer in pink costume performing" },
  { src: bballJumper2, label: "Basketball", alt: "Youth player rising for a jump shot in the gym" },
  { src: vb15, label: "Volleyball", alt: "Volleyball player passing the ball" },
  { src: footballReceiver, label: "Football", alt: "Flag football receiver carrying the ball" },
  { src: soccerPortrait71, label: "Soccer", alt: "Youth soccer goalkeeper portrait" },
  { src: baseballReach, label: "Baseball", alt: "Baseball fielder reaching high for a catch" },
  { src: danceBlueTutu, label: "Dance", alt: "Young ballerina in a blue sequin tutu on stage" },
  { src: bballFastBreak, label: "Basketball", alt: "Youth basketball players racing up the court on a fast break" },
  { src: vb22, label: "Volleyball", alt: "Coach and player celebrating together" },
  { src: footballChiefsRun, label: "Football", alt: "Flag football runner escaping defenders" },
  { src: soccerBlueTeam, label: "Soccer", alt: "Youth soccer team group portrait" },
  { src: baseballTagSecond, label: "Baseball", alt: "Fielder tagging a runner at second base" },
  { src: danceTealSolo, label: "Dance", alt: "Dancer in a teal dress performing on stage" },
  { src: bballDribbleDefend, label: "Basketball", alt: "Young player dribbling past a defender" },
  { src: vb20, label: "Volleyball", alt: "Volleyball player passing an incoming serve" },
  { src: footballSprint, label: "Football", alt: "Flag football player sprinting into open field" },
  { src: soccerGrayTeam, label: "Soccer", alt: "Youth soccer team posing with coaches" },
  { src: baseballHuddle, label: "Baseball", alt: "Youth baseball team kneeling together on the field" },
  { src: danceNavyReach, label: "Dance", alt: "Dancer in navy costume reaching with arms raised" },
  { src: bballJumpShot3, label: "Basketball", alt: "Young basketball player elevating for a shot" },
  { src: vb7, label: "Volleyball", alt: "Volleyball player setting the ball above the net" },
  { src: footballTraffic, label: "Football", alt: "Flag football runner navigating defenders" },
  { src: soccerRace, label: "Soccer", alt: "Soccer players racing toward the ball" },
  { src: baseballTeam, label: "Baseball", alt: "Youth baseball team group portrait" },
  { src: danceWhiteBallet, label: "Dance", alt: "Ballerina in a white tutu holding a passe pose" },
  { src: bballDriveLayup, label: "Basketball", alt: "Youth player driving to the basket with the ball" },
  { src: vb19, label: "Volleyball", alt: "Volleyball teammates sharing a high five" },
  { src: footballTackle, label: "Football", alt: "Flag football player escaping a tackle" },
  { src: soccerChallenge, label: "Soccer", alt: "Two soccer players challenging for the ball" },
  { src: baseballCubsSlide, label: "Baseball", alt: "Cubs player sliding into home plate" },
  { src: danceTealDuo, label: "Dance", alt: "Two dancers in teal dresses performing together" },
  { src: bballFreeThrow, label: "Basketball", alt: "Young basketball player shooting a free throw" },
  { src: vb14, label: "Volleyball", alt: "Volleyball player dropping to a knee for a pass" },
  { src: footballBlueTeam, label: "Football", alt: "Youth flag football team portrait" },
  { src: soccerGoalkeeper, label: "Soccer", alt: "Youth goalkeeper clearing the ball" },
  { src: baseballCubsCelebrate, label: "Baseball", alt: "Cubs teammates celebrating at home plate" },
  { src: danceBlueDress, label: "Dance", alt: "Dancer in a blue tiered dress mid-performance" },
  { src: bballContested, label: "Basketball", alt: "Young basketball player shooting over a defender" },
  { src: vb17, label: "Volleyball", alt: "Volleyball player winding up for an overhand serve" },
  { src: footballCut, label: "Football", alt: "Flag football runner making a sharp cut" },
  { src: soccerTouch, label: "Soccer", alt: "Soccer player controlling the ball in traffic" },
  { src: baseballCubsRun, label: "Baseball", alt: "Cubs player running the bases" },
  { src: danceGlovesPair, label: "Dance", alt: "Young dancers in mint costumes clapping with white gloves" },
  { src: vb9, label: "Volleyball", alt: "Smiling young volleyball player on the court" },
  { src: footballOpenField, label: "Football", alt: "Flag football player running through defenders" },
  { src: soccerCorner, label: "Soccer", alt: "Soccer player dribbling near the corner" },
  { src: baseballCubsBat, label: "Baseball", alt: "Cubs player making contact at the plate" },
  { src: danceSantaDuo, label: "Dance", alt: "Two young dancers in red Santa costumes posing on stage" },
  { src: vb1, label: "Volleyball", alt: "Youth volleyball team huddling before a serve" },
  { src: footballRunnerNew, label: "Football", alt: "Flag football player running with the ball" },
  { src: soccerStrike, label: "Soccer", alt: "Youth soccer player striking the ball" },
  { src: baseballCubsPortrait, label: "Baseball", alt: "Cubs player posing with a glove" },
  { src: danceSantaPoint, label: "Dance", alt: "Young dancer in a red Santa costume pointing toward the audience" },
  { src: vb10, label: "Volleyball", alt: "Volleyball player setting under the basketball hoop" },
  { src: soccerHighFive, label: "Soccer", alt: "Young soccer player running beneath a high-five tunnel" },
  { src: danceHolidayGroup, label: "Dance", alt: "Group of young dancers in holiday costumes posing on stage" },
  { src: vb12, label: "Volleyball", alt: "Volleyball player tossing the ball for a serve" },
  { src: soccerRun, label: "Soccer", alt: "Soccer player running onto the ball" },
  { src: danceShark, label: "Dance", alt: "Young dancer performing in a shark costume on stage" },
  { src: vb4, label: "Volleyball", alt: "Volleyball player leaping for a jump serve" },
  { src: soccerAttack, label: "Soccer", alt: "Soccer player dribbling past defenders" },
  { src: vb3, label: "Volleyball", alt: "Young volleyball player setting the ball at the net" },
  { src: soccerThrowIn, label: "Soccer", alt: "Young soccer player preparing a throw-in" },
  { src: vb2, label: "Volleyball", alt: "Volleyball teammates high-fiving on the court" },
  { src: soccerCelebration, label: "Soccer", alt: "Smiling soccer player celebrating after a game" },
  { src: vb13, label: "Volleyball", alt: "Volleyball teammates high-fiving" },
  { src: soccerKick, label: "Soccer", alt: "Young soccer player kicking the ball" },
  { src: vb5, label: "Volleyball", alt: "Volleyball player preparing to serve" },
  { src: vb11, label: "Volleyball", alt: "Volleyball player diving for a dig" },
];
const galleryFilters = ["All", "Football", "Soccer", "Baseball", "Basketball", "Volleyball", "Dance"] as const;


const sports = ["Football", "Baseball", "Basketball", "Soccer", "Volleyball", "Lacrosse", "Cheer", "Dance", "Theatre", "Track & Field", "Softball", "Wrestling"];

const whyUs = [
  { n: "01", title: "Field-Tested Eye", body: "Years of youth sports coverage across the Metroplex — we know the moments before they happen." },
  { n: "02", title: "Cinematic Craft", body: "Editorial lighting, deliberate composition, and post-production tuned for print and legacy." },
  { n: "03", title: "Fast Turnaround", body: "Preview galleries within 72 hours. Full delivery in under three weeks." },
  { n: "04", title: "Family-First", body: "Respectful of athletes and parents on the field. Private galleries, easy sharing, print-ready files." },
];

const testimonials = [
  { quote: "Our photos were great! Thank you for sharing your talent and these sweet photo memories with us!", name: "Christy", role: "Colleyville" },
  { quote: "The Athlete Spotlight for my son is something we'll hang forever. It felt like a magazine cover.", name: "Priya S.", role: "Southlake" },
  { quote: "You captured such great action shots of our whole team! Thank you!", name: "Jimmy D.", role: "Coach · Dallas" },
];

const pricingTiers = [
  {
    slug: "athlete-spotlight",
    name: "Athlete Spotlight",
    blurb: "One athlete, featured like a magazine cover.",
    pricePrefix: "Starting at",
    price: "$250",
    unit: "/ session",
    featured: false,
    features: [
      "One full game coverage",
      "One athlete featured throughout",
      "Portraits, gear, and signature moments",
      "7 edited high resolution images. Additional images available for additional fees",
      "Private online gallery with download link",
      "Print release included",
      "Preview gallery within one week",
    ],
  },
  {
    slug: "team-portraits",
    name: "Team Portraits",
    blurb: "Polished team and individual portraits.",
    pricePrefix: "Starting at",
    price: "$300",
    unit: "/ session",
    featured: false,
    features: [
      "Team portraits and individual headshots",
      "Every rostered player photographed",
      "Professionally edited high resolution images",
      "Shared gallery for all families",
      "Print release included",
      "Preview gallery within one week",
    ],
  },
  {
    slug: "game-coverage",
    name: "Multi-Player Game Coverage",
    blurb: "Full sideline coverage of your game or tournament.",
    pricePrefix: "",
    price: "Inquire",
    unit: "for pricing",
    featured: true,
    features: [
      "Full game coverage of multiple or all team players",
      "Team portraits and individual headshots",
      "Pricing depends on sport and number of players",
      "Shared gallery for all families",
      "Custom banners and posters available",
      "Volume pricing for leagues",
    ],
  },
];

// Toggle: set to true to show the Add-ons block in the Pricing section.
const SHOW_ADD_ONS = false;

const addOns = [
  { name: "Extra Game", price: "$225", body: "Add another game to any package at a reduced rate." },
  { name: "Rush Delivery", price: "$150", body: "Fully edited gallery delivered within 72 hours." },
  { name: "Print Package", price: "From $95", body: "Professional lab prints, mounted or framed." },
  { name: "Highlight Reel", price: "$200", body: "A 60-second edited photo reel set to music." },
];

const faqs = [
  { q: "How far in advance should we book?", a: "We recommend scheduling 3-4 weeks in advance. But don't hesitate to reach out at any time and we will try our best to work with your schedule if we can." },
  { q: "Where in DFW do you shoot?", a: "Anywhere in the Metroplex — Dallas, Fort Worth, Plano, Frisco, McKinney, Arlington, Southlake, and every surrounding city. Substantial distances will require a small travel fee." },
  { q: "How long until we get the photos?", a: "Preview galleries will land within 72 hours. Fully edited galleries arrive in under three weeks." },
  { q: "Do you offer prints?", a: "Yes — print-ready files are included and we offer curated print and framing options." },
  { q: "Can leagues and clubs get group pricing?", a: "Absolutely. Multi-team and season-long partnerships get custom pricing — just reach out." },
  { q: "What happens if it rains?", a: "We reschedule at no cost. Weather calls are made the morning of, together with you. Your deposit is non refundable unless games are canceled due to weather and we are unable to reschedule." },
];

const cities = ["Dallas", "Fort Worth", "Plano", "Frisco", "McKinney", "Arlington", "Irving", "Southlake", "Grapevine", "Denton", "Allen", "Richardson", "Coppell", "Flower Mound", "Prosper", "Rockwall"];

function Home() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const visible = filter === "All" ? galleryItems.slice(0, 32) : galleryItems.filter((g) => g.label === filter);

  return (
    <div id="top">
      {/* HERO — pre-composed image with baked-in left fade */}
      <section className="relative h-[460px] md:h-[560px] lg:h-[660px] w-full overflow-hidden bg-black">
        <img
          src={heroAsset}
          alt="Youth flag football runner breaking away with the ball"
          className="absolute inset-0 h-full w-full object-cover object-[70%_50%] md:object-[68%_50%] lg:object-[62%_50%] animate-hero-zoom will-change-transform"
        />
        {/* Mobile + tablet: translucent full overlay so runner stays visible and copy sits over the whole frame */}
        <div aria-hidden className="absolute inset-0 bg-[#06080a]/55 lg:hidden" />
        {/* Desktop: left fade so the headline sits on black */}
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, #06080a 0%, #06080a 26%, rgba(6,8,10,0.85) 40%, rgba(6,8,10,0.45) 52%, transparent 66%)",
          }}
        />
        {/* Desktop: soft top fade under the nav */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 hidden lg:block"
          style={{ backgroundImage: "linear-gradient(to bottom, rgba(6,8,10,0.75), transparent)" }}
        />

        {/* Gold dot-grid texture overlay — fades into the photo at the same rate as the baked-in black */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: "radial-gradient(#c6912f 1px, transparent 1.2px)",
            backgroundSize: "22px 22px",
            WebkitMaskImage:
              "linear-gradient(to right, #000 0%, #000 30%, rgba(0,0,0,0.6) 45%, transparent 60%)",
            maskImage:
              "linear-gradient(to right, #000 0%, #000 30%, rgba(0,0,0,0.6) 45%, transparent 60%)",
          }}
        />

        <div className="relative z-10 h-full w-full flex items-center">
          {/* Text column: mobile/tablet full width centered; lg inside baked-in dark zone */}
          <div className="w-full px-6 lg:px-0 md:max-w-2xl md:mx-auto text-center lg:text-left lg:w-[34%] lg:flex lg:justify-center lg:max-w-none lg:mx-0 text-white">
            <div className="w-full lg:max-w-[420px]">
              <div className="font-display tracking-[0.25em] text-accent text-[11px] md:text-sm uppercase">
                Dallas · Fort Worth · Youth Sports
              </div>
              <h1 className="mt-4 font-display italic font-black leading-[0.9] text-[40px] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-7xl">
                Every play
                <br />
                deserves a
                <br />
                frame
              </h1>
              <p className="mt-5 text-white/80 text-sm md:text-base max-w-[380px] mx-auto lg:mx-0">
                Game-day photography for youth sports leagues across North Texas.
                Preview gallery delivered within 72 hours.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href="/book"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-display tracking-widest text-sm hover:bg-white transition-colors"
                >
                  BOOK A SESSION <ArrowRight size={16} />
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-3 font-display tracking-widest text-sm hover:border-accent hover:text-accent transition-colors"
                >
                  SEE GALLERIES
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SERVICES */}
      <section id="services" className="bg-white text-ink py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-10 bg-accent" />
            <span className="font-display tracking-widest text-accent text-sm">What We Shoot</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl">
            Three ways to preserve the season
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {services.map((s) => (
              <article key={s.n} className="group border border-ink/10 hover:border-accent transition-colors">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="font-display tracking-widest text-accent text-sm">{s.n}</div>
                  <h3 className="font-display text-2xl mt-1">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground">{s.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li key={t} className="text-xs font-display tracking-wider border border-ink/20 px-3 py-1">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-ink text-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-10 bg-accent" />
            <span className="font-display tracking-widest text-accent text-sm">The Gallery</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl">Frames from the field</h2>

          <div className="mt-10 flex flex-wrap gap-2">
            {galleryFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-display tracking-widest text-sm px-4 py-2 border transition-colors ${
                  filter === f
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-white/20 hover:border-accent hover:text-accent"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((g, i) => (
              <figure key={i} className="relative aspect-square overflow-hidden group">
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink to-transparent p-3 font-display tracking-widest text-xs text-accent">
                  {g.label.toUpperCase()}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SPORTS */}
      <section className="bg-white text-ink py-24">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-10 bg-accent" />
              <span className="font-display tracking-widest text-accent text-sm">Sports We Cover</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95]">If they play it, we shoot it</h2>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
            {sports.map((s) => (
              <li key={s} className="flex items-center gap-2 font-display tracking-wider text-lg border-b border-ink/10 py-2">
                <Check size={16} className="text-accent" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY US */}
      <section id="whyus" className="relative bg-ink text-white py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="aspect-[4/5] overflow-hidden">
              <img src={cubsCeleb1} alt="Two young baseball players jumping to celebrate with a high-five" className="w-full h-full object-cover" />
            </div>
            <blockquote className="mt-6 border-l-2 border-accent pl-4">
              <p className="font-display text-2xl leading-tight">"They caught the one frame we'll frame forever."</p>
              <footer className="mt-2 text-sm text-white/60 font-display tracking-widest">— EMILY S., FRISCO</footer>
            </blockquote>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-10 bg-accent" />
              <span className="font-display tracking-widest text-accent text-sm">Why Families Choose Us</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95]">Built for the moments that matter</h2>
            <div className="mt-10 space-y-8">
              {whyUs.map((w) => (
                <div key={w.n} className="grid grid-cols-[auto_1fr] gap-6 border-t border-white/10 pt-6">
                  <div className="font-display text-accent tracking-widest">{w.n}</div>
                  <div>
                    <h3 className="font-display text-2xl">{w.title}</h3>
                    <p className="mt-2 text-white/70">{w.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white text-ink py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-10 bg-accent" />
            <span className="font-display tracking-widest text-accent text-sm">Word from the Sidelines</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl">Families and coaches, on the record</h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="border-t-2 border-ink pt-6">
                <blockquote className="font-display text-xl leading-snug">"{t.quote}"</blockquote>
                <figcaption className="mt-6">
                  <div className="font-display tracking-wider text-lg">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-white text-ink py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-10 bg-accent" />
            <span className="font-display tracking-widest text-accent text-sm">Pricing</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl">
            Simple packages, no surprises
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Every package includes professional editing, a private online gallery, and full print
            release on your delivered images. Travel inside the Metroplex is always included.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3 items-start">
            {pricingTiers.map((tier) => (
              <article
                key={tier.name}
                className={`relative flex h-full flex-col border p-8 transition-colors ${
                  tier.featured
                    ? "border-accent bg-ink text-white shadow-xl"
                    : "border-ink/10 hover:border-accent"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-8 bg-accent text-accent-foreground font-display text-xs tracking-widest px-3 py-1">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-display text-2xl tracking-wide">{tier.name}</h3>
                <p className={`mt-2 text-sm ${tier.featured ? "text-white/70" : "text-muted-foreground"}`}>
                  {tier.blurb}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  {"pricePrefix" in tier && tier.pricePrefix && (
                    <span className={`font-display text-lg leading-none ${tier.featured ? "text-white/70" : "text-muted-foreground"}`}>
                      {tier.pricePrefix}
                    </span>
                  )}
                  <span className="font-display text-5xl leading-none">{tier.price}</span>
                  <span className={`text-sm ${tier.featured ? "text-white/60" : "text-muted-foreground"}`}>
                    {tier.unit}
                  </span>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-accent" />
                      <span className={tier.featured ? "text-white/85" : "text-muted-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`/book?package=${tier.slug}`}
                  className={`mt-8 block text-center font-display text-sm tracking-widest px-5 py-3 transition-colors ${
                    tier.featured
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "border border-ink text-ink hover:bg-ink hover:text-white"
                  }`}
                >
                  BOOK THIS PACKAGE
                </a>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-ink/10 pt-10">
            {SHOW_ADD_ONS && (
              <>
                <h3 className="font-display text-2xl tracking-wide">Add-ons</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {addOns.map((a) => (
                    <div key={a.name} className="border border-ink/10 p-5">
                      <div className="font-display tracking-wider">{a.name}</div>
                      <div className="mt-1 text-accent font-display text-xl">{a.price}</div>
                      <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            <p className={`${SHOW_ADD_ONS ? "mt-8" : ""} text-sm text-muted-foreground max-w-2xl`}>
              Leagues, clubs, and multi-team weekends get custom season pricing — reach out and
              we'll build a package around your schedule. A 50% deposit reserves your date.
            </p>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="bg-ink text-white py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-10 bg-accent" />
            <span className="font-display tracking-widest text-accent text-sm">FAQ</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">Questions, answered</h2>
          <p className="mt-4 text-white/60">Don't see yours? Reach out — we usually reply the same day.</p>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between text-left py-6 group"
                  >
                    <span className="font-display text-xl md:text-2xl tracking-wide group-hover:text-accent transition-colors">
                      {f.q}
                    </span>
                    {open ? <Minus className="text-accent shrink-0" /> : <Plus className="text-accent shrink-0" />}
                  </button>
                  {open && <p className="pb-6 -mt-2 text-white/70 max-w-2xl">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="bg-white text-ink py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-10 bg-accent" />
            <span className="font-display tracking-widest text-accent text-sm">Service Area</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">Covering the Metroplex</h2>

          <ul className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-ink/10">
            {cities.map((c, i) => (
              <li key={c} className="bg-white p-5 flex items-baseline gap-3 hover:bg-ink hover:text-white transition-colors">
                <span className="font-display text-accent tracking-widest text-sm">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl tracking-wider">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BOOK CTA */}
      <section id="book" className="relative bg-ink text-white py-28 overflow-hidden">
        <img src={heroAsset} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-10 bg-accent" />
            <span className="font-display tracking-widest text-accent text-sm">Book Your Season</span>
            <span className="h-[2px] w-10 bg-accent" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">Preserve the season</h2>
          <p className="mt-6 text-white/80 max-w-xl mx-auto">
            Weekends fill fast during the season. Tell us your sport, dates, and city — we'll respond same-day.
          </p>
          <a
            href="/book"
            className="inline-flex items-center gap-3 mt-10 bg-accent text-accent-foreground px-8 py-4 font-display tracking-widest hover:bg-white transition-colors"
          >
            BOOK A SESSION <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
