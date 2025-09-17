import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Category } from "@/types/foods";

export function useUserCategories() {
  return useQuery({
    queryKey: ["user", "categories"],
    queryFn: async () => {
      const res = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
      if (!res.data.success || !Array.isArray(res.data.data)) {
        throw new Error(res.data.message || "Failed to load categories.");
      }
      return res.data.data as Category[];
    },
  });
}
