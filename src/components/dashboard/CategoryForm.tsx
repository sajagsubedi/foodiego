import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategoryInput } from "@/schemas/categorySchema";
import { Category } from "@/types/foods";
import Image from "next/image";
import { Plus } from "lucide-react";

interface CategoryFormProps {
  defaultValues?: Partial<Category>;
  onSubmit: (data: CategoryInput) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({
  defaultValues,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name || "",
      slug: defaultValues?.slug || "",
      image: undefined,
    },
  });
  const [imageUrl, setImageUrl] = React.useState<string>(
    defaultValues?.image?.url || "/assets/banner.png"
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="avatar" className="leading-7 text-sm text-gray-600">
          Thumbnail
        </label>

        <div className="w-full flex justify-center ">
          <div className="bg-gray-50 rounded-full overflow-hidden w-24 h-24 relative">
            <Image
              src={imageUrl}
              width={200}
              height={200}
              alt={"thumbnail"}
              className="w-full h-full"
            />
            <div className="absolute w-full h-full top-0 right-0 flex justify-center items-center">
              <Plus className="text-white absolute" />
            </div>
            <div className="absolute w-full h-full top-0 right-0 flex justify-center items-center bg-gray-600 opacity-20"></div>
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
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Category Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          placeholder="Enter category name"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700"
        >
          Category Slug
        </label>
        <input
          id="slug"
          type="text"
          {...register("slug")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          placeholder="enter-slug-format"
        />
        {errors.slug && (
          <p className="text-sm text-red-500">{errors.slug.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white border-2 border-rose-600 transition-all transform hover:scale-105 outline-none py-2 px-5 font-bold rounded text-rose-500 flex items-center gap-2 max-w-max"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-rose-500 border-2 border-rose-500 transition-all transform hover:scale-105 outline-none py-2 px-5 font-bold rounded text-white flex items-center gap-2 max-w-max"
        >
          {isSubmitting ? "Saving..." : "Save Category"}
        </button>
      </div>
    </form>
  );
}
