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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
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
    try {
      const response = await fetch("/api/admin/categories/");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-transparent">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-rose-500">CATEGORIES</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-1.5 bg-rose-600 border-2 border-rose-600 transition-all transform hover:scale-105 outline-none py-2 px-5 font-bold rounded text-white max-w-max"
        >
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {categories.map((category: Category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onEdit={handleEditClick}
          />
        ))}
      </div>

      {categories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-lg text-gray-500 mb-4">No categories found</p>
          <button
            onClick={handleAddClick}
            className="bg-rose-500 border-2 border-rose-500 transition-all transform hover:scale-105 outline-none py-2 px-5 font-bold rounded text-white flex items-center gap-2 max-w-max"
          >
            Add first food category
          </button>
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
