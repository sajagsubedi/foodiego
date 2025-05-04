import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: typeof LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>

          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${
                  trend.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.positive ? "+" : ""}
                {trend.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>

        <div className="bg-rose-100 p-3 rounded-full">
          <Icon className="h-6 w-6 text-rose-500" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
