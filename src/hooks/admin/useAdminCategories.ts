import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Category } from "@/types/foods";

const CATEGORIES_KEY = ["admin", "categories"] as const;

export function useAdminCategories() {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: async () => {
      const res = await axios.get<ApiResponse>("/api/admin/categories");
      if (!res.data.success || !Array.isArray(res.data.data)) {
        throw new Error(res.data.message || "Failed to load categories.");
      }
      return res.data.data as Category[];
    },
  });

  const createCategory = useMutation({
    mutationFn: async (payload: FormData | Record<string, unknown>) => {
      const res = await axios.post<ApiResponse>(
        "/api/admin/categories",
        payload
      );
      if (!res.data.success)
        throw new Error(res.data.message || "Create failed");
      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY }),
  });

  const updateCategory = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: FormData | Record<string, unknown>;
    }) => {
      const res = await axios.put<ApiResponse>(
        `/api/admin/categories/${id}`,
        payload
      );
      if (!res.data.success)
        throw new Error(res.data.message || "Update failed");
      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY }),
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete<ApiResponse>(
        `/api/admin/categories/${id}`
      );
      if (!res.data.success)
        throw new Error(res.data.message || "Delete failed");
      return res.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY }),
  });

  return { ...categoriesQuery, createCategory, updateCategory, deleteCategory };
}
