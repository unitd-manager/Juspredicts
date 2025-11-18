import MarketCard from "./MarketCard";
import EplMarketCard22 from "./EplMarketCard22";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Markets = () => {
  const [selectedCategory, setSelectedCategory] = useState("FootBall");

  const featuredMarkets = [
    {
      title: "Will Bitcoin reach $100K by end of 2025?",
      category: "Crypto",
      yesPrice: 62,
      noPrice: 38,
      volume: "145K",
      trending: "up" as const,
      deadline: "Dec 31, 2025"
    },
    {
      title: "Will AI replace 25% of jobs by 2026?",
      category: "Technology",
      yesPrice: 34,
      noPrice: 66,
      volume: "89K",
      trending: "down" as const,
      deadline: "Dec 31, 2026"
    },
    {
      title: "Will the Fed cut rates in Q2 2025?",
      category: "Finance",
      yesPrice: 71,
      noPrice: 29,
      volume: "203K",
      trending: "up" as const,
      deadline: "Jun 30, 2025"
    },
    {
      title: "Will SpaceX land on Mars by 2028?",
      category: "Space",
      yesPrice: 18,
      noPrice: 82,
      volume: "56K",
      trending: "up" as const,
      deadline: "Dec 31, 2028"
    },
    {
      title: "Will global temperatures rise 1.5°C by 2030?",
      category: "Climate",
      yesPrice: 78,
      noPrice: 22,
      volume: "112K",
      trending: "up" as const,
      deadline: "Dec 31, 2030"
    },
    {
      title: "Will Apple launch AR glasses in 2025?",
      category: "Technology",
      yesPrice: 43,
      noPrice: 57,
      volume: "167K",
      trending: "down" as const,
      deadline: "Dec 31, 2025"
    }
  ];

  const eplMatches = [
    {
      time: "6:00 PM",
      volume: "11.98k",
      teams: {
        home: {
          name: "TOT Spurs",
          record: "5-2-3",
          logo: "/placeholder.svg"
        },
        away: {
          name: "MUN Man Utd",
          record: "5-2-2",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 35,
          spread: "TOT +0.5 63c",
          total: "O 3.5 38c"
        },
        away: {
          moneyline: 40,
          spread: "MUN -0.5 41c",
          total: "U 3.5 65c"
        },
        draw: 27
      }
    },
    {
      time: "8:30 PM",
      volume: "2.40k",
      teams: {
        home: {
          name: "WHU West",
          record: "2-1-7",
          logo: "/placeholder.svg"
        },
        away: {
          name: "BUR Burnle",
          record: "3-1-6",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 50,
          spread: "WHU -0.5 51c",
          total: "O 2.5 49c"
        },
        away: {
          moneyline: 24,
          spread: "BUR +0.5 53c",
          total: "U 2.5 54c"
        },
        draw: 28
      }
    },
    {
      time: "3:00 PM",
      volume: "5.12k",
      teams: {
        home: {
          name: "LIV Liverpool",
          record: "7-1-2",
          logo: "/placeholder.svg"
        },
        away: {
          name: "ARS Arsenal",
          record: "6-2-2",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 45,
          spread: "LIV -1.5 48c",
          total: "O 3.5 42c"
        },
        away: {
          moneyline: 30,
          spread: "ARS +1.5 55c",
          total: "U 3.5 60c"
        },
        draw: 25
      }
    },
    {
      time: "1:00 PM",
      volume: "3.50k",
      teams: {
        home: {
          name: "CHE Chelsea",
          record: "4-3-3",
          logo: "/placeholder.svg"
        },
        away: {
          name: "MCY Man City",
          record: "8-1-1",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 20,
          spread: "CHE +2.5 60c",
          total: "O 2.5 50c"
        },
        away: {
          moneyline: 60,
          spread: "MCY -2.5 45c",
          total: "U 2.5 50c"
        },
        draw: 20
      }
    },
    {
      time: "4:30 PM",
      volume: "2.80k",
      teams: {
        home: {
          name: "MUN Man Utd",
          record: "5-2-2",
          logo: "/placeholder.svg"
        },
        away: {
          name: "LEI Leicester",
          record: "3-4-3",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 55,
          spread: "MUN -0.5 52c",
          total: "O 2.5 48c"
        },
        away: {
          moneyline: 25,
          spread: "LEI +0.5 50c",
          total: "U 2.5 55c"
        },
        draw: 20
      }
    },
    {
      time: "7:00 PM",
      volume: "1.90k",
      teams: {
        home: {
          name: "ARS Arsenal",
          record: "6-2-2",
          logo: "/placeholder.svg"
        },
        away: {
          name: "TOT Spurs",
          record: "5-2-3",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 40,
          spread: "ARS -0.5 50c",
          total: "O 3.5 45c"
        },
        away: {
          moneyline: 35,
          spread: "TOT +0.5 53c",
          total: "U 3.5 58c"
        },
        draw: 25
      }
    },
     {
      time: "6:00 PM",
      volume: "11.98k",
      teams: {
        home: {
          name: "TOT Spurs",
          record: "5-2-3",
          logo: "/placeholder.svg"
        },
        away: {
          name: "MUN Man Utd",
          record: "5-2-2",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 35,
          spread: "TOT +0.5 63c",
          total: "O 3.5 38c"
        },
        away: {
          moneyline: 40,
          spread: "MUN -0.5 41c",
          total: "U 3.5 65c"
        },
        draw: 27
      }
    },
    {
      time: "8:30 PM",
      volume: "2.40k",
      teams: {
        home: {
          name: "WHU West",
          record: "2-1-7",
          logo: "/placeholder.svg"
        },
        away: {
          name: "BUR Burnle",
          record: "3-1-6",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 50,
          spread: "WHU -0.5 51c",
          total: "O 2.5 49c"
        },
        away: {
          moneyline: 24,
          spread: "BUR +0.5 53c",
          total: "U 2.5 54c"
        },
        draw: 28
      }
    },
    {
      time: "3:00 PM",
      volume: "5.12k",
      teams: {
        home: {
          name: "LIV Liverpool",
          record: "7-1-2",
          logo: "/placeholder.svg"
        },
        away: {
          name: "ARS Arsenal",
          record: "6-2-2",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 45,
          spread: "LIV -1.5 48c",
          total: "O 3.5 42c"
        },
        away: {
          moneyline: 30,
          spread: "ARS +1.5 55c",
          total: "U 3.5 60c"
        },
        draw: 25
      }
    },
    {
      time: "1:00 PM",
      volume: "3.50k",
      teams: {
        home: {
          name: "CHE Chelsea",
          record: "4-3-3",
          logo: "/placeholder.svg"
        },
        away: {
          name: "MCY Man City",
          record: "8-1-1",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 20,
          spread: "CHE +2.5 60c",
          total: "O 2.5 50c"
        },
        away: {
          moneyline: 60,
          spread: "MCY -2.5 45c",
          total: "U 2.5 50c"
        },
        draw: 20
      }
    },
    {
      time: "4:30 PM",
      volume: "2.80k",
      teams: {
        home: {
          name: "MUN Man Utd",
          record: "5-2-2",
          logo: "/placeholder.svg"
        },
        away: {
          name: "LEI Leicester",
          record: "3-4-3",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 55,
          spread: "MUN -0.5 52c",
          total: "O 2.5 48c"
        },
        away: {
          moneyline: 25,
          spread: "LEI +0.5 50c",
          total: "U 2.5 55c"
        },
        draw: 20
      }
    },
    {
      time: "7:00 PM",
      volume: "1.90k",
      teams: {
        home: {
          name: "ARS Arsenal",
          record: "6-2-2",
          logo: "/placeholder.svg"
        },
        away: {
          name: "TOT Spurs",
          record: "5-2-3",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 40,
          spread: "ARS -0.5 50c",
          total: "O 3.5 45c"
        },
        away: {
          moneyline: 35,
          spread: "TOT +0.5 53c",
          total: "U 3.5 58c"
        },
        draw: 25
      }
    },
     {
      time: "6:00 PM",
      volume: "11.98k",
      teams: {
        home: {
          name: "TOT Spurs",
          record: "5-2-3",
          logo: "/placeholder.svg"
        },
        away: {
          name: "MUN Man Utd",
          record: "5-2-2",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 35,
          spread: "TOT +0.5 63c",
          total: "O 3.5 38c"
        },
        away: {
          moneyline: 40,
          spread: "MUN -0.5 41c",
          total: "U 3.5 65c"
        },
        draw: 27
      }
    },
    {
      time: "8:30 PM",
      volume: "2.40k",
      teams: {
        home: {
          name: "WHU West",
          record: "2-1-7",
          logo: "/placeholder.svg"
        },
        away: {
          name: "BUR Burnle",
          record: "3-1-6",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 50,
          spread: "WHU -0.5 51c",
          total: "O 2.5 49c"
        },
        away: {
          moneyline: 24,
          spread: "BUR +0.5 53c",
          total: "U 2.5 54c"
        },
        draw: 28
      }
    },
    {
      time: "3:00 PM",
      volume: "5.12k",
      teams: {
        home: {
          name: "LIV Liverpool",
          record: "7-1-2",
          logo: "/placeholder.svg"
        },
        away: {
          name: "ARS Arsenal",
          record: "6-2-2",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 45,
          spread: "LIV -1.5 48c",
          total: "O 3.5 42c"
        },
        away: {
          moneyline: 30,
          spread: "ARS +1.5 55c",
          total: "U 3.5 60c"
        },
        draw: 25
      }
    },
    {
      time: "1:00 PM",
      volume: "3.50k",
      teams: {
        home: {
          name: "CHE Chelsea",
          record: "4-3-3",
          logo: "/placeholder.svg"
        },
        away: {
          name: "MCY Man City",
          record: "8-1-1",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 20,
          spread: "CHE +2.5 60c",
          total: "O 2.5 50c"
        },
        away: {
          moneyline: 60,
          spread: "MCY -2.5 45c",
          total: "U 2.5 50c"
        },
        draw: 20
      }
    },
    {
      time: "4:30 PM",
      volume: "2.80k",
      teams: {
        home: {
          name: "MUN Man Utd",
          record: "5-2-2",
          logo: "/placeholder.svg"
        },
        away: {
          name: "LEI Leicester",
          record: "3-4-3",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 55,
          spread: "MUN -0.5 52c",
          total: "O 2.5 48c"
        },
        away: {
          moneyline: 25,
          spread: "LEI +0.5 50c",
          total: "U 2.5 55c"
        },
        draw: 20
      }
    },
    {
      time: "7:00 PM",
      volume: "1.90k",
      teams: {
        home: {
          name: "ARS Arsenal",
          record: "6-2-2",
          logo: "/placeholder.svg"
        },
        away: {
          name: "TOT Spurs",
          record: "5-2-3",
          logo: "/placeholder.svg"
        }
      },
      odds: {
        home: {
          moneyline: 40,
          spread: "ARS -0.5 50c",
          total: "O 3.5 45c"
        },
        away: {
          moneyline: 35,
          spread: "TOT +0.5 53c",
          total: "U 3.5 58c"
        },
        draw: 25
      }
    }
  ];

  return (
    <section id="markets" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Trending Sports
          </h2>
          <p className="text-lg text-gray-300">
            Trade on the most popular prediction games right now
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <Button variant={selectedCategory === "FootBall" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("FootBall")}>FootBall</Button>
          <Button variant={selectedCategory === "EPL" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("EPL")}>Hockey</Button>
          <Button variant={selectedCategory === "La Liga" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("La Liga")}>BaseBall</Button>
          <Button variant={selectedCategory === "UCL" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("UCL")}>Tennis</Button>
          <Button variant={selectedCategory === "Ligue 1" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("Ligue 1")}>Boxing</Button>
          <Button variant={selectedCategory === "Serie A" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("Serie A")}>Cricket</Button>
        </div>

        {selectedCategory === "FootBall" && (
<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 px-4">
             {eplMatches.map((match, index) => (
              <EplMarketCard22 key={index} match={match} />
            ))}

          </div>
        )}

        {selectedCategory === "EPL" && (
          <div className="mt-12 grid grid-cols-3 gap-9  p-4 rounded-lg">
          
             {featuredMarkets.map((market, index) => (
              <MarketCard key={index} {...market} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" className="font-semibold">
            View All Markets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Markets;
