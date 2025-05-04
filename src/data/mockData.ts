import { ShoppingBag, DollarSign, Users, Clock } from "lucide-react";

// Summary Cards Data
export const summaryCardsData = [
  {
    title: "Total Orders",
    value: "3,256",
    icon: ShoppingBag,
    trend: {
      value: "12.5%",
      positive: true,
    },
  },
  {
    title: "Revenue This Month",
    value: "$24,350",
    icon: DollarSign,
    trend: {
      value: "8.2%",
      positive: true,
    },
  },
  {
    title: "Active Users",
    value: "1,206",
    icon: Users,
    trend: {
      value: "4.3%",
      positive: true,
    },
  },
  {
    title: "Pending Orders",
    value: "42",
    icon: Clock,
    trend: {
      value: "2.1%",
      positive: false,
    },
  },
];

// Line Chart Data
export const orderTrendsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Orders",
      data: [250, 320, 280, 450, 380, 520],
      borderColor: "#f43f5e",
      backgroundColor: "#f43f5e",
    },
    {
      label: "Revenue",
      data: [2100, 2500, 2300, 3100, 2800, 3500],
      borderColor: "#3b82f6",
      backgroundColor: "#3b82f6",
    },
  ],
};

// Pie Chart Data
export const revenueByFoodCategoryData = {
  labels: ["Pizza", "Burgers", "Sushi", "Salads", "Desserts"],
  datasets: [
    {
      data: [35, 25, 20, 10, 10],
      backgroundColor: ["#f43f5e", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
    },
  ],
};

// Recent Orders Data
export const recentOrdersData = [
  {
    id: "ORD-7892",
    customer: {
      name: "Jane Cooper",
      email: "jane@example.com",
    },
    items: ["Pepperoni Pizza", "Caesar Salad", "Coke"],
    total: 45.99,
    status: "delivered",
    time: "30 min ago",
  },
  {
    id: "ORD-7893",
    customer: {
      name: "Robert Fox",
      email: "robert@example.com",
    },
    items: ["Double Cheeseburger", "Fries", "Milkshake"],
    total: 32.5,
    status: "processing",
    time: "45 min ago",
  },
  {
    id: "ORD-7894",
    customer: {
      name: "Esther Howard",
      email: "esther@example.com",
    },
    items: ["Vegetarian Sushi Set", "Miso Soup"],
    total: 48.0,
    status: "pending",
    time: "1 hour ago",
  },
  {
    id: "ORD-7895",
    customer: {
      name: "Cameron Williamson",
      email: "cameron@example.com",
    },
    items: ["Chicken Wings", "BBQ Ribs", "Coleslaw"],
    total: 36.75,
    status: "delivered",
    time: "2 hours ago",
  },
  {
    id: "ORD-7896",
    customer: {
      name: "Brooklyn Simmons",
      email: "brooklyn@example.com",
    },
    items: ["Greek Salad", "Garlic Bread", "Lemonade"],
    total: 28.5,
    status: "cancelled",
    time: "3 hours ago",
  },
];

// Monthly Summary Data
export const monthlySummaryData = {
  mostOrderedItem: {
    name: "Pepperoni Pizza",
    count: 645,
  },
  orderStats: {
    completed: 2890,
    cancelled: 142,
  },
  avgDeliveryTime: "28 minutes",
};
