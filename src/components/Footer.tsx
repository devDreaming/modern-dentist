import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-sm text-zinc-500 dark:text-zinc-400">
        <p>&copy; {new Date().getFullYear()} Modern Dentist. All rights reserved.</p>
        <ul className="flex gap-6">
          <li>
            <Link
              href="/about"
              className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Our Services
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
