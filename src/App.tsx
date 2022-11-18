import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OAuthPopup, useOAuth2 } from "@tasoskakour/react-use-oauth2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./Home";
import { baseRequest } from "@linode/api-v4";
import { Linodes } from "./Linodes";

const queryClient = new QueryClient();

export function App() {
  const { data, getAuth } = useOAuth2({
    authorizeUrl: "https://login.linode.com/oauth/authorize",
    clientId: "1228ce081a630e7919ef",
    redirectUri: `http://localhost:5173/callback`,
    scope: "*",
    responseType: "token",
  });

  const isLoggedIn = Boolean(data?.access_token);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {!isLoggedIn && (
          <button onClick={() => getAuth()}>
            Login
          </button>
        )}
        <Routes>
          <Route path="/callback" element={<OAuthPopup />} />
          {isLoggedIn && (
            <>
              <Route path="/linodes" element={<Linodes />} />
              <Route path="/" element={<Home />} />
            </>
          )}
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
};

baseRequest.interceptors.request.use((config) => {
  const authState = window.localStorage.getItem('token-https://login.linode.com/oauth/authorize-1228ce081a630e7919ef-*')

  if (!authState || authState === 'null') {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${JSON.parse(authState).access_token}`,
    },
  };
});