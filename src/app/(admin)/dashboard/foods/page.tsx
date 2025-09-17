"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Loader from "@/components/shared/Loader";
import { Food, Category } from "@/types/foods";
import FoodTable from "@/components/dashboard/tables/FoodTable";
import Button from "@/components/shared/Button";
import FoodModal from "@/components/dashboard/modals/FoodModal";
import ViewFoodModal from "@/components/shared/ViewFoodModal";
import { FoodSchemaType } from "@/schemas/foodSchema";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import DeleteModal from "@/components/shared/DeletedModal";
import { useAdminFoods } from "@/hooks/admin/useAdminFoods";
import { useAdminCategories } from "@/hooks/admin/useAdminCategories";

const FoodsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: foods = [], isLoading: foodsLoading, deleteFood, updateFood, createFood } = useAdminFoods(selectedCategory);
  const { data: categories = [], isLoading: categoriesLoading } = useAdminCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | undefined>();

  // Separate category extraction on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, []);


  const handleAddNewClick = () => {
    setSelectedFood(undefined);
    setIsModalOpen(true);
  };

  const handleEditFood = (food: Food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const openDeleteModal = (food: Food) => {
    setDeleteModal(true);
    setSelectedFood(food);
  };

  const handleDeleteFood = async () => {
    setIsDeleting(true);
    await deleteFood
      .mutateAsync(selectedFood?._id as string)
      .then(() => toast.success("Food deleted"))
      .catch((e: unknown) => toast.error(e instanceof Error ? e.message : "Delete failed"))
      .finally(() => {
        setIsDeleting(false);
        setDeleteModal(false);
        setSelectedFood(undefined);
      });
  };

  const cancelDeleteFood = () => {
    setDeleteModal(false);
    setSelectedFood(undefined);
  };

  const handleToggleVisibility = async (id: string, visibility: boolean) => {
    const formData = new FormData();
    formData.append("visibility", String(visibility));
    await updateFood
      .mutateAsync({ id, payload: formData })
      .then(() => toast.success("Visibility updated"))
      .catch((e: unknown) => toast.error(e instanceof Error ? e.message : "Update failed"));
  };

  const viewFood = (food: Food) => {
    setSelectedFood(food);
    setIsViewOpen(true);
  };

  const closeFoodModal = () => {
    setSelectedFood(undefined);
    setIsModalOpen(false);
  };

  const handleSubmitFood = async (values: FoodSchemaType) => {
      const {
        name,
        image,
        price,
        markedPrice,
        description,
        isFeatured,
        categorySlug,
        visibility,
      } = values;

      if (categorySlug == "_") {
        toast.error("Category is required");
        return;
      }

      const formData = new FormData();
      if (name) formData.append("name", name);
      if (price) formData.append("price", price);
      if (markedPrice) formData.append("markedPrice", markedPrice);
      if (description) formData.append("description", description);
      if (isFeatured != null) formData.append("isFeatured", String(isFeatured));
      if (visibility != null) formData.append("visibility", String(visibility));
      if (categorySlug) formData.append("categorySlug", categorySlug);
      if (image) formData.append("image", image);

      if (!selectedFood) {
        await createFood
          .mutateAsync(formData)
          .then((res) => toast.success(res.message || "Food created"))
          .catch((e: unknown) => toast.error(e instanceof Error ? e.message : "Create failed"));
      } else {
        await updateFood
          .mutateAsync({ id: selectedFood._id, payload: formData })
          .then((res) => toast.success(res.message || "Food updated"))
          .catch((e: unknown) => toast.error(e instanceof Error ? e.message : "Update failed"));
      }
      closeFoodModal();
  };

  const router = useRouter();
  const pathname = usePathname();
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category.slug);
    router.push(`?category=${category.slug}`);
  };

  const clearCategory = () => {
    setSelectedCategory("");
    router.replace(pathname, undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-8xl">
      <div className="flex  flex-col mb-8">
        <h1 className="text-3xl font-bold text-rose-500 text-left mx-10">
          FOODS
        </h1>
        <div className="w-full flex justify-between mt-5">
          <div className="relative min-w-24">
            <Button
              type="button"
              variant="outline"
              className="justify-between w-full"
              onClick={() => setCategoryDropdown((v) => !v)}
            >
              {categories.filter((cat) => cat.slug == selectedCategory)[0]
                ?.name || "All"}{" "}
              {categoryDropdown ? <ChevronUp /> : <ChevronDown />}
            </Button>

            {/* Dropdown Menu */}
            <div
              className={`z-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow absolute left-0 top-8 max-w-[170px] w-full overflow-hidden transition-all duration-300 ease-in-out ${
                !categoryDropdown ? "h-0" : "h-auto"
              }`}
            >
              <ul className="py-2 w-full">
                <li>
                  <button
                    onClick={clearCategory}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  >
                    All
                  </button>
                </li>
                {categories.map((val: Category, ind: number) => {
                  return (
                    <li key={ind}>
                      <button
                        onClick={() => handleCategoryChange(val)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      >
                        {val.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <Button
            onClick={handleAddNewClick}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Food
          </Button>
        </div>
      </div>

      {foodsLoading || categoriesLoading ? (
        <div className="flex items-center justify-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg">
          <Loader />
        </div>
      ) : (
        <FoodTable
          foods={foods}
          viewFood={viewFood}
          onEdit={handleEditFood}
          onDelete={openDeleteModal}
          onToggleVisibility={handleToggleVisibility}
        />
      )}

      <FoodModal
        isOpen={isModalOpen}
        onClose={closeFoodModal}
        onSubmit={handleSubmitFood}
        food={selectedFood}
        categories={categories}
      />

      <ViewFoodModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        food={selectedFood}
      />

      <DeleteModal
        isOpen={deleteModal}
        message="Food"
        isDeleting={isDeleting}
        onConfirm={handleDeleteFood}
        onCancel={cancelDeleteFood}
      />
    </div>
  );
};

export default FoodsPage;
