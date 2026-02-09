import Link from "next/link"
import { ArrowRight, Boxes, Github, Palette, Sparkles, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    icon: Sparkles,
    title: "Beautiful by default",
    description:
      "Polished components with elegant spacing, typography, and motion out of the box.",
  },
  {
    icon: Zap,
    title: "Fast to build with",
    description:
      "Composable API and clean patterns that help you ship screens in hours, not days.",
  },
  {
    icon: Boxes,
    title: "Made for scale",
    description:
      "Reusable primitives designed for design systems, products, and open-source workflows.",
  },
]

const stats = [
  { label: "Components", value: "50+" },
  { label: "Themes", value: "Dark + Light" },
  { label: "Open Source", value: "MIT" },
]

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.14),transparent_35%)]" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-20 pt-24 md:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge variant="secondary" className="mb-4 border-border/70 bg-secondary/60">
            Open Source UI Library
          </Badge>

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            Build stunning interfaces with speed and consistency.
          </h1>

          <p className="mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            A modern component library for React teams that care about design,
            accessibility, and developer experience.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="group">
              <Link href="#">
                Explore Components
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#">
                <Github />
                Star on GitHub
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <Card key={item.label} className="border-border/70 bg-card/70 backdrop-blur">
              <CardHeader className="pb-2">
                <CardDescription>{item.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border/70 bg-card/70 transition-colors hover:border-primary/40"
            >
              <CardHeader>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-10 border-border/70 bg-gradient-to-br from-card to-secondary/30 md:mt-14">
          <CardContent className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-muted-foreground">Ready to ship your next design system?</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Start building with sparkle/ui today.
              </h2>
            </div>
            <Button asChild size="lg">
              <Link href="#">
                Get Started
                <Palette />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
