// All copy and facts for the site. Began as the prototype's renderVals, then
// grew the founder content. tests/voice.test.ts reads every string in this
// file; tests/zeqlar-facts.test.ts checks the ZEQLAR block against the
// company site's own words (tests/fixtures/zeqlar-facts.txt).

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

/** The deployed origin. Canonical URLs, Open Graph and the sitemap build on it. */
export const SITE = {
  url: "https://two-versions-portfolio-kirito-h4-z3-s-projects.vercel.app",
  name: "Abdullah Mohammed Hazeq",
  title: "Abdullah Mohammed Hazeq, founder of ZEQLAR",
  description:
    "Founder of ZEQLAR Solutions FZE - LLC in the UAE. I build software and AI systems for companies, and ship my own products: QuickQuote and Wajib.",
  routes: {
    landing: "/",
    professional: "/professional/",
    human: "/human/",
  },
  titles: {
    landing: "Abdullah Mohammed Hazeq, founder of ZEQLAR",
    professional: "Abdullah Hazeq, founder and AI builder | ZEQLAR",
    human: "Abdullah Hazeq, the human side",
  },
  descriptions: {
    landing:
      "Founder of ZEQLAR Solutions FZE - LLC in the UAE. I build software and AI systems for companies, and ship my own products: QuickQuote and Wajib.",
    professional:
      "Founder of ZEQLAR. I build software and AI systems for UAE companies, and I ship my own products. Flagship builds, experience and how to start a project.",
    human:
      "The person behind the work: competitive gaming, sim racing, photography, travel and the people I build with.",
  },
} as const;

export const CONTACT = {
  email: "ahazeq.mena@gmail.com",
  linkedin: "https://linkedin.com/in/abdullahmhazeq",
  github: "https://github.com/KiritoH4Z3",
  whatsapp: "https://wa.me/971507826347",
  resume: "/assets/Abdullah-Hazeq-Resume.pdf",
  footer: "ahazeq.mena@gmail.com · +971 507 826 347 (WhatsApp) · United Arab Emirates",
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
  "ZEQLAR",
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
  { n: 3, suf: "", l: "ZEQLAR client engagements" },
  { n: 2, suf: "", l: "Own products built" },
  { n: 1, suf: "", l: "Published paper" },
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
  sub: "Not coursework. Not demos. Real systems solving expensive problems for real UAE businesses. Built solo, tested hard.",
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
        title: "Speed kills deals. The lack of it, anyway.",
        body: "Businesses rarely lose a deal on price. They lose it because their quote took twenty minutes and the other guy's took two. QuickQuote takes the email, the WhatsApp voice-of-chaos, the blurry forwarded PDF, and turns it into a quote before the client's coffee cools.",
      },
      {
        label: "// HOW_IT_WORKS",
        title: "AI reads. The engine does the math.",
        body: "The AI's only job is reading: it matches the mess against your own price catalog. Then a deterministic pricing engine (plain, tested server code) looks up the real prices, computes every total, applies VAT and renders one of six branded PDF templates.",
      },
      {
        label: "// TRUST_PRINCIPLE",
        title: "The AI is never trusted with money.",
        body: "It never even sees a price. Every dirham on that PDF comes from code I can test, not a model I have to hope about. 72 automated tests across 9 suites agree with me, including one suite whose entire job is trying to trick it. Default-deny row-level security, encrypted API keys, zero secrets in the browser.",
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
      "Every UAE government deadline your business has: computed, tracked and politely nagging you before it gets expensive.",
    steps: [
      {
        label: "// PROBLEM",
        title: "68,000 businesses missed the same deadline.",
        body: "That's how many used the FTA's penalty-waiver program after missing one Corporate Tax deadline. That's not 68,000 careless owners. That's a missing system. So I built the system.",
      },
      {
        label: "// HOW_IT_WORKS",
        title: "It reads your paperwork so you don't have to.",
        body: "Upload your trade licence, VAT certificate, visas. Arabic or English, it doesn't mind. AI extracts the facts, then a versioned, tested rules engine computes every deadline you actually owe: Corporate Tax, VAT returns, licence renewal, WPS payroll, visas and Emirates ID, all on one dashboard, with a running total of fines avoided.",
      },
      {
        label: "// TRUST_PRINCIPLE",
        title: "Deadlines come from rules, not vibes.",
        body: "Same principle as QuickQuote: the AI reads documents, but every date on your dashboard comes from a rules engine with version history and tests, one that updates as UAE regulations change. Then it escalates at 90, 60, 30, 7 and 1 days out, on WhatsApp and email, because a compliance tool that's easy to ignore is just a fancier calendar.",
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

/**
 * The company. Every checkable claim here (legal name, free zone, the counts,
 * the three name parts, the two sentences in the founder's own voice) is
 * asserted against tests/fixtures/zeqlar-facts.txt, which is extracted from
 * the company site's content modules. When the company site changes a count,
 * refresh the fixture and that test says which line here went stale.
 */
export const ZEQLAR = {
  label: "// FOUNDER · ZEQLAR SOLUTIONS FZE - LLC",
  wordmark: "ZEQLAR",
  legalName: "ZEQLAR Solutions FZE - LLC",
  url: "https://zeqlar.com",
  contactUrl: "https://zeqlar.com/contact",
  parts: [
    { glyph: "Z", label: "Zenith", meaning: "Peak operations." },
    { glyph: "EQ", label: "Equilibrium", meaning: "Balanced spend." },
    { glyph: "LAR", label: "Scalar", meaning: "Room to scale." },
  ],
  title: "The side practice is now a company.",
  para1:
    "ZEQLAR Solutions FZE - LLC is the B2B technology company I founded, licensed in Ajman NuVentures Centre Free Zone. We build software, AI and data systems for companies in the UAE and the wider GCC.",
  para2:
    "When you hire ZEQLAR you get me. I answer, I build, I stand behind it. You bring the problem. I scope it honestly, build it properly and work to your budget. Yes, an engineer who asks about your budget first. I know.",
  facts: [
    { value: "03", note: "Client engagements" },
    { value: "02", note: "Still ongoing" },
    { value: "08", note: "Lines of work" },
    { value: "01", note: "Own product, licensed out" },
  ],
  linesLabel: "What I build there",
  ctaProject: "Start a project",
  ctaSite: "Visit zeqlar.com",
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
    body: "Scoped to what proves the idea, not to what pads the invoice.",
  },
];

export const experience: Experience[] = [
  {
    role: "Founder",
    org: "ZEQLAR Solutions FZE - LLC · Ajman, UAE",
    detail:
      "Founded a licensed B2B technology company in Ajman NuVentures Centre Free Zone. Three client engagements so far, two still ongoing, plus QuickQuote, our own product.",
  },
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
    img: "/assets/hobby-sim.jpg",
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

/** Professional hero. The decode line is also the route's first sentence. */
export const PRO_HERO = {
  status: "// FOUNDER, ZEQLAR · UNITED ARAB EMIRATES",
  titleTop: "FOUNDER",
  titleAccent: "& AI BUILDER.",
  decode:
    "Founder of ZEQLAR. I build software and AI systems for UAE companies, and I ship my own products.",
  ctaResume: "Download résumé",
} as const;

export const LANDING = {
  eyebrow: "United Arab Emirates · Founder, ZEQLAR Solutions FZE - LLC",
  subline: "FOUNDER, ZEQLAR · COMPUTER SCIENCE (AI)",
  taglineLead: "I founded ZEQLAR, I build AI products, and I'm still a",
  taglineAccent: "people person.",
  tease: "FEATURED BUILDS: QUICKQUOTE · WAJIB",
  intro:
    "Computer Science (AI) graduate, back in the Gulf. I founded ZEQLAR Solutions, ship AI products for UAE companies, and still chase a good racing line.",
  doorPro:
    "Founder of ZEQLAR and AI builder. Two flagship products, client work, published research and deepfake detection. The technical story.",
} as const;

export const CONTACT_PANEL = {
  label: "// OPEN_TO_CONNECT",
  title: "Let's build something.",
  para: "I build AI products, and I build them for clients. If there's a real problem with a real budget, even a small one, I want to hear it.",
  projectLabel: "A project for your company",
  roleLabel: "A role on your team",
} as const;
