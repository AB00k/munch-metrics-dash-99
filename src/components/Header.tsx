
import React from "react";
import { Search, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import ConnectedPlatforms from "./ConnectedPlatforms";

const Header: React.FC = () => {
  return (
    <header className="animate-slide-up py-5 border-b border-gray-100">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-xl font-medium tracking-tight text-gray-900">
            <span>Summary</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <ConnectedPlatforms />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 hover:bg-gray-200">
              <Search className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 hover:bg-gray-200">
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 hover:bg-gray-200">
              <User className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
