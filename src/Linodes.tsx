import { useNavigate } from "react-router-dom";
import { useLinodesQuery } from "./queries/linodes";

export function Linodes() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useLinodesQuery();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <button onClick={() => navigate('/')}>Home</button>
      <ul>
        {data.data.map((linode) => <li key={linode.id}>{linode.label}</li>)}
      </ul>
    </>
  );
};