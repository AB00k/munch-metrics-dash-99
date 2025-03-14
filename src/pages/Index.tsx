
import React from "react";
import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";
import KpiCard from "@/components/KpiCard";
import OrderMetrics from "@/components/OrderMetrics";
import DistributionChart from "@/components/DistributionChart";
import { dashboardData } from "@/lib/data";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <Header />
        
        <NavigationBar />
        
        <main className="py-6">
          <div className="space-y-8">
            {/* Order Metrics */}
            <OrderMetrics 
              total={dashboardData.monthlyOrders.total}
              projected={dashboardData.monthlyOrders.projected}
              target={dashboardData.monthlyOrders.target}
              percentToTarget={dashboardData.monthlyOrders.percentToTarget}
            />
            
            {/* KPIs Grid */}
            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                Key Performance Indicators
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {dashboardData.kpis.map((kpi, index) => (
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
            </div>
            
            {/* Distribution Charts */}
            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                Order Distribution
              </h2>
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
