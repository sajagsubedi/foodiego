import mongoose, { Document } from "mongoose";

export interface FoodType extends Document {
  name: string;
  description: string;
  price: number;
  categoryID: string;
  imageUrl: string;
  markedPrice?: number;
  visibility: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FoodSchema = new mongoose.Schema<FoodType>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryID: { type: String, required: true },
    imageUrl: { type: String, required: true },
    visibility: {
      type: Boolean,
      default: true,
    },
    markedPrice: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

const FoodModel =
  (mongoose.models.Food as mongoose.Model<FoodType>) ||
  mongoose.model("Food", FoodSchema);

export default FoodModel;
