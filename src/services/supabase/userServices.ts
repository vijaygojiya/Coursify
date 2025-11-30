import { supabase } from "@/utils/supabase";
// fetch profile by user id
export type UserRole = "user" | "admin" | "moderator"; // match your public.user_role enum

export type UserProfile = {
  id: string; // same as auth.users.id
  name?: string | null;
  email?: string | null;
  bio?: string | null;
  avatar_url?: string | null; // we store storage path or signed/public URL
  role?: UserRole | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data as UserProfile;
}

export async function updateProfile(
  updates: Partial<UserProfile> & { id: string },
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", updates.id)
    .select()
    .single();

  if (error) throw error;

  return data as UserProfile;
}
