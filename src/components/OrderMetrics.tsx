
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Package, ArrowUpRight, ChevronRight, Banknote, Edit } from "lucide-react";
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
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [newTarget, setNewTarget] = useState(target.toString());
  
  // Dummy data for revenue and profit metrics
  const metricsData = {
    orders: { total, projected, target, percentToTarget, icon: Package, label: "Monthly Orders" },
    revenue: { total: 124750, projected: 150000, target: 180000, percentToTarget: 69, icon: Banknote, label: "Monthly Revenue" },
    profit: { total: 42550, projected: 50000, target: 60000, percentToTarget: 71, icon: TrendingUp, label: "Monthly Profit" }
  };

  const currentMetric = metricsData[activeMetric];

  const handleNextMetric = () => {
    if (activeMetric === 'orders') setActiveMetric('revenue');
    else if (activeMetric === 'revenue') setActiveMetric('profit');
    else setActiveMetric('orders');
  };

  const handleSaveTarget = () => {
    // In a real app, this would update the target in the backend
    setIsEditingTarget(false);
    // For demo purposes, we're not actually updating the target value
  };

  const Icon = currentMetric.icon;

  return (
    <Card className="animate-fade-in transition-all duration-300 hover:shadow-subtle overflow-hidden border border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1 w-full">
            <div className="h-16 flex items-center gap-3">
              <div className="bg-secondary/80 p-3 rounded-full">
                <Icon className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-muted-foreground">{currentMetric.label}</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={handleNextMetric}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-3xl font-semibold tracking-tight">
                  <AnimatedCounter 
                    value={currentMetric.total} 
                    prefix={activeMetric !== 'orders' ? 'AED ' : ''} 
                  />
                </p>
              </div>
            </div>
            
            <div className="mt-6 mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">Progress to target</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">{currentMetric.percentToTarget}%</span>
                  <ArrowUpRight className="w-3 h-3 text-foreground" />
                </div>
              </div>
              <Progress 
                value={currentMetric.percentToTarget} 
                className="h-2.5 bg-secondary/50" 
                indicatorClassName="bg-black" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center text-center p-4 bg-secondary/10 rounded-lg border border-border/30 shadow-subtle">
              <div className="p-2 rounded-full bg-secondary/50 mb-2">
                <TrendingUp className="w-4 h-4 text-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Projected</p>
              <p className="text-xl font-semibold">
                <AnimatedCounter 
                  value={currentMetric.projected} 
                  prefix={activeMetric !== 'orders' ? 'AED ' : ''} 
                />
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 bg-secondary/10 rounded-lg border border-border/30 shadow-subtle relative">
              <div className="p-2 rounded-full bg-secondary/50 mb-2">
                <Target className="w-4 h-4 text-foreground" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6"
                onClick={() => setIsEditingTarget(!isEditingTarget)}
              >
                <Edit className="h-3 w-3" />
              </Button>
              
              <p className="text-xs text-muted-foreground mb-1">Target</p>
              
              {isEditingTarget ? (
                <div className="flex flex-col gap-1">
                  <input
                    type="number"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full text-sm p-1 border rounded bg-background"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={handleSaveTarget}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <p className="text-xl font-semibold">
                  <AnimatedCounter 
                    value={currentMetric.target} 
                    prefix={activeMetric !== 'orders' ? 'AED ' : ''} 
                  />
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderMetrics;
