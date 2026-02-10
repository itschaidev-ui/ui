export default function Loading() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#e5e5e5]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl rounded-2xl border border-[#1b1b1b] bg-[#0a0a0a] p-8">
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#2f2f2f] border-t-[#e5e5e5]" />
            <p className="text-sm text-[#bfbfbf]">Loading everything...</p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-4 w-2/3 animate-pulse rounded bg-[#151515]" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-[#151515]" />
            <div className="h-24 w-full animate-pulse rounded-xl bg-[#121212]" />
          </div>
        </div>
      </div>
    </main>
  )
}
