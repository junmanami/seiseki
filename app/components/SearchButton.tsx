"use client";

type Props = {
  buttonLabel: string;
  buttonAriaLabel: string;
};

export default function SearchButton({
  buttonLabel,
  buttonAriaLabel,
}: Props) {
  return (
    <button
      type="submit"
      aria-label={buttonAriaLabel}
      className="absolute top-0 left-[652px] w-[150px] h-[83px] bg-[#7f7f7f] rounded-[10px] text-white text-4xl cursor-pointer"
    >
      {buttonLabel}
    </button>
  );
}