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
  const { data, error } = useSWR(
    `{ user(email: "alec@alec.coffee") { _id name } }`,
    fetcher
  );

  if (error || (data && data.errors)) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { user } = data;

  return (
    <div>
      <div>{user.name}</div>
    </div>
  );
}
