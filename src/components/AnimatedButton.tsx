"use client";

import Link from "next/link";
import { useAppointment } from "@/context/AppointmentContext";

interface AnimatedButtonProps {
  href?: string;
  onClick?: () => void;
  bookAppointment?: boolean;
  children: string;
}

export default function AnimatedButton({ href, onClick, bookAppointment, children }: AnimatedButtonProps) {
  const { openModal } = useAppointment();

  const className = "group inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-500 ease-out bg-size-[200%_100%] bg-position-[100%_0] hover:bg-position-[0_0] cursor-pointer";
  const style = {
    backgroundImage: "linear-gradient(to right, #0D6D6E 50%, white 50%)",
  };

  const content = (
    <>
      <span className="text-black transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4 text-black transition-colors duration-500 group-hover:text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    </>
  );

  const handleClick = bookAppointment ? openModal : onClick;

  if (handleClick) {
    return (
      <button onClick={handleClick} className={className} style={style}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href || "#"} className={className} style={style}>
      {content}
    </Link>
  );
}
