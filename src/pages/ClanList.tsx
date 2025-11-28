import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNowStrict, isToday } from "date-fns";
import { Link } from "react-router-dom";
import { Award, Loader2, RefreshCcw, Search, Users } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer2 from "@/components/Footer2";
import { groupApi, type GroupSummary } from "@/api/group";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateClanDialog } from "@/components/clan/CreateClanDialog";

const formatActivityTimestamp = (value?: string) => {
  if (!value) return "No recent activity";
  const date = new Date(value);
  const prefix = isToday(date) ? "Today" : format(date, "MMM dd");
  return `${prefix}, ${format(date, "hh:mm a")}`;
};

const formatRelative = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  return formatDistanceToNowStrict(date, { addSuffix: true });
};

const buildTopPerformerName = (group: GroupSummary) => {
  const first = group.topFirstName ?? "";
  const last = group.topLastName ?? "";
  const full = `${first} ${last}`.trim();
  return full || "No predictions yet";
};

const ClanList = () => {
  const [search, setSearch] = useState("");
  const { data, isPending, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["groups"],
    queryFn: () => groupApi.getGroups(),
  });

  const groups = useMemo(() => data?.userGroupInfo ?? [], [data?.userGroupInfo]);

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groups;
    return groups.filter((group) => {
      const name = group.groupInfo?.groupName ?? "";
      const alias = group.groupInfo?.groupAlias ?? "";
      const performer = buildTopPerformerName(group);
      const query = search.toLowerCase();
      return (
        name.toLowerCase().includes(query) ||
        alias.toLowerCase().includes(query) ||
        performer.toLowerCase().includes(query)
      );
    });
  }, [groups, search]);

  const renderState = () => {
    if (isPending) {
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-44 rounded-2xl bg-white/5" />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-6 text-destructive">
          <p>Failed to load clans: {(error as Error).message}</p>
          <Button variant="secondary" className="mt-4" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      );
    }

    if (!filteredGroups.length) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-lg font-semibold text-white">No clans found</p>
          <p className="text-sm text-muted-foreground">
            Use the button below to create your first clan.
          </p>
        </div>
      );
    }

    return (
      <div className="grid gap-5 md:grid-cols-2">
        {filteredGroups.map((group) => {
          const groupId = group.groupInfo?.groupId ?? "";
          const destination = groupId ? `/clan/${groupId}` : "#";
          const earnings = group.topTotalEarnings ?? "0";
          const topPerformer = buildTopPerformerName(group);
          return (
            <Link
              key={groupId || group.groupInfo?.groupName}
              to={destination}
              aria-disabled={!groupId}
              className={`group focus:outline-none ${groupId ? "" : "pointer-events-none opacity-70"}`}
            >
              <Card className="h-full rounded-3xl border-white/10 bg-gradient-to-br from-emerald-400/5 via-emerald-500/0 to-transparent transition focus-visible:ring-2 focus-visible:ring-emerald-400 group-hover:border-emerald-400/70">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/70">
                    <span>{group.groupInfo?.groupName}</span>
                    <span>{formatActivityTimestamp(group.groupLastActivity)}</span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">{group.groupInfo?.groupAlias}</p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-lg font-semibold text-white">
                      {(group.groupInfo?.groupName ?? "CL")
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs text-white/70">Top performer</p>
                      <p className="text-lg font-semibold text-white">{topPerformer}</p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-emerald-300">
                        <Award className="h-4 w-4" />
                        {earnings}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-sm text-white/80">
                    <span>{formatRelative(group.groupLastActivity)}</span>
                    <Badge variant="outline" className="border-white/30 text-white">
                      View details
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#081011] to-[#040706] text-white">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.5em] text-emerald-300/80">Clan</p>
            <h1 className="mt-2 text-3xl font-bold">Your competitive squads</h1>
            <p className="mt-1 max-w-2xl text-muted-foreground">
              Track every clan you belong to, see who is dominating today, and jump inside the
              leaderboard in one click.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clans, aliases, or top performers"
                className="border-none bg-transparent placeholder:text-muted-foreground focus-visible:ring-0"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => refetch()} disabled={isRefetching}>
                {isRefetching ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="mr-2 h-4 w-4" />
                )}
                Refresh
              </Button>
              <CreateClanDialog />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-300" />
              {data?.userGroupCount ? (
                <p>
                  You are part of <span className="font-semibold text-white">{data.userGroupCount}</span>{" "}
                  clans right now.
                </p>
              ) : (
                <p>Start a clan to challenge your friends.</p>
              )}
            </div>
          </div>

          {renderState()}
        </div>
      </main>

      <Footer2 />

      <CreateClanDialog
        trigger={
          <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-emerald-500 text-white shadow-emerald-500/40">
            <span className="text-2xl">+</span>
          </Button>
        }
      />
    </div>
  );
};

export default ClanList;

