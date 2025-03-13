
import React from "react";
import { UtensilsCrossed } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="animate-slide-up py-6 border-b border-border/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-md">
            <UtensilsCrossed className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-medium tracking-tight">Restaurant Dashboard</h1>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric'
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
