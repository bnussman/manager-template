import { useNavigate } from "react-router-dom";
import { useProfile } from "./queries/profile";

export function Home() {
  const navigate = useNavigate();
  const { profile, isLoading, error } = useProfile();
  
  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <button onClick={() => navigate('/linodes')}>Linodes</button>
      <p>Hello {profile?.username}</p>
    </>
  );
};