import React, { useState } from 'react';
import SportsCard from '@/components/SportsCard';
import logo from "@/assets/premium.jpg";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Settings } from "lucide-react";

const SportsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Football: true,
  });
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Ongoing");

  const categories = [
    { name: "All", subcategories: [] },
    { 
      name: "Football", 
      subcategories: ["College Football", "Pro Football"] 
    },
    { name: "Basketball", subcategories: [] },
    { name: "Hockey", subcategories: [] },
    { name: "Soccer", subcategories: [] },
    { name: "Tennis", subcategories: [] },
    { name: "Golf", subcategories: [] },
  ];

  const dummySportsEvents = [
    {
      image: logo,
      title: "NBA Spotlight",
      date: "NOV 27 23:00 - DEC 2 14:00",
      participants: 43,
      description: "Compete for a chance to win one of five special Rage Fan NFT prizes.",
      prize: 300,
    },
    {
      image: logo,
      title: "Football Frenzy",
      date: "DEC 1 18:00 - DEC 5 20:00",
      participants: 120,
      description: "Show your skills and win big in our weekly football challenge.",
      prize: 500,
    },
    {
      image: logo,
      title: "Tennis Open",
      date: "DEC 3 10:00 - DEC 7 16:00",
      participants: 25,
      description: "Serve your way to victory and claim exclusive tennis gear.",
      prize: 200,
    },
    {
      image: logo,
      title: "Basketball Bash",
      date: "DEC 6 19:00 - DEC 10 22:00",
      participants: 80,
      description: "Dunk, dribble, and dominate to win cash prizes.",
      prize: 400,
    },
    {
      image: logo,
      title: "Soccer Showdown",
      date: "DEC 8 14:00 - DEC 12 17:00",
      participants: 60,
      description: "Score goals and outplay your opponents for ultimate glory.",
      prize: 350,
    },
    {
      image: logo,
      title: "Hockey Heat",
      date: "DEC 10 20:00 - DEC 14 23:00",
      participants: 30,
      description: "Skate fast, shoot hard, and win the championship trophy.",
      prize: 450,
    },
  ];

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const selectedEventData = dummySportsEvents[selectedEvent];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Categories */}
        <div className="w-64 border-r border-gray-200 bg-gray-50 overflow-y-auto">
          <div className="p-4">
            <div className="space-y-1">
              {categories.map((category) => (
                <div key={category.name}>
                  <button
                    onClick={() => {
                      if (category.subcategories.length > 0) {
                        toggleCategory(category.name);
                      } else {
                        setSelectedCategory(category.name);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm font-medium transition-colors ${
                      selectedCategory === category.name
                        ? "bg-green-100 text-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{category.name}</span>
                    {category.subcategories.length > 0 && (
                      expandedCategories[category.name] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    )}
                  </button>
                  {category.subcategories.length > 0 && expandedCategories[category.name] && (
                    <div className="ml-4 mt-1 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => setSelectedCategory(subcategory)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            selectedCategory === subcategory
                              ? "bg-green-100 text-green-700"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section - SportsCard */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Football</h1>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            
          <div className="mb-6 flex justify-center items-center">
              <div className="inline-flex rounded-lg border border-gray-300 bg-gray-200 p-1">
                <button
                  onClick={() => setSelectedTab("Ongoing")}
                  className={`px-6 py-2 text-sm font-medium transition-all ${
                    selectedTab === "Ongoing"
                      ? "bg-white text-gray-800 rounded"
                      : "bg-transparent text-gray-700 hover:bg-gray-300 rounded"
                  }`}
                >
                  Ongoing
                </button>
                <button
                  onClick={() => setSelectedTab("Upcoming")}
                  className={`px-6 py-2 text-sm font-medium transition-all ${
                    selectedTab === "Upcoming"
                      ? "bg-white text-gray-800 rounded"
                      : "bg-transparent text-gray-700 hover:bg-gray-300 rounded"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setSelectedTab("Past")}
                  className={`px-6 py-2 text-sm font-medium transition-all ${
                    selectedTab === "Past"
                      ? "bg-white text-gray-800 rounded"
                      : "bg-transparent text-gray-700 hover:bg-gray-300 rounded"
                  }`}
                >
                  Past
                </button>
              </div>
            </div>

            <div className="space-y-7">
              {dummySportsEvents.map((event, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedEvent(index)}
                  className="cursor-pointer"
                >
                  <SportsCard {...event} id={index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Trading Details */}
        <div className="w-96 border-l border-gray-200 bg-white overflow-y-auto">
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-lg bg-blue-600 flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🏈</span>
              </div>
              <h2 className="text-lg font-semibold text-center text-gray-900">
                {selectedEventData.title}
              </h2>
            </div>

            <div className="mb-6">
              <p className="text-sm text-blue-600 font-medium mb-4">
                Buy Yes · {selectedEventData.title}
              </p>
              
              <div className="flex gap-2 mb-4">
                <Button variant="outline" className="flex-1 border-green-500 text-green-600 hover:bg-green-50">
                  Buy
                </Button>
                <Button variant="outline" className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50">
                  Sell
                </Button>
              </div>

              <div className="mb-4">
                <Button variant="outline" className="w-full justify-between">
                  <span>Dollars</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold">
                  Yes 36¢
                </Button>
                <Button className="bg-purple-200 hover:bg-purple-300 text-purple-900 py-6 text-lg font-semibold">
                  No 66¢
                </Button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="text-2xl font-bold text-gray-900">$0</div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-green-600 font-medium">
                  Earn 3.5% Interest
                </p>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold">
                Sign up to trade
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsPage;