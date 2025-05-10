import React from "react";
import { Category, Food } from "@/types/foods";
import { FoodSchemaType } from "@/schemas/foodSchema";
import { Dialog, DialogTitle, DialogContent } from "@/components/shared/Dailog";
import FoodModalForm from "@/components/dashboard/FoodModalForm";

interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FoodSchemaType) => Promise<void>;
  food?: Food;
  categories: Category[];
}

const FoodModal: React.FC<FoodModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
  food,
}) => {
  const isEditMode = !!food;
  const title = isEditMode ? "Edit Food Item" : "Add New Food Item";

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FoodModalForm
          food={food}
          categories={categories}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FoodModal;
