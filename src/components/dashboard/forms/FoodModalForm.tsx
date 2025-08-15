import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Food } from "@/types/foods";
import { foodSchema, FoodSchemaType } from "@/schemas/foodSchema";
import Button from "@/components/shared/Button";
import { Eye, EyeClosed, Pin, PinOff, Plus } from "lucide-react";
import Image from "next/image";

interface FoodModalFormProps {
  food?: Food;
  categories: Category[];
  onSubmit: (values: FoodSchemaType) => Promise<void>;
  onClose: () => void;
}

const FoodModalForm: React.FC<FoodModalFormProps> = ({
  food,
  categories,
  onSubmit,
  onClose,
}) => {
  const isEditMode = !!food;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FoodSchemaType>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: food?.name || "",
      description: food?.description || "",
      price: food?.price ? String(food.price) : "",
      markedPrice: food?.markedPrice ? String(food.markedPrice) : "",
      categorySlug: food?.category?.slug || "_",
      image: undefined,
      visibility: food?.visibility ?? true,
      isFeatured: food?.isFeatured ?? false,
    },
  });

  const [visibility, setVisibility] = useState<boolean>(
    food?.visibility ?? true
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(
    food?.isFeatured ?? false
  );
  const [imageUrl, setImageUrl] = useState<string>(
    food?.image?.url || "/assets/banner.png"
  );

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
      }).then((preview) => setImageUrl(preview));
    }
  };

  const onFormSubmit = async (data: FoodSchemaType) => {
    try {
      await onSubmit({ ...data, visibility, isFeatured });
    } catch (error) {
      console.error("Error submitting food form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFeatured((prev) => !prev);
            setValue("isFeatured", !isFeatured);
          }}
          type="button"
        >
          {isFeatured ? (
            <Pin className="text-rose-500 h-5 w-5" />
          ) : (
            <PinOff className="text-rose-500 h-5 w-5" />
          )}
        </button>
      </div>
      {/* Image Upload */}
      <div>
        <label htmlFor="avatar" className="leading-7 text-sm text-gray-600">
          Thumbnail
        </label>
        <div className="w-full flex justify-center">
          <div className="bg-gray-50 rounded overflow-hidden w-auto h-24 relative">
            <Image
              src={imageUrl}
              width={200}
              height={200}
              alt="thumbnail"
              className="w-full h-full"
            />
            <div className="absolute w-full h-full top-0 right-0 flex justify-center items-center">
              <Plus className="text-white absolute" />
            </div>
            <div className="absolute w-full h-full top-0 right-0 bg-gray-600 opacity-20" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute z-[99] inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      {/* Food Name */}
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Food Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          placeholder="Enter food name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Food Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          placeholder="Enter food description"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Price & Marked Price */}
      <div className="flex gap-2">
        <div className="space-y-1 w-1/2">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            type="text"
            {...register("price")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Original Price"
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div className="space-y-1 w-1/2">
          <label
            htmlFor="markedPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Marked Price
          </label>
          <input
            id="markedPrice"
            type="text"
            {...register("markedPrice")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Marked Price"
          />
          {errors.markedPrice && (
            <p className="text-sm text-red-500">{errors.markedPrice.message}</p>
          )}
        </div>
      </div>

      {/* Category & Visibility */}
      <div className="flex gap-3">
        <div className="w-1/2">
          <label
            htmlFor="categorySlug"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="categorySlug"
            {...register("categorySlug")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="_">Select Category</option>
            {categories.map((category) => (
              <option value={category.slug} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categorySlug && (
            <p className="text-sm text-red-500">
              {errors.categorySlug.message}
            </p>
          )}
        </div>

        <div className="flex items-end justify-end w-1/2">
          <div className="items-center flex gap-2">
            <span className="text-sm font-medium text-gray-700">
              Visibility:
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setVisibility((val) => !val);
                setValue("visibility", !visibility);
              }}
              className={`p-2 rounded-full ${
                visibility
                  ? "bg-rose-100 text-rose-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {visibility ? <Eye size={20} /> : <EyeClosed size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEditMode ? "Update Food" : "Add Food"}
        </Button>
      </div>
    </form>
  );
};

export default FoodModalForm;
