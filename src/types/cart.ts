export interface CartItem {
  foodId: string;
  quantity: number;
  food?: {
    _id: string;
    name: string;
    price: number;
    image: {
      url: string;
      fileId: string;
    };
  };
}

export interface CartResponse {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  foodId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  foodId: string;
  quantity: number;
}
