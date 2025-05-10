import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Food } from "@/types/foods";
import { formatDate, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Toggle from "@/components/shared/Toggle";

interface FoodTableRowProps {
  food: Food;
  onEdit: (food: Food) => void;
  viewFood: (food: Food) => void;
  onDelete: (food: Food) => void;
  onToggleVisibility: (id: string, visibility: boolean) => void;
}

const FoodTableRow: React.FC<FoodTableRowProps> = ({
  food,
  onEdit,
  onDelete,
  viewFood,
  onToggleVisibility,
}) => {
  const {
    _id,
    name,
    image,
    category,
    price,
    markedPrice,
    isFeatured,
    visibility,
    createdAt,
  } = food;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6">
        <div className="flex items-center">
          <Image
            src={image?.url}
            alt={name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-md object-cover mr-3"
          />
        </div>
      </td>
      <td className="py-4 px-6 font-medium text-gray-900">{name}</td>
      <td className="py-4 px-6 text-gray-600">
        {isFeatured && (
          <span className="text-xs bg-yellow-200 text-yellow-800 rounded-full px-1 mr-2">
            Featured
          </span>
        )}
        {category?.name || "Unknown Category"}
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">
            {formatCurrency(price)}
          </span>
          {markedPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(markedPrice)}
            </span>
          )}
        </div>
      </td>
      <td className="py-4 px-6">
        <Toggle
          checked={visibility}
          onChange={(checked) => onToggleVisibility(_id, checked)}
        />
      </td>
      <td className="py-4 px-6 text-gray-600">{formatDate(createdAt)}</td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(food)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </button>
          <button
            onClick={() => onDelete(food)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </button>
          <button
            className="text-green-500 hover:text-green-800"
            onClick={() => viewFood(food)}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default FoodTableRow;
