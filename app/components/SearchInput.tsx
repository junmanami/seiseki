"use client";

import { KeyboardEvent } from "react";

type Props = {
  inputId: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  inputAriaLabel: string;
  onSearch: () => void;
};

export default function SearchInput({
  inputId,
  value,
  onChange,
  placeholder,
  inputAriaLabel,
  onSearch,
}: Props) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch();
    }
  };

  return (
    <>
      <label htmlFor={inputId} className="sr-only">
        {inputAriaLabel}
      </label>

      <div className="absolute top-0 left-0 w-[618px] h-[78px] rounded-[10px] border-[4px] border-solid border-[#8d8d8d] bg-transparent" />

      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={inputAriaLabel}
        className="absolute top-0 left-0 w-[618px] h-[78px] px-[22px] text-[#000000] placeholder:text-[#d5d5d5] text-4xl"
      />
    </>
  );
}