import { Job } from "@/types";

export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Développeur Full-Stack Junior",
    companyName: "Tech Cameroon",
    location: "Yaoundé, Cameroun",
    city: "Yaoundé",
    contractType: "CDI",
    workplaceType: "on-site",
    salaryMin: 250000,
    salaryMax: 400000,
    currency: "FCFA",
    description:
      "Nous recherchons un développeur Full-Stack Junior motivé pour rejoindre notre équipe tech et contribuer à des projets numériques innovants au Cameroun. Vous travaillerez sur des applications web et mobile avec des technologies modernes.",
    createdAt: "2026-09-28T10:00:00Z",
    isOpen: true,
  },
  {
    id: "job-2",
    title: "Data Analyst",
    companyName: "Digital Solutions",
    location: "Douala, Cameroun",
    city: "Douala",
    contractType: "CDD",
    workplaceType: "hybrid",
    salaryMin: 350000,
    salaryMax: 500000,
    currency: "FCFA",
    description:
      "Poste de Data Analyst pour analyser les données clients et produire des rapports stratégiques. Maîtrise de Python, SQL et Power BI requise.",
    createdAt: "2026-09-27T08:00:00Z",
    isOpen: true,
  },
  {
    id: "job-3",
    title: "Responsable Marketing Digital",
    companyName: "CamDigital",
    location: "Douala, Cameroun",
    city: "Douala",
    contractType: "CDI",
    workplaceType: "on-site",
    salaryMin: 300000,
    salaryMax: 450000,
    currency: "FCFA",
    description:
      "Pilotez la stratégie marketing digital de CamDigital : réseaux sociaux, SEO, campagnes publicitaires et analyse des performances.",
    createdAt: "2026-09-26T09:00:00Z",
    isOpen: true,
  },
  {
    id: "job-4",
    title: "Développeur Mobile React Native",
    companyName: "AppCam",
    location: "Yaoundé, Cameroun",
    city: "Yaoundé",
    contractType: "Freelance",
    workplaceType: "remote",
    description:
      "Mission freelance pour développer une application mobile de gestion de livraisons. Expertise React Native et Expo requise.",
    createdAt: "2026-09-25T14:00:00Z",
    isOpen: true,
  },
  {
    id: "job-5",
    title: "Comptable Senior",
    companyName: "FinanceCam",
    location: "Bafoussam, Cameroun",
    city: "Bafoussam",
    contractType: "CDI",
    workplaceType: "on-site",
    salaryMin: 200000,
    salaryMax: 320000,
    currency: "FCFA",
    description:
      "Gestion complète de la comptabilité générale et analytique. OHADA obligatoire, 5 ans d'expérience minimum.",
    createdAt: "2026-09-24T11:00:00Z",
    isOpen: true,
  },
  {
    id: "job-6",
    title: "Stage Développeur Web",
    companyName: "StartupCM",
    location: "Douala, Cameroun",
    city: "Douala",
    contractType: "Stage",
    workplaceType: "on-site",
    description:
      "Stage de 3 mois pour apprendre le développement web dans une startup dynamique. HTML, CSS, JavaScript et React appréciés.",
    createdAt: "2026-09-23T08:00:00Z",
    isOpen: true,
  },
];

export function getJobById(id: string): Job | undefined {
  return MOCK_JOBS.find((job) => job.id === id);
}
