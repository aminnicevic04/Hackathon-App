"use client";
import Link from "next/link";
import Image from "next/image";
import { SidebarData } from "../../../constants/index";
import { useEffect, useState } from "react";
import { getUserAuthId } from "../../../lib/functions";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [sidebarClassName, setSidebarClassName] = useState("sidebar");
  const isAuthenticated = getUserAuthId();

  function exitSidebar() {
    setisMenuOpen(false);
  }

  function toggleSidebar() {
    setisMenuOpen((prevState) => !prevState);
  }

  function handleResize() {
    if (window.innerWidth > 1024) {
      setSidebarClassName("nav");
    } else {
      isMenuOpen
        ? setSidebarClassName("nav_open")
        : setSidebarClassName("nav_exit");
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="absolute z-30 visible lg:hidden"
      >
        Menu
      </button>
      <nav className={sidebarClassName}>
        <div>
          <div className="pb-3 border-b border-gray-700 text-center">
            <h2 className="text-xl text-white uppercase">Vision Electric UI</h2>
          </div>
          <ul className="mt-7 flex flex-col gap-3">
            {SidebarData.map(({ id, href, title, icon }) => {
              if (
                (isAuthenticated && id !== "s3" && id !== "s4") ||
                (!isAuthenticated && id !== "s2")
              ) {
                return (
                  <Link
                    href={href}
                    key={`link_${id}`}
                    className="flex items-center gap-3 rounded-xl p-3 hover:bg-[#1a1f37] transition"
                  >
                    <div className="p-[0.4em] rounded-xl bg-[#4318ff] flex justify-center items-center">
                      {icon}
                    </div>
                    <div>
                      <h2 className="text-white font-medium">{title}</h2>
                    </div>
                  </Link>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
        <div>
          <button
            className="my-3 p-3 w-full card text-white text-lg font-bold"
            onClick={signOut}
          >
            Logout
          </button>
          <div className="relative w-full h-60 rounded-xl">
            <Image
              fill
              objectFit="cover"
              src="/assets/images/sidebar_img.jpg"
              className="rounded-3xl"
              alt=""
            />
            <div className="absolute bottom-3 p-3">
              <p className="text-xl text-white font-medium">Need Help?</p>
              <p className="text-xs text-white font-medium">
                Please check our docs
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
