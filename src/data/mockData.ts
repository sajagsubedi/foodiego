import { ShoppingBag, DollarSign, Users, Clock } from "lucide-react";
import { Food, Category } from "@/types/foods";

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

export const categories: Category[] = [
  {
    _id: "cat1",
    name: "Burgers",
    slug: "burgers",
    createdAt: "2023-08-15T10:30:00Z",
    updatedAt: "2023-08-15T10:30:00Z",
    image: {
      url: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=100",
      fileId: "file-1",
    },
  },
  {
    _id: "cat2",
    name: "Pizza",
    image: {
      url: "https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=100",
      fileId: "file-2",
    },
    slug: "pizza",
    createdAt: "2023-08-15T10:30:00Z",
    updatedAt: "2023-08-15T10:30:00Z",
  },
  {
    _id: "cat3",
    name: "Salads",
    image: {
      url: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=100",
      fileId: "file-3",
    },
    slug: "salads",
    createdAt: "2023-08-15T10:30:00Z",
    updatedAt: "2023-08-15T10:30:00Z",
  },
  {
    _id: "cat4",
    name: "Desserts",
    image: {
      url: "https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=100",
      fileId: "file-4",
    },
    slug: "desserts",
    createdAt: "2023-08-15T10:30:00Z",
    updatedAt: "2023-08-15T10:30:00Z",
  },
  {
    _id: "cat5",
    name: "Beverages",
    image: {
      url: "https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=100",
      fileId: "file-5",
    },
    slug: "beverages",
    createdAt: "2023-08-15T10:30:00Z",
    updatedAt: "2023-08-15T10:30:00Z",
  },
];

export const foods: Food[] = [
  {
    _id: "1",
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty with melted cheese, fresh lettuce, tomato, and our special sauce.",
    price: 8.99,
    markedPrice: 10.99,
    categoryId: "cat1",
    image: {
      url: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      fileId: "js",
    },
    isVisible: true,
    isFeatured: true,
    createdAt: "2023-08-15T10:30:00Z",
    updatedAt: "2023-08-15T10:30:00Z",
  },
  {
    _id: "2",
    name: "Margherita Pizza",
    description:
      "Classic pizza with tomato sauce, fresh mozzarella, and basil on a thin crust.",
    price: 12.99,
    categoryId: "cat2",
    imageUrl:
      "https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isVisible: true,
    createdAt: "2023-08-16T14:45:00Z",
  },
  {
    _id: "3",
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce with parmesan cheese, croutons, and caesar dressing.",
    price: 7.99,
    markedPrice: 9.99,
    categoryId: "cat3",
    imageUrl:
      "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isVisible: false,
    createdAt: "2023-08-17T09:15:00Z",
  },
  {
    _id: "4",
    name: "Chocolate Brownie",
    description:
      "Rich and fudgy chocolate brownie with a scoop of vanilla ice cream.",
    price: 5.99,
    categoryId: "cat4",
    imageUrl:
      "https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isVisible: true,
    createdAt: "2023-08-18T16:20:00Z",
  },
  {
    _id: "5",
    name: "Strawberry Smoothie",
    description:
      "Refreshing smoothie made with fresh strawberries, banana, and yogurt.",
    price: 4.99,
    categoryId: "cat5",
    imageUrl:
      "https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isVisible: true,
    createdAt: "2023-08-19T11:10:00Z",
  },
];
