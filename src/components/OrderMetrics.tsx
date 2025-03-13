
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Package } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

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
  return (
    <Card className="animate-fade-in transition-all duration-300 hover:shadow-glass overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1 w-full">
            <div className="h-16 flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">Monthly Orders</h2>
                <p className="text-3xl font-semibold tracking-tight">
                  <AnimatedCounter value={total} />
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">Progress to target</span>
                <span className="text-xs font-medium">{percentToTarget}%</span>
              </div>
              <Progress value={percentToTarget} className="h-2" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-lg">
              <div className="p-2 rounded-full bg-primary/10 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Projected</p>
              <p className="text-xl font-semibold">
                <AnimatedCounter value={projected} />
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-lg">
              <div className="p-2 rounded-full bg-primary/10 mb-2">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Target</p>
              <p className="text-xl font-semibold">
                <AnimatedCounter value={target} />
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderMetrics;
