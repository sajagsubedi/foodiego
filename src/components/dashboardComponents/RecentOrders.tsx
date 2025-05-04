"use client";

import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";

export type OrderStatus = "processing" | "delivered" | "cancelled" | "pending";

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  items: string[];
  total: number;
  status: OrderStatus;
  time: string;
}

interface RecentOrdersTableProps {
  orders: Order[];
}

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const statusConfig = {
    processing: {
      icon: Clock,
      color: "bg-blue-100 text-blue-800",
      text: "Processing",
    },
    delivered: {
      icon: CheckCircle,
      color: "bg-green-100 text-green-800",
      text: "Delivered",
    },
    cancelled: {
      icon: XCircle,
      color: "bg-red-100 text-red-800",
      text: "Cancelled",
    },
    pending: {
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-800",
      text: "Pending",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      <Icon className="w-3 h-3 mr-1" />
      {config.text}
    </span>
  );
};

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders }) => {
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const toggleActionMenu = (orderId: string) => {
    if (actionMenuOpen === orderId) {
      setActionMenuOpen(null);
    } else {
      setActionMenuOpen(orderId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-700">Recent Orders</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Items
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {order.customer.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.customer.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {order.items.slice(0, 2).join(", ")}
                    {order.items.length > 2 &&
                      ` +${order.items.length - 2} more`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                  <button
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => toggleActionMenu(order.id)}
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>

                  {actionMenuOpen === order.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Details
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Update Status
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Contact Customer
                      </a>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
