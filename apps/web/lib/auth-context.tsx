'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  country?: string;
  referralCode: string;
  walletCreditPkr: number;
  emailVerified: boolean;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    whatsapp: string;
  };
  dietaryPreferences?: string[];
  mobilityNotes?: string;
}

export interface Reservation {
  id: string;
  bookingReference: string;
  packageSlug: string;
  packageTitle: string;
  tier: string;
  image: string;
  city: string;
  startDate: string;
  endDate: string;
  partySize: number;
  totalPricePkr: number;
  currency: 'USD' | 'GBP';
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
  guide: {
    name: string;
    avatarUrl: string;
    phone: string;
    languages: string[];
    rating: number;
  };
  meetingPoint: string;
  safetyTrackingToken?: string;
  hasReviewed?: boolean;
}

const DEFAULT_SAMPLE_RESERVATIONS: Reservation[] = [
  {
    id: 'res-upcoming-01',
    bookingReference: 'DEP-LHR-98421',
    packageSlug: 'lahore-shaam-e-mughal-royal-experience',
    packageTitle: 'Shaam-e-Mughal – The Royal Lahore Experience',
    tier: 'SIGNATURE',
    image: '/images/packages/lahore/shaam-e-mughal.jpg',
    city: 'Lahore',
    startDate: '2026-11-20',
    endDate: '2026-11-22',
    partySize: 2,
    totalPricePkr: 2200000,
    currency: 'USD',
    status: 'CONFIRMED',
    guide: {
      name: 'Tariq Mehmood',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      phone: '+92 300 8492551',
      languages: ['English', 'Urdu', 'Punjabi'],
      rating: 4.9,
    },
    meetingPoint: 'Alamgiri Gate, Shahi Qila (Lahore Fort), Walled City, Lahore',
    safetyTrackingToken: 'token_lahore_royal_98421',
    hasReviewed: false,
  },
  {
    id: 'res-past-01',
    bookingReference: 'DEP-LHR-71049',
    packageSlug: 'lahore-zaiqa-e-lahore-food-trail',
    packageTitle: 'Zaiqa-e-Lahore – Food Trail & Breakfast',
    tier: 'FOOD',
    image: '/images/packages/lahore/zaiqa-e-lahore-food-trail.jpg',
    city: 'Lahore',
    startDate: '2026-10-14',
    endDate: '2026-10-14',
    partySize: 3,
    totalPricePkr: 450000,
    currency: 'USD',
    status: 'COMPLETED',
    guide: {
      name: 'Chef Aslam Butt',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
      phone: '+92 332 4541952',
      languages: ['English', 'Urdu'],
      rating: 5.0,
    },
    meetingPoint: 'Delhi Gate Entrance, Circular Road, Lahore',
    safetyTrackingToken: 'token_lahore_food_71049',
    hasReviewed: false,
  },
  {
    id: 'res-past-02',
    bookingReference: 'DEP-LHR-65120',
    packageSlug: 'lahore-by-night-roshan-galiyan',
    packageTitle: 'Lahore by Night – Roshan Galiyan & Rooftop Dining',
    tier: 'CULTURAL',
    image: '/images/packages/lahore/lahore-by-night.jpg',
    city: 'Lahore',
    startDate: '2026-09-28',
    endDate: '2026-09-28',
    partySize: 2,
    totalPricePkr: 350000,
    currency: 'GBP',
    status: 'COMPLETED',
    guide: {
      name: 'Fatima Zahra',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      phone: '+92 301 5558190',
      languages: ['English', 'Urdu'],
      rating: 4.9,
    },
    meetingPoint: 'Fort Road Food Street Entrance, Lahore',
    safetyTrackingToken: 'token_lahore_night_65120',
    hasReviewed: true,
  },
];

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  reservations: Reservation[];
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  updateEmergencyContact: (contact: NonNullable<UserProfile['emergencyContact']>) => void;
  addReservation: (res: Reservation) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'dep_traveller_user';
const STORAGE_KEY_RESERVATIONS = 'dep_traveller_reservations';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>(DEFAULT_SAMPLE_RESERVATIONS);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedRes = localStorage.getItem(STORAGE_KEY_RESERVATIONS);
      if (storedRes) {
        setReservations(JSON.parse(storedRes));
      }
    } catch {
      // localStorage may fail in restricted/private windows
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistUser = (newUser: UserProfile | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch {
      // ignore
    }
  };

  const persistReservations = (newRes: Reservation[]) => {
    setReservations(newRes);
    try {
      localStorage.setItem(STORAGE_KEY_RESERVATIONS, JSON.stringify(newRes));
    } catch {
      // ignore
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const googleUser: UserProfile = {
      id: 'usr_google_traveller_01',
      name: 'Dr. Zoya Khan',
      email: 'zoya.khan.travel@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      phone: '+44 7700 900142',
      country: 'United Kingdom',
      referralCode: 'ZOYA-PK26',
      walletCreditPkr: 5000,
      emailVerified: true,
      emergencyContact: {
        name: 'Farhan Khan',
        relationship: 'Brother',
        phone: '+44 7700 900889',
        whatsapp: '+44 7700 900889',
      },
      dietaryPreferences: ['Halal Only', 'No Peanuts'],
      mobilityNotes: 'Comfortable with walking tours up to 5km',
    };

    persistUser(googleUser);
    setIsLoading(false);
    return true;
  };

  const login = async (email: string, _pass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const standardUser: UserProfile = {
      id: 'usr_traveller_std',
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email: email.toLowerCase().trim(),
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      phone: '+92 300 1234567',
      country: 'Pakistan',
      referralCode: 'DAASTAAN-GUEST',
      walletCreditPkr: 2500,
      emailVerified: true,
      emergencyContact: {
        name: 'Family Emergency Contact',
        relationship: 'Family Member',
        phone: '+92 300 7654321',
        whatsapp: '+92 300 7654321',
      },
      dietaryPreferences: ['Halal'],
      mobilityNotes: 'None',
    };

    persistUser(standardUser);
    setIsLoading(false);
    return true;
  };

  const signup = async (name: string, email: string, _pass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const ref = `${name.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=123c2d&textColor=b99550`,
      phone: '',
      country: 'International Guest',
      referralCode: ref,
      walletCreditPkr: 1500, // Launch welcome bonus credit
      emailVerified: true,
      emergencyContact: {
        name: '',
        relationship: '',
        phone: '',
        whatsapp: '',
      },
      dietaryPreferences: ['Halal'],
      mobilityNotes: '',
    };

    persistUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    persistUser(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const modified = { ...user, ...updated };
    persistUser(modified);
  };

  const updateEmergencyContact = (contact: NonNullable<UserProfile['emergencyContact']>) => {
    if (!user) return;
    const modified = { ...user, emergencyContact: contact };
    persistUser(modified);
  };

  const addReservation = (res: Reservation) => {
    const updated = [res, ...reservations];
    persistReservations(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        reservations,
        login,
        loginWithGoogle,
        signup,
        logout,
        updateProfile,
        updateEmergencyContact,
        addReservation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
