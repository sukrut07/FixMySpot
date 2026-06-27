import type { Analytics, Issue, Profile } from "@/types";

export const demoProfiles: Profile[] = [
  {
    id: "u1",
    full_name: "Aarav Mehta",
    email: "aarav@example.com",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    locality: "Bandra West",
    city: "Mumbai",
    pin_code: "400050",
    total_reports: 42,
    resolved_reports: 18,
    xp_points: 4280,
    report_streak: 12,
    badges: ["Founding Reporter", "Street Sentinel", "Rapid Validator"]
  },
  {
    id: "u2",
    full_name: "Nisha Rao",
    email: "nisha@example.com",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    locality: "Andheri East",
    city: "Mumbai",
    pin_code: "400069",
    total_reports: 31,
    resolved_reports: 14,
    xp_points: 3310,
    report_streak: 8,
    badges: ["Drainage Detective", "Helpful Neighbor"]
  },
  {
    id: "u3",
    full_name: "Kabir Khan",
    email: "kabir@example.com",
    avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    locality: "Dadar",
    city: "Mumbai",
    pin_code: "400014",
    total_reports: 24,
    resolved_reports: 9,
    xp_points: 2480,
    report_streak: 5,
    badges: ["Pothole Pro"]
  }
];

export const demoIssues: Issue[] = [
  {
    id: "iss-101",
    title: "Deep pothole near SV Road signal",
    description: "Two-wheeler riders are swerving sharply during peak hours. The pothole is wide and filled with murky water after rain.",
    category: "pothole",
    severity: "high",
    status: "verified",
    lat: 19.0596,
    lng: 72.8295,
    address: "SV Road, Bandra West",
    locality: "Bandra West",
    image_urls: ["https://images.unsplash.com/photo-1597766353939-9c5da7c88f80?auto=format&fit=crop&w=1200&q=80"],
    ai_confidence: 0.91,
    priority_score: 84,
    upvote_count: 68,
    me_too_count: 21,
    comment_count: 4,
    created_at: "2026-06-22T08:30:00.000Z",
    reporter: demoProfiles[0],
    comments: [
      { id: "c1", issue_id: "iss-101", body: "Saw a scooter skid here yesterday evening.", created_at: "2026-06-23T09:00:00.000Z", author: demoProfiles[1] },
      { id: "c2", issue_id: "iss-101", body: "The ward office acknowledged a similar complaint last week.", created_at: "2026-06-24T12:20:00.000Z", author: demoProfiles[2] }
    ],
    timeline: [
      { id: "t1", status: "reported", note: "Issue reported with photo evidence.", created_at: "2026-06-22T08:30:00.000Z" },
      { id: "t2", status: "verified", note: "Community validation crossed 25 upvotes.", created_at: "2026-06-23T11:10:00.000Z" }
    ]
  },
  {
    id: "iss-102",
    title: "Garbage overflowing outside market lane",
    description: "Bins have not been cleared for two days and waste is blocking the pedestrian path.",
    category: "garbage",
    severity: "medium",
    status: "reported",
    lat: 19.1197,
    lng: 72.8464,
    address: "Market Lane, Andheri East",
    locality: "Andheri East",
    image_urls: ["https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1200&q=80"],
    ai_confidence: 0.88,
    priority_score: 62,
    upvote_count: 34,
    me_too_count: 12,
    comment_count: 2,
    created_at: "2026-06-24T07:10:00.000Z",
    reporter: demoProfiles[1],
    timeline: [{ id: "t3", status: "reported", note: "Garbage accumulation reported.", created_at: "2026-06-24T07:10:00.000Z" }]
  },
  {
    id: "iss-103",
    title: "Streetlight flickering near school gate",
    description: "The streetlight switches off for long stretches, leaving the crossing dark after 8 PM.",
    category: "streetlight",
    severity: "medium",
    status: "in_progress",
    lat: 19.0178,
    lng: 72.8478,
    address: "Tilak Road, Dadar",
    locality: "Dadar",
    image_urls: ["https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1200&q=80"],
    ai_confidence: 0.83,
    priority_score: 70,
    upvote_count: 45,
    me_too_count: 17,
    comment_count: 3,
    created_at: "2026-06-20T18:45:00.000Z",
    reporter: demoProfiles[2],
    timeline: [
      { id: "t4", status: "reported", note: "Streetlight issue reported.", created_at: "2026-06-20T18:45:00.000Z" },
      { id: "t5", status: "in_progress", note: "Electrical department ticket created.", created_at: "2026-06-25T10:00:00.000Z" }
    ]
  },
  {
    id: "iss-104",
    title: "Open drainage cover beside bus stop",
    description: "Drain cover is missing beside a crowded bus stop. Needs urgent barricade and replacement.",
    category: "drainage",
    severity: "critical",
    status: "verified",
    lat: 19.0863,
    lng: 72.8898,
    address: "Kurla Depot Road",
    locality: "Kurla",
    image_urls: ["https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80"],
    ai_confidence: 0.94,
    priority_score: 96,
    upvote_count: 103,
    me_too_count: 38,
    comment_count: 8,
    created_at: "2026-06-25T14:05:00.000Z",
    reporter: demoProfiles[0],
    timeline: [{ id: "t6", status: "reported", note: "Critical hazard reported.", created_at: "2026-06-25T14:05:00.000Z" }]
  },
  {
    id: "iss-105",
    title: "Water leak from main pipe",
    description: "Clean water has been flowing continuously into the lane since morning.",
    category: "water_leak",
    severity: "high",
    status: "resolved",
    lat: 19.033,
    lng: 72.8626,
    address: "Matunga East",
    locality: "Matunga",
    image_urls: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"],
    ai_confidence: 0.9,
    priority_score: 78,
    upvote_count: 52,
    me_too_count: 15,
    comment_count: 5,
    created_at: "2026-06-14T05:20:00.000Z",
    reporter: demoProfiles[1],
    timeline: [
      { id: "t7", status: "reported", note: "Leak reported.", created_at: "2026-06-14T05:20:00.000Z" },
      { id: "t8", status: "resolved", note: "Pipeline crew repaired the joint.", created_at: "2026-06-17T16:40:00.000Z" }
    ]
  }
];

export const demoAnalytics: Analytics = {
  total: demoIssues.length,
  resolved: demoIssues.filter((issue) => issue.status === "resolved").length,
  active: demoIssues.filter((issue) => issue.status !== "resolved").length,
  resolutionRate: Math.round((demoIssues.filter((issue) => issue.status === "resolved").length / demoIssues.length) * 100),
  byCategory: [
    { name: "Potholes", value: 34 },
    { name: "Garbage", value: 25 },
    { name: "Streetlights", value: 18 },
    { name: "Drainage", value: 14 },
    { name: "Water", value: 9 }
  ],
  trend: Array.from({ length: 10 }, (_, index) => ({ date: `Jun ${17 + index}`, issues: [5, 8, 6, 10, 9, 12, 14, 13, 16, 18][index] })),
  worstAreas: [
    { area: "Bandra West", issues: 32 },
    { area: "Andheri East", issues: 27 },
    { area: "Kurla", issues: 21 },
    { area: "Dadar", issues: 18 },
    { area: "Matunga", issues: 12 }
  ]
};
