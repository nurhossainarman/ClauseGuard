const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const concerns = [
    {
      name: "Data sharing with third parties",
      description: "We share your data with advertisers, partners, service providers",
      keywords: JSON.stringify(["share", "third parties", "advertisers", "partners", "service providers"]),
      category: "Data Sharing & Third Parties",
      severity: "high",
    },
    {
      name: "Behavioral tracking for ads",
      description: "We track your activity to show personalized ads",
      keywords: JSON.stringify(["track", "behavioral", "personalized ads", "activity", "profiled"]),
      category: "Data Sharing & Third Parties",
      severity: "high",
    },
    {
      name: "Data sold to brokers/marketers",
      description: "We may sell or license your data to third parties",
      keywords: JSON.stringify(["sell", "data brokers", "marketers", "license", "data sold"]),
      category: "Data Sharing & Third Parties",
      severity: "critical",
    },
    {
      name: "Cross-border data transfers",
      description: "Your data may be transferred to servers outside [country]",
      keywords: JSON.stringify(["cross-border", "transferred", "outside", "international", "servers"]),
      category: "Data Sharing & Third Parties",
      severity: "medium",
    },
    {
      name: "Long data retention",
      description: "We retain your data indefinitely / for 5+ years after deletion",
      keywords: JSON.stringify(["retain", "retention", "indefinitely", "years after deletion", "persistent"]),
      category: "Data Retention & Deletion",
      severity: "high",
    },
    {
      name: "Data not deleted on account closure",
      description: "Deleting account doesn't delete your personal data",
      keywords: JSON.stringify(["deletion", "account closure", "doesn't delete", "remains", "preserved"]),
      category: "Data Retention & Deletion",
      severity: "high",
    },
    {
      name: "Device fingerprinting",
      description: "We may identify you via device/browser fingerprinting even without cookies",
      keywords: JSON.stringify(["fingerprinting", "device fingerprint", "browser fingerprint", "identify"]),
      category: "Data Retention & Deletion",
      severity: "medium",
    },
    {
      name: "Weak security language",
      description: "We use industry-standard security (vague, non-binding)",
      keywords: JSON.stringify(["industry-standard security", "security measures", "security practices", "vague"]),
      category: "Security & Breaches",
      severity: "medium",
    },
    {
      name: "Delayed breach notification",
      description: "We will notify you 'as soon as possible' (undefined)",
      keywords: JSON.stringify(["breach notification", "as soon as possible", "notify", "delayed"]),
      category: "Security & Breaches",
      severity: "high",
    },
    {
      name: "Unilateral terms changes",
      description: "We may change these terms at any time without notice",
      keywords: JSON.stringify(["change", "terms change", "without notice", "unilateral", "modify"]),
      category: "Terms & Policy Changes",
      severity: "high",
    },
    {
      name: "Location tracking",
      description: "We collect and store your precise location data",
      keywords: JSON.stringify(["location", "GPS", "geolocation", "location data", "precise location"]),
      category: "Biometric & Location Data",
      severity: "high",
    },
    {
      name: "Biometric data collection",
      description: "We may collect facial recognition, fingerprint, voice data",
      keywords: JSON.stringify(["biometric", "facial recognition", "fingerprint", "voice", "iris scan"]),
      category: "Biometric & Location Data",
      severity: "critical",
    },
    {
      name: "Hard to opt-out of marketing",
      description: "Unsubscribe buried in footer / requires login to manage preferences",
      keywords: JSON.stringify(["unsubscribe", "opt-out", "marketing emails", "preferences", "manage"]),
      category: "Marketing & Opt-Out",
      severity: "medium",
    },
    {
      name: "Tracking cookies default ON",
      description: "Essential + tracking cookies enabled by default",
      keywords: JSON.stringify(["cookies", "tracking cookies", "default", "enabled", "tracking"]),
      category: "Marketing & Opt-Out",
      severity: "medium",
    },
    {
      name: "User content ownership unclear",
      description: "We own all content you upload / can use it forever",
      keywords: JSON.stringify(["own content", "content ownership", "upload", "use forever", "property"]),
      category: "Content & Ownership",
      severity: "high",
    },
    {
      name: "Data used for AI/ML training",
      description: "We use your data to train AI models and algorithms",
      keywords: JSON.stringify(["AI", "machine learning", "training", "algorithms", "models"]),
      category: "Content & Ownership",
      severity: "high",
    },
    {
      name: "Automatic subscription renewal",
      description: "Your subscription will auto-renew unless you cancel",
      keywords: JSON.stringify(["auto-renew", "automatic renewal", "subscription", "unless you cancel"]),
      category: "Financial & Billing",
      severity: "medium",
    },
    {
      name: "Hidden fees/charges",
      description: "Additional charges may apply / subject to change",
      keywords: JSON.stringify(["hidden fees", "charges", "additional", "subject to change", "fees"]),
      category: "Financial & Billing",
      severity: "medium",
    },
    {
      name: "Service termination at will",
      description: "We may terminate your account at any time for any reason",
      keywords: JSON.stringify(["terminate", "termination", "account closure", "ban", "suspended"]),
      category: "Legal & Disputes",
      severity: "high",
    },
    {
      name: "Forced arbitration clause",
      description: "Any disputes must go to arbitration, no right to lawsuit",
      keywords: JSON.stringify(["arbitration", "disputes", "arbitrate", "no lawsuit", "binding"]),
      category: "Legal & Disputes",
      severity: "critical",
    },
  ];

  for (const concern of concerns) {
    await prisma.concern.create({
      data: concern,
    });
  }

  console.log("✅ Database seeded with 20 concerns");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
