import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Food } from "@/types/foods";

export function useAdminFoods(category?: string) {
  const queryClient = useQueryClient();

  const foodsQuery = useQuery({
    queryKey: ["admin", "foods", { category }],
    queryFn: async () => {
      let url = "/api/admin/foods";
      if (category) url += `?category=${encodeURIComponent(category)}`;
      const res = await axios.get<ApiResponse>(url);
      if (!res.data.success || !Array.isArray(res.data.data)) {
        throw new Error(res.data.message || "Failed to load foods.");
      }
      return res.data.data as Food[];
    },
  });

  const createFood = useMutation({
    mutationFn: async (payload: FormData | Record<string, unknown>) => {
      const res = await axios.post<ApiResponse>("/api/admin/foods", payload);
      if (!res.data.success) throw new Error(res.data.message || "Create failed");
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "foods"] }),
  });

  const updateFood = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: FormData | Record<string, unknown> }) => {
      const res = await axios.put<ApiResponse>(`/api/admin/foods/${id}`, payload);
      if (!res.data.success) throw new Error(res.data.message || "Update failed");
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "foods"] }),
  });

  const deleteFood = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete<ApiResponse>(`/api/admin/foods/${id}`);
      if (!res.data.success) throw new Error(res.data.message || "Delete failed");
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "foods"] }),
  });

  return { ...foodsQuery, createFood, updateFood, deleteFood };
}
