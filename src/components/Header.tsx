
import React from "react";
import { Search, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import ConnectedPlatforms from "./ConnectedPlatforms";

const Header: React.FC = () => {
  return (
    <header className="animate-slide-up py-6 border-b border-gray-100">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start gap-1">
          <div className="text-xs uppercase text-blue-500 font-semibold tracking-wider">Dashboard</div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            <span>Summary</span>
          </h1>
          <div className="text-sm text-gray-500">March 31, 2024</div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ConnectedPlatforms />
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-50 p-1 rounded-lg flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              <span className="text-xs text-gray-500">Real-time data</span>
            </div>
            <Button variant="default" size="sm" className="rounded-full bg-red-500 hover:bg-red-600">
              <span className="text-sm">Create Report</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
