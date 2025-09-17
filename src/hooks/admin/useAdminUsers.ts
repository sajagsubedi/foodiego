import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@/types/user";

const USERS_KEY = ["admin", "users"] as const;

export function useAdminUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: USERS_KEY,
    queryFn: async () => {
      const res = await axios.get<ApiResponse>("/api/admin/users");
      if (!res.data.success || !Array.isArray(res.data.data)) {
        throw new Error(res.data.message || "Failed to load users.");
      }
      return res.data.data as User[];
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete<ApiResponse>(`/api/admin/users?id=${id}`);
      if (!res.data.success) throw new Error(res.data.message || "Delete failed");
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  });

  return { ...usersQuery, deleteUser };
}
