import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const GameDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location.state || {
    title: "College Football Game",
    date: "November 6, 2024, 12:00 PM PST",
    participants: 43,
    description: "Compete for a chance to win one of five special Rage Fan NFT prizes.",
    prize: 300,
  };

  // Format date to match the second image format
  const formattedDate = eventData.date || "November 6, 2024, 12:00 PM PST";

  const [selectedOutcome, setSelectedOutcome] = useState("Yes");

  // Sample price data for the graph - matching the second image
  const priceData = [
    { time: '4:00', price: 16 },
    { time: '6:00', price: 18 },
    { time: '8:00', price: 20 },
    { time: '10:00', price: 22 },
    { time: '11:00', price: 24 },
    { time: '12:00', price: 26 },
    { time: '14:00', price: 27 },
    { time: '16:00', price: 28 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section - Game Information */}
        <div className="rounded-lg  p-6 mb-6">
          <h1 className="text-3xl font-bold text-black mb-4">{eventData.title}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-black font-bold text-lg">A</span>
            </div>
            <span className="text-black-300 font-medium">vs</span>
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-black font-bold text-lg">B</span>
            </div>
          </div>

          <p className="text-black-300 mb-4 text-base">{formattedDate}</p>
          
          <div className="flex items-center gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium">
              OPEN
            </Button>
            <p className="text-black-300 text-sm">Market closes when game starts</p>
          </div>
        </div>

        {/* Middle Section - Price and Graph */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Card - Price Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Price</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Yes</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">$27.75</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <ArrowDown className="h-4 w-4" />
                  <span className="text-sm font-medium">No</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">$12.21</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Volume</p>
              <p className="text-xl font-semibold text-gray-900">$28,000</p>
            </div>
          </div>

          {/* Right Card - Price Trend Graph */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Trend</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={priceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  stroke="#6b7280"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  stroke="#6b7280"
                  domain={[0, 32]}
                  ticks={[0, 8, 16, 24, 32]}
                  axisLine={false}
                  tickLine={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lower Section - Market Details */}
        <div className="bg-gray-900 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Market Details</h2>
          <p className="text-gray-200 mb-4">
            Market will settle to Yes if Team A wins the game. Check the full rules and details.
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">Settlement Date</p>
              <p className="text-gray-100">{formattedDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">Source</p>
              <p className="text-gray-100">Team A Official Game Stats</p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Place Your Trade */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Place Your Trade</h2>
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setSelectedOutcome("Yes")}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                selectedOutcome === "Yes"
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {selectedOutcome === "Yes" && <Check className="h-5 w-5 text-white" />}
              <span className="font-medium">Yes</span>
            </button>
            <button
              onClick={() => setSelectedOutcome("No")}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                selectedOutcome === "No"
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {selectedOutcome === "No" && <Check className="h-5 w-5 text-white" />}
              <span className="font-medium">No</span>
            </button>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold rounded-md">
            Place Trade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;

