import React from "react";
import { TrendingUp, Clock, PieChart } from "lucide-react";

interface MonthlySummaryProps {
  mostOrderedItem: {
    name: string;
    count: number;
  };
  orderStats: {
    completed: number;
    cancelled: number;
  };
  avgDeliveryTime: string;
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({
  mostOrderedItem,
  orderStats,
  avgDeliveryTime,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Monthly Summary
      </h3>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-rose-100 p-2 rounded-full">
            <PieChart className="h-5 w-5 text-rose-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Most Ordered Item</p>
            <div className="flex items-baseline">
              <p className="text-lg font-medium">{mostOrderedItem.name}</p>
              <span className="ml-2 text-xs text-gray-500">
                ({mostOrderedItem.count} orders)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-rose-100 p-2 rounded-full">
            <TrendingUp className="h-5 w-5 text-rose-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completed vs Cancelled</p>
            <div className="flex items-center mt-1">
              <div className="flex-1 mr-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${
                        (orderStats.completed /
                          (orderStats.completed + orderStats.cancelled)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-green-600">{orderStats.completed}</span>
                  <span className="text-red-600">{orderStats.cancelled}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-rose-100 p-2 rounded-full">
            <Clock className="h-5 w-5 text-rose-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg Delivery Time</p>
            <p className="text-lg font-medium">{avgDeliveryTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;
