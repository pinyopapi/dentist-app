import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

export const useGoogleAuth = () => {
  const [googleToken, setGoogleToken] = useState(null);
  const [googleName, setGoogleName] = useState("");
  const [error, setError] = useState(null);

  const fetchGoogleUserInfo = async (accessToken) => {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error("Failed to fetch user info");
    const data = await res.json();
    return data.name || data.email;
  };

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar",
    onSuccess: async (tokenResponse) => {
      try {
        setGoogleToken(tokenResponse.access_token);
        const name = await fetchGoogleUserInfo(tokenResponse.access_token);
        setGoogleName(name);
        setError(null);
      } catch {
        setError("Failed to get user info from Google");
      }
    },
    onError: () => setError("Google login failed"),
  });

  return { googleToken, googleName, error, login };
};