import React from "react";
import useSWR from "swr";

const fetcher = (query: any) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default function Index() {
  const { data, error } = useSWR(`{ user(id: "1") { id name } }`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { user } = data;

  return (
    <div>
      <div>{user.name}</div>
    </div>
  );
}
