
export interface TeamMember {
  name: string;
  role: string;
  country: string;
  profile?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  quote?: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  details: string[];
  image: string;
}

export interface NewsUpdate {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  img: string;
}

export interface Project {
  id: string;
  title: string;
  status: 'In Progress' | 'Completed';
  region: string;
  timeline: string;
  beneficiaries: string;
  description: string;
  progress: number;
  completedItems: string[];
  missingItems: string[];
  lastUpdated?: string;
}

export interface Volunteer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  interests: string[];
}

export interface Donation {
  id: string;
  name: string;
  amount: number;
  date: string;
  project?: string;
  source: 'Individual' | 'Corporate' | 'Grant' | 'Recurring';
  status: 'Cleared' | 'Pending' | 'Flagged';
}

export interface Expense {
  id: string;
  category: 'Salaries' | 'Field Projects' | 'Logistics' | 'Admin' | 'Marketing';
  amount: number;
  date: string;
  description: string;
  recipient: string;
  status: 'Cleared' | 'Pending';
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'helper';
  isValidated: boolean;
  name: string;
  profilePicture?: string;
}
