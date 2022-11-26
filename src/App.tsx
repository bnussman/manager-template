import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./Home";
import { Linodes } from "./Linodes";
import { authorizeUrl, clientId } from "./utils/constants";
import { setToken } from "@linode/api-v4";

const queryClient = new QueryClient();

function OAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URLSearchParams(window.location.href);
    const data = Array.from(url.entries());

    const token = data.find(entry => entry[0].includes("access_token"))?.[1];
    const expires_in = url.get("expires_in")

    if (!token || !expires_in) {
      return;
    }

    const expiresIn = Number(expires_in) * 1000;
    const expiresAt = Date.now() + expiresIn;

    console.log("New token expires at", new Date(expiresAt));

    setTimeout(() => {
      // Re-auth because token is expired when this runs
    }, expiresIn);

    localStorage.setItem('token', token);
    localStorage.setItem('expires', String(expiresAt));

    console.log(token)
    setToken(token);

    navigate("/");
  }, []);

  return <p>Logging In</p>;
}

function Main() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const hasToken = token !== null;
    const expiresAt = Number(localStorage.getItem('expires'));

    if (location.pathname.includes('/callback')) return;
    if (hasToken && expiresAt > Date.now()) {
      setToken(token);
      setIsLoading(false);
      return;
    }
    window.location.href = encodeURI(`${authorizeUrl}?response_type=token&client_id=${clientId}&state=xyz&redirect_uri=http://localhost:5173/callback&scope=*`);
  }, []);

  return (
    <Routes>
      <Route path="/callback" element={<OAuth />} />
      {!isLoading && (
        <>
          <Route path="/linodes" element={<Linodes />} />
          <Route path="/" element={<Home />} />
        </>
      )}
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </BrowserRouter>
  )
};