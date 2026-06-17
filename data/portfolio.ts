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
  "Solution Scoping",
  "Python · SQL",
  "Automation (n8n · Make)",
  "Deep Learning",
];

export const marquee: string[] = [
  "AI Systems",
  "Leadership",
  "Sim Racing",
  "Published Research",
  "Photography",
  "Agentic Workflows",
  "Badminton",
  "Deepfake Detection",
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
