"use client";

import React, { useState } from "react";
import Loader from "@/components/shared/Loader";
import { User } from "@/types/user";
import UserTable from "@/components/dashboard//tables/UsersTable";
import { toast } from "react-toastify";
import DeleteModal from "@/components/shared/DeletedModal";
import { useAdminUsers } from "@/hooks/admin/useAdminUsers";

const UsersPage = () => {
  const { data: users = [], isLoading, deleteUser } = useAdminUsers();
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const handleEditUser = (user: User) => {
    console.log("Edit user", user);
  };

  const openDeleteModal = (user: User) => {
    setDeleteModal(true);
    setSelectedUser(user);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setIsDeleting(true);
    await deleteUser
      .mutateAsync(selectedUser._id)
      .then(() => toast.success("User deleted"))
      .catch((e: unknown) => toast.error(e instanceof Error ? e.message : "Delete failed"))
      .finally(() => {
        setIsDeleting(false);
        setDeleteModal(false);
        setSelectedUser(undefined);
      });
  };

  const cancelDeleteUser = () => {
    setDeleteModal(false);
    setSelectedUser(undefined);
  };

  const viewUser = (user: User) => {
    console.log("View User:", user);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-8xl">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold text-rose-500 text-left mx-10">
          USERS
        </h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg">
          <Loader />
        </div>
      ) : (
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDelete={openDeleteModal}
          onView={viewUser}
        />
      )}

      <DeleteModal
        isOpen={deleteModal}
        message="User"
        isDeleting={isDeleting}
        onConfirm={handleDeleteUser}
        onCancel={cancelDeleteUser}
      />
    </div>
  );
};

export default UsersPage;
