export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  userId: string;
}
