import { getPrismaClient } from "./db.js";

const concerns = [
  {
    name: "Data Sharing with Third Parties",
    description: "Terms that allow sharing your data with third-party companies",
    category: "Data Sharing",
    severity: "high",
    keywords: JSON.stringify([
      "share data with third parties",
      "sell data to",
      "third party vendors",
      "share information with partners",
      "disclose to third parties",
      "share with affiliates",
    ]),
  },
  {
    name: "Indefinite Data Retention",
    description: "Terms that allow indefinite storage of your personal data",
    category: "Data Retention",
    severity: "high",
    keywords: JSON.stringify([
      "indefinite retention",
      "retain data indefinitely",
      "retain information for as long as",
      "keep data permanently",
      "no deletion policy",
      "retain for the duration",
    ]),
  },
  {
    name: "Forced Arbitration",
    description: "Terms that require disputes to be resolved through arbitration instead of court",
    category: "Legal",
    severity: "high",
    keywords: JSON.stringify([
      "binding arbitration",
      "arbitration clause",
      "settle disputes through arbitration",
      "mandatory arbitration",
      "waive right to court",
      "arbitration agreement",
    ]),
  },
  {
    name: "Auto-Renewal",
    description: "Terms that automatically renew your subscription or charges",
    category: "Billing",
    severity: "high",
    keywords: JSON.stringify([
      "auto-renewal",
      "automatically renew",
      "recurring charge",
      "automatic billing",
      "renew automatically",
      "continued subscription",
    ]),
  },
  {
    name: "Tracking and Cookies",
    description: "Terms that allow tracking your behavior through cookies and analytics",
    category: "Tracking",
    severity: "medium",
    keywords: JSON.stringify([
      "cookies",
      "tracking technologies",
      "web beacons",
      "pixels",
      "analytics",
      "cross-site tracking",
      "behavioral tracking",
    ]),
  },
  {
    name: "License to Your Content",
    description: "Terms that claim ownership or broad rights to content you create",
    category: "Content Rights",
    severity: "medium",
    keywords: JSON.stringify([
      "license to your content",
      "grant us rights to",
      "royalty-free license",
      "perpetual license",
      "content you submit",
      "user-generated content",
    ]),
  },
  {
    name: "No Privacy Guarantees",
    description: "Terms that explicitly disclaim privacy protections",
    category: "Privacy",
    severity: "high",
    keywords: JSON.stringify([
      "no privacy",
      "no guarantee",
      "as-is basis",
      "no warranty",
      "without warranty",
      "security vulnerabilities",
    ]),
  },
  {
    name: "IP Address and Location Tracking",
    description: "Terms that allow collection of IP addresses and location data",
    category: "Tracking",
    severity: "medium",
    keywords: JSON.stringify([
      "IP address",
      "location data",
      "geographic location",
      "GPS coordinates",
      "precise location",
      "collect location",
    ]),
  },
  {
    name: "Unilateral Modification",
    description: "Terms that allow the company to change terms without notice",
    category: "Legal",
    severity: "medium",
    keywords: JSON.stringify([
      "reserve the right to modify",
      "may change terms",
      "modify terms at any time",
      "change this agreement",
      "without notice",
      "sole discretion",
    ]),
  },
  {
    name: "Liability Waiver",
    description: "Terms that limit or eliminate company liability for damages",
    category: "Legal",
    severity: "high",
    keywords: JSON.stringify([
      "limitation of liability",
      "not liable",
      "not responsible for",
      "liability waiver",
      "released from liability",
      "no liability",
    ]),
  },
  {
    name: "Account Suspension Without Due Process",
    description: "Terms that allow account termination without explanation",
    category: "Account",
    severity: "medium",
    keywords: JSON.stringify([
      "suspend account",
      "terminate account without",
      "disable access",
      "remove content without notice",
      "suspension without warning",
      "account termination",
    ]),
  },
  {
    name: "Biometric Data Collection",
    description: "Terms that allow collection of biometric or facial data",
    category: "Data Collection",
    severity: "high",
    keywords: JSON.stringify([
      "biometric",
      "facial recognition",
      "fingerprint",
      "iris scan",
      "voice identification",
      "biometric data",
    ]),
  },
  {
    name: "De-anonymization Rights",
    description: "Terms that claim the ability to identify anonymous users",
    category: "Privacy",
    severity: "high",
    keywords: JSON.stringify([
      "de-anonymize",
      "identify you",
      "deanonymize",
      "identify individual",
      "link to identity",
      "correlation analysis",
    ]),
  },
  {
    name: "Non-Compete Agreement",
    description: "Terms that restrict your ability to use competing services",
    category: "Legal",
    severity: "medium",
    keywords: JSON.stringify([
      "non-compete",
      "cannot use competitors",
      "exclusive agreement",
      "restrict competing",
      "non-exclusive",
      "competitive restriction",
    ]),
  },
  {
    name: "Child Data Collection",
    description: "Terms that indicate collection of data from minors without parental consent",
    category: "Privacy",
    severity: "high",
    keywords: JSON.stringify([
      "children under",
      "COPPA",
      "parental consent",
      "minors",
      "child privacy",
      "kids under",
    ]),
  },
  {
    name: "Surveillance and Monitoring",
    description: "Terms that allow active monitoring of your behavior or device",
    category: "Tracking",
    severity: "high",
    keywords: JSON.stringify([
      "monitor activity",
      "surveillance",
      "monitor usage",
      "keystroke",
      "screen capture",
      "monitor access",
    ]),
  },
  {
    name: "Credit Score Impact",
    description: "Terms that indicate your activity may affect credit reporting",
    category: "Data",
    severity: "medium",
    keywords: JSON.stringify([
      "credit report",
      "credit score",
      "credit bureau",
      "credit history",
      "credit impact",
      "default reporting",
    ]),
  },
  {
    name: "Hidden Fees",
    description: "Terms that indicate additional charges beyond stated price",
    category: "Billing",
    severity: "medium",
    keywords: JSON.stringify([
      "additional charges",
      "hidden fees",
      "undisclosed fees",
      "applicable fees",
      "additional cost",
      "service charges",
    ]),
  },
  {
    name: "Health/Genetic Data",
    description: "Terms that allow collection of health or genetic information",
    category: "Sensitive Data",
    severity: "high",
    keywords: JSON.stringify([
      "health data",
      "genetic information",
      "medical records",
      "health information",
      "genetic testing",
      "biometric health",
    ]),
  },
  {
    name: "Forced Arbitration Class Action Waiver",
    description: "Terms that prevent class action lawsuits and require individual arbitration",
    category: "Legal",
    severity: "high",
    keywords: JSON.stringify([
      "class action waiver",
      "class action arbitration",
      "no class action",
      "waive class action",
      "individual arbitration",
      "class proceedings",
    ]),
  },
];

async function seed() {
  try {
    const prisma = await getPrismaClient();

    console.log("🌱 Seeding database with concerns...");

    for (const concern of concerns) {
      await prisma.concern.upsert({
        where: { name: concern.name },
        update: {},
        create: concern,
      });
    }

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
