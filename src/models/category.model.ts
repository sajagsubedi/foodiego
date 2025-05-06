import mongoose, { Document } from "mongoose";

export interface Category extends Document {
  image: {
    url: string;
    fileId: string;
  };
  name: string;
  slug: string;
}

const CategorySchema = new mongoose.Schema<Category>(
  {
    image: {
      url: { type: String, required: true },
      fileId: { type: String, required: true },
    },
    name: { type: String },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

const CategoryModel =
  (mongoose.models.Category as mongoose.Model<Category>) ||
  mongoose.model("Category", CategorySchema);

export default CategoryModel;
