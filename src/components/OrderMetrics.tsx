
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Package, ArrowUpRight, ChevronRight, Banknote, Info } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { Button } from "./ui/button";

interface OrderMetricsProps {
  total: number;
  projected: number;
  target: number;
  percentToTarget: number;
}

const OrderMetrics: React.FC<OrderMetricsProps> = ({
  total,
  projected,
  target,
  percentToTarget
}) => {
  const [activeMetric, setActiveMetric] = useState<'orders' | 'revenue' | 'profit'>('orders');
  
  // Dummy data for revenue and profit metrics
  const metricsData = {
    orders: { total, projected, target, percentToTarget, icon: Package, label: "Monthly Ad Spend" },
    revenue: { total: 124750, projected: 150000, target: 180000, percentToTarget: 69, icon: Banknote, label: "Monthly Revenue" },
    profit: { total: 42550, projected: 50000, target: 60000, percentToTarget: 71, icon: TrendingUp, label: "Monthly Profit" }
  };

  const currentMetric = metricsData[activeMetric];

  const handleNextMetric = () => {
    if (activeMetric === 'orders') setActiveMetric('revenue');
    else if (activeMetric === 'revenue') setActiveMetric('profit');
    else setActiveMetric('orders');
  };

  const Icon = currentMetric.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Card className="col-span-2 shadow-none border border-gray-100 bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-gray-900">Monthly Ad Spend</h2>
              <div className="text-xs text-gray-500">Total spent this month</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Budget: AED 80,000</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">
              AED 51,250
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Budget utilization</div>
              <div className="text-lg font-semibold text-green-500">64%</div>
            </div>
          </div>
          
          <div className="h-40 mt-6 text-center text-gray-500">
            [Chart visualization would go here]
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-none border border-gray-100 bg-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-gray-900">Budget Information</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-500">Budget Utilization</div>
                <div className="text-sm font-semibold">64%</div>
              </div>
              <Progress 
                value={64} 
                className="h-2 bg-gray-100" 
                indicatorClassName="bg-black" 
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Total Budget</div>
                <div className="text-sm font-semibold">AED 80,000</div>
              </div>
              
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Spent</div>
                <div className="text-sm font-semibold">AED 51,250</div>
              </div>
              
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Remaining Budget</div>
                <div className="text-sm font-semibold">AED 28,750</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderMetrics;
