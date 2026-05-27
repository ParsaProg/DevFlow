"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { BACKEND_BASE_URL } from "@/src/constants/backendBaseUrl";

interface AuthContextType {
  accessToken: string | null;
  user: any;
  loading: boolean;
  setAuth: (token: string | null, user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function silentRefresh() {
      // ⚡ THE CRITICAL BUG FIX:
      // If we already have an accessToken (set dynamically by your Sign-In form),
      // STOP immediately. Do not hit the backend verification route or wipe memory!
      if (accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_BASE_URL}/api/v1/auth/verify`,
          {
            method: "POST",
            credentials: "include",
          },
        );

        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.accessToken);
          setUser(data.user);
        }
      } catch (err) {
        console.error("Session mounting error:", err);
      } finally {
        setLoading(false);
      }
    }

    silentRefresh();
  }, []); // ⚡ REMOVED 'router' dependency to ensure this runs EXACTLY ONCE on initial tab boot

  const setAuth = (token: string | null, userData: any) => {
    setAccessToken(token);
    setUser(userData);
    // Explicitly make sure loading is false if someone updates auth details manually
    setLoading(false); 
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, loading, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};