import mongoose, { Document, Types } from "mongoose";

export interface CartItem {
  foodId: Types.ObjectId;
  quantity: number;
}

export interface CartType extends Document {
  userId: Types.ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new mongoose.Schema<CartType>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Food",
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CartModel =
  (mongoose.models.Cart as mongoose.Model<CartType>) ||
  mongoose.model("Cart", CartSchema);

export default CartModel;
