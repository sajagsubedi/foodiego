import React from "react";
import { Pencil, ExternalLink } from "lucide-react";
import { Category } from "@/types/foods";
import Image from "next/image";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
}

export function CategoryCard({ category, onEdit }: CategoryCardProps) {
  return (
    <div className="bg-white/50 rounded-lg p-4 text-center transition-all duration-200 hover:bg-white group">
      <div className="relative inline-block">
        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-rose-100 group-hover:border-rose-200 transition-colors duration-200">
          <Image
            src={category.image?.url}
            alt={category.name}
            width={160}
            height={160}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <button
          onClick={() => onEdit(category)}
          className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-white transition-all duration-200 hover:scale-110"
          aria-label={`Edit ${category.name}`}
        >
          <Pencil size={16} className="text-gray-700" />
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-medium text-lg text-gray-900">{category.name}</h3>
        <p className="text-sm text-gray-500 mt-1">Slug: {category.slug}</p>
        <a
          href={`/dashboard/foods?category=${category.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-rose-500 hover:text-rose-600 mt-2 transition-colors duration-200"
        >
          View Foods
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
