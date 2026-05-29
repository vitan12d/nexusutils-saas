import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db, loginWithGoogle, logoutUser, updateUserProfile, UserProfile } from '../lib/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  login: () => Promise<FirebaseUser>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<UserProfile, 'displayName' | 'photoURL' | 'premiumTier'>>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Subscribe to Firebase Authentication state change
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      
      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
      } else {
        // 2. Auth is valid, listen to realtime profile record from Firestore
        const userRef = doc(db, 'users', firebaseUser.uid);
        const unsubscribeProfile = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          }
          setLoading(false);
        }, (error) => {
          console.error("Failed to fetch user profile document on snapshot:", error);
          setLoading(false);
        });
        
        return () => unsubscribeProfile();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      return await loginWithGoogle();
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const logout = async () => {
    setLoading(true);
    await logoutUser();
  };

  const updateProfile = async (updates: Partial<Pick<UserProfile, 'displayName' | 'photoURL' | 'premiumTier'>>) => {
    if (!user) throw new Error("An authenticated user is required to update profiles.");
    await updateUserProfile(user.uid, updates);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be utilized strictly inside an AuthProvider element.');
  }
  return context;
}
