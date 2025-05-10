"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { CategoryCard } from "@/components/dashboard/CategoryCard";
import { Category } from "@/types/foods";
import { CategoryDialog } from "@/components/dashboard/CategoryDialog";
import { CategoryInput } from "@/schemas/categorySchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "react-toastify";
import Loader from "@/components/shared/Loader";
import Button from "@/components/shared/Button";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleAddClick = () => {
    setSelectedCategory(null);
    setDialogOpen(true);
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleSave = async (category: CategoryInput) => {
    try {
      const { name, slug, image } = category;

      const formData = new FormData();
      if (name) formData.append("name", name);
      if (slug) formData.append("slug", slug);
      if (image) formData.append("image", image);

      if (!selectedCategory) {
        const response = await axios.post<ApiResponse>(
          "/api/admin/categories",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Category saved successfully:", response.data);
        toast.success(response.data.message);
        if (response.data.success) {
          setCategories((prev) => [...prev, response.data.data as Category]);
          closeDialog();
        }
      } else {
        const response = await axios.put<ApiResponse>(
          `/api/admin/categories/${selectedCategory._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Category saved successfully:", response.data);
        if (response.data.success) {
          setCategories((prev) =>
            prev.map((cat) =>
              cat._id === selectedCategory._id
                ? (response.data.data as Category)
                : cat
            )
          );
          toast.success(response.data.message);
          closeDialog();
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        "There was a problem saving the category. Please try again.";
      toast.error(errorMessage);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/admin/categories");

      if (response.data.success && Array.isArray(response.data.data)) {
        setCategories(response.data.data as Category[]);
      } else {
        toast.error("Failed to load categories.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data?.message || "Error fetching categories.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-transparent">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-rose-500">CATEGORIES</h1>
        <Button onClick={handleAddClick}>
          <Plus size={18} />
          <span>Add Category</span>
        </Button>
      </div>
      {loading && (
        <div className="flex items-center justify-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg">
          <Loader />
        </div>
      )}

      {!loading && categories.length > 0 && (
        <p className="text-lg text-gray-500 mb-4">
          {categories.length} categories found
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {!loading &&
          categories.map((category: Category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onEdit={handleEditClick}
            />
          ))}
      </div>

      {!loading && categories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-lg text-gray-500 mb-4">No categories found</p>
          <Button onClick={handleAddClick}>Add first food category</Button>
        </div>
      )}

      <CategoryDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSave={handleSave}
        category={selectedCategory || undefined}
        title={selectedCategory ? "Edit Category" : "Add Category"}
      />
    </div>
  );
}
