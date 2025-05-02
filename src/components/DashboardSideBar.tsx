"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UserDropDown from "./UserDropDown";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { UserRole } from "@/types/user";
import { User } from "next-auth";

const NavLinks = ({
  closeDropDown,
  user,
}: {
  closeDropDown: () => void;
  user: User;
}) => {
  const pathname = usePathname();
  const navlinks = [
    {
      text: "Dashboard",
      href: "/dashboard",
      role: [UserRole.ADMIN, UserRole.STAFF, UserRole.RIDER],
    },
    {
      text: "Orders",
      href: "/dashboard/orders",
      role: [UserRole.ADMIN, UserRole.STAFF],
    },
    {
      text: "My Tasks",
      href: "/dashboard/tasks",
      role: [UserRole.ADMIN, UserRole.STAFF],
    },
    { text: "Feed", href: "/dashboard/feed" },
    {
      text: "Calendar",
      href: "/dashboard/calendar",
      role: [UserRole.ADMIN, UserRole.STAFF],
    },
  ];
  return (
    <>
      {navlinks
        .filter((i) => i.role?.includes(user?.userRole))
        .map((item, i) => {
          return (
            <li key={i} onClick={closeDropDown}>
              <Link
                href={item.href}
                className={`block py-2 pl-3 pr-4 ${
                  pathname !== item.href
                    ? "text-gray-900 hover:bg-rose-300 hover:border-l-4 hover:border-rose-700"
                    : "text-gray-900 bg-rose-300 hover:bg-rose-500 hover:text-white border-l-4 border-rose-700"
                } `}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
    </>
  );
};

export default function DashboardSideBar() {
  const [userDropDown, setUserDropDown] = useState(false);
  const [navMenu, setNavMenu] = useState(false);

  const closeDropDown = () => {
    setNavMenu(false);
    setUserDropDown(false);
  };

  const changeUserDropDown = (value: boolean): void => {
    setUserDropDown(value);
  };

  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-sm shadow-gray-200 sticky top-0 z-50">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto py-3">
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  outline-none "
            onClick={() => setNavMenu(!navMenu)}
          >
            <Menu className="w-8 h-8" />
          </button>
          <div className="flex gap-3 px-3 items-center">
            <UserDropDown
              userDropDown={userDropDown}
              changeUserDropDown={changeUserDropDown}
              user={session?.user}
            />
          </div>
        </div>
        <div className="items-center justify-between flex w-full  relative  flex-col z-10">
          <div
            className={`absolute h-[100dvh] mt-3 left-0 overflow-hidden box-border transition-all duration-300  shadow-2xl ${
              navMenu ? "w-56" : "w-0"
            }`}
          >
            <ul
              className={`flex flex-col font-medium pt-8 backdrop-blur-md bg-rose-100 bg-opacity-50 h-full box-border gap-3`}
            >
              <NavLinks closeDropDown={closeDropDown} user={session?.user} />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
