"use client";
import React, { useState } from "react";
import Link from "next/link";
import { X, Menu, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import UserDropDown from "./UserDropDown";
import CartModal from "./CartModal";
import { useSession } from "next-auth/react";

type NavLinkPropType = {
  route: string;
  children: React.ReactNode;
};

const NavLink = ({ route, children }: NavLinkPropType) => {
  const pathname = usePathname();
  return (
    <li className="text-black flex justify-start px-8 md:px-3 text-lg my-1 bg-gray-100 md:bg-transparent border-rose-600">
      <Link
        className={`hover:font-medium p-1 cursor-pointer box-border font-medium text-nowrap ${
          pathname !== route
            ? "text-gray-950 hover:text-rose-500"
            : "text-rose-500 hover:text-rose-700"
        }`}
        href={route}
      >
        {children}
      </Link>
    </li>
  );
};

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  const { data: session, status } = useSession();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const changeUserDropDown = (value: boolean) => {
    setUserDropDown(value);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };
  return (
    <nav className="bg-white flex items-center justify-between px-4 py-1 box-border gap-4 sticky top-0 h-20 z-[99] border-b-4 border-rose-500 md:px-[5vw]">
      <Link className="flex" href="/">
        <Image
          src="/logo.png"
          className="h-9 w-auto"
          alt="logo"
          width={3000}
          height={3000}
        />
      </Link>

      <div
        className={`md:w-[85%] lg:w-[70%] md:flex justify-between md:py-1 md:h-full items-center md:static md:flex-row overflow-hidden md:overflow-visible md:px-3 fixed z-[99] flex-col h-[100vh] transition-all duration-500 w-0 ${
          navActive ? "w-60" : ""
        } top-0 right-0 bg-gray-100 md:bg-transparent shadow-gray-300 shadow-3xl md:gap-4 gap-1 py-2`}
      >
        <ul className="md:w-[80%] flex flex-col justify-between md:flex-row gap-7 md:justify-center">
          <div className="w-full flex justify-end md:hidden">
            <button
              className="text-2xl p-3 text-gray-400"
              onClick={() => setNavActive(false)}
            >
              <X />
            </button>
          </div>
          <NavLink route="/">Home</NavLink>
          <NavLink route="/about">About</NavLink>
          <NavLink route="/menu">Menu</NavLink>
          <NavLink route="/orders">Orders</NavLink>
          <NavLink route="/contact">Contact Us</NavLink>
        </ul>

        {status == "unauthenticated" && (
          <div className="md:w-[20%] flex items-center w-full justify-center pr-2 gap-2 mt-10 md:mt-0">
            <Link
              href="/signin"
              className="bg-white border-rose-600 hover:bg-rose-100 transition-all transform hover:scale-105 shadow-sm border-2 outline-none py-2 px-5 font-bold rounded text-rose-600 flex items-center gap-2 max-w-max"
            >
              Signin
            </Link>
            <Link
              href="/signup"
              className="bg-rose-600 border-2 border-rose-600 transition-all transform hover:scale-105 outline-none py-2 px-5 font-bold rounded text-white flex items-center gap-2 max-w-max"
            >
              Signup
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button className="text-black bg-rose-200 rounded-full p-2 mr-1">
          <ShoppingCart onClick={openCart} />
        </button>

        {status == "authenticated" && (
          <UserDropDown
            userDropDown={userDropDown}
            changeUserDropDown={changeUserDropDown}
            user={session?.user}
          />
        )}
        <button
          className="text-2xl p-3 text-gray-400 md:hidden"
          onClick={() => setNavActive(true)}
        >
          <Menu />
        </button>
      </div>
      
      <CartModal cartState={isCartOpen} closeCart={closeCart} />
    </nav>
  );
}
