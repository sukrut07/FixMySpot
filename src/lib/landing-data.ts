import {
  CalendarDays,
  Camera,
  CircleHelp,
  Handshake,
  MapPin,
  MessageCircleQuestion,
  Radar,
  Search,
  ShieldAlert,
  Wrench,
  type LucideIcon
} from "lucide-react";

export type FeedItem = {
  type: string;
  title: string;
  meta: string;
  distance: string;
  tone: "coral" | "yellow" | "teal" | "purple" | "blue";
};

export const heroFeed: FeedItem[] = [
  {
    type: "Road Issue",
    title: "Pothole on MG Road - Lane 2",
    meta: "Reported by Arjun K. - 14 min ago - 28 upvotes",
    distance: "2.3 km from you",
    tone: "coral"
  },
  {
    type: "Community Query",
    title: "Anyone know a good electrician near Kothrud?",
    meta: "Asked by Priya S. - 3 hrs ago - 7 answers",
    distance: "4.1 km from you",
    tone: "yellow"
  },
  {
    type: "Event",
    title: "Free health checkup camp - Sunday 10am",
    meta: "Posted by RWA - Baner community ground",
    distance: "1.8 km from you",
    tone: "teal"
  }
];

export const reportPins = [
  { label: "Pothole on Repair Road", meta: "2 hrs ago - 14 upvotes", x: 35, y: 34, tone: "coral", icon: "!" },
  { label: "Block Party tonight 7pm", meta: "8 people going", x: 58, y: 23, tone: "yellow", icon: "*" },
  { label: "Good plumber?", meta: "3 replies", x: 70, y: 47, tone: "teal", icon: "?" },
  { label: "Power outage", meta: "service request", x: 43, y: 62, tone: "purple", icon: "i" },
  { label: "Safety alert", meta: "verified by 4 neighbors", x: 78, y: 70, tone: "blue", icon: "!" },
  { label: "Park cleanup", meta: "Sunday 8am", x: 24, y: 73, tone: "teal", icon: "+" }
];

export const features: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  accent: string;
}> = [
  {
    icon: Radar,
    title: "Smart Locality Detection",
    description: "FixMySpot uses GPS + IP fallback to instantly detect your neighborhood. No manual setup. Just open and see what's happening around you.",
    tag: "Auto - No signup needed",
    accent: "#14B8A6"
  },
  {
    icon: Camera,
    title: "Report Local Issues",
    description: "Spotted a pothole, broken pipe, or illegal dumping? Report it in 10 seconds with photo, location, and category.",
    tag: "Photo - GPS - Category",
    accent: "#F87171"
  },
  {
    icon: MessageCircleQuestion,
    title: "Ask Your Neighborhood",
    description: "Post a question visible only to people within your radius and get answers from people who actually know the area.",
    tag: "Hyperlocal Q&A",
    accent: "#7C3AED"
  },
  {
    icon: Handshake,
    title: "Answer & Help",
    description: "Browse open questions in your area and answer them. Build reputation points as a trusted local.",
    tag: "Reputation - Trust Score",
    accent: "#FBBF24"
  },
  {
    icon: Wrench,
    title: "Service Discovery",
    description: "Find plumbers, electricians, tutors, mechanics, and more. Filter by rating, distance, and availability.",
    tag: "Services - Near You",
    accent: "#EC4899"
  },
  {
    icon: CalendarDays,
    title: "Community Events",
    description: "Discover and create local events, park meetups, vaccination drives, RWA meetings, and garage sales.",
    tag: "Events - RSVP - Reminders",
    accent: "#14B8A6"
  },
  {
    icon: ShieldAlert,
    title: "Safety Alerts",
    description: "Real-time neighborhood safety alerts for suspicious activity, accidents, road closures, and power outages.",
    tag: "Real-time - Urgent",
    accent: "#F87171"
  },
  {
    icon: Search,
    title: "Lost & Found",
    description: "Lost your pet or found someone's keys? Reach everyone within your radius instantly with smart matching.",
    tag: "Pets - Items - People",
    accent: "#FBBF24"
  }
];

export const communityPosts = [
  ["Road issue", "Broken divider near University Road", "Arjun K.", "1.2 km", "18 min", "38"],
  ["Query", "Best weekend pediatrician near HSR?", "Priya S.", "3.1 km", "45 min", "12"],
  ["Event", "Sunday lake cleanup, gloves provided", "RWA East", "2.4 km", "1 hr", "64"],
  ["Lost pet", "Golden retriever seen near 5th Main", "Meena R.", "0.8 km", "2 hrs", "21"],
  ["Service", "Electrician review: fast and fair", "Rahul M.", "4.0 km", "3 hrs", "9"],
  ["Safety", "Streetlight cluster out by Gate 2", "Divya T.", "1.7 km", "4 hrs", "44"]
];

export const stats = [
  ["12400", "Issues Fixed", "+"],
  ["3200", "Active Neighborhoods", "+"],
  ["89000", "Queries Answered", "+"],
  ["4.8", "Community Rating", "★"]
];

export const testimonials = [
  ["Ananya S.", "Pune", "I reported a broken streetlight at 10pm and by morning the municipality had marked it. FixMySpot actually works!"],
  ["Rahul M.", "Pune", "Found my lost dog through FixMySpot within 2 hours. A neighbor 800m away had spotted him. Incredible."],
  ["Divya T.", "Pune", "The local Q&A is genuinely useful. Got 3 electrician recommendations with actual reviews from neighbors."]
];

export const mapReports = [
  { title: "Broken streetlight", category: "Road", dx: 0.008, dy: 0.008, tone: "#F87171" },
  { title: "Waterlogging on Main St", category: "Road", dx: -0.024, dy: 0.003, tone: "#FBBF24" },
  { title: "Park cleanup drive Sunday", category: "Event", dx: 0.002, dy: -0.031, tone: "#14B8A6" },
  { title: "Need plumber recommendation", category: "Query", dx: -0.008, dy: 0.009, tone: "#38BDF8" },
  { title: "Suspicious activity reported", category: "Safety", dx: 0.027, dy: -0.02, tone: "#A855F7" }
];

export const navLinks = ["Explore Map", "Community Feed", "Ask & Answer", "Services", "Safety"];

export const sectionIds: Record<string, string> = {
  "Explore Map": "live-map",
  "Community Feed": "community-feed",
  "Ask & Answer": "ask-answer",
  Services: "features",
  Safety: "features"
};
