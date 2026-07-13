"use client";

import { FormEvent, KeyboardEvent } from "react";

type Props = {
  inputId: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  buttonLabel: string;
  inputAriaLabel: string;
  buttonAriaLabel: string;
  top: string;
  onSearch: () => void;
};

export default function SearchForm({
  inputId,
  value,
  onChange,
  placeholder,
  buttonLabel,
  inputAriaLabel,
  buttonAriaLabel,
  top,
  onSearch,
}: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`absolute left-[86px] ${top} h-[83px] w-[802px]`}
    >
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

      <button
        type="submit"
        aria-label={buttonAriaLabel}
        className="absolute top-0 left-[652px] w-[150px] h-[83px] bg-[#7f7f7f] rounded-[10px] text-white text-4xl cursor-pointer"
      >
        {buttonLabel}
      </button>
    </form>
  );
}