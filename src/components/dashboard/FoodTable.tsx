import React from "react";
import { Food } from "@/types/foods";
import FoodTableRow from "@/components/dashboard/FoodTableRow";

interface FoodTableProps {
  foods: Food[];
  onEdit: (food: Food) => void;
  viewFood: (food: Food) => void;
  onDelete: (food: Food) => void;
  onToggleVisibility: (id: string, isVisible: boolean) => void;
}

const FoodTable: React.FC<FoodTableProps> = ({
  foods,
  onEdit,
  viewFood,
  onDelete,
  onToggleVisibility,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Image
            </th>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Name
            </th>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Category
            </th>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Price
            </th>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Visibility
            </th>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Created Date
            </th>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {foods.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                No food items found. Please add some food items.
              </td>
            </tr>
          ) : (
            foods.map((food) => (
              <FoodTableRow
                key={food._id}
                food={food}
                viewFood={viewFood}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleVisibility={onToggleVisibility}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FoodTable;
