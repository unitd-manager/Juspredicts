import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Check, TrendingUp, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const GameDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location.state || {
    title: "NBA Spotlight",
    date: "NOV 27 23:00 - DEC 2 14:00",
    participants: 43,
    prize: 300,
  };

  const formattedDate = eventData.date;
  const [selectedOutcome, setSelectedOutcome] = useState("Yes");

  const priceData = [
    { time: "4:00", price: 16 },
    { time: "6:00", price: 18 },
    { time: "8:00", price: 20 },
    { time: "10:00", price: 22 },
    { time: "12:00", price: 26 },
    { time: "14:00", price: 27 },
    { time: "16:00", price: 28 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Section */}
        <div className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl shadow-lg border border-gray-200 p-8 mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-blue-100/20"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
              🏀 {eventData.title}
            </h1>

            <div className="flex items-center gap-6 mb-4">
              <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center shadow-md text-white font-bold text-xl">
                A
              </div>
              <span className="text-gray-600 text-lg font-medium">vs</span>
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-md text-white font-bold text-xl">
                B
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-gray-700 font-medium text-base">
                {formattedDate}
              </span>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-md">
                OPEN
              </Button>
              <p className="text-gray-500 text-sm">
                Market closes when game starts
              </p>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Price Details */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" /> Price Overview
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Yes</span>
                </div>
                <p className="text-4xl font-bold">$27.75</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <ArrowDown className="h-4 w-4" />
                  <span className="text-sm font-medium">No</span>
                </div>
                <p className="text-4xl font-bold">$12.21</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Volume</p>
            <p className="text-xl font-semibold text-gray-900">$28,000</p>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" /> Price Trend
            </h2>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={priceData}>
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[0, 32]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Details */}
        <div className="bg-gray-900 rounded-3xl shadow-lg p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-500/10 to-blue-500/10 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-semibold text-white mb-4">
              Market Details
            </h2>
            <p className="text-gray-300 mb-4">
              Market will settle to <span className="font-semibold">Yes</span> if Team A wins the game. Check the full rules and details.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  Settlement Date
                </p>
                <p className="text-gray-100">{formattedDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">Source</p>
                <p className="text-gray-100">Team A Official Game Stats</p>
              </div>
            </div>
          </div>
        </div>

        {/* Confidence Meter & Trade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Confidence Meter
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div className="bg-green-500 h-3 rounded-full w-[72%] transition-all duration-700"></div>
            </div>
            <p className="text-gray-700 text-sm">72% of users predict Team A will win</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Place Your Trade</h2>
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setSelectedOutcome("Yes")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  selectedOutcome === "Yes"
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-50 border border-gray-300 hover:border-green-400 text-gray-700"
                }`}
              >
                {selectedOutcome === "Yes" && <Check className="h-5 w-5 text-white" />}
                <span className="font-medium">Yes</span>
              </button>
              <button
                onClick={() => setSelectedOutcome("No")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  selectedOutcome === "No"
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-50 border border-gray-300 hover:border-red-400 text-gray-700"
                }`}
              >
                {selectedOutcome === "No" && <Check className="h-5 w-5 text-white" />}
                <span className="font-medium">No</span>
              </button>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-5 text-lg font-semibold rounded-xl shadow-md">
              Place Trade
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
