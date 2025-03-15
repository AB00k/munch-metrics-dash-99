
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart3, Percent, Megaphone } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DistributionItem {
  name: string;
  orders: number;
  percentage: number;
  previousOrders?: number;
  growth?: number;
  discount?: number;
  adSpend?: number;
}

interface DistributionChartProps {
  title: string;
  data: DistributionItem[];
  secondaryData?: DistributionItem[];
  index: number;
  chartType?: 'platform' | 'location';
  showSelector?: boolean;
}

const COLORS = ['#8B5CF6', '#FF5800', '#51B851', '#00CCBC', '#555555', '#DDDDDD'];

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

const DistributionChart: React.FC<DistributionChartProps> = ({ 
  title, 
  data, 
  secondaryData,
  index,
  chartType = 'platform',
  showSelector = false
}) => {
  const delayClass = `delay-${index * 200}`;
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedDataType, setSelectedDataType] = useState<'location' | 'brand'>('location');
  
  const currentData = selectedDataType === 'brand' && secondaryData ? secondaryData : data;
  
  const comparisonData = currentData.map(item => ({
    ...item,
    previousOrders: item.previousOrders || Math.floor(item.orders * (Math.random() * (0.7 - 1.3) + 0.7)),
    growth: item.growth || parseFloat(((item.previousOrders ? 
      ((item.orders - item.previousOrders) / item.previousOrders) * 100 : 
      Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1))).toFixed(1)),
    discount: item.discount || parseFloat((Math.random() * 15).toFixed(1)),
    adSpend: item.adSpend || parseFloat((Math.random() * 20 + 5).toFixed(1))
  }));
  
  return (
    <Card className={`animate-blur-in ${delayClass} transition-all duration-300 hover:shadow-glass h-full bg-background`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {showSelector && (
            <Select 
              value={selectedDataType} 
              onValueChange={(value) => setSelectedDataType(value as 'location' | 'brand')}
            >
              <SelectTrigger className="h-8 w-[120px] text-xs">
                <SelectValue placeholder="View by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="brand">Brand</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1 text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-secondary/30"
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
                    data={currentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="orders"
                    labelLine={false}
                    strokeWidth={3}
                  >
                    {currentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        className="transition-opacity duration-300 hover:opacity-80"
                        stroke="#ffffff"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {currentData.map((item, idx) => (
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-background/80 border-b p-0">
                <TabsTrigger value="orders" className="text-xs py-1.5">Orders</TabsTrigger>
                <TabsTrigger value="discount" className="text-xs py-1.5">
                  <Percent className="h-3 w-3 mr-1" />
                  Discount
                </TabsTrigger>
                <TabsTrigger value="adspend" className="text-xs py-1.5">
                  <Megaphone className="h-3 w-3 mr-1" />
                  Ad Spend
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="m-0">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="w-[120px] text-xs">
                        {chartType === 'platform' ? 'Platform' : selectedDataType === 'brand' ? 'Brand' : 'Location'}
                      </TableHead>
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
              </TabsContent>
              
              <TabsContent value="discount" className="m-0">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="w-[120px] text-xs">
                        {chartType === 'platform' ? 'Platform' : selectedDataType === 'brand' ? 'Brand' : 'Location'}
                      </TableHead>
                      <TableHead className="text-xs text-right">Orders</TableHead>
                      <TableHead className="text-xs text-right">Discount %</TableHead>
                      <TableHead className="text-xs text-right">Discount Amt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium text-xs">{item.name}</TableCell>
                        <TableCell className="text-right text-xs">{item.orders}</TableCell>
                        <TableCell className="text-right text-xs">{item.discount}%</TableCell>
                        <TableCell className="text-right text-xs">
                          AED {Math.round(item.orders * 85.56 * (item.discount! / 100))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="adspend" className="m-0">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="w-[120px] text-xs">
                        {chartType === 'platform' ? 'Platform' : selectedDataType === 'brand' ? 'Brand' : 'Location'}
                      </TableHead>
                      <TableHead className="text-xs text-right">Orders</TableHead>
                      <TableHead className="text-xs text-right">Ad Spend %</TableHead>
                      <TableHead className="text-xs text-right">Ad Spend Amt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium text-xs">{item.name}</TableCell>
                        <TableCell className="text-right text-xs">{item.orders}</TableCell>
                        <TableCell className="text-right text-xs">{item.adSpend}%</TableCell>
                        <TableCell className="text-right text-xs">
                          AED {Math.round(item.orders * 85.56 * (item.adSpend! / 100))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
            
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
