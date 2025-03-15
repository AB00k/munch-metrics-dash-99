
import React, { useState } from "react";
import { Search, ChevronDown, Filter } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConnectedPlatforms from "./ConnectedPlatforms";

const NavigationBar: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedData, setSelectedData] = useState("All KPIs");
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last 30 Days");
  const [comparisonPeriod, setComparisonPeriod] = useState("Previous Period");
  
  const brands = ["All Brands", "Brand A", "Brand B", "Brand C"];
  const dataTypes = ["All KPIs", "Sales", "Orders", "Customers"];
  const timeframes = ["Last 30 Days", "Last 7 Days", "This Month", "Last Month", "Custom"];
  const comparisonPeriods = ["Previous Period", "Same Period Last Year", "Custom"];

  return (
    <div className="flex flex-col gap-4 my-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
        <Button variant="outline" size="sm" className="gap-1 bg-white border-gray-200 text-gray-700 rounded-full">
          <Filter className="h-4 w-4" />
          <span>View All Running Campaigns</span>
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 mt-2 mb-4">
        Hello Nikhil, here's your restaurant performance from March 1, 2024 to March 31, 2024
      </p>
      
      <div className="flex md:hidden justify-center w-full mt-2">
        <ConnectedPlatforms />
      </div>
    </div>
  );
};

export default NavigationBar;
