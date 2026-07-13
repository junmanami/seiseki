"use client";
import React, { useId, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchForm from "./components/SearchForm";

export const MacbookPro = (): React.ReactElement => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const nameInputId = useId();
  const idInputId = useId();
  const router = useRouter();

  const handleSearch = (type: "name" | "id") => {
    const value = type === "name" ? name : studentId;
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    console.log(`Searching by ${type}:`, trimmedValue);

    router.push(
      `/result?type=${type}&value=${encodeURIComponent(trimmedValue)}`
    );
  };

  const searchFields = [
    {
      key: "name" as const,
      top: "top-[260px]",
      inputId: nameInputId,
      value: name,
      onChange: setName,
      placeholder: "名前を入力",
      buttonLabel: "検索",
      inputAriaLabel: "名前を入力して検索",
      buttonAriaLabel: "名前で検索",
    },
    {
      key: "id" as const,
      top: "top-[388px]",
      inputId: idInputId,
      value: studentId,
      onChange: setStudentId,
      placeholder: "IDを入力",
      buttonLabel: "検索",
      inputAriaLabel: "IDを入力して検索",
      buttonAriaLabel: "IDで検索",
    },
  ];

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
<SearchForm
  inputId={nameInputId}
  value={name}
  onChange={setName}
  placeholder="名前を入力"
  buttonLabel="検索"
  inputAriaLabel="名前を入力して検索"
  buttonAriaLabel="名前で検索"
  top="top-[260px]"
  onSearch={() => handleSearch("name")}
/>

<SearchForm
  inputId={idInputId}
  value={studentId}
  onChange={setStudentId}
  placeholder="IDを入力"
  buttonLabel="検索"
  inputAriaLabel="IDを入力して検索"
  buttonAriaLabel="IDで検索"
  top="top-[388px]"
  onSearch={() => handleSearch("id")}
/>
      </section>
</main>
);
};

export default MacbookPro;