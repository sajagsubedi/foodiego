import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ExtendedApiResponse } from "@/types/ApiResponse";
import { CartResponse } from "@/types/cart";

export function useUserCart() {
  const cartQuery = useQuery({
    queryKey: ["user", "cart"],
    queryFn: async () => {
      const res = await axios.get<ExtendedApiResponse<CartResponse>>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`);
      return res.data.data;
    },
  });

  return cartQuery;
}
