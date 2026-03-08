export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">
          Shorts Engine
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          Discover products from viral short-form videos.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 text-zinc-400 text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Coming soon
        </div>
      </div>
    </main>
  );
}
