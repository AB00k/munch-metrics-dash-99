
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart3 } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface DistributionItem {
  name: string;
  orders: number;
  percentage: number;
  previousOrders?: number;
  growth?: number;
}

interface DistributionChartProps {
  title: string;
  data: DistributionItem[];
  index: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/90 backdrop-blur-sm p-2 rounded-md shadow-md border border-border">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm">{data.orders} orders ({data.percentage}%)</p>
      </div>
    );
  }
  return null;
};

const DistributionChart: React.FC<DistributionChartProps> = ({ title, data, index }) => {
  const delayClass = `delay-${index * 200}`;
  const [showDetailedView, setShowDetailedView] = useState(false);
  
  // Prepare data with previous period
  const comparisonData = data.map(item => ({
    ...item,
    previousOrders: item.previousOrders || Math.floor(item.orders * (Math.random() * (0.7 - 1.3) + 0.7)),
    growth: item.growth || parseFloat(((item.previousOrders ? 
      ((item.orders - item.previousOrders) / item.previousOrders) * 100 : 
      Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1))).toFixed(1))
  }));
  
  return (
    <Card className={`animate-blur-in ${delayClass} transition-all duration-300 hover:shadow-glass h-full bg-gradient-to-br from-background to-accent/5`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1 text-xs font-normal text-muted-foreground hover:text-primary hover:bg-primary/5"
          onClick={() => setShowDetailedView(!showDetailedView)}
        >
          {showDetailedView ? "Chart View" : "Detailed View"}
          <BarChart3 className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent>
        {!showDetailedView ? (
          <>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="orders"
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        className="transition-opacity duration-300 hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {data.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-xs font-medium">{item.name} ({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="overflow-hidden rounded-md border shadow-sm border-border/50">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[120px] text-xs">Platform</TableHead>
                  <TableHead className="text-xs text-right">Mar 1-Mar 31</TableHead>
                  <TableHead className="text-xs text-right">Feb 1-Feb 28</TableHead>
                  <TableHead className="text-xs text-right">% Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-xs">{item.name}</TableCell>
                    <TableCell className="text-right text-xs">{item.orders}</TableCell>
                    <TableCell className="text-right text-xs">{item.previousOrders}</TableCell>
                    <TableCell className={`text-right text-xs ${item.growth && item.growth >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {item.growth && item.growth >= 0 ? '+' : ''}{item.growth}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="w-full px-4 py-2.5 bg-background/50 border-t border-border/30">
              <div className="flex flex-wrap gap-2 mt-2">
                {comparisonData.map((item, idx) => (
                  <div 
                    key={idx}
                    className="h-6 rounded-full text-xs flex items-center px-2.5 text-white"
                    style={{ 
                      width: `${Math.max(item.percentage * 0.8, 10)}%`,
                      backgroundColor: COLORS[idx % COLORS.length] 
                    }}
                  >
                    {item.percentage}%
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DistributionChart;
