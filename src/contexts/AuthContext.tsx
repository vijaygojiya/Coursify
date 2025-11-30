import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext<{
  session: Session | null;
}>({ session: null });

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const value = React.useMemo(
    () => ({
      session,
    }),
    [session],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export default AuthContextProvider;

export function useAuth() {
  const context = React.use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider!");
  }
  return context;
}
