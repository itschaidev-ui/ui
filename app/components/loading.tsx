export default function Loading() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#e5e5e5]">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 md:px-8">
        <aside className="hidden w-64 rounded-xl border border-[#141414] bg-[#0a0a0a] p-4 md:block">
          <div className="h-3 w-24 animate-pulse rounded bg-[#1c1c1c]" />
          <div className="mt-4 space-y-2">
            <div className="h-9 w-full animate-pulse rounded-lg bg-[#151515]" />
            <div className="h-9 w-full animate-pulse rounded-lg bg-[#151515]" />
            <div className="h-9 w-full animate-pulse rounded-lg bg-[#151515]" />
            <div className="h-9 w-full animate-pulse rounded-lg bg-[#151515]" />
          </div>
        </aside>

        <section className="flex-1 rounded-2xl border border-[#141414] bg-[#0a0a0a] p-8">
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#2f2f2f] border-t-[#e5e5e5]" />
            <p className="text-sm text-[#bfbfbf]">Loading components...</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="h-32 animate-pulse rounded-xl bg-[#121212]" />
            <div className="h-32 animate-pulse rounded-xl bg-[#121212]" />
            <div className="h-32 animate-pulse rounded-xl bg-[#121212]" />
          </div>
        </section>
      </div>
    </main>
  )
}
