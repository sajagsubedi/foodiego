import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { User } from "@/types/user";
import Image from "next/image";

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onView: (user: User) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onEdit,
  onDelete,
  onView,
}) => {
  const { fullName, username, email, userRole, isVerified, profilePicture } =
    user;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6">
        <div className="flex items-center">
          <Image
            src={profilePicture?.url}
            alt={fullName}
            width={48}
            height={48}
            className="w-12 h-12 rounded-md object-cover mr-3"
          />
        </div>
      </td>
      <td className="py-4 px-6 font-medium text-gray-900">{fullName}</td>
      <td className="py-4 px-6 text-gray-600">{username}</td>
      <td className="py-4 px-6 text-gray-600">{email}</td>
      <td className="py-4 px-6 text-gray-600">{userRole}</td>
      <td className="py-4 px-6 text-gray-600">
        {isVerified ? (
          <span className="text-green-500">Verified</span>
        ) : (
          <span className="text-red-500">Not Verified</span>
        )}
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(user)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </button>
          <button
            onClick={() => onDelete(user)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </button>
          <button
            className="text-green-500 hover:text-green-800"
            onClick={() => onView(user)}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};
export default UserTableRow;
