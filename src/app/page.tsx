"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronUp,
  CircleHelp,
  Compass,
  Crosshair,
  Handshake,
  Instagram,
  Linkedin,
  LocateFixed,
  Mail,
  Megaphone,
  MapPin,
  Menu,
  MessageCircleQuestion,
  Navigation,
  Plus,
  Radar,
  Search,
  ShieldAlert,
  Sparkles,
  Star,
  TrafficCone,
  Wrench,
  X,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import CommunityMap from "@/components/CommunityMap";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const PUNE_CENTER = { lat: 18.5204, lng: 73.8567 };

const navLinks = [
  ["Map", "explore-map"],
  ["Feed", "community-feed"],
  ["Ask", "ask-answer"],
  ["Find", "services"],
  ["Alerts", "safety"]
] as const;

const liveCards = [
  {
    icon: TrafficCone,
    tone: "coral",
    title: "Pothole on FC Road — near Goodluck Chowk",
    meta: "Arjun K. · 14 min ago · 28 upvotes",
    distance: "3.2 km away",
    distanceKm: 3.2
  },
  {
    icon: CircleHelp,
    tone: "purple",
    title: "Good electrician near Kothrud?",
    meta: "Priya S. · 3 hrs ago · 7 answers",
    distance: "8.4 km away",
    distanceKm: 8.4
  },
  {
    icon: CalendarDays,
    tone: "teal",
    title: "Free health checkup — Sunday 10am",
    meta: "RWA · Baner community ground",
    distance: "14.8 km away",
    distanceKm: 14.8
  },
  {
    icon: Megaphone,
    tone: "yellow",
    title: "Water supply cut in Peth areas 2-6pm",
    meta: "Municipal notice · 45 min ago · 94 views",
    distance: "6.5 km away",
    distanceKm: 6.5
  },
  {
    icon: Wrench,
    tone: "blue",
    title: "Looking for a dog walker in Viman Nagar",
    meta: "Sneha M. · 1 hr ago · 2 offers",
    distance: "18.6 km away",
    distanceKm: 18.6
  },
  {
    icon: ShieldAlert,
    tone: "orange",
    title: "Streetlight cluster out near Hadapsar",
    meta: "Rohan T. · 22 min ago · Urgent",
    distance: "27.3 km away",
    distanceKm: 27.3
  },
  {
    icon: Search,
    tone: "pink",
    title: "Lost wallet reported near Hinjewadi Phase 1",
    meta: "Tanvi P. · 34 min ago · 11 shares",
    distance: "38.7 km away",
    distanceKm: 38.7
  },
  {
    icon: CalendarDays,
    tone: "teal",
    title: "Sinhagad cleanup drive this weekend",
    meta: "Volunteer group · 62 going",
    distance: "46.2 km away",
    distanceKm: 46.2
  }
];

const features: Array<{ icon: LucideIcon; title: string; copy: string; tags: string[]; tone: string }> = [
  { icon: Radar, title: "We find you. Instantly.", copy: "GPS auto-detection. No address forms. Open the app and your map is ready.", tags: ["Auto", "No Signup", "Instant"], tone: "teal" },
  { icon: Camera, title: "Spot it. Snap it. Send it.", copy: "Report a pothole, broken pipe, or garbage dump in 10 seconds flat. Your neighbors see it instantly.", tags: ["Photo", "GPS Pin", "10 sec"], tone: "coral" },
  { icon: MessageCircleQuestion, title: "Ask the locals. They know.", copy: "Post a question. Only people within your radius see it and reply. Like search, but actually local.", tags: ["Hyperlocal Q&A", "Radius-locked"], tone: "purple" },
  { icon: Handshake, title: "Lend a hand. Earn trust.", copy: "Answer your neighbors' questions. Get upvoted. Become the person who knows.", tags: ["Trust Score", "Upvotes", "Leaderboard"], tone: "yellow" },
  { icon: Wrench, title: "Find anyone. Hire anyone.", copy: "Plumbers, tutors, electricians, dog walkers — rated by actual neighbors, not bots.", tags: ["Services", "Rated", "Nearby"], tone: "pink" },
  { icon: CalendarDays, title: "Block parties. RWA meets. Garage sales.", copy: "Create or discover events near you. RSVP, share, and get reminded.", tags: ["Events", "RSVP", "Reminders"], tone: "teal" },
  { icon: ShieldAlert, title: "When it matters, you know first.", copy: "Suspicious activity, power cuts, road blocks — real-time alerts pushed to your radius.", tags: ["Real-time", "Urgent", "Push"], tone: "coral" },
  { icon: Search, title: "Lost something? Found someone.", copy: "Post a lost pet, wallet, or keys. Smart matching connects lost and found.", tags: ["Pets", "Items", "Smart Match"], tone: "yellow" }
];

const posts = [
  ["Road Issue", "Massive pothole on FC Road — almost fell off my scooter", "Deepak S.", "📍 1.2 km", "🔺 42", "💬 6"],
  ["Query", "Any good yoga classes near Kothrud? Morning batch preferred", "Kavitha R.", "📍 3.8 km", "💬 11 answers", ""],
  ["Event", "Diwali mela this Saturday at Baner community ground — stalls, food, music", "RWA", "📍 12.1 km", "👥 89 going", ""],
  ["Lost Pet", "MISSING: Golden retriever, answers to Bruno. Last seen near DP Road at 4pm", "Aishwarya K.", "📍 0.6 km", "🔁 34 shares", ""],
  ["Service", "Best plumber ever — Raju from Karve Nagar. Fixed my bathroom in 2 hours.", "Nitin M.", "📍 4.5 km", "🔺 67", ""],
  ["Safety", "Streetlight outage near Hadapsar junction — please be careful tonight.", "Anonymous", "📍 27.3 km", "🔴 Urgent", "🔁 112 shares"]
];

export default function HomePage() {
  const [radius, setRadius] = useState(10);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [place, setPlace] = useState("Pune");
  const [toast, setToast] = useState("");
  const [showTop, setShowTop] = useState(false);
  const [onlineCount, setOnlineCount] = useState(247);
  const [reportOpen, setReportOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const scrollPercent = useTransform(progress, (latest) => `${Math.round(latest * 100)}%`);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setOnlineCount((count) => Math.max(220, Math.min(275, count + Math.floor(Math.random() * 11) - 5)));
    }, 10000);
    return () => window.clearInterval(timer);
  }, []);

  const getDetectedPlace = async (latitude: number, longitude: number) => {
    const isPuneArea = latitude >= 18.35 && latitude <= 18.75 && longitude >= 73.65 && longitude <= 74.1;
    const fallbackPlace = isPuneArea ? "Pune, Maharashtra" : "Your current location";
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

    if (!apiKey) return fallbackPlace;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );
      const data = await response.json();
      const components = data.results?.[0]?.address_components ?? [];
      const city = components.find((component: { types: string[] }) =>
        component.types.includes("locality") || component.types.includes("administrative_area_level_3")
      )?.long_name;
      const state = components.find((component: { types: string[] }) =>
        component.types.includes("administrative_area_level_1")
      )?.long_name;

      if (city && state) return `${city}, ${state}`;
      if (city) return city;
    } catch {
      return fallbackPlace;
    }

    return fallbackPlace;
  };

  const detectLocation = () => {
    setLocationStatus("loading");
    setToast("Finding your location...\nHang tight.");

    if (!navigator.geolocation) {
      setLocationStatus("error");
      setToast("Couldn't detect your location\nPlease allow location access or enter manually.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const detectedPlace = await getDetectedPlace(position.coords.latitude, position.coords.longitude);
        setLocationStatus("done");
        setPlace(detectedPlace);
        setToast(`Found you — ${detectedPlace}\nLoading nearby reports...`);
      },
      () => {
        setLocationStatus("error");
        setPlace("Pune");
        setToast("Couldn't detect your location\nShowing Pune as the default area.");
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  };

  return (
    <div className="fms-page min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <a className="fms-skip-link" href="#main-content">Skip to main content</a>
      <div className="fms-scroll-wrap">
        <motion.div className="fms-scroll-progress" style={{ scaleX: progress }} />
        <motion.span>{scrollPercent}</motion.span>
      </div>
      <div className="fms-image-bg" aria-hidden="true" />
      <div className="fms-map-overlay" aria-hidden="true" />

      <LandingNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} onDetect={detectLocation} locationStatus={locationStatus} place={place} radius={radius} />

      <main id="main-content" className="relative z-10">
        <HeroSection radius={radius} setRadius={setRadius} onDetect={detectLocation} locationStatus={locationStatus} place={place} />
        <LocationMapSection />
        <FeaturesGrid />
        <AskAnswerSection radius={radius} />
        <HowItWorks />
        <CommunityFeed />
        <StatsSection />
        <FinalCTA />
      </main>

      <SiteFooter />
      <PeopleOnlineIndicator count={onlineCount} />
      <ReportFab open={reportOpen} setOpen={setReportOpen} />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onAnimationComplete={() => window.setTimeout(() => setToast(""), 3600)}
            className={cn("fms-toast", locationStatus === "done" && "success", locationStatus === "error" && "error")}
            role="status"
          >
            <MapPin size={17} />
            <span>{toast.split("\n").map((line) => <b key={line}>{line}</b>)}</span>
            {locationStatus === "error" && <a href="#location-map">Enter manually →</a>}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            className="fms-back-top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <ChevronUp size={18} /> Top
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function LandingNav({ menuOpen, setMenuOpen, onDetect, locationStatus, place, radius }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void; onDetect: () => void; locationStatus: string; place: string; radius: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [latestIndex, setLatestIndex] = useState(0);
  const nearbyUpdates = useMemo(() => liveCards.filter((card) => card.distanceKm <= radius), [radius]);
  const latestUpdate = nearbyUpdates[latestIndex % Math.max(nearbyUpdates.length, 1)];
  const LatestUpdateIcon = latestUpdate?.icon;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLatestIndex((index) => (index + 1) % Math.max(nearbyUpdates.length, 1));
    }, 6500);
    return () => window.clearInterval(timer);
  }, [nearbyUpdates.length]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className={cn("fms-nav mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6", scrolled && "fms-nav-scrolled")} aria-label="Primary navigation">
        <Link href="/" className="fms-logo" aria-label="FixMySpot home">
          <span><MapPin size={22} fill="currentColor" /></span>
          FixMySpot
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map(([label, href], index) => (
            <a key={label} href={`#${href}`} className={cn("fms-nav-link", index === 0 && "active")}>
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="fms-notification-wrap">
            <button
              type="button"
              className={cn("fms-notification-button", notificationsOpen && "active")}
              aria-label="Nearby update notifications"
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen((open) => !open)}
            >
              <Bell size={18} />
              <span>{nearbyUpdates.length}</span>
            </button>
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  className="fms-notification-panel"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="fms-notification-head">
                    <strong>Nearby updates</strong>
                    <span>Within {radius} km</span>
                  </div>
                  {latestUpdate && (
                    <article className="fms-notification-live">
                      <span className={cn("fms-feed-icon", `tone-${latestUpdate.tone}`)}>
                        {LatestUpdateIcon && <LatestUpdateIcon size={18} />}
                      </span>
                      <div>
                        <em>Just now</em>
                        <strong>{latestUpdate.title}</strong>
                        <small>{latestUpdate.meta} · {latestUpdate.distance}</small>
                      </div>
                    </article>
                  )}
                  <div className="fms-notification-list">
                    {nearbyUpdates.slice(0, 4).map((update) => (
                      <article key={update.title}>
                        <b>{update.title}</b>
                        <span>{update.distance} · visible in your radius</span>
                      </article>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href="#community-feed" className="fms-feed-jump">
            <Navigation size={17} />
            Live Feed
          </a>
          <ThemeToggle className="fms-theme-toggle" />
          <button type="button" className={cn("fms-button fms-button-primary", locationStatus === "done" && "fms-button-success")} onClick={onDetect}>
            <LocateFixed size={17} className={locationStatus === "loading" ? "animate-spin" : ""} />
            {locationStatus === "loading" ? "Finding you..." : locationStatus === "done" ? `✓ ${place}` : "Show My Neighborhood"}
            {locationStatus !== "done" && <ArrowRight size={17} />}
          </button>
        </div>

        <button type="button" className="fms-menu-button lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fms-mobile-menu lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {navLinks.map(([label, href], index) => (
              <motion.a
                key={label}
                href={`#${href}`}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </motion.a>
            ))}
            <button type="button" className="fms-button fms-button-primary" onClick={onDetect}>
              Show My Neighborhood <ArrowRight size={18} />
            </button>
            <div className="fms-mobile-notifications">
              <strong>{nearbyUpdates.length} nearby updates</strong>
              <span>Instant alerts are shown when posts fall inside your {radius} km radius.</span>
            </div>
            <ThemeToggle className="fms-mobile-theme-toggle" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection({ radius, setRadius, onDetect, locationStatus, place }: { radius: number; setRadius: (value: number) => void; onDetect: () => void; locationStatus: string; place: string }) {
  const nearbyCards = useMemo(() => liveCards.filter((card) => card.distanceKm <= radius), [radius]);
  const ctaText = locationStatus === "loading" ? "Finding you..." : locationStatus === "done" ? `${place} — ${nearbyCards.length} issues nearby` : locationStatus === "error" ? "Couldn't detect — try manually" : "Show My Neighborhood";
  const scrollingCards = useMemo(() => [...nearbyCards, ...nearbyCards], [nearbyCards]);
  const radiusProgress = ((radius - 10) / 40) * 100;
  const heroMapStyle = {
    "--radius-scale": 0.62 + radiusProgress / 100 * 0.58
  } as CSSProperties;

  return (
    <section id="explore-map" className="fms-section fms-hero min-h-screen" style={heroMapStyle}>
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-16 pt-28 lg:grid-cols-[0.9fr_1.1fr] lg:pt-24 xl:gap-16">
        <div className="fms-hero-copy">
          <motion.p className="fms-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <MapPin size={15} /> LIVE WITHIN {radius} KM
          </motion.p>
          <motion.h1 className="fms-hero-title">
            <motion.span initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, type: "spring", stiffness: 120, damping: 16 }}>
              See what needs fixing.
            </motion.span>
            <motion.span className="fms-gradient-text" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, type: "spring", stiffness: 120, damping: 16 }}>
              Rally your block.
            </motion.span>
          </motion.h1>
          <motion.p className="fms-hero-subcopy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
            <span className="block">Real people. Real problems. One clear map.</span>
            <span className="mt-1 block text-[0.95rem]">Drag the radius to see more.</span>
          </motion.p>
          <div className="mt-8 max-w-xl">
            <RadiusSlider value={radius} onChange={setRadius} />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" className={cn("fms-button fms-button-primary fms-hero-cta", locationStatus === "done" && "fms-button-success", locationStatus === "error" && "fms-button-error")} onClick={onDetect}>
              <Crosshair size={19} className={locationStatus === "loading" ? "animate-spin" : "fms-pulse-icon"} /> {ctaText}
            </button>
            <a href="#location-map" className="fms-button fms-button-ghost fms-arrow-link">Explore the Map <ArrowRight size={18} /></a>
          </div>
          <p className="mt-5 text-[13px] font-bold text-slate-300">
            <StatSnippet target={12400} suffix="+" /> issues fixed · <StatSnippet target={3200} suffix="+" /> neighborhoods · 4.8★ community rating
          </p>
        </div>

        <aside className="fms-hero-feed" aria-label="Live neighborhood reports">
          <div className="fms-hero-map-radar" aria-hidden="true">
            <span className="fms-radar-center"><MapPin size={18} fill="currentColor" /></span>
            <span className="fms-radar-ring" />
            {liveCards.map((card, index) => {
              const Icon = card.icon;
              const visible = card.distanceKm <= radius;
              return (
                <span
                  key={card.title}
                  className={cn("fms-radar-pin", `tone-${card.tone}`, visible && "visible")}
                  style={{ "--pin-angle": `${index * 47 - 24}deg`, "--pin-distance": `${34 + card.distanceKm * 1.25}px` } as CSSProperties}
                >
                  <Icon size={14} />
                </span>
              );
            })}
          </div>
          <motion.div className="fms-live-panel" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-black">What&apos;s happening nearby</h2>
                <p className="mt-1 text-xs font-bold text-slate-400">Showing posts inside your {radius} km Pune radius</p>
              </div>
              <span className="fms-active-pill">{nearbyCards.length} active</span>
            </div>
            <div className="fms-feed-window" aria-live="polite">
              <div className="fms-feed-track">
                {scrollingCards.length > 0
                  ? scrollingCards.map((card, index) => (
                      <FloatingFeedCard key={`${card.title}-${index}`} card={card} />
                    ))
                  : <div className="fms-feed-empty">No posts in this radius yet. Expand the slider to see more of Pune.</div>}
              </div>
            </div>
          </motion.div>
          <a href="#community-feed" className="fms-scroll-cue">
            <ArrowRight size={16} /> See what else FixMySpot can do
          </a>
        </aside>
      </div>
    </section>
  );
}

function FloatingFeedCard({ card }: { card: (typeof liveCards)[number] }) {
  const Icon = card.icon;
  return (
    <article
      className="fms-feed-alert"
    >
      <span className={cn("fms-feed-icon", `tone-${card.tone}`)}><Icon size={22} /></span>
      <span className="min-w-0 flex-1">
        <strong>{card.title}</strong>
        <small>{card.meta}</small>
      </span>
      <em>{card.distance}</em>
    </article>
  );
}

function LocationMapSection() {
  return <CommunityMap />;
}

function FeaturesGrid() {
  return (
    <MotionSection id="services" className="fms-section px-4 py-24">
      <SectionHeading eyebrow="Features" title="One app. Every local problem." copy="Report. Ask. Find. Help. All within your radius." />
      <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article key={feature.title} className={cn("fms-card", `fms-card-${feature.tone}`)} initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
              <span className={cn("fms-feature-icon", `tone-${feature.tone}`)}><Icon size={28} /></span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              <div className="fms-feature-tags">
                {feature.tags.map((tag) => <em key={tag}>{tag}</em>)}
              </div>
            </motion.article>
          );
        })}
      </div>
    </MotionSection>
  );
}

function AskAnswerSection({ radius }: { radius: number }) {
  const [tag, setTag] = useState("💬 General");
  const examples = ["Is the Sunday market still on this week?", "Good dentist near Deccan Gymkhana?", "Anyone else facing water pressure issues?", "Best coaching class for 10th grade nearby?", "Is the new cafe on FC Road any good?"];
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setExampleIndex((index) => (index + 1) % examples.length), 3000);
    return () => window.clearInterval(timer);
  }, [examples.length]);

  return (
    <MotionSection id="ask-answer" className="fms-section px-4 py-24">
      <SectionHeading eyebrow="Ask" title="Ask your street. Get real answers." />
      <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="fms-panel">
          <h3>What do you want to know?</h3>
          <textarea readOnly value={examples[exampleIndex]} aria-label="Example local query" />
          <div className="mt-4 flex flex-wrap gap-2">
            {["🚧 Issue", "📅 Event", "🔧 Service", "🛡️ Safety", "💬 General", "🐾 Lost/Found"].map((item) => (
              <button key={item} type="button" onClick={() => setTag(item)} className={cn("fms-tag", tag === item && "active")}>{item}</button>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-slate-400">Only your neighbors within {radius} km will see this</p>
          <button type="button" className="fms-button fms-button-primary mt-6">Ask My Neighbors <ArrowRight size={18} /></button>
        </div>
        <div className="fms-panel">
          <h3>Live Answer Thread</h3>
          <div className="mt-6 space-y-4">
            <article className="rounded-[20px] border border-white/12 bg-white/[0.04] p-4">
              <strong>Q: Is the Saras Baug gate near Swargate open before 6am?</strong>
              <p className="mt-2 text-sm text-slate-400">📍 3.2 km from you · 3 neighbors answered · Asked 2h ago</p>
            </article>
            {[
              ["Meena R. · 0.4 km away", "Yes! I jog there every morning. Gate 1 opens at 5:30. Gate 2 is locked till 7.", true],
              ["Rohan T. · 1.1 km away", "Closes at 8:30pm now. They changed it after the renovation last month.", false],
              ["Sneha M. · 2.3 km away", "The new track along the lake side is 🔥 Go early to avoid the crowd.", false]
            ].map(([name, answer, best], index) => (
              <motion.article key={name as string} className="fms-answer" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}>
                <span />
                <div>
                  <strong>{name as string} {best && <em><CheckCircle2 size={14} /> Best Answer</em>}</strong>
                  <p>{answer as string}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function HowItWorks() {
  const steps = [
    [MapPin, "Open the app", "We detect your location automatically. No forms. No signup. Just open."],
    [Compass, "See what's around you", "Issues, questions, events, safety — all live on your map within your radius."],
    [Handshake, "Jump in and help", "Report a problem. Answer a question. Share a service. Earn your neighbor's trust."]
  ] as const;

  return (
    <MotionSection id="how-it-works" className="fms-section px-4 py-24">
      <SectionHeading eyebrow="How it works" title="Three taps. That's it." />
      <div className="fms-steps mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-3">
        {steps.map(([Icon, title, copy], index) => (
          <article key={title} className="fms-step">
            <b>0{index + 1}</b>
            <Icon size={34} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </MotionSection>
  );
}

function CommunityFeed() {
  return (
    <MotionSection id="community-feed" className="fms-section px-4 py-24">
      <SectionHeading eyebrow="Live feed" title="Live from your neighborhood." copy="Scroll through real-time posts from people within your radius." />
      <div className="fms-marquee mt-12" aria-label="Live community posts">
        <div>
          {[...posts, ...posts].map((post, index) => (
            <article key={`${post[0]}-${index}`} className="fms-post">
              <span className="fms-avatar">{post[2].slice(0, 1)}</span>
              <div>
                <strong>{post[2]} <em>{post[3]}</em></strong>
                <h3>{post[1]}</h3>
                <p><span>{post[0]}</span> · {post[4]} · {post[5]}</p>
                <div><button>🔺 Helpful</button><button>💬 Reply</button><button>📤 Share</button><button>🚩 Report</button></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function StatsSection() {
  const stats = [
    [12400, "Issues fixed by neighbors", "+"],
    [3200, "Neighborhoods on the map", "+"],
    [89000, "Questions answered locally", "+"],
    [48, "Avg. neighbor trust score", "★"]
  ] as const;
  const testimonials = [
    ["Ananya S.", "📍 Kothrud, Pune", "Reported a broken streetlight at 10pm. Next morning, it was already tagged by the municipality. This app is real."],
    ["Rahul M.", "📍 Kothrud, Pune", "My dog went missing at 7am. By 9am a neighbor 800 meters away messaged saying he found him. FixMySpot saved us."],
    ["Divya T.", "📍 Viman Nagar, Pune", "Asked for electrician recommendations. Got 3 replies from neighbors with actual phone numbers and reviews. Way better than searching online."],
    ["Vikram P.", "📍 Baner, Pune", "Someone posted about a water pipe burst on our lane. Within 20 minutes the whole street knew and we collectively called PMC. Fixed same day."]
  ];

  return (
    <MotionSection id="safety" className="fms-section px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 rounded-[24px] border border-white/12 bg-white/[0.05] p-5 backdrop-blur-2xl md:grid-cols-4">
          {stats.map(([target, label, suffix]) => <StatCounter key={label} target={target} label={label} suffix={suffix} />)}
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-4">
          {testimonials.map(([name, city, quote]) => (
            <figure key={name} className="fms-testimonial">
              <div className="mb-4 flex gap-1 text-[var(--accent-yellow)]">{[...Array(5)].map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</div>
              <blockquote>&ldquo;{quote}&rdquo;</blockquote>
              <figcaption>{name} <span>{city}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function FinalCTA() {
  return (
    <section id="final-cta" className="fms-section relative px-4 py-28">
      <div className="absolute inset-0 bg-[#070711]/72" />
      <div className="relative z-10 mx-auto max-w-2xl rounded-[24px] border border-white/12 bg-white/[0.06] p-7 text-center shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10">
        <span className="fms-mini-pin left-0 top-8" />
        <span className="fms-mini-pin right-8 top-0 tone-yellow" />
        <span className="fms-mini-pin bottom-8 right-0 tone-teal" />
        <h2 className="font-display text-4xl font-black leading-tight sm:text-6xl">Your street has a voice now.</h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">Join the neighbors who are already fixing things together.</p>
        <form className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="cta-email">Email address</label>
          <div className="fms-email-field">
            <Mail size={18} />
            <input id="cta-email" type="email" placeholder="your@email.com" />
          </div>
          <button type="submit" className="fms-button fms-button-primary">Open My Map <ArrowRight size={18} /></button>
        </form>
        <p className="mt-4 text-sm font-bold text-slate-400">Free forever. No spam. Your data stays local.</p>
        <p className="mt-2 text-xs font-bold text-slate-500">Or just open the app — no account needed to browse.</p>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="fms-footer relative z-10 px-4 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="fms-logo"><span><MapPin size={22} fill="currentColor" /></span>FixMySpot</Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Your block. Your voice. Your fix.</p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm font-bold text-slate-400 sm:grid-cols-4">
          {[
            ["Product", ["Map", "Feed", "Ask", "Find Services", "Alerts"]],
            ["Neighbors", ["Report an Issue", "Answer Questions", "Post Event", "Lost & Found", "Trust Score"]],
            ["About", ["Our Story", "How It Works", "Blog", "Careers", "Press Kit"]],
            ["Legal", ["Privacy", "Terms", "Community Guidelines", "Contact"]]
          ].map(([group, links]) => (
            <div key={group as string} className="grid gap-3">
              <p className="font-black text-white">{group}</p>
              {(links as string[]).map((link) => <a key={link} href="#explore-map">{link}</a>)}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-xs font-bold text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2025 FixMySpot. Made with 🤝 for every neighborhood.</p>
        <div className="flex gap-3 text-slate-300">
          <a href="#" aria-label="FixMySpot on X"><Sparkles size={18} /></a>
          <a href="#" aria-label="FixMySpot on Instagram"><Instagram size={18} /></a>
          <a href="#" aria-label="FixMySpot on LinkedIn"><Linkedin size={18} /></a>
        </div>
      </div>
    </footer>
  );
}

function RadiusSlider({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const percentage = ((value - 10) / 40) * 100;

  return (
    <div className="fms-radius">
      <label htmlFor="radius-slider">Your radius</label>
      <div className="fms-radius-track-wrap">
        <span className="fms-radius-value" style={{ left: `${percentage}%` }}>{value} km</span>
        <input id="radius-slider" type="range" min={10} max={50} step={5} value={value} onChange={(event) => onChange(Number(event.target.value))} style={{ "--value": `${percentage}%` } as CSSProperties} />
      </div>
      <div className="fms-radius-scale" aria-hidden="true"><span>10 km</span><span>50 km</span></div>
      <p>Neighbors within this range can see your posts — and you can see theirs.</p>
    </div>
  );
}

function MotionSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section id={id} className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65 }}>
      <SectionDivider />
      {children}
    </motion.section>
  );
}

function SectionDivider() {
  return (
    <svg className="fms-section-divider" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 46C180 12 334 12 512 42C721 77 850 75 1035 39C1205 6 1325 14 1440 36V0H0Z" />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--accent-teal)]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-tight">{title}</h2>
      {copy && <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">{copy}</p>}
    </div>
  );
}

function StatCounter({ target, label, suffix }: { target: number; label: string; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(inView ? target : 0, { stiffness: 80, damping: 20 });
  const value = useTransform(spring, (latest) => suffix === "★" ? (latest / 10).toFixed(1) + suffix : Math.round(latest).toLocaleString() + suffix);
  return (
    <div ref={ref} className="fms-stat">
      <motion.strong>{value}</motion.strong>
      <span>{label}</span>
    </div>
  );
}

function StatSnippet({ target, suffix }: { target: number; suffix: string }) {
  const spring = useSpring(target, { stiffness: 70, damping: 18 });
  const value = useTransform(spring, (latest) => `${Math.round(latest).toLocaleString()}${suffix}`);
  return <motion.span>{value}</motion.span>;
}

function PeopleOnlineIndicator({ count }: { count: number }) {
  return (
    <div className="fms-online-pill" aria-live="polite">
      <span />
      {count} neighbors online near you
    </div>
  );
}

function ReportFab({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const categories = ["Road", "Water", "Garbage", "Light", "Safety", "Other"];

  return (
    <>
      <button type="button" className="fms-report-fab" onClick={() => setOpen(true)} aria-label="Report an issue">
        <Plus size={28} />
        <span>Report something near you</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="fms-report-modal-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="report-modal-title">
            <motion.div className="fms-report-modal" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }}>
              <button type="button" className="fms-report-close" onClick={() => setOpen(false)} aria-label="Close report form"><X size={18} /></button>
              <h2 id="report-modal-title">Report an Issue</h2>
              <p>Tell your neighbors what needs fixing.</p>
              <div className="fms-report-categories">
                {categories.map((category, index) => <button key={category} type="button" className={index === 0 ? "active" : ""}>{category}</button>)}
              </div>
              <label className="fms-upload-area">
                <Camera size={24} />
                <span>Add a photo</span>
                <input type="file" accept="image/*" />
              </label>
              <textarea placeholder="What happened? Add a quick description." />
              <div className="fms-report-location"><MapPin size={16} /> Kothrud, Pune</div>
              <button type="button" className="fms-button fms-button-primary w-full" onClick={() => setOpen(false)}>Submit Report <ArrowRight size={18} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
