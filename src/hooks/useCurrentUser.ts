import { getCurrentUserInfo } from "@/services/firebase/userServices";
import { IUser } from "@/typings/types";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useCurrentUser = (
  queryConfig: Omit<UseQueryOptions<IUser | null>, "queryKey" | "select"> = {}
) => {
  // const isFocused = useIsFocused();
  const result = useQuery({
    // subscribed: isFocused,
    queryKey: ["currentUser"],
    queryFn: getCurrentUserInfo,
    enabled: false,
    ...queryConfig,
  });
  return result;
};

export default useCurrentUser;
