"use client";

import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";

interface UserDropDownProps {
  userDropDown: boolean;
  user: User;
  changeUserDropDown: (value: boolean) => void;
}

const UserDropDown = ({
  userDropDown,
  changeUserDropDown,
  user,
}: UserDropDownProps) => {
  return (
    <div className="relative">
      <button
        type="button"
        className="flex text-sm rounded-full md:mr-0"
        onClick={() => changeUserDropDown(!userDropDown)}
      >
        <Image
          className="w-8 h-8 rounded-full"
          src="/assets/user.png"
          alt="user photo"
          width={32}
          height={32}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`z-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 top-5 max-w-[170px] overflow-hidden transition-all duration-300 ease-in-out ${
          !userDropDown ? "h-0" : "h-56"
        }`}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 truncate">
            {user.username}
          </span>
          <span className="block text-sm text-gray-500 truncate">
            {user.email}
          </span>
        </div>
        <ul className="py-2">
          <li>
            <Link
              href="/dashboard/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/notifications"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
            >
              Notifications
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
            >
              Settings
            </Link>
          </li>
          <li>
            <button className="block px-4 py-2 text-sm w-full text-start text-gray-700 hover:bg-gray-100 truncate">
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropDown;
