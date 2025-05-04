import React from "react";

import {
  summaryCardsData,
  orderTrendsData,
  revenueByFoodCategoryData,
  recentOrdersData,
  monthlySummaryData,
} from "@/data/mockData";
import SummaryCard from "@/components/dashboardComponents/SummaryCard";
import PieChart from "@/components/dashboardComponents/PieChart";
import RecentOrdersTable, {
  OrderStatus,
} from "@/components/dashboardComponents/RecentOrders";
import MonthlySummary from "@/components/dashboardComponents/MonthlySummary";
import LineChart from "@/components/dashboardComponents/LineChart";

const Dashboard: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <section className="flex-1 overflow-x-hidden overflow-y-auto pt-16 pb-6 px-4 sm:px-6 ">
          <div className=" mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mt-6 mb-6">
              Dashboard
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {summaryCardsData.map((card, index) => (
                <SummaryCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  trend={card.trend}
                />
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 h-inherit">
                <LineChart title="Order Trends" data={orderTrendsData} />
              </div>
              <div className="h-full">
                <PieChart
                  title="Revenue by Food Category"
                  data={revenueByFoodCategoryData}
                />
              </div>
            </div>

            {/* Orders and Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <RecentOrdersTable
                  orders={recentOrdersData.map((order) => ({
                    ...order,
                    status: order.status as OrderStatus,
                  }))}
                />
              </div>
              <div>
                <MonthlySummary
                  mostOrderedItem={monthlySummaryData.mostOrderedItem}
                  orderStats={monthlySummaryData.orderStats}
                  avgDeliveryTime={monthlySummaryData.avgDeliveryTime}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
