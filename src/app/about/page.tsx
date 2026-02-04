export default function Gallery() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold tracking-tight">Gallery</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        A collection of images and visual work.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {/* Add gallery items here */}
      </div>
    </div>
  );
}
