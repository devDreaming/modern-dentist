import Link from "next/link";

interface AnimatedButtonProps {
  href: string;
  children: string;
}

export default function AnimatedButton({ href, children }: AnimatedButtonProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-500 ease-out bg-size-[200%_100%] bg-position-[100%_0] hover:bg-position-[0_0]"
      style={{
        backgroundImage: "linear-gradient(to right, #0D6D6E 50%, white 50%)",
      }}
    >
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
    </Link>
  );
}
