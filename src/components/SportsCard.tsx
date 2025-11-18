import React from "react";
import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SportsCardProps {
  image: string;
  title: string;
  date: string;
  participants: number;
  description: string;
  prize: number;
  id?: number;
}

const SportsCard: React.FC<SportsCardProps> = ({
  image,
  title,
  date,
  participants,
  description,
  prize,
  id = 0,
}) => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate(`/game/${id}`, {
      state: {
        title,
        date,
        participants,
        description,
        prize,
        image,
      },
    });
  };
  const containerClasses = "border-border bg-secondary hover:shadow-[inset_2px_2px_8px_rgba(255,255,255,0.05),inset_-3px_-3px_10px_rgba(0,0,0,0.2),0_10px_22px_rgba(0,0,0,0.35)]";

  const titleClasses = "text-foreground";
  const metaTextClasses = "text-muted-foreground";
  const iconClasses = "text-muted-foreground";
  const descClasses = "text-foreground/80";
  const rightPanelBorder = "border-border";
  const rightPanelBg = "bg-card";
  const prizeAmountClasses = "text-green-500";
  const buttonClasses = "bg-primary hover:bg-primary/90 text-primary-foreground";

  return (
    <div className={`relative flex items-center justify-between p-6 rounded-lg border shadow-[inset_2px_2px_6px_rgba(255,255,255,0.6),inset_-3px_-3px_8px_rgba(0,0,0,0.05),0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.02] ${containerClasses}`}>
      {/* Left section */}
      <div className="flex items-center space-x-5">
        {/* Image with embossed border */}
        <div className={`w-24 h-24 rounded-md overflow-hidden bg-muted border-border border shadow-[inset_2px_2px_6px_rgba(255,255,255,0.05),inset_-2px_-2px_6px_rgba(0,0,0,0.2)]`}>
          <img src={image} alt={title} className="w-full h-full object-cover rounded-md" />
        </div>

        {/* Text content */}
        <div>
          <h2 className={`text-2xl font-bold drop-shadow-[1px_1px_1px_rgba(255,255,255,0.2)] mb-1 ${titleClasses}`}>
            {title}
          </h2>
          <div className={`flex items-center text-sm font-medium mb-2 ${metaTextClasses}`}>
            <Calendar className={`h-4 w-4 mr-1 opacity-80 ${iconClasses}`} />
            <span>{date}</span>
            <Users className={`h-4 w-4 ml-4 mr-1 opacity-80 ${iconClasses}`} />
            <span>{participants} Participants</span>
          </div>
          <p className={`text-sm leading-snug ${descClasses}`}>{description}</p>
        </div>
      </div>

      {/* Right section - Prize */}
      <div className={`flex flex-col items-center justify-center ${rightPanelBg} rounded-md p-5 border ${rightPanelBorder} shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),inset_-2px_-2px_5px_rgba(0,0,0,0.06),0_3px_10px_rgba(0,0,0,0.08)]`}>
        <p className={`text-sm font-medium mb-1 text-center text-muted-foreground`}>In Prizes</p>
        <p className={`text-3xl font-extrabold drop-shadow-[1px_1px_1px_rgba(255,255,255,0.3)] mb-3 text-center ${prizeAmountClasses}`}>
          ${prize}
        </p>
        <Button 
          onClick={handleJoinNow}
          className={`rounded-md text-sm font-bold px-6 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all ${buttonClasses}`}
        >
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default SportsCard;
