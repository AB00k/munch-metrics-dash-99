
import React from "react";
import { Search, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import ConnectedPlatforms from "./ConnectedPlatforms";

const Header: React.FC = () => {
  return (
    <header className="animate-slide-up py-6 border-b border-border/40">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-xl font-medium tracking-tight">
            <span className="text-primary">Summary</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Hello Nikhil, here's your restaurant performance from March 1, 2024 to March 31, 2024
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <ConnectedPlatforms />
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5 text-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5 text-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5 text-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
