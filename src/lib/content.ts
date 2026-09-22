/**
 * All page copy as typed data. Components stay presentational.
 * House style: sentence case, plain punctuation, no dashes used as asides.
 */

export const hero = {
  label: "Managed office services in Lahore",
  headline: ["Three functions.", "One accountable partner."],
  lede: "Creston Biz brings facilities management, office operations and administration, and events management together. One partner to keep your workplace maintained, your organisation running and your events professionally delivered.",
  trust: "Based at NASTP, Lahore Cantt. Deploying across Punjab.",
} as const;

export type Stat = { readonly value: number; readonly prefix?: string; readonly suffix?: string; readonly label: string };

export const stats: ReadonlyArray<Stat> = [
  { value: 14, suffix: "+", label: "Years of operations leadership" },
  { value: 10, prefix: "USD ", suffix: "M+", label: "Budgets managed for donor programmes" },
  { value: 1000, suffix: "+", label: "People across workforces led" },
  { value: 60, prefix: "30 to ", label: "Day pilot before you commit" },
];

export type Service = {
  readonly id: "facilities" | "office-operations" | "events";
  readonly number: string;
  readonly name: string;
  readonly shortName: string;
  readonly tagline: string;
  readonly promise: string;
  readonly objective: string;
  readonly value: string;
  readonly image: { readonly src: string; readonly alt: string; readonly video?: string };
  readonly scope: ReadonlyArray<string>;
};

export const services = [
  {
    id: "facilities",
    number: "01",
    name: "Facilities Management",
    shortName: "Facilities",
    tagline: "Well-Maintained, Safe & Efficient Workplaces",
    promise: "Creston manages the day-to-day physical environment of offices, institutions, corporate facilities and other workplaces.",
    objective: "To keep facilities clean, functional, safe and professionally maintained while allowing the client to focus on its core business.",
    value: "Keep the workplace maintained.",
    image: { src: "/images/tiles/facade.jpg", alt: "A technician working on the facade of an office building", video: "/video/tile-facade.mp4" },
    scope: [
      "Housekeeping & Cleaning Services",
      "Horticulture & Landscaping Support",
      "Electrical & Plumbing Maintenance",
      "Minor Repairs & Building Maintenance",
      "Utilities & Facility Support",
      "Waste Management & Sanitation",
      "Maintenance Staff Deployment & Supervision",
      "Vendor & Contractor Coordination",
      "Facility Inspection & Preventive Maintenance",
      "Health, Safety & Compliance Support",
    ],
  },
  {
    id: "office-operations",
    number: "02",
    name: "Office Operations & Administration",
    shortName: "Office operations",
    tagline: "Smooth Operations, Better Control & Greater Productivity",
    promise: "Creston provides professional administrative and operational support to organizations that need efficient day-to-day office management.",
    objective: "To create organized, efficient and professionally managed office operations through people, processes and systems.",
    value: "Keep the organization running efficiently.",
    image: { src: "/images/tiles/desk.jpg", alt: "Two colleagues working together at a bright office desk", video: "/video/tile-desk.mp4" },
    scope: [
      "Front Office & Reception Support",
      "Administrative Assistance",
      "Office Coordination & Supervision",
      "Documentation & Record Management",
      "Procurement & Vendor Coordination",
      "Office Supplies & Inventory Support",
      "Staff Coordination & Attendance Administration",
      "SOP Development & Process Improvement",
      "Meetings & Internal Coordination",
      "EOBI / PESSI / Service Tax Administrative Support",
      "Government & Institutional Liaison Support",
    ],
  },
  {
    id: "events",
    number: "03",
    name: "Events Management",
    shortName: "Events",
    tagline: "Professional Planning. Seamless Execution. Memorable Experiences.",
    promise: "Creston plans and executes corporate, institutional and organizational events from concept to completion.",
    objective: "To deliver well-organized, professional and memorable events while managing the details, vendors and execution on behalf of the client.",
    value: "Deliver professional experiences and successful events.",
    image: { src: "/images/tiles/events.jpg", alt: "A speaker presenting on stage at a corporate conference", video: "/video/tile-events.mp4" },
    scope: [
      "Corporate Events & Conferences",
      "Product Launches",
      "Seminars & Workshops",
      "Training Events",
      "Brand Activations",
      "Institutional & Government Events",
      "Venue & Hospitality Coordination",
      "Stage, Sound & Lighting Coordination",
      "Branding, Décor & Floral Arrangements",
      "Photography & Videography Coordination",
      "Guest Management & Registration",
      "Complete Event Planning & On-Ground Execution",
    ],
  },
] as const satisfies ReadonlyArray<Service>;

export type Layer = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly items: ReadonlyArray<string>;
};

/** The exploded view: what a Creston Biz engagement is made of, bottom to top. */
export const stack = {
  label: "How we work",
  heading: "One engagement, five working layers.",
  lede: "Every layer is something you can inspect and measure.",
  hint: "Scroll to pull the engagement apart",
  layers: [
    { id: "contract", title: "Contract and service level", body: "A signed scope sheet, an MSA or SOW, payment terms and the service level that everything else reports against.", items: ["Scope sheet", "MSA or SOW", "SLA"] },
    { id: "team", title: "Deployed team", body: "People recruited only against your confirmed requirement, selected with you, onboarded on site.", items: ["Sourcing", "Selection", "Onboarding"] },
    { id: "compliance", title: "Payroll and compliance", body: "Employment paperwork, payroll coordination, EOBI and PESSI contributions, handled without your HR team.", items: ["Payroll", "EOBI", "PESSI"] },
    { id: "reporting", title: "Attendance and reporting", body: "Rosters, timesheets, issue logs and a monthly dashboard so you always know what was delivered.", items: ["Rosters", "Issue log", "Dashboard"] },
    { id: "facilities", title: "Facilities and vendors", body: "Maintenance, cleaning, security and utilities vendors managed against their own service levels.", items: ["Maintenance", "Vendors", "Audits"] },
  ] as ReadonlyArray<Layer>,
} as const;

export type Step = { readonly n: number; readonly title: string; readonly body: string; readonly closes: string };

export const processSteps: ReadonlyArray<Step> = [
  { n: 1, title: "Diagnose", body: "Discovery and scope mapping with your team.", closes: "Signed scope sheet" },
  { n: 2, title: "Quote", body: "Rate build, service fee and tax treatment, line by line.", closes: "Approved quotation" },
  { n: 3, title: "Contract", body: "MSA, SOW or PO, payment terms and the service level.", closes: "Signed agreement" },
  { n: 4, title: "Mobilise", body: "Recruit or select only against the confirmed requirement.", closes: "Confirmed deployment list" },
  { n: 5, title: "Deploy", body: "Onboarding, site orientation and reporting lines.", closes: "Go-live confirmation" },
  { n: 6, title: "Operate", body: "Attendance, payroll coordination, check-ins and a monthly dashboard.", closes: "Monthly service report" },
];

export const pricing = {
  label: "Pricing",
  heading: "A published formula, with the margin shown.",
  lede: "Every quotation can be defended to your procurement or finance team because every component of the rate is shown.",
  components: ["Gross salary", "Statutory cost (EOBI, PESSI)", "Leave and benefit provision", "Recruitment and onboarding", "Payroll and operations", "Replacement contingency", "Service margin"],
  result: "Client rate, before sales tax",
  note: "Headcount, sites, hours and service levels shape the number, so there is no generic rate card. A short call gets you a rate build for your requirement.",
  cta: "Request a rate build",
} as const;

export type Priority = "Priority focus" | "Active" | "Selective";
export type Industry = { readonly icon: "Building2" | "HeartHandshake" | "Landmark" | "Cpu" | "Factory" | "GraduationCap"; readonly name: string; readonly need: string; readonly priority: Priority };

export const industries: ReadonlyArray<Industry> = [
  { icon: "Building2", name: "SMEs and growing companies", need: "Support staff and office discipline without building a large internal support team.", priority: "Priority focus" },
  { icon: "HeartHandshake", name: "NGOs, INGOs and donor projects", need: "Compliant, documented, scalable staffing with controlled office-operations overhead.", priority: "Priority focus" },
  { icon: "Landmark", name: "Banks, fintech and professional services", need: "Reliable support roles and consistent office administration.", priority: "Active" },
  { icon: "Cpu", name: "Technology companies", need: "Lean support functions while headcount scales quickly.", priority: "Active" },
  { icon: "Factory", name: "Manufacturing and industrial offices", need: "Office and admin support without adding fixed overhead.", priority: "Selective" },
  { icon: "GraduationCap", name: "Training and education networks", need: "Scalable administrative and support teams across multiple sites.", priority: "Selective" },
];

export const founder = {
  name: "Syed Hasan Ghazanfar",
  role: "Founder and Chief Executive Officer",
  photo: { portrait: "/images/founder-portrait.jpg", wide: "/images/founder-wide.jpg" },
  education: ["MBA, Human Resource and Development, Superior University Lahore", "BBA (Hons), Superior University Lahore"],
  bio: [
    "Hasan is a senior administration, operations and government-liaison leader with a career spanning manufacturing, corporate and internationally donor-funded environments. He has run multi-site offices, managed fleets and facilities, and controlled administration and logistics budgets for programmes funded by FCDO, the World Bank and USAID.",
    "His career spans senior roles at Chawla Group of Industries, the International Water Management Institute, Adam Smith International and Ferozsons Laboratories, directing HR, administration, procurement, fleet and facilities functions for large workforces. He founded Creston Biz to bring that operational discipline to Pakistani organisations as a managed service.",
  ],
  experience: {
    label: "Has worked directly with",
    donors: ["FCDO", "DFID", "World Bank", "USAID"],
    government: ["FBR", "Pakistan Customs", "LESCO", "LDA", "Labour Department"],
    employers: ["Chawla Group of Industries", "International Water Management Institute", "Adam Smith International", "Ferozsons Laboratories"],
  },
  teamNote: "The delivery team grows with each engagement. New team members are introduced here as they join.",
} as const;

export const contactCopy = {
  label: "Get started",
  heading: "Start with one service. Grow from there.",
  lede: "You will get a scope, a transparent rate and a low-risk way to see the model work before committing further.",
  interests: [...services.map((service) => service.name), "Not sure yet, I need a recommendation"],
  submit: "Send inquiry",
  pending: "Sending",
  success: { heading: "Inquiry received.", body: "We reply within one working day. If it is urgent, call the number on this page." },
  error: "We could not send your inquiry. Please email us directly and we will reply within one working day.",
} as const;
