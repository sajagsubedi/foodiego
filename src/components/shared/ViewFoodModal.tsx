import React from "react";
import { Food } from "@/types/foods";
import { Dialog, DialogTitle, DialogContent } from "@/components/shared/Dailog";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { X } from "lucide-react";

interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  food?: Food;
}

const ViewFoodModal: React.FC<FoodModalProps> = ({ isOpen, onClose, food }) => {
  if (!food) return null;

  const {
    name,
    description,
    price,
    markedPrice,
    category,
    image,
    isFeatured,
    visibility,
  } = food;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-gray-800">
            Food Details
          </span>
          <button onClick={onClose} aria-label="Close">
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <div className="space-y-4">
          {/* Food Image */}
          <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-100">
            <Image src={image?.url} alt={name} fill className="object-cover" />
          </div>

          {/* Name */}
          <div>
            <h3 className="text-sm text-gray-500">Name</h3>
            <p className="font-medium text-gray-900">{name}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm text-gray-500">Description</h3>
            <p className="text-gray-700">{description}</p>
          </div>

          {/* Price */}
          <div>
            <h3 className="text-sm text-gray-500">Price</h3>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">
                {formatCurrency(price)}
              </span>
              {markedPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrency(markedPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-sm text-gray-500">Category</h3>
            <p className="text-gray-700">{category?.name || "Unknown"}</p>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Visibility</span>
              <span
                className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  visibility
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {visibility ? "Visible" : "Hidden"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Featured</span>
              <span
                className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  isFeatured
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {isFeatured ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewFoodModal;
