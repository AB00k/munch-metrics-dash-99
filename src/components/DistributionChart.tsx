
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart3, Percent, Megaphone } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  index: number;
}

// Updated colors for better visualization
const PLATFORM_COLORS = {
  'Website': '#0071e3', // Blue
  'Mobile App': '#51B851', // Green (Careem)
  'Food Delivery': '#FEF7CD', // Yellow (Noon)
  'Phone': '#9b87f5', // Purple (Dine In)
  'Talabat': '#FF5800', // Orange (Talabat)
  'Deliveroo': '#00CCBC', // Light blue (Deliveroo)
  'Downtown': '#0071e3',
  'Marina': '#51B851',
  'Business Bay': '#FF5800',
  'JBR': '#9b87f5'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 rounded-md shadow-md border border-gray-100">
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
  const [activeTab, setActiveTab] = useState("orders");
  
  const comparisonData = data.map(item => ({
    ...item,
    previousOrders: item.previousOrders || Math.floor(item.orders * (Math.random() * (0.7 - 1.3) + 0.7)),
    growth: item.growth || parseFloat(((item.previousOrders ? 
      ((item.orders - item.previousOrders) / item.previousOrders) * 100 : 
      Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1))).toFixed(1)),
    discount: item.discount || parseFloat((Math.random() * 15).toFixed(1)),
    adSpend: item.adSpend || parseFloat((Math.random() * 20 + 5).toFixed(1))
  }));
  
  const getColor = (name: string) => {
    return PLATFORM_COLORS[name as keyof typeof PLATFORM_COLORS] || '#0071e3';
  };

  return (
    <Card className={`animate-blur-in ${delayClass} transition-all duration-300 hover:shadow-sm bg-white rounded-xl border border-gray-100`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1 text-xs font-normal text-gray-500 hover:text-gray-700"
          onClick={() => setShowDetailedView(!showDetailedView)}
        >
          {showDetailedView ? "Chart View" : "Detailed View"}
          <BarChart3 className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent>
        {!showDetailedView ? (
          <>
            <div className="h-[250px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="orders"
                    labelLine={false}
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {data.map((entry) => (
                      <Cell 
                        key={`cell-${entry.name}`} 
                        fill={getColor(entry.name)} 
                        className="transition-opacity duration-300 hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    formatter={(value, entry, index) => (
                      <span className="text-xs font-medium">
                        {value} ({data[index]?.percentage}%)
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="overflow-hidden rounded-md border shadow-sm border-gray-100">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-50 border-b p-0">
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
                  <TableHeader className="bg-gray-50">
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
                        <TableCell className={`text-right text-xs ${item.growth && item.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {item.growth && item.growth >= 0 ? '+' : ''}{item.growth}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="discount" className="m-0">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-[120px] text-xs">{title.includes("Platform") ? "Platform" : "Location"}</TableHead>
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
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-[120px] text-xs">{title.includes("Platform") ? "Platform" : "Location"}</TableHead>
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DistributionChart;
