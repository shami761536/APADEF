
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { NewsUpdate, GalleryItem, Project, Volunteer, Donation, User, Expense } from '../types';

// Supabase Configuration - Safely accessing environment variables
const SUPABASE_URL = (process.env as any).SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = (process.env as any).SUPABASE_ANON_KEY || 'placeholder-key';

// Initialize Supabase Client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface MockDataContextType {
  news: NewsUpdate[];
  gallery: GalleryItem[];
  projects: Project[];
  volunteers: Volunteer[];
  donations: Donation[];
  expenses: Expense[];
  helpers: User[];
  currentUser: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  addNews: (item: NewsUpdate) => void;
  addProject: (item: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addImage: (item: GalleryItem) => void;
  addDonation: (item: Donation) => void;
  addExpense: (item: Expense) => void;
  addVolunteer: (item: Volunteer) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  updateCurrentProfile: (updates: Partial<User>) => void;
  registerStaff: (name: string, email: string, role: 'admin' | 'helper') => void;
  resetDatabase: () => void;
  // Dynamic Aggregations
  getAggregates: () => {
    totalRevenue: number;
    totalExpenses: number;
    activeBeneficiaries: string;
    volunteerCount: number;
    projectCount: number;
    revenueHistory: { month: string; amount: number }[];
  };
}

const DB_KEY = 'APDFE_CLOUD_SYNC_V1';
const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsUpdate[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [helpers, setHelpers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const syncToCloud = useCallback((data: any) => {
    // In a real implementation, this would call supabase.from('...').upsert()
    // For this context, we mirror the persistence locally to ensure it works instantly while 
    // maintaining the Supabase-ready structure.
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  }, []);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      
      const session = localStorage.getItem('APDFE_SESSION');
      if (session) {
        try { setCurrentUser(JSON.parse(session)); } catch (e) { localStorage.removeItem('APDFE_SESSION'); }
      }

      const stored = localStorage.getItem(DB_KEY);
      if (stored) {
        try {
          const p = JSON.parse(stored);
          setNews(p.news || []);
          setGallery(p.gallery || []);
          setProjects(p.projects || []);
          setVolunteers(p.volunteers || []);
          setDonations(p.donations || []);
          setExpenses(p.expenses || []);
          setHelpers(p.helpers || []);
        } catch (e) { seed(); }
      } else { seed(); }
      
      setIsLoading(false);
    };

    const seed = () => {
      // Primary Root Admin is forced into the DB
      const initialHelpers: User[] = [
        { id: 'admin-root', name: 'Kenny Tohne', email: 'kennytohne@gmail.com', role: 'admin', isValidated: true },
        { id: 'admin-secondary', name: 'Regional Office', email: 'admin@apdfe.org', role: 'admin', isValidated: true }
      ];
      
      const initialProjects: Project[] = [
        { 
          id: "p1", 
          title: "Rural Education Enhancement", 
          status: "In Progress", 
          region: "Kigali, Rwanda", 
          timeline: "2024-2025", 
          beneficiaries: "1,200", 
          description: "Providing digital literacy and clean water to 12 rural schools.", 
          progress: 65,
          completedItems: ["Logistics center established"],
          missingItems: ["Digital tablets for grade 5"],
          lastUpdated: "Feb 2025"
        },
      ];

      const initialDonations: Donation[] = [
        { id: 'd1', name: 'Global Fund', amount: 5000, date: '2025-01-15', source: 'Corporate', status: 'Cleared' },
        { id: 'd2', name: 'Kenny Tohne', amount: 2500, date: '2025-02-01', source: 'Individual', status: 'Cleared' }
      ];

      setHelpers(initialHelpers);
      setProjects(initialProjects);
      setDonations(initialDonations);
      
      const data = { news: [], gallery: [], projects: initialProjects, volunteers: [], donations: initialDonations, expenses: [], helpers: initialHelpers };
      syncToCloud(data);
    };

    init();
  }, [syncToCloud]);

  useEffect(() => {
    if (!isLoading) {
      syncToCloud({ news, gallery, projects, volunteers, donations, expenses, helpers });
    }
  }, [news, gallery, projects, volunteers, donations, expenses, helpers, isLoading, syncToCloud]);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('APDFE_SESSION', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('APDFE_SESSION');
  };

  const getAggregates = () => {
    const totalRev = donations.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExp = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const benCount = projects.reduce((acc, p) => acc + (parseInt(p.beneficiaries.replace(/\D/g, '')) || 0), 0);

    // Grouping donations by month for the chart
    const monthlyData: { [key: string]: number } = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    months.forEach(m => monthlyData[m] = 0);

    donations.forEach(d => {
      const monthIndex = new Date(d.date).getMonth();
      const monthName = months[monthIndex];
      if (monthlyData[monthName] !== undefined) {
        monthlyData[monthName] += d.amount;
      }
    });

    const revenueHistory = months.map(m => ({ month: m, amount: monthlyData[m] }));

    return {
      totalRevenue: totalRev,
      totalExpenses: totalExp,
      activeBeneficiaries: benCount.toLocaleString() + "+",
      volunteerCount: volunteers.length,
      projectCount: projects.length,
      revenueHistory
    };
  };

  const addNews = (item: NewsUpdate) => setNews(prev => [item, ...prev]);
  const addProject = (item: Project) => setProjectList(prev => [item, ...prev]);
  const updateProject = (id: string, updates: Partial<Project>) => setProjectList(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  const addImage = (item: GalleryItem) => setGallery(prev => [item, ...prev]);
  const addDonation = (item: Donation) => setDonations(prev => [item, ...prev]);
  const addExpense = (item: Expense) => setExpenses(prev => [item, ...prev]);
  const addVolunteer = (item: Volunteer) => setVolunteers(prev => [item, ...prev]);

  const setProjectList = (updated: any) => setProjects(updated);

  const registerStaff = (name: string, email: string, role: 'admin' | 'helper') => {
    const newUser: User = { id: `u-${Date.now()}`, name, email: email.toLowerCase(), role, isValidated: true };
    setHelpers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setHelpers(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
    if (currentUser?.id === id) {
      const updated = { ...currentUser, ...updates };
      setCurrentUser(updated);
      localStorage.setItem('APDFE_SESSION', JSON.stringify(updated));
    }
  };

  const updateCurrentProfile = (updates: Partial<User>) => currentUser && updateUser(currentUser.id, updates);

  const resetDatabase = () => {
    localStorage.removeItem(DB_KEY);
    localStorage.removeItem('APDFE_SESSION');
    window.location.reload();
  };

  return (
    <MockDataContext.Provider value={{ 
      news, gallery, projects, volunteers, donations, expenses, helpers, currentUser, isLoading,
      login, logout, addNews, addProject, updateProject, addImage, addDonation, addExpense, addVolunteer,
      updateUser, updateCurrentProfile, registerStaff, resetDatabase, getAggregates
    }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(MockDataContext);
  if (!context) throw new Error('useData must be used within MockDataProvider');
  return context;
};
