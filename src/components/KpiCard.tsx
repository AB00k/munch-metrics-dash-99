
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Utensils,
  Percent,
  Banknote,
  Megaphone,
  UserPlus,
  Users,
  ShoppingBag,
  MousePointerClick,
  ShoppingCart,
  XCircle,
  TrendingUp,
  TrendingDown,
  LucideIcon
} from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface KpiCardProps {
  title: string;
  value: number;
  change: number;
  icon: string;
  index: number;
  prefix?: string;
  suffix?: string;
  decimal?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  utensils: Utensils,
  percent: Percent,
  banknote: Banknote,
  megaphone: Megaphone,
  "user-plus": UserPlus,
  users: Users,
  "shopping-bag": ShoppingBag,
  "mouse-pointer-click": MousePointerClick,
  "shopping-cart": ShoppingCart,
  "x-circle": XCircle
};

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  icon,
  prefix = "",
  suffix = "",
  decimal = false,
  index
}) => {
  const Icon = iconMap[icon] || Utensils;
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const delayClass = `delay-${(index % 5) * 100}`;

  return (
    <Card className={`overflow-hidden animate-scale-up ${delayClass} transition-all duration-300 shadow-sm bg-white border border-gray-200 hover:border-gray-300`}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
              index % 8 === 0 ? 'bg-blue-100' :
              index % 8 === 1 ? 'bg-orange-100' :
              index % 8 === 2 ? 'bg-green-100' :
              index % 8 === 3 ? 'bg-purple-100' :
              index % 8 === 4 ? 'bg-yellow-100' :
              index % 8 === 5 ? 'bg-red-100' :
              index % 8 === 6 ? 'bg-indigo-100' :
              'bg-teal-100'
            }`}>
              <Icon className={`w-5 h-5 ${
                index % 8 === 0 ? 'text-blue-500' :
                index % 8 === 1 ? 'text-orange-500' :
                index % 8 === 2 ? 'text-green-500' :
                index % 8 === 3 ? 'text-purple-500' :
                index % 8 === 4 ? 'text-yellow-500' :
                index % 8 === 5 ? 'text-red-500' :
                index % 8 === 6 ? 'text-indigo-500' :
                'text-teal-500'
              }`} />
            </div>
          </div>
          
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <TrendIcon className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="text-2xl font-semibold mt-1">
            <AnimatedCounter 
              value={value} 
              prefix={prefix} 
              suffix={suffix}
              decimal={decimal}
            />
          </div>
          <span className="text-sm font-medium text-gray-500">
            {title}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
