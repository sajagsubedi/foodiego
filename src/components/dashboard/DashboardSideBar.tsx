"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UserDropDown from "@/components/shared/UserDropDown";
import { useSession } from "next-auth/react";
import { Layers, Menu, UserIcon, Utensils } from "lucide-react";
import { UserRole } from "@/types/user";
import { Home, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { User } from "next-auth";

const NavLinks = ({
  closeDropDown,
  user,
  navMenu,
}: {
  closeDropDown: () => void;
  user: User;
  navMenu: boolean;
}) => {
  const pathname = usePathname();
  const navlinks = [
    {
      text: "Dashboard",
      href: "/dashboard",
      icon: Home,
      role: [UserRole.ADMIN, UserRole.STAFF, UserRole.RIDER],
    },
    {
      text: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingBag,
      role: [UserRole.ADMIN, UserRole.STAFF],
    },
    {
      text: "Categories",
      href: "/dashboard/categories",
      role: [UserRole.ADMIN],
      icon: Layers,
    },
    {
      text: "Foods",
      href: "/dashboard/foods",
      role: [UserRole.ADMIN, UserRole.STAFF],
      icon: Utensils,
    },
    {
      text: "Users",
      href: "/dashboard/users",
      icon: UserIcon,
      role: [UserRole.ADMIN],
    },
  ];

  return (
    <>
      {navlinks
        .filter((i) => !i.role || i.role.includes(user?.userRole))
        .map(({ text, href, icon: Icon }, i) => (
          <li key={i} onClick={closeDropDown}>
            <Link
              href={href}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 ${
                pathname === href
                  ? "bg-rose-500 text-white"
                  : "hover:bg-rose-200 text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span
                className={`font-medium lg:block ${
                  navMenu ? "sm:block" : "sm:hidden"
                }`}
              >
                {text}
              </span>
            </Link>
          </li>
        ))}
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
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg outline-none  lg:invisible"
              onClick={() => setNavMenu(!navMenu)}
            >
              <Menu className="w-8 h-8" />
            </button>
            <Link className="flex" href="/">
              <Image
                src="/logo.png"
                className="h-9 w-auto"
                alt="logo"
                width={3000}
                height={3000}
              />
            </Link>
          </div>
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
            className={`absolute h-[100dvh] mt-3 left-0 overflow-hidden box-border transition-all duration-300 shadow-2xl ${
              navMenu ? "w-56" : "w-0 lg:w-56 sm:w-16"
            }`}
          >
            <ul
              className={`flex flex-col font-medium pt-8 backdrop-blur-md bg-rose-100 bg-opacity-50 h-full box-border gap-3 px-3`}
            >
              <NavLinks
                closeDropDown={closeDropDown}
                user={session?.user}
                navMenu={navMenu}
              />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
