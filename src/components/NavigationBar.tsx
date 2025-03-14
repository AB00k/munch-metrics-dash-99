
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <div className="flex flex-col md:flex-row gap-3 py-4 items-center justify-between bg-secondary/10 rounded-lg px-4 my-4">
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 bg-background">
              {selectedBrand}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {brands.map((brand) => (
              <DropdownMenuItem 
                key={brand} 
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 bg-background">
              {selectedData}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dataTypes.map((type) => (
              <DropdownMenuItem 
                key={type} 
                onClick={() => setSelectedData(type)}
              >
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 bg-background">
              {selectedTimeframe}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {timeframes.map((time) => (
              <DropdownMenuItem 
                key={time} 
                onClick={() => setSelectedTimeframe(time)}
              >
                {time}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 bg-background">
              {comparisonPeriod}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {comparisonPeriods.map((period) => (
              <DropdownMenuItem 
                key={period} 
                onClick={() => setComparisonPeriod(period)}
              >
                {period}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" size="sm" className="bg-background">
          <Search className="h-4 w-4 text-primary" />
        </Button>
      </div>
    </div>
  );
};

export default NavigationBar;
