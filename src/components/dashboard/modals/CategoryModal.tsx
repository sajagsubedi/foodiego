import React from "react";
import { CategoryForm } from "@/components/dashboard/forms/CategoryForm";
import { CategoryInput } from "@/schemas/categorySchema";
import { Category } from "@/types/foods";
import { Dialog, DialogContent, DialogTitle } from "@/components/shared/Dailog";

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CategoryInput) => Promise<void>;
  category?: Category;
  title: string;
}

export function CategoryDialog({
  open,
  onClose,
  onSave,
  category,
  title,
}: CategoryDialogProps) {
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <CategoryForm
          defaultValues={category}
          onSubmit={onSave}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
