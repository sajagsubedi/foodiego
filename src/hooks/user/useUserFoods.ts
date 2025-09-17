import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Food } from "@/types/foods";

export function useUserFoods(category?: string | null) {
  return useQuery({
    queryKey: ["user", "foods", { category }],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/foods${category ? `?category=${encodeURIComponent(category)}` : ""}`;
      const res = await axios.get<ApiResponse>(url);
      if (!res.data.success || !Array.isArray(res.data.data)) {
        throw new Error(res.data.message || "Failed to load foods.");
      }
      return res.data.data as Food[];
    },
  });
}
