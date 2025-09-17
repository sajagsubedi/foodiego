"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { CategoryCard } from "@/components/dashboard/cards/CategoryCard";
import { Category } from "@/types/foods";
import { CategoryDialog } from "@/components/dashboard/modals/CategoryModal";
import { CategoryInput } from "@/schemas/categorySchema";
import { toast } from "react-toastify";
import Loader from "@/components/shared/Loader";
import Button from "@/components/shared/Button";
import { useAdminCategories } from "@/hooks/admin/useAdminCategories";

export default function CategoriesPage() {
  const { data: categories = [], isLoading, createCategory, updateCategory } = useAdminCategories();
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
    const { name, slug, image } = category;
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (slug) formData.append("slug", slug);
    if (image) formData.append("image", image);

    if (!selectedCategory) {
      await createCategory.mutateAsync(formData)
        .then((res) => {
          toast.success(res.message || "Category created");
          closeDialog();
        })
        .catch((e: unknown) => {
          const message = e instanceof Error ? e.message : "Create failed";
          toast.error(message);
        });
    } else {
      await updateCategory.mutateAsync({ id: selectedCategory._id, payload: formData })
        .then((res) => {
          toast.success(res.message || "Category updated");
          closeDialog();
        })
        .catch((e: unknown) => {
          const message = e instanceof Error ? e.message : "Update failed";
          toast.error(message);
        });
    }
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-transparent">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-rose-500">CATEGORIES</h1>
        <Button onClick={handleAddClick}>
          <Plus size={18} />
          <span>Add Category</span>
        </Button>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg">
          <Loader />
        </div>
      )}

      {!isLoading && categories.length > 0 && (
        <p className="text-lg text-gray-500 mb-4">
          {categories.length} categories found
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {!isLoading &&
          categories.map((category: Category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onEdit={handleEditClick}
            />
          ))}
      </div>

      {!isLoading && categories.length === 0 && (
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
