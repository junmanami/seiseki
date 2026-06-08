"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [id, setId] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/result?id=${id}`);
  };

  return (
    <div>
      <h1>GPA検索</h1>

      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={handleSearch}>検索</button>
    </div>
  );
}
