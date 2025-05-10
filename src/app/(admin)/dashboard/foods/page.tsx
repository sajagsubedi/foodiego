"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Loader from "@/components/shared/Loader";
import { Food, Category } from "@/types/foods";
import FoodTable from "@/components/dashboard/FoodTable";
import Button from "@/components/shared/Button";
import FoodModal from "@/components/dashboard/FoodModal";
import ViewFoodModal from "@/components/shared/ViewFoodModal";
import { FoodSchemaType } from "@/schemas/foodSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import DeleteModal from "@/components/shared/DeletedModal";

const FoodsPage = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Separate category extraction on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, []);

  // Fetch foods based on selectedCategory
  useEffect(() => {
    fetchFoods(selectedCategory);
  }, [selectedCategory]);

  // Always fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchFoods = async (category: string) => {
    setLoading(true);
    try {
      let url = "/api/admin/foods";
      if (category) url += `?category=${category}`;

      const response = await axios.get<ApiResponse>(url);
      if (response.data.success && Array.isArray(response.data.data)) {
        setFoods(response.data.data as Food[]);
      } else {
        toast.error(response.data.message || "Failed to load foods.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data?.message || "Error fetching foods."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get<ApiResponse>("/api/admin/categories");
      if (response.data.success && Array.isArray(response.data.data)) {
        setCategories(response.data.data as Category[]);
      } else {
        toast.error(response.data.message || "Failed to load categories.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data?.message || "Error fetching categories."
      );
    }
  };

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
    try {
      const response = await axios.delete(
        `/api/admin/foods/${selectedFood?._id}`
      );
      if (response.data.success) {
        const updatedFoods = foods.filter(
          (food) => food._id !== selectedFood?._id
        );
        setFoods(updatedFoods);
      } else {
        toast.error(response.data.message || "Failed to delete food.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data?.message || "Error deleting food!."
      );
    } finally {
      setIsDeleting(false);
      setDeleteModal(false);
      setSelectedFood(undefined);
    }
  };

  const cancelDeleteFood = () => {
    setDeleteModal(false);
    setSelectedFood(undefined);
  };

  const handleToggleVisibility = async (id: string, visibility: boolean) => {
    try {
      const updatedFoods = foods.map((food) =>
        food._id === id ? { ...food, visibility } : food
      );
      setFoods(updatedFoods);

      const formData = new FormData();
      formData.append("visibility", String(visibility));

      const response = await axios.put(`/api/admin/foods/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!response.data.success) {
        const updatedFoods = foods.map((food) =>
          food._id === id ? { ...food, visibility: !visibility } : food
        );
        setFoods(updatedFoods);
        toast.error(
          response.data.message || "Failed to update food visibility."
        );
      }
    } catch (error) {
      const updatedFoods = foods.map((food) =>
        food._id === id ? { ...food, visibility: !visibility } : food
      );
      setFoods(updatedFoods);
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data?.message || "Error changing visibility."
      );
    }
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
    try {
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

      let response;

      if (!selectedFood) {
        response = await axios.post<ApiResponse>("/api/admin/foods", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.put<ApiResponse>(
          `/api/admin/foods/${selectedFood._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      if (response.data.success) {
        toast.success(response.data.message);
        if (!selectedFood) {
          // Add new food to state
          setFoods((prev) => [...prev, response.data.data as Food]);
        } else {
          // Update existing food in state
          setFoods((prev) =>
            prev.map((food) =>
              food._id === selectedFood._id
                ? (response.data.data as Food)
                : food
            )
          );
        }
        closeFoodModal();
      } else {
        toast.error(response.data.message || "Error saving food.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "There was a problem saving the food. Please try again.";
      toast.error(errorMessage);
    }
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

      {loading ? (
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
