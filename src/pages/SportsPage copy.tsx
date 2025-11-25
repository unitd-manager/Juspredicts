import React from "react";
import Navbar from "@/components/Navbar";

// Sample Market Data (Add 5–6 Records)
const marketData = [
  {
    sport: "Football · NCAA",
    date: "Nov 8 · 19:00",
    teams: [
      {
        name: "Miami (OH)",
        percentage: 43,
        record: "8-2",
        form: ["W", "W", "L", "W", "L"],
        h2h: "2-3",
        color: "bg-slate-700",
      },
      {
        name: "Ohio",
        percentage: 57,
        record: "7-3",
        form: ["W", "L", "W", "W", "L"],
        h2h: "(Last 5)",
        color: "bg-emerald-700",
      },
    ],
  },
  {
    sport: "Football · Premier League",
    date: "Nov 10 · 21:00",
    teams: [
      {
        name: "Arsenal",
        percentage: 61,
        record: "9-2-1",
        form: ["W", "W", "W", "L", "W"],
        h2h: "4-1",
        color: "bg-red-700",
      },
      {
        name: "Chelsea",
        percentage: 39,
        record: "5-4-3",
        form: ["L", "W", "D", "W", "L"],
        h2h: "1-4",
        color: "bg-blue-700",
      },
    ],
  },
  {
    sport: "Cricket · IPL",
    date: "Nov 12 · 18:30",
    teams: [
      {
        name: "CSK",
        percentage: 55,
        record: "7-5",
        form: ["W", "L", "W", "W", "L"],
        h2h: "3-2",
        color: "bg-yellow-600",
      },
      {
        name: "MI",
        percentage: 45,
        record: "6-6",
        form: ["L", "W", "W", "L", "L"],
        h2h: "2-3",
        color: "bg-blue-600",
      },
    ],
  },
];

// Reusable Team Card
const MarketCard = ({ team }) => {
  const LOW_THRESHOLD = 50; // percentages below this show a dull color
  const isLow = Number(team.percentage) < LOW_THRESHOLD;
  const percentTextClass = isLow ? "text-slate-400" : "text-emerald-300";
  const fillClass = isLow ? "bg-slate-600" : "bg-emerald-400";

  return (
    <div className="rounded-lg bg-slate-900 p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`h-11 w-11 rounded ${team.color} flex items-center justify-center`}>🏈</div>
          <div>
            <div className="text-sm text-slate-200 font-medium">{team.name}</div>
          </div>
        </div>
        <div className={`text-sm ${percentTextClass}`}>{team.percentage}%</div>
      </div>

      <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-4">
        <div className={`h-full ${fillClass}`} style={{ width: `${team.percentage}%` }}></div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <div>
          <div className="text-xs text-slate-400">Record</div>
          <div className="text-sm text-slate-200">{team.record}</div>
        </div>

        <div className="text-center">
          <div className="text-xs text-slate-400">Form (Last 5)</div>
          <div className="mt-1 flex items-center justify-center gap-1 text-xs">
            {team.form.map((f, i) => (
              <span
                key={i}
                className={`px-1 py-0.5 rounded bg-slate-700 ${
                  f === "W" ? "text-emerald-300" : "text-rose-400"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">H2H</div>
          <div className="text-sm text-slate-200">{team.h2h}</div>
        </div>
      </div>
    </div>
  );
};

// Main Page
const SportsPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
      <aside className="w-64 bg-slate-800/80 border-r border-slate-700 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Filters</h3>
          <div className="space-y-2 mb-6">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-700 text-emerald-300 font-medium">
              <span className="text-green-400">●</span> Live
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700">Upcoming</button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700">Trending</button>
          </div>

          <h3 className="text-sm font-semibold text-slate-200 mb-3">Sports</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-between px-3 py-2 rounded-lg bg-transparent hover:bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-slate-600 flex items-center justify-center text-sm">🏈</div>
                <span>Football</span>
              </div>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">24</span>
            </li>
            <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-orange-500"></div>
                <span>Basketball</span>
              </div>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">18</span>
            </li>
            <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-yellow-400"></div>
                <span>Cricket</span>
              </div>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">12</span>
            </li>
            <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                <span>Soccer</span>
              </div>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">32</span>
            </li>
            <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-400"></div>
                <span>Tennis</span>
              </div>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">15</span>
            </li>
          </ul>
        </aside>

        {/* Center Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="rounded-2xl overflow-hidden mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-t-2xl">
                <h2 className="text-2xl font-bold text-white">Live Prediction Markets</h2>
                <p className="text-slate-100/90 mt-1">Make your prediction. Own your call. Skill-based matching with transparent odds.</p>
                <div className="mt-6 grid grid-cols-2 gap-6 text-sm text-white/90">
                  <div>
                    <div className="text-xs">Active Markets</div>
                    <div className="text-2xl font-bold">1,248</div>
                  </div>
                  <div>
                    <div className="text-xs">Live Traders</div>
                    <div className="text-2xl font-bold">23,451</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 p-4 border-t border-slate-700 rounded-b-2xl">
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 rounded-full bg-slate-700 text-slate-200">Games</button>
                  <button className="px-4 py-2 rounded-full text-slate-400 hover:bg-slate-700">Futures</button>
                  <button className="px-4 py-2 rounded-full text-slate-400 hover:bg-slate-700">Awards</button>
                  <button className="px-4 py-2 rounded-full text-slate-400 hover:bg-slate-700">Events</button>
                </div>
              </div>
            </div>
          {marketData.map((market, index) => (
            <div key={index} className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-inner">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-slate-300">{market.sport}</div>
                <div className="text-sm bg-slate-700 px-3 py-1 rounded-full">{market.date}</div>
              </div>

              <div className="space-y-5">
                {market.teams.map((t, i) => (
                  <MarketCard key={i} team={t} />
                ))}
              </div>
            </div>
          ))}
        </main>

        {/* Right Sidebar */}
       <aside className="w-96 bg-slate-800/80 border-l border-slate-700 p-6 overflow-y-auto">
          <div className="rounded-lg bg-slate-900/60 p-4 border border-slate-700">
            <h3 className="text-sm text-slate-300">Make Your Prediction</h3>
            <p className="text-xs text-slate-400 mt-1">Own your call. Trade with confidence.</p>

            <div className="mt-4 bg-slate-800 p-3 rounded-md border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-slate-700 flex items-center justify-center">🏈</div>
                <div>
                  <div className="text-sm text-slate-200">Miami (OH)</div>
                  <div className="text-xs text-slate-400">NCAA</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="p-3 rounded-lg border border-emerald-500 bg-slate-900 text-emerald-300">Miami (OH)<div className="text-xs text-slate-400">43%</div></button>
                <button className="p-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-300">Ohio<div className="text-xs text-slate-400">57%</div></button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="p-3 rounded-lg border border-emerald-500 bg-slate-900 text-emerald-300">Predict Yes<div className="text-xs text-slate-400">43%</div></button>
                <button className="p-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-300">Predict No<div className="text-xs text-slate-400">57%</div></button>
              </div>

              <div className="mt-4">
                <label className="block text-xs text-slate-400">Amount</label>
                <input className="mt-2 w-full rounded-md bg-slate-700 p-3 text-slate-100 border border-slate-600" defaultValue="$100" />
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 py-2 rounded bg-slate-700 text-slate-200">$10</button>
                  <button className="flex-1 py-2 rounded bg-slate-700 text-slate-200">$50</button>
                  <button className="flex-1 py-2 rounded bg-slate-700 text-slate-200">$100</button>
                  <button className="flex-1 py-2 rounded bg-slate-700 text-slate-200">$500</button>
                </div>
              </div>

              <button className="mt-6 w-full py-3 rounded-lg bg-emerald-500 text-slate-900 font-semibold">Sign Up to Trade</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SportsPage;
