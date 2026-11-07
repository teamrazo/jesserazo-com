// Single source for site copy and links.
// Items marked DRAFT are waiting on Jesse's input (see README "Inputs needed").

export const SITE = {
  name: "Jesse Razo",
  url: "https://www.jesserazo.com",
  title: "Jesse Razo | Faith First. Freedom by Design.",
  description:
    "Jesse Razo helps faith-driven founders move from Operator to Architect. Build a business that runs on systems, get your time back and build a legacy.",
  company: "Legacy Media LLC",
  tagline: "One System. One Flow. One Outcome. FREEDOM.",
};

export const LINKS = {
  rsn: "https://www.razorsharpnetworks.com",
  lever: "https://www.gitlever.ai",
  timeback: "https://freedom.gitlever.ai",
  partner: "https://partner.razorsharpnetworks.com",
  legacyFund: "https://www.razorsharpnetworks.com/legacy-fund-build-a-lasting-legacy/",
  facebook: "https://facebook.com/getyourtimeback",
  // DRAFT: Proximity Challenge page URL not confirmed yet. Routes to the application until it is.
  proximity: "/work-with-jesse#apply",
};

export const NAV = [
  { href: "/about", label: "My Story" },
  { href: "/work-with-jesse", label: "Work with Jesse" },
  { href: "/legacy", label: "Legacy" },
];

// DRAFT: values pending from Jesse. "TBD" shows on preview so nothing is invented.
export const STATS = [
  { value: "TBD", label: "Years building businesses" },
  { value: "TBD", label: "Founders and teams served" },
  { value: "TBD", label: "Sites and systems built" },
  { value: "TBD", label: "Hours returned to clients" },
];

export const PILLARS = [
  {
    name: "Faith",
    line: "Put God first and the rest finds its order.",
    body: "Faith is the foundation, not a footnote. Every decision about time, money and growth starts there.",
  },
  {
    name: "Family",
    line: "Build a business that serves your family.",
    body: "A business that takes your evenings and your attention is not success. Margin at home is the measure.",
  },
  {
    name: "Freedom",
    line: "Financial and business freedom by design.",
    body: "Freedom comes from systems, not hustle. Clear direction, the right automation and time you control.",
  },
  {
    name: "Legacy",
    line: "Build what outlasts you.",
    body: "What you build should keep serving people after you step away. That is the point of the work.",
  },
];

export const PATHS = [
  {
    name: "Proximity Challenge",
    for: "Start here if God feels distant.",
    body: "Get close to God and stay close. Everything else is built on that foundation.",
    href: LINKS.proximity,
    cta: "Join the Challenge",
  },
  {
    name: "TimeBACK Audit",
    for: "For owners who know they are the bottleneck.",
    body: "Find where your time and money leak, then get a clear plan to win it back.",
    href: LINKS.timeback,
    cta: "Book an Audit",
  },
  {
    name: "LEVER AI",
    for: "For teams ready to run on systems.",
    body: "The AI growth engine behind the TimeBACK System. Clarity in place of chaos.",
    href: LINKS.lever,
    cta: "Explore LEVER AI",
  },
  {
    name: "Partner Program",
    for: "For people who refer founders they care about.",
    body: "Earn, learn and grow by connecting the right people to the right help.",
    href: LINKS.partner,
    cta: "Become a Partner",
  },
];

export const TIMEBACK = [
  { step: "Audit", body: "See where your time and money actually go." },
  { step: "Optimize", body: "Remove, automate or delegate what does not need you." },
  { step: "Measure", body: "Track the hours and margin you win back." },
  { step: "Refill", body: "Reinvest that time in faith, family and growth. Review every 90 days." },
];

export const VALUES = [
  { name: "Speed is King", body: "Move with urgency. Decide, act, adjust." },
  { name: "Uncompromised Integrity", body: "Say what we do. Do what we say." },
  { name: "Competitive Greatness", body: "Be your best when your best is needed." },
  { name: "Continuous Skill Improvement", body: "Get a little better every day." },
  { name: "Feedback-Driven Execution", body: "Listen, measure and let results lead." },
];
