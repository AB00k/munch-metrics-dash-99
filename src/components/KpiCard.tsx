
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
    <Card className={`overflow-hidden animate-scale-up ${delayClass} transition-all duration-300 hover:shadow-glass`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </span>
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-semibold">
            <AnimatedCounter 
              value={value} 
              prefix={prefix} 
              suffix={suffix}
              decimal={decimal}
            />
          </div>
          
          <div className={`flex items-center ${isPositive ? 'text-success' : 'text-destructive'}`}>
            <TrendIcon className="w-3 h-3 mr-1" />
            <span className="text-xs font-medium">
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
