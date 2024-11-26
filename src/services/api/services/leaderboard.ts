import { useCallback, useContext } from "react";
import useFetchBase from "@/services/api/use-fetch-base";
import { LEADERBOARD_URL } from "@/services/api/config";
import { AuthTokensContext } from "@/services/auth/auth-context";
import { User } from "@/services/api/types/user";

export function useLeaderboardService() {
  const fetchBase = useFetchBase();
  const { tokensInfoRef, setTokensInfo } = useContext(AuthTokensContext);

  return useCallback(
    async (limit = 50) => {
      const response = await fetchBase(
        `${LEADERBOARD_URL}?limit=${limit}`,
        {
          method: "GET",
        },
        {
          token: tokensInfoRef.current?.token,
          refreshToken: tokensInfoRef.current?.refreshToken,
          tokenExpires: tokensInfoRef.current?.tokenExpires,
          setTokensInfo, // Ensure tokens are refreshed if expired
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data");
      }

      return response.json() as Promise<User[]>;
    },
    [fetchBase, tokensInfoRef, setTokensInfo]
  );
}
