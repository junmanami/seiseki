import React, { FormEvent, KeyboardEvent, useId, useState } from "react";
import matukiyo1 from "./matukiyo-1.png";

export const MacbookPro = (): JSX.Element => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const nameInputId = useId();
  const idInputId = useId();

  const handleSearch = (type: "name" | "id") => {
    const value = type === "name" ? name : studentId;
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    console.log(`Searching by ${type}:`, trimmedValue);
  };

  const handleSubmit =
    (type: "name" | "id") => (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSearch(type);
    };

  const handleKeyDown =
    (type: "name" | "id") => (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearch(type);
      }
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
<img
          className="absolute top-[45px] left-[45px] w-[395px] h-[701px] aspect-[0.56] object-cover"
          alt="広告"
          src={matukiyo1}
        />
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
{searchFields.map((field) => (
          <form
            key={field.key}
            onSubmit=
            className={`absolute left-[86px] ${field.top} h-[83px] w-[802px]`}
          >
<label htmlFor={field.inputId} className="sr-only">
{field.inputAriaLabel}
            </label>
<div className="absolute top-0 left-0 w-[618px] h-[78px] rounded-[10px] border-[4px] border-solid border-[#8d8d8d] bg-transparent" />
<input
              id={field.inputId}
              type="text"
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
              onKeyDown=
              placeholder={field.placeholder}
              aria-label={field.inputAriaLabel}
              className="absolute top-0 left-0 w-[618px] h-[78px] px-[22px] text-[#000000] placeholder:text-[#d5d5d5] text-4xl [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal]"
            />
<button
              type="submit"
              aria-label={field.buttonAriaLabel}
              className="absolute top-0 left-[652px] w-[150px] h-[83px] bg-[#7f7f7f] rounded-[10px] border-[5px] border-solid border-transparent text-white text-4xl text-center whitespace-nowrap [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] flex items-center justify-center cursor-pointer"
            >
{field.buttonLabel}
            </button>
</form>
))}
      </section>
</main>
);
};

export default MacbookPro;