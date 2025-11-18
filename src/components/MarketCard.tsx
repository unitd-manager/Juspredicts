import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketCardProps {
  title: string;
  category: string;
  yesPrice: number;
  noPrice: number;
  volume: string;
  trending: "up" | "down";
  deadline: string;
}

const MarketCard = ({ title, category, yesPrice, noPrice, volume, trending, deadline }: MarketCardProps) => {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-md transition-all hover:shadow-xl">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            {category}
          </div>
          <h3 className="text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        {trending === "up" ? (
          <TrendingUp className="h-5 w-5 text-success" />
        ) : (
          <TrendingDown className="h-5 w-5 text-destructive" />
        )}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-success/10 p-3">
          <div className="text-xs font-medium text-success mb-1">YES</div>
          <div className="text-2xl font-bold text-success">{yesPrice}%</div>
        </div>
        <div className="rounded-xl bg-destructive/10 p-3">
          <div className="text-xs font-medium text-destructive mb-1">NO</div>
          <div className="text-2xl font-bold text-destructive">{noPrice}%</div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between text-sm">
        <div className="text-muted-foreground">
          Volume: <span className="font-semibold text-foreground">{volume}</span>
        </div>
        <div className="text-muted-foreground">{deadline}</div>
      </div>

      <Button className="w-full bg-primary hover:bg-primary/90 font-medium">
        Trade Now
      </Button>
    </Card>
  );
};

export default MarketCard;
