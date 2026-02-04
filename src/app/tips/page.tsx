export default function Contact() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        Get in touch — I&apos;d love to hear from you.
      </p>
      <form className="flex max-w-md flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="rounded-md border border-zinc-300 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <input
          type="email"
          placeholder="Email"
          className="rounded-md border border-zinc-300 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <textarea
          placeholder="Message"
          rows={5}
          className="rounded-md border border-zinc-300 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}