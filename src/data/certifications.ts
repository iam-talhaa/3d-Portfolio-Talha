export interface CertificationItem {
  title: string;
  image: string;
  date: string;
  tag: string;
  link?: string;
  issuer?: string;
}

export const certifications: CertificationItem[] = [
  {
    title: "Advanced Flutter UI & State Management",
    image: "/certificates/flutter-ui.svg",
    date: "2026",
    tag: "COURSERA",
    issuer: "Coursera [Packt]",
    link: "https://www.coursera.org",
  },
  {
    title: "Certified Scrum Master",
    image: "/certificates/scrum-master.svg",
    date: "2024",
    tag: "SCRUM ALLIANCE",
    issuer: "Scrum Alliance",
    link: "https://www.scrumalliance.org",
  },
  {
    title: "Agile Project Management",
    image: "/certificates/agile-pm.svg",
    date: "2025",
    tag: "HP LIFE",
    issuer: "HP LIFE | HP Foundation",
    link: "https://www.life-global.org",
  },
  {
    title: "Flutter Masterclass (Dart & Firebase)",
    image: "/certificates/flutter-masterclass.svg",
    date: "2024",
    tag: "UDEMY",
    issuer: "Udemy",
    link: "https://www.udemy.com",
  },
  {
    title: "Flutter Mobile App Development",
    image: "/certificates/saylani-flutter.svg",
    date: "2024",
    tag: "SAYLANI",
    issuer: "Saylani Mass IT Training Program",
    link: "https://www.saylaniwelfare.com",
  },
  {
    title: "Certified Scrum Master",
    image: "/certificates/navttc-scrum.svg",
    date: "2024",
    tag: "NAVTTC",
    issuer: "Corvit Systems Peshawar / NAVTTC",
    link: "https://navttc.gov.pk",
  },
  {
    title: "Soft Skills & Professional Comms",
    image: "/certificates/pseb-skills.svg",
    date: "2025",
    tag: "PSEB",
    issuer: "Pakistan Software Export Board",
    link: "https://pseb.org.pk",
  },
];

export default certifications;
