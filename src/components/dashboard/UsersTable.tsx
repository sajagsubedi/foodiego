import React from "react";
import { User } from "@/types/user";
import UserTableRow from "./UserTableRow";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onView: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onView,
  onDelete,
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
              Profile Picture
            </th>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Full Name
            </th>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Username
            </th>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Email
            </th>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Role
            </th>
            <th
              scope="col"
              className="py-3.5 px-6 text-left text-sm font-semibold text-gray-900"
            >
              Verified
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
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                No users found. Please add some users.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserTableRow
                key={user._id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
