
import React from "react";
import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";
import KpiCard from "@/components/KpiCard";
import OrderMetrics from "@/components/OrderMetrics";
import DistributionChart from "@/components/DistributionChart";
import { dashboardData } from "@/lib/data";

const Index = () => {
  // Get only the first 8 KPIs
  const topKpis = dashboardData.kpis.slice(0, 8);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl mx-auto px-6">
        <Header />
        
        <NavigationBar />
        
        <main className="py-6">
          <div className="space-y-6">
            {/* Order Metrics */}
            <OrderMetrics 
              total={dashboardData.monthlyOrders.total}
              projected={dashboardData.monthlyOrders.projected}
              target={dashboardData.monthlyOrders.target}
              percentToTarget={dashboardData.monthlyOrders.percentToTarget}
            />
            
            {/* KPIs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {topKpis.map((kpi, index) => (
                <KpiCard
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  icon={kpi.icon}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                  decimal={kpi.decimal}
                  index={index}
                />
              ))}
            </div>
            
            {/* Distribution Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DistributionChart 
                title="Orders by Platform" 
                data={dashboardData.platforms}
                index={0}
              />
              <DistributionChart 
                title="Orders by Location" 
                data={dashboardData.locations}
                index={1}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
