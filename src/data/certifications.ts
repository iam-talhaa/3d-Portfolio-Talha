export interface CertificationItem {
  id: string;
  title: string;
  image: string;
  issuer?: string;
  tag?: string;
  date?: string;
  link?: string;
}

export const certifications: CertificationItem[] = [
  {
    id: "flutter-masterclass",
    title: "Flutter Masterclass (Dart, Api, Firebase)",
    image: "/images/Flutter Masterclass (Dart, Api, Firebase).png",
    issuer: "Udemy",
    tag: "Flutter & Firebase",
    date: "2024",
  },
  {
    id: "soft-skills",
    title: "Soft Skill Certificate",
    image: "/images/Soft Skill Certificate.png",
    issuer: "PSEB",
    tag: "Professional Skills",
    date: "2025",
  },
  {
    id: "advanced-flutter",
    title: "Advanced Flutter UI and State Management",
    image: "/images/Advanced Flutter UI and State Management.png",
    issuer: "Coursera / Packt",
    tag: "Flutter UI & State",
    date: "2026",
  },
  {
    id: "intro-scrum-master",
    title: "Introduction to Scrum Master Profession",
    image: "/images/Introduction to Scrum Master Profession.png",
    issuer: "Simplilearn / SkillUp",
    tag: "Scrum Master",
    date: "2024",
  },
  {
    id: "mobile-app-dev",
    title: "Mobile Application Development (Flutter)",
    image: "/images/Mobile App Development.png",
    issuer: "Saylani Mass IT Training",
    tag: "Flutter Development",
    date: "2024",
  },
  {
    id: "agile-scrum-master",
    title: "Agile Scrum Master",
    image: "/images/Agile Scrum Master.png",
    issuer: "Corvit Systems / NAVTTC",
    tag: "Agile & Scrum",
    date: "2024",
  },
  {
    id: "certified-scrummaster",
    title: "Certified ScrumMaster®",
    image: "/images/Certified ScrumMaster®.png",
    issuer: "Scrum Alliance",
    tag: "CSM®",
    date: "2024",
  },
  {
    id: "agile-project-management",
    title: "Agile Project Management Certifications",
    image: "/images/Agile Project Management Certifications.png",
    issuer: "HP LIFE / Foundation",
    tag: "Project Management",
    date: "2025",
  },
];

export default certifications;
