import Navbar from "@/components/Navbar";
import Footer2 from "@/components/Footer2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Scale,
  BrainCircuit,
  Shield,
  Users,
  Sparkles,
  Lightbulb,
  Mail,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    label: "Mission",
    title: "Mission",
    description:
      "To democratise access to razor-sharp legal knowledge, making insights once locked in casebooks and chambers instantly available for every legal mind.",
  },
  {
    icon: Shield,
    label: "Integrity",
    title: "Integrity",
    description:
      "We are committed to the highest standards of accuracy, transparency, and accountability in every prediction and product we build.",
  },
  {
    icon: Sparkles,
    label: "Innovation",
    title: "Innovation",
    description:
      "We blend AI, data science, and deep domain expertise to reimagine how legal decisions are understood, compared, and forecast.",
  },
  {
    icon: Shield,
    label: "Integrity",
    title: "Integrity",
    description:
      "Trust is our north star. From data handling to model design, every decision is anchored in ethical and responsible innovation.",
  },
  {
    icon: BrainCircuit,
    label: "Innovation",
    title: "Innovation",
    description:
      "We constantly experiment, refine, and iterate — pushing the boundaries of what’s possible in legal intelligence.",
  },
  {
    icon: Users,
    label: "Empowerment",
    title: "Empowerment",
    description:
      "We exist to empower litigators, researchers, and decision-makers to act with confidence backed by data-driven insights.",
  },
];

const coreTeam = [
  { initials: "AS", name: "Aarav Sharma", role: "CEO" },
  { initials: "PS", name: "Priya Singh", role: "CTO" },
  { initials: "LD", name: "Lead Developer", role: "Lead Developer" },
];

const itTeam = [
  { initials: "AS", name: "Aarav Sharma", role: "Lead Engineer" },
  { initials: "AS", name: "Aarav Sharma", role: "Solutions Architect" },
  { initials: "PS", name: "Priya Singh", role: "Product Engineer" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* background orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
          <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pb-16 pt-12 sm:px-6 lg:px-10 lg:pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                Legal Tech · AI Insights · Future Ready
              </p>
              <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-50 sm:text-4xl lg:text-[2.6rem]">
                Unveiling Top-rated
                <span className="block bg-gradient-to-r from-fuchsia-500 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                  Future of Legal Tech
                </span>
              </h1>
              <p className="max-w-xl text-sm text-slate-300 sm:text-base">
                At JusPredict, we are redefining the legal landscape through data-driven legal intelligence —
                empowering litigators, law firms, and institutions with actionable insights, prediction tools,
                and intuitive visual analytics.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="rounded-full bg-fuchsia-600 px-6 text-sm font-semibold shadow-lg shadow-fuchsia-500/30 hover:bg-fuchsia-500">
                  Know it
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-slate-600 bg-slate-900/60 px-6 text-sm font-semibold text-slate-100 hover:bg-slate-800"
                >
                  Our Platform
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full border border-fuchsia-500/40" />
              <div className="pointer-events-none absolute -right-6 bottom-8 h-20 w-20 rounded-full border border-cyan-400/30" />

              <Card className="relative overflow-hidden border-slate-700/70 bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-950/90 shadow-2xl shadow-fuchsia-900/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.16),transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.14),transparent_55%)]" />
                <CardContent className="relative flex flex-col gap-6 p-8 sm:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/80 px-4 py-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 to-sky-500">
                        <Scale className="h-5 w-5 text-white" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300">
                          Legal Outcome Radar
                        </p>
                        <p className="text-xs text-slate-300/80">
                          Visualise arguments, precedents & probabilities.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-3 py-2 text-right">
                      <p className="text-[11px] font-medium text-slate-400">Prediction Accuracy</p>
                      <p className="text-lg font-semibold text-emerald-400">92.8%</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Case Intelligence
                      </p>
                      <p className="text-sm text-slate-200">
                        Map similar cases, arguments and judicial leanings in seconds instead of days.
                      </p>
                    </div>
                    <div className="space-y-2 rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Real-time Insights
                      </p>
                      <p className="text-sm text-slate-200">
                        Tap into continuously updated legal datasets and evolving case law.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Us / Mission & Vision */}
        <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">About Us</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-3xl">
                Our Mission &amp; Vision
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-slate-700/80 bg-slate-900/70">
                <CardHeader className="space-y-3">
                  <span className="inline-flex w-fit rounded-full bg-fuchsia-600/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
                    Our Mission
                  </span>
                  <CardTitle className="text-xl text-slate-50">Redefining access to legal insight</CardTitle>
                  <CardDescription className="text-sm text-slate-300">
                    To democratise access to razor-sharp legal knowledge, making complex jurisprudence
                    simple, searchable, and insight-rich for every legal professional, from chambers to
                    courtrooms worldwide.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    size="sm"
                    className="rounded-full bg-fuchsia-600 px-5 text-xs font-semibold shadow-md shadow-fuchsia-500/30 hover:bg-fuchsia-500"
                  >
                    Know it
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-700/80 bg-slate-900/70">
                <CardHeader className="space-y-3">
                  <span className="inline-flex w-fit rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                    Our Vision
                  </span>
                  <CardTitle className="text-xl text-slate-50">A smarter, fairer legal future</CardTitle>
                  <CardDescription className="text-sm text-slate-300">
                    To design intelligent tools that help legal teams anticipate outcomes, craft sharper
                    strategies, and unlock a more transparent and data-driven justice ecosystem.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full border-slate-600 bg-slate-900/80 px-5 text-xs font-semibold text-slate-100 hover:bg-slate-800"
                  >
                    About it
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Our Values
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-3xl">
                The principles behind every prediction
              </h2>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <Card
                key={value.title + value.label}
                className="group border-slate-700/80 bg-slate-900/70 transition-colors hover:border-fuchsia-500/70 hover:bg-slate-900"
              >
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-fuchsia-500/80 via-sky-500/80 to-violet-500/80 text-white shadow-md shadow-fuchsia-500/40">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {value.label}
                    </p>
                    <CardTitle className="text-base text-slate-50">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-slate-300">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process / Journey Line */}
        <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
          <Card className="relative overflow-hidden border-slate-700/80 bg-slate-900/70">
            <div className="absolute inset-0 opacity-70">
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 border-t border-dashed border-fuchsia-500/40" />
              <div className="absolute left-10 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-fuchsia-400 bg-slate-950" />
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400 bg-slate-950" />
              <div className="absolute right-10 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-violet-400 bg-slate-950" />
            </div>
            <CardContent className="relative grid gap-8 py-10 sm:grid-cols-3 sm:py-12">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Connect
                </p>
                <p className="text-sm font-semibold text-slate-50">Onboard your matters</p>
                <p className="text-xs text-slate-300">
                  Seamlessly sync case data and briefs from your existing tools into JusPredict.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Analyse
                </p>
                <p className="text-sm font-semibold text-slate-50">Discover deep patterns</p>
                <p className="text-xs text-slate-300">
                  Surface precedent patterns, judge tendencies, and argument strengths in seconds.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Act
                </p>
                <p className="text-sm font-semibold text-slate-50">Strategise with confidence</p>
                <p className="text-xs text-slate-300">
                  Build data-backed strategies and communicate risk clearly to every stakeholder.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Sections */}
        <section className="container mx-auto px-4 pb-6 pt-6 sm:px-6 lg:px-10 lg:pb-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Meet The Team
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-3xl">
                  The minds building the future of legal AI
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {coreTeam.map((member) => (
                  <div key={member.name + member.role} className="flex flex-col items-center gap-3">
                    <Avatar className="h-20 w-20 border border-slate-700 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-lg shadow-slate-900/70">
                      <AvatarFallback className="bg-gradient-to-br from-fuchsia-500 via-sky-500 to-violet-500 text-lg font-semibold text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5 text-center">
                      <p className="text-sm font-semibold text-slate-50">{member.name}</p>
                      <p className="text-xs text-slate-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Meet I Team
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-3xl">
                  The builders behind the experience
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {itTeam.map((member) => (
                  <div key={member.name + member.role} className="flex flex-col items-center gap-3">
                    <Avatar className="h-20 w-20 border border-slate-700 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-lg shadow-slate-900/70">
                      <AvatarFallback className="bg-gradient-to-br from-fuchsia-500 via-sky-500 to-violet-500 text-lg font-semibold text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5 text-center">
                      <p className="text-sm font-semibold text-slate-50">{member.name}</p>
                      <p className="text-xs text-slate-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="container mx-auto px-4 pb-16 pt-4 sm:px-6 lg:px-10 lg:pb-20">
          <Card className="relative overflow-hidden border-fuchsia-600/40 bg-gradient-to-r from-fuchsia-700/70 via-sky-700/70 to-violet-700/70">
            <div className="absolute inset-0 opacity-60">
              <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-fuchsia-400/40 blur-3xl" />
              <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-sky-400/40 blur-3xl" />
            </div>
            <CardContent className="relative flex flex-col gap-6 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3 max-w-xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-fuchsia-900/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-fuchsia-100">
                  <Mail className="h-3 w-3" />
                  Join Our Newsletter
                </p>
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                  Stay ahead of every legal innovation wave
                </h2>
                <p className="text-sm text-fuchsia-100/90">
                  Be the first to know about new features, research drops, and curated legal-tech insights
                  from the JusPredict team.
                </p>
              </div>
              <form className="w-full max-w-md space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your work email"
                    className="h-11 border-fuchsia-200/40 bg-fuchsia-900/40 text-sm text-white placeholder:text-fuchsia-100/70 focus-visible:ring-offset-0"
                  />
                  <Button className="h-11 w-full rounded-full bg-white px-5 text-sm font-semibold text-fuchsia-700 hover:bg-fuchsia-100 sm:w-auto">
                    Subscribe
                  </Button>
                </div>
                <p className="text-[11px] text-fuchsia-100/80">
                  We respect your inbox. No spam, just sharp legal-tech intel.
                </p>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer2 />
    </div>
  );
};

export default About;



