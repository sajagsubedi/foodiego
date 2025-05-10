import mongoose, { Document, Types } from "mongoose";

export interface FoodType extends Document {
  name: string;
  description: string;
  price: number;
  categoryID: Types.ObjectId;
  image: {
    url: string;
    fileId: string;
  };
  markedPrice?: number;
  isFeatured: boolean;
  visibility: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FoodSchema = new mongoose.Schema<FoodType>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    image: {
      url: { type: String },
      fileId: { type: String },
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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
