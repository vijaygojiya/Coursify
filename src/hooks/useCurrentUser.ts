import { useAuth } from "@/contexts/AuthContext";
import { fetchProfile, UserProfile } from "@/services/supabase";
import { useIsFocused } from "@react-navigation/native";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useCurrentUser = (
  queryConfig: Omit<
    UseQueryOptions<UserProfile | null>,
    "queryKey" | "select"
  > = {}
) => {
  const { session } = useAuth();
  const isFocused = useIsFocused();
  const result = useQuery({
    subscribed: isFocused,
    queryKey: [session?.user.id, "profile"],
    queryFn: ({ queryKey: [userId] }) => {
      return fetchProfile(userId as string);
    },
    enabled: !!session?.user.id,
    ...queryConfig,
  });
  return result;
};

export default useCurrentUser;
