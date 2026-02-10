import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  PACKS,
  getComponentName,
  type Pack,
  type PackTier,
} from "@/lib/packs"

const tierConfig: Record<
  PackTier,
  { label: string; className: string; cta?: string }
> = {
  free: {
    label: "Free",
    className: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  },
  pro: {
    label: "Pro",
    className: "border-violet-500/50 bg-violet-500/10 text-violet-400",
    cta: "Unlock pack",
  },
  ads: {
    label: "With ads",
    className: "border-amber-500/50 bg-amber-500/10 text-amber-400",
    cta: "View with ads",
  },
}

function PackCard({ pack }: { pack: Pack }) {
  const config = tierConfig[pack.tier]
  const isComingSoon = pack.componentIds.length === 0

  return (
    <Card className="border-[#141414] bg-[#0a0a0a] text-[#e5e5e5] transition-colors hover:border-[#252525]">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-xl">{pack.name}</CardTitle>
          <CardDescription className="mt-1 text-[#777]">
            {pack.description}
          </CardDescription>
        </div>
        <Badge
          variant="outline"
          className={`shrink-0 ${config.className}`}
        >
          {config.label}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {isComingSoon ? (
          <p className="text-sm text-[#666]">Coming soon.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {pack.componentIds.map((id) => (
              <li key={id}>
                <Link
                  href="/components"
                  className="rounded-md border border-[#222] bg-[#111] px-2.5 py-1.5 text-sm text-[#c8c8c8] transition hover:border-[#333] hover:text-white"
                >
                  {getComponentName(id)}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {(config.cta || !isComingSoon) && (
          <div className="flex flex-wrap gap-2">
            {!isComingSoon && (
              <Button asChild size="sm" variant="secondary">
                <Link href="/components">Open in playground</Link>
              </Button>
            )}
            {config.cta && (
              <Button size="sm" variant="outline" className="border-[#333]">
                {config.cta}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function PacksPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#e5e5e5]">
      <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
        <Badge
          variant="secondary"
          className="mb-4 border-[#222] bg-[#0f0f0f] text-[#999]"
        >
          Packs
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight">
          Component packs
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#8f8f8f]">
          Components are grouped into packs by niche. Free packs are fully
          available in the docs and npm package. Pro and ad-supported packs can
          be unlocked later (payment or ads).
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {PACKS.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>

        <Card className="mt-10 border-[#141414] bg-[#0a0a0a]">
          <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-[#999]">
              All components are open source. Packs are a way to discover
              by use-case and to support future paid or ad-supported add-ons.
            </p>
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <Link href="/docs">Full docs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
