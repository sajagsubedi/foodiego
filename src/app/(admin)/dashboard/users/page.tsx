"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/shared/Loader";
import { User } from "@/types/user";
import UserTable from "@/components/dashboard/UsersTable";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "react-toastify";
import DeleteModal from "@/components/shared/DeletedModal";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/admin/users");
      if (response.data.success && Array.isArray(response.data.data)) {
        setUsers(response.data.data as User[]);
      } else {
        toast.error(response.data.message || "Failed to load users.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data?.message || "Error fetching users."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    console.log("Edit user", user);
  };

  const openDeleteModal = (user: User) => {
    setDeleteModal(true);
    setSelectedUser(user);
  };

  const handleDeleteUser = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `/api/admin/users/${selectedUser?._id}`
      );
      if (response.data.success) {
        const updatedUsers = users.filter(
          (user) => user._id !== selectedUser?._id
        );
        setUsers(updatedUsers);
      } else {
        toast.error(response.data.message || "Failed to delete user.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data?.message || "Error deleting user.");
    } finally {
      setIsDeleting(false);
      setDeleteModal(false);
      setSelectedUser(undefined);
    }
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

      {loading ? (
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
