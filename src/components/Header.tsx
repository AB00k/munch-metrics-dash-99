
import React, { useState } from "react";
import { UtensilsCrossed, Calendar, Wallet, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  // Mock data - in a real app, this would come from a user context or state
  const userName = "Nikhil";
  const [dateRange, setDateRange] = useState({
    start: "March 1, 2024",
    end: "March 31, 2024"
  });

  return (
    <header className="animate-slide-up py-6 border-b border-border/40">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2.5 rounded-md">
            <UtensilsCrossed className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-medium tracking-tight">Restaurant Dashboard</h1>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <div className="flex items-center gap-1.5 text-primary/80">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{dateRange.start} - {dateRange.end}</span>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="shadow-subtle gap-1 text-xs">
              <Wallet className="w-3.5 h-3.5" />
              <span>Revenue Goals</span>
            </Button>
            <Button size="sm" variant="outline" className="shadow-subtle gap-1 text-xs">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Profit Targets</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground animate-fade-in">
        <p>Hello {userName}, here's your restaurant performance from {dateRange.start} to {dateRange.end}</p>
      </div>
    </header>
  );
};

export default Header;
