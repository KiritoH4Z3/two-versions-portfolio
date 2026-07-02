// Static content — verbatim from the prototype logic class (renderVals).
// These never change at runtime, so they are plain typed constants, not state.

export type World = "landing" | "human" | "professional";

export interface Project {
  num: number;
  title: string;
  desc: string;
  tags: string[];
  metric: string;
  link: string;
  linkLabel: string;
}

export interface Stat {
  n: number;
  suf: string;
  l: string;
}

export interface Experience {
  role: string;
  org: string;
  detail: string;
}

export interface Hobby {
  name: string;
  tag: string;
  blurb: string;
  slot: string;
  img: string;
}

export interface FlagshipStep {
  label: string;
  title: string;
  body: string;
}

// Shape-identical to Stat on purpose — StatCell/useCountUp render these directly.
export interface FlagshipMetric {
  n: number;
  suf: string;
  l: string;
}

export interface Flagship {
  id: "quickquote" | "wajib";
  name: string;
  kicker: string;
  oneLiner: string;
  steps: FlagshipStep[];
  metrics: FlagshipMetric[];
  stack: string[];
  link?: string;
  linkLabel?: string;
  badge?: string;
  mock: "quote" | "dashboard";
  mockImg?: string; // set to a /assets path later to swap the CSS mock for a real screenshot
}

export interface ServiceItem {
  title: string;
  body: string;
}

export const CONTACT = {
  email: "ahazeq.mena@gmail.com",
  linkedin: "https://linkedin.com/in/abdullahmhazeq",
  github: "https://github.com/KiritoH4Z3",
  whatsapp: "https://wa.me/971507826347",
  resume: "/assets/Abdullah-Hazeq-Resume.pdf",
  footer: "ahazeq.mena@gmail.com · +971 507 826 347 (WhatsApp) · Dubai, UAE",
} as const;

export const skills: string[] = [
  "Agentic Workflows",
  "LLM Integration",
  "Product Engineering",
  "Next.js · Supabase",
  "Solution Scoping",
  "Python · SQL",
  "Automation (n8n · Make)",
  "Deep Learning",
];

export const marquee: string[] = [
  "AI Systems",
  "QuickQuote",
  "Leadership",
  "Sim Racing",
  "Wajib",
  "Published Research",
  "Photography",
  "Agentic Workflows",
  "Founder Mode",
  "Badminton",
  "Travel",
  "eSports Ops",
  "Go Karting",
  "Solutions",
];

export const stats: Stat[] = [
  { n: 20, suf: "+", l: "AI characters improved" },
  { n: 1, suf: "", l: "Published paper" },
  { n: 80, suf: "%", l: "Capstone accuracy" },
  { n: 2.5, suf: " yrs", l: "Leading 100+ people" },
  { n: 95, suf: "%", l: "Resolution rate" },
  { n: 3, suf: "", l: "Languages spoken" },
];

export const projects: Project[] = [
  {
    num: 1,
    title: "Deepfake Detection Framework",
    desc: "A hybrid EfficientNet + LSTM model that flags synthetic video, with Grad-CAM explainability to show how it decides. Full 8-month research lifecycle, run solo.",
    tags: ["EfficientNet", "LSTM", "Grad-CAM"],
    metric: "80% accuracy · Distinction",
    link: "https://github.com/KiritoH4Z3/Deepfake-Detection-Framework",
    linkLabel: "GitHub",
  },
  {
    num: 2,
    title: "AP Nav",
    desc: "An AI tool that forecasts campus congestion before it happens. Built end to end in a month, then pitched as an ROI business case straight to the University COO, who endorsed it.",
    tags: ["Random Forest", "scikit-learn", "ROI case"],
    metric: "Endorsed by the COO",
    link: "https://github.com/KiritoH4Z3/AP-Nav",
    linkLabel: "GitHub",
  },
  {
    num: 3,
    title: "Signal",
    desc: "An AI market-intelligence parser that turns noisy financial chatter into structured, actionable signal.",
    tags: ["LLM", "Parsing", "Markets"],
    metric: "AI market intelligence",
    link: "https://github.com/KiritoH4Z3/signal-ai-parser",
    linkLabel: "GitHub",
  },
  {
    num: 4,
    title: "Food Recommendation System",
    desc: "Peer-reviewed research as sole first author: a hybrid recommender (TF-IDF + collaborative filtering) that beat every single-method baseline. Published in JATI Journal, Vol. 8 No. 2.",
    tags: ["NLP", "Hybrid Filtering", "Published"],
    metric: "JATI Journal · 2024",
    link: "https://www.researchgate.net/publication/399692994_Food_Recommendation_System_Using_Hybrid_Filtering",
    linkLabel: "Read paper",
  },
];

export const FLAGSHIPS_HEADER = {
  label: "// FLAGSHIP_SYSTEMS",
  title: "Two products I'd bet my name on.",
  sub: "Not coursework. Not demos. Real systems solving expensive problems for real UAE businesses — built solo, tested hard.",
} as const;

export const flagships: Flagship[] = [
  {
    id: "quickquote",
    name: "QuickQuote",
    kicker: "// FLAGSHIP_01 · LIVE",
    oneLiner:
      "Messy request in. Branded, VAT-compliant quote out. About two minutes.",
    steps: [
      {
        label: "// PROBLEM",
        title: "Speed kills deals — the lack of it, anyway.",
        body: "Businesses rarely lose a deal on price. They lose it because their quote took twenty minutes and the other guy's took two. QuickQuote takes the email, the WhatsApp voice-of-chaos, the blurry forwarded PDF — and turns it into a quote before the client's coffee cools.",
      },
      {
        label: "// HOW_IT_WORKS",
        title: "AI reads. The engine does the math.",
        body: "The AI's only job is reading: it matches the mess against your own price catalog. Then a deterministic pricing engine — plain, tested server code — looks up the real prices, computes every total, applies VAT and renders one of six branded PDF templates.",
      },
      {
        label: "// TRUST_PRINCIPLE",
        title: "The AI is never trusted with money.",
        body: "It never even sees a price. Every dirham on that PDF comes from code I can test, not a model I have to hope about. 72 automated tests across 9 suites agree with me — including one suite whose entire job is trying to trick it. Default-deny row-level security, encrypted API keys, zero secrets in the browser.",
      },
    ],
    metrics: [
      { n: 72, suf: "", l: "Automated tests" },
      { n: 9, suf: "", l: "Test suites" },
      { n: 6, suf: "", l: "PDF templates" },
      { n: 2, suf: " min", l: "Down from a 20-minute process" },
    ],
    stack: ["Next.js 14", "TypeScript", "Supabase", "Gemini + Ollama"],
    link: "https://quickquote-qq.vercel.app",
    linkLabel: "See it live",
    mock: "quote",
  },
  {
    id: "wajib",
    name: "Wajib",
    kicker: "// FLAGSHIP_02 · PRIVATE BETA",
    badge: "PRIVATE BETA",
    oneLiner:
      "Every UAE government deadline your business has — computed, tracked, and politely nagging you before it gets expensive.",
    steps: [
      {
        label: "// PROBLEM",
        title: "68,000 businesses missed the same deadline.",
        body: "That's how many used the FTA's penalty-waiver program after missing one Corporate Tax deadline. That's not 68,000 careless owners — that's a missing system. So I built the system.",
      },
      {
        label: "// HOW_IT_WORKS",
        title: "It reads your paperwork so you don't have to.",
        body: "Upload your trade licence, VAT certificate, visas — Arabic or English, it doesn't mind. AI extracts the facts, then a versioned, tested rules engine computes every deadline you actually owe: Corporate Tax, VAT returns, licence renewal, WPS payroll, visas and Emirates ID — all on one dashboard, with a running total of fines avoided.",
      },
      {
        label: "// TRUST_PRINCIPLE",
        title: "Deadlines come from rules, not vibes.",
        body: "Same principle as QuickQuote: the AI reads documents, but every date on your dashboard comes from a rules engine with version history and tests — one that updates as UAE regulations change. Then it escalates at 90, 60, 30, 7 and 1 days out, on WhatsApp and email, because a compliance tool that's easy to ignore is just a fancier calendar.",
      },
    ],
    metrics: [
      { n: 68, suf: "k+", l: "Businesses hit by one missed deadline" },
      { n: 5, suf: "", l: "Alert escalation tiers" },
      { n: 6, suf: "", l: "Deadline types tracked" },
      { n: 2, suf: "", l: "Languages it reads" },
    ],
    stack: ["AI document extraction", "Rules engine", "WhatsApp + email alerts"],
    link: "https://wa.me/971507826347",
    linkLabel: "Request a demo",
    mock: "dashboard",
  },
];

export const SERVICES_HEADER = {
  label: "// TECH_AND_BUSINESS_SOLUTIONS",
  title: "I also build for you.",
  para1:
    "By day I ship my own products. In between, I run a freelance practice — Tech & Business Solutions — for startups and small teams who need real software without the agency invoice. You bring the problem; I scope it honestly, build it properly, and adjust to your budget. Yes, an engineer who asks about your budget first. In Dubai. I know.",
  para2:
    "It's becoming a registered company very soon, so this is your window to say you knew me before the paperwork. Until then it's just me — which means the person you talk to is the person who builds it.",
  ctaEmail: "Email me the problem",
  ctaWhatsApp: "WhatsApp me",
} as const;

export const services: ServiceItem[] = [
  {
    title: "AI features & automations",
    body: "The unglamorous kind that actually save hours every week.",
  },
  {
    title: "Quoting & ops tooling",
    body: "QuickQuote-style: your messy process, turned into a two-minute one.",
  },
  {
    title: "Compliance & back-office systems",
    body: "Wajib-style: deadlines, documents and rules engines that don't miss.",
  },
  {
    title: "MVPs that ship",
    body: "Scoped to what proves the idea — not to what pads the invoice.",
  },
];

export const experience: Experience[] = [
  {
    role: "AI Automation Analyst (Freelance)",
    org: "Self-Employed · Remote",
    detail:
      "Shipped 3 client AI-automation solutions to sign-off and cut reporting time 60% with Python + LLM pipelines pulling from 50+ sources.",
  },
  {
    role: "AI Ambassador",
    org: "Virtuals Protocol · Kuala Lumpur",
    detail:
      "Built real-time data pipelines feeding live context into AI characters which are often used in c.ai and acted as the bridge between the platform and 100+ community members learning to build AI.",
  },
  {
    role: "IT Intern",
    org: "Majid Al Futtaim · Riyadh",
    detail:
      "95% first-contact resolution across 100+ cases; Python and SQL automation cut repeat escalations 30% in month one.",
  },
  {
    role: "Head of Operations",
    org: "APU eSports · Kuala Lumpur",
    detail:
      "Directed a 100+ member organisation and a 12-person committee for 2 years, cutting on-site operational failures 70%.",
  },
];

export const hobbies: Hobby[] = [
  {
    name: "Competitive Gaming",
    tag: "Strategy under pressure",
    blurb:
      "Where my strategic brain meets high-pressure performance. It is also where I first learned to lead a team.",
    slot: "hobby-gaming",
    img: "/assets/hobby-gaming.jpg",
  },
  {
    name: "Sim Racing",
    tag: "Telemetry and instinct",
    blurb:
      "Braking points, racing lines, consistency. The analytical itch, scratched at speed.",
    slot: "hobby-sim",
    img: "/assets/sim-racing.png",
  },
  {
    name: "Go Karting",
    tag: "The real thing",
    blurb:
      "The raw, real-world version of the perfect lap. Data meets adrenaline.",
    slot: "hobby-kart",
    img: "/assets/hobby-kart.jpg",
  },
  {
    name: "Photography",
    tag: "Seeing in frames",
    blurb:
      "My quiet, creative counterpart. Composition, light and the patience to wait for the moment.",
    slot: "hobby-photo",
    img: "/assets/hobby-photo.jpg",
  },
  {
    name: "Travelling",
    tag: "Curious and humble",
    blurb:
      "New places, new people, new perspectives. Every trip rewires how I think about a problem.",
    slot: "hobby-travel",
    img: "/assets/hobby-travel.jpg",
  },
  {
    name: "Badminton",
    tag: "Fast and tactical",
    blurb:
      "Relentless, tactical, quick. If there's a rally to be won, I want in.",
    slot: "hobby-badminton",
    img: "/assets/hobby-badminton.jpg",
  },
  {
    name: "Team Sports",
    tag: "Shared wins",
    blurb:
      "An athlete at heart. Team sport feeds my love of coordination and shared victory.",
    slot: "hobby-football",
    img: "/assets/hobby-football.jpg",
  },
];
