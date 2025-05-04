"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { doc, setDoc, getDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase';



// Protected routes that require authentication
const PROTECTED_ROUTES: string[] = ['/quizs', '/profile'];
// Routes that should redirect to main app if user is already logged in
const AUTH_ROUTES: string[] = ['/sign-in', '/signup'];

// Define the auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Create the context with proper initial values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {}
});

// Define the AuthProvider props
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): React.ReactNode => {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname() || '';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Handle routing based on auth state
      if (currentUser) {
        // Save user to Firestore
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (!userSnap.exists()) {
            // Create new user document if it doesn't exist
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp(),
            });
          } else {
            // Update last login
            await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
          }
        } catch (error) {
          console.error("Error saving user to Firestore:", error);
        }

        // Redirect from auth pages if logged in
        if (AUTH_ROUTES.includes(pathname)) {
          router.push('/quizs');
        }
      } else {
        // Redirect from protected pages if not logged in
        if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
          router.push('/sign-in');
        }
      }
    });

    setMounted(true);
    return () => unsubscribe();
  }, [pathname, router]);

  const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  if (!mounted) {
    return null; // prevent mismatch until mounted on client
  }
  
  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};