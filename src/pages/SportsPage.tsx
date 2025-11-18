import React, { useState } from 'react';
import SportsCard from '@/components/SportsCard';
import logo from "@/assets/premium.jpg";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Settings, Radio, Calendar, Flame, ChevronRight } from "lucide-react";
import TexansIcon from "@/assets/image.png";
import BasketIcon from "@/assets/basket.jpeg";
import CricketIcon from "@/assets/cricket.png";
import SoccerIcon from "@/assets/soccer.jpeg";
import TennisIcon from "@/assets/tennis.jpeg";
import BaseballIcon from "@/assets/baseball.jpeg";
import HockeyIcon from "@/assets/hockey.jpeg";
import GolfIcon from "@/assets/golf.png";


interface Subcategory {
  name: string;
  icon?: string;
}

interface Category {
  name: string;
  icon?: string;
  subcategories: Subcategory[];
  count?: number;
  hasNavigation?: boolean;
}

interface Filter {
  name: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const SportIcon = ({ sport }: { sport: string }) => {
  const getSportIcon = () => {
    switch (sport) {
      case "Basketball":
        return <div className="h-5 w-5 rounded-full bg-orange-500"></div>;
      case "Cricket":
        return <div className="h-5 w-5 rounded-full bg-yellow-400 border-2 border-red-500"></div>;
      case "Soccer":
        return <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-white"></div>;
      case "Tennis":
        return <div className="h-5 w-5 rounded-full bg-blue-300 border-2 border-green-500"></div>;
      case "Baseball":
        return <div className="h-5 w-5 rounded-full bg-white border-2 border-red-600"></div>;
      case "Hockey":
        return <div className="h-5 w-5 rounded-full bg-blue-300"></div>;
      case "Golf":
        return <div className="h-5 w-5 rounded-full bg-white border-2 border-red-500"></div>;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300"></div>;
    }
  };
  return getSportIcon();
};

const SportsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("Live");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Football: true,
  });
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Ongoing");

  const filters: Filter[] = [
    { name: "Live", icon: <Radio className="h-4 w-4" />, isActive: true },
    { name: "Upcoming", icon: <Calendar className="h-4 w-4" /> },
    { name: "Trending", icon: <Flame className="h-4 w-4" /> },
  ];

  const categories: Category[] = [
    {
      name: "Football",
      icon: TexansIcon,
      count: 24,
      subcategories: [
        { name: "NFL" },
        { name: "NCAA" },
        { name: "CFL" },
      ],
    },
    {
      name: "Basketball",
      icon: BasketIcon,
      count: 18,
      hasNavigation: true,
      subcategories: [],
    },
    {
      name: "Cricket",
      icon: CricketIcon,
      count: 12,
      subcategories: [],
    },
    {
      name: "Soccer",
      icon: SoccerIcon,
      count: 32,
      hasNavigation: true,
      subcategories: [],
    },
    {
      name: "Tennis",
      icon: TennisIcon,
      count: 15,
      subcategories: [],
    },
    {
      name: "Baseball",
      icon: BaseballIcon,
      count: 8,
      subcategories: [],
    },
    {
      name: "Hockey",
      icon: HockeyIcon,
      count: 10,
      subcategories: [],
    },
    {
      name: "Golf",
      icon: GolfIcon,
      count: 6,
      subcategories: [],
    },
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Categories */}
        <div className="w-64 border-r border-border bg-background overflow-y-auto">
          <div className="p-4">
            {/* Filters Section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-3">Filters</h3>
              <div className="space-y-1">
                {filters.map((filter) => (
                  <button
                    key={filter.name}
                    onClick={() => setSelectedFilter(filter.name)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      filter.isActive || selectedFilter === filter.name
                        ? "text-green-600"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span className={filter.isActive || selectedFilter === filter.name ? "text-green-600" : "text-muted-foreground"}>
                      {filter.icon}
                    </span>
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sports Section */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Sports</h3>
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
                      className="w-full flex items-center justify-between px-3 py-2 rounded text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {category.icon ? (
                          <img
                            src={category.icon}
                            alt={`${category.name} icon`}
                            className="h-5 w-5 rounded-full object-cover"
                          />
                        ) : (
                          <SportIcon sport={category.name} />
                        )}
                        {category.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {category.count !== undefined && (
                          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                            {category.count}
                          </span>
                        )}
                        {category.subcategories.length > 0 ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : category.hasNavigation ? (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        ) : null}
                      </div>
                    </button>
                    {category.subcategories.length > 0 && expandedCategories[category.name] && (
                      <div className="ml-8 mt-1 space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <button
                            key={subcategory.name}
                            onClick={() => setSelectedCategory(subcategory.name)}
                            className="w-full text-left px-3 py-2 rounded text-sm text-muted-foreground hover:bg-secondary transition-colors"
                          >
                            {subcategory.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - SportsCard */}
        <div className="flex-1 overflow-y-auto p-6 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-foreground">Football</h1>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            
          <div className="mb-6 flex justify-center items-center">
              <div className="inline-flex rounded-lg border border-border bg-secondary p-1">
                <button
                  onClick={() => setSelectedTab("Ongoing")}
                  className={`px-6 py-2 text-sm font-medium transition-all ${
                    selectedTab === "Ongoing"
                      ? "bg-card text-foreground rounded"
                      : "bg-transparent text-foreground/80 hover:bg-muted rounded"
                  }`}
                >
                  Ongoing
                </button>
                <button
                  onClick={() => setSelectedTab("Upcoming")}
                  className={`px-6 py-2 text-sm font-medium transition-all ${
                    selectedTab === "Upcoming"
                      ? "bg-card text-foreground rounded"
                      : "bg-transparent text-foreground/80 hover:bg-muted rounded"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setSelectedTab("Past")}
                  className={`px-6 py-2 text-sm font-medium transition-all ${
                    selectedTab === "Past"
                      ? "bg-card text-foreground rounded"
                      : "bg-transparent text-foreground/80 hover:bg-muted rounded"
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
        <div className="w-96 border-l border-border bg-background overflow-y-auto">
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-lg bg-blue-600 flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🏈</span>
              </div>
              <h2 className="text-lg font-semibold text-center text-foreground">
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
                <Button variant="outline" className="flex-1 border-border text-muted-foreground hover:bg-secondary">
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
                <label className="block text-sm font-medium text-foreground mb-2">
                  Amount
                </label>
                <div className="text-2xl font-bold text-foreground">$0</div>
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