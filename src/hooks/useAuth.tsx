import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Minimal user shape used across the app
export interface AuthUser {
  id: string;
  email: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  session: unknown | null;
  loading: boolean;
  isLocal: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any | null }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    // 1) Prefer LOCAL auth if present (login sem filtro)
    const stored = localStorage.getItem('local_auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthUser;
        setUser(parsed);
        setIsLocal(true);
        setLoading(false);
        return; // Skip Supabase if local auth exists
      } catch {
        localStorage.removeItem('local_auth');
      }
    }

    // 2) Otherwise, fall back to Supabase session (opcional)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      if (s?.user) {
        setUser({ id: s.user.id, email: s.user.email });
        setIsLocal(false);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email });
        setIsLocal(false);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // LOGIN/CRIAR CONTA SEM FILTRO (modo local)
  const createLocalUser = (email: string): AuthUser => ({
    id: `local-${Date.now()}`,
    email,
  });

  const signUp = async (email: string, _password: string) => {
    const localUser = createLocalUser(email);
    localStorage.setItem('local_auth', JSON.stringify(localUser));
    setUser(localUser);
    setIsLocal(true);
    return { error: null };
  };

  const signIn = async (email: string, _password: string) => {
    // Permitir qualquer email/senha
    const existing = localStorage.getItem('local_auth');
    if (existing) {
      try {
        const parsed = JSON.parse(existing) as AuthUser;
        // Se o email for diferente, atualiza para o novo email
        const userToUse = parsed.email === email ? parsed : { ...parsed, email };
        localStorage.setItem('local_auth', JSON.stringify(userToUse));
        setUser(userToUse);
        setIsLocal(true);
        return { error: null };
      } catch {
        // fallback para criar um novo
      }
    }
    const localUser = createLocalUser(email);
    localStorage.setItem('local_auth', JSON.stringify(localUser));
    setUser(localUser);
    setIsLocal(true);
    return { error: null };
  };

  const signOut = async () => {
    localStorage.removeItem('local_auth');
    setIsLocal(false);
    setUser(null);
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    isLocal,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
