"use client";

import React, { FormEvent, useId, useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "./components/SearchInput";
import SearchButton from "./components/SearchButton";

export default function MacbookPro(): React.ReactElement {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  const nameInputId = useId();
  const idInputId = useId();

  const router = useRouter();

  const handleSearch = (type: "name" | "id") => {
    const value = type === "name" ? name : studentId;
    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    router.push(
      `/result?type=${type}&value=${encodeURIComponent(trimmedValue)}`
    );
  };

  const handleSubmit =
    (type: "name" | "id") => (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSearch(type);
    };

  return (
    <main className="bg-white w-full min-w-[1728px] min-h-[1117px] relative overflow-hidden">
      <aside
        className="absolute -top-1.5 left-[1243px] w-[485px] h-[1123px] bg-[#d9d9d9]"
        aria-label="広告エリア"
      >
        <a href="/koukoku">
          <img
            className="absolute top-[45px] left-[45px] w-[395px] h-[701px] aspect-[0.56] object-cover"
            alt="広告"
            src="/image/matukiyo.jpg"
          />
        </a>
      </aside>

      <section
        className="relative"
        aria-labelledby="grade-reference-heading"
      >
        <h1
          id="grade-reference-heading"
          className="absolute top-[83px] left-[88px] w-[483px] text-black text-[80px] [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal]"
        >
          成績参照
        </h1>

        {/* 名前検索 */}
        <form
          onSubmit={handleSubmit("name")}
          className="absolute left-[86px] top-[260px] h-[83px] w-[802px]"
        >
          <SearchInput
            inputId={nameInputId}
            value={name}
            onChange={setName}
            placeholder="名前を入力"
            inputAriaLabel="名前を入力して検索"
            onSearch={() => handleSearch("name")}
          />

          <SearchButton
            buttonLabel="検索"
            buttonAriaLabel="名前で検索"
          />
        </form>

        {/* ID検索 */}
        <form
          onSubmit={handleSubmit("id")}
          className="absolute left-[86px] top-[388px] h-[83px] w-[802px]"
        >
          <SearchInput
            inputId={idInputId}
            value={studentId}
            onChange={setStudentId}
            placeholder="IDを入力"
            inputAriaLabel="IDを入力して検索"
            onSearch={() => handleSearch("id")}
          />

          <SearchButton
            buttonLabel="検索"
            buttonAriaLabel="IDで検索"
          />
        </form>
      </section>
    </main>
  );
}