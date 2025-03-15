
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
    <Card className={`overflow-hidden animate-scale-up ${delayClass} transition-all duration-300 hover:shadow-sm bg-white border border-gray-100 rounded-xl`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-500 font-normal">
            {title}
          </span>
          <div className="flex items-center">
            <div className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'} font-medium flex items-center gap-0.5`}>
              <TrendIcon className="w-3 h-3" />
              <span>{isPositive ? '+' : ''}{change}%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-1">
          <div className="text-2xl font-bold text-gray-900">
            <AnimatedCounter 
              value={value} 
              prefix={prefix} 
              suffix={suffix}
              decimal={decimal}
            />
          </div>
          
          <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full">
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
