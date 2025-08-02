import { useQuery } from "@tanstack/react-query";

import { getUser } from "../lib/api";

export const AUTH = "auth";

const useAuth = (opts = {}) => {
  const { data, ...rest } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...opts,
  });
  const user = data?.user
  return { user, ...rest };
};

export default useAuth;
