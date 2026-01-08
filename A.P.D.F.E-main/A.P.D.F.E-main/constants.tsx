
import React from 'react';
import { Heart, ShieldCheck, Users, Info, Activity, GraduationCap, HandHeart, TreePine, MessageCircle } from 'lucide-react';
import { TeamMember, TimelineEvent, Program } from './types';

export const COLORS = {
  primary: '#003399', // Blue from logo
  secondary: '#00AA44', // Green from logo
  accent: '#00AEEF'
};

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Amina N.", role: "Programs Director", country: "Rwanda" },
  { name: "John K.", role: "Field Coordinator", country: "Kenya" },
  { name: "Grace M.", role: "MHPSS Lead", country: "Uganda" },
  { name: "Pierre L.", role: "Logistics Manager", country: "DRC" },
  { name: "Marie T.", role: "Safe Spaces Coord.", country: "Central African Rep." },
  { name: "Emmanuel B.", role: "Finance Officer", country: "Republic of Congo" },
  { name: "Chantal R.", role: "Health Program Lead", country: "Cameroon" },
  { name: "Samuel O.", role: "Monitoring Officer", country: "Tanzania" },
  { name: "Fatou S.", role: "Communications", country: "Senegal" },
  { name: "Kwame A.", role: "M&E Specialist", country: "Ghana" },
  { name: "Aisha N.", role: "Education Coord.", country: "Nigeria" },
  { name: "Hassan D.", role: "Agriculture Specialist", country: "Mali" },
  { name: "Selam G.", role: "Advocacy Lead", country: "Ethiopia" },
  { name: "Abdi M.", role: "Programs Officer", country: "Somalia" },
  { name: "Ruth K.", role: "Protection Lead", country: "South Sudan" },
  { name: "Omar H.", role: "Operations Manager", country: "Sudan" },
  { name: "Lillian Z.", role: "HR & Training", country: "Zambia" },
  { name: "Temba S.", role: "Legal Advisor", country: "Zimbabwe" },
  { name: "Marta P.", role: "Communities Lead", country: "Mozambique" }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { 
    year: "2019", 
    title: "The Seed is Planted", 
    description: "Adelithe MUGABO and Princia KORONADO officially registered APDFE in Bangui with a vision to heal others through survival.",
    quote: "We started with 3 volunteers, 1 desk, and infinite determination."
  },
  { 
    year: "2020", 
    title: "Expansion Amid Crisis", 
    description: "First cross-border mission to Eastern DRC, opening Safe Spaces in displacement camps during the pandemic.",
    quote: "COVID couldn't stop us. Conflict couldn't stop us."
  },
  { 
    year: "2021", 
    title: "From Relief to Resilience", 
    description: "Launched Economic Empowerment Initiative, training 1,200 women in tailoring and small business.",
    quote: "Mama Grace went from food aid to owning a successful tailoring shop."
  },
  { 
    year: "2022", 
    title: "A Regional Movement", 
    description: "Expanded to Republic of Congo and Cameroon. Cumulative beneficiaries surpassed 32,000.",
    quote: "We didn't just bring programs—we brought sisterhood."
  },
  { 
    year: "2023", 
    title: "Innovation Meets Impact", 
    description: "Launched Climate-Smart Agriculture and Peace-Building Circles for reconciliation.",
    quote: "Peace isn't just possible—it's inevitable when women lead."
  },
  { 
    year: "2024", 
    title: "Amplifying Voices", 
    description: "Co-founded the Central Africa Women's Protection Network. Reached 68,000 beneficiaries.",
    quote: "We're not asking for a seat at the table—we're building our own."
  },
  { 
    year: "2025", 
    title: "The Future is Now", 
    description: "Aiming to reach 100,000 beneficiaries. Launching Survivor Leadership Academy.",
    quote: "The future is something we build, one empowered woman at a time."
  }
];

export const PROGRAMS: Program[] = [
  {
    id: "health",
    title: "Health Program",
    description: "Addressing the severe impact of conflict and poverty on the health of women and girls.",
    image: "https://picsum.photos/seed/health/800/600",
    details: ["Awareness Campaigns", "Mobile Screening", "Group Therapy", "Trauma-Informed Care"]
  },
  {
    id: "srhr",
    title: "Sexual & Reproductive Health (SRHR)",
    description: "Improving access to essential services and community awareness on reproductive rights.",
    image: "https://picsum.photos/seed/srhr/800/600",
    details: ["Contraception Access", "Menstrual Hygiene", "Peer Education", "Stigma Reduction"]
  },
  {
    id: "malnutrition",
    title: "Malnutrition Support",
    description: "Focused on children under 5 and pregnant women to break cycles of poor health outcomes.",
    image: "https://picsum.photos/seed/nutrition/800/600",
    details: ["Mobile Screening", "Therapeutic Feeding", "Nutrition Education", "Follow-up Care"]
  },
  {
    id: "mphess",
    title: "Mental Health (MHPSS)",
    description: "Integrating psychological support to promote healing and resilience in conflict areas.",
    image: "https://picsum.photos/seed/mental/800/600",
    details: ["Group Therapy", "Peer-led Support", "Recreational Activities", "Confidence Building"]
  },
  {
    id: "economic",
    title: "Economic Empowerment",
    description: "Equipping women and youth with skills to break cycles of dependency.",
    image: "https://picsum.photos/seed/money/800/600",
    details: ["Vocational Training", "Entrepreneurship Skills", "Financial Literacy", "Cooperative Groups"]
  },
  {
    id: "protection",
    title: "Child Protection",
    description: "Upholding child rights through community-based mechanisms and safe spaces.",
    image: "https://picsum.photos/seed/child/800/600",
    details: ["Safe Spaces", "Legal Advocacy", "Governance Training", "Awareness Raising"]
  },
  {
    id: "environment",
    title: "Environmental Protection",
    description: "Promoting community-led conservation and climate resilience.",
    image: "https://picsum.photos/seed/nature/800/600",
    details: ["Climate Awareness", "Tree Planting", "Sustainable Farming", "Green Jobs"]
  },
  {
    id: "education",
    title: "Education Program",
    description: "Bridging the gap for out-of-school girls and marginalized women.",
    image: "https://picsum.photos/seed/edu/800/600",
    details: ["Literacy & Numeracy", "Life Skills", "Scholastic Materials", "Advocacy"]
  },
  {
    id: "peace",
    title: "Peace-Building",
    description: "Fostering inclusive dialogue and local leadership for sustainable reconciliation.",
    image: "https://picsum.photos/seed/peace/800/600",
    details: ["Inclusive Dialogue", "Conflict Resolution", "Peace Committees", "Civic Engagement"]
  }
];

export const IMPACT_DATA = [
  { year: '2019', beneficiaries: 450, spaces: 2, communities: 12 },
  { year: '2020', beneficiaries: 8000, spaces: 5, communities: 45 },
  { year: '2021', beneficiaries: 15000, spaces: 8, communities: 78 },
  { year: '2022', beneficiaries: 32000, spaces: 15, communities: 110 },
  { year: '2023', beneficiaries: 45000, spaces: 22, communities: 125 },
  { year: '2024', beneficiaries: 68000, spaces: 30, communities: 142 },
  { year: '2025', beneficiaries: 100000, spaces: 40, communities: 160 },
];
