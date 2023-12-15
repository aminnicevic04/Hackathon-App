"use client";
import Link from "next/link";
import Image from "next/image";
import { SidebarData } from "../../../constants/index";

const Sidebar = () => {
  return (
    <nav className="basis-[21em] flex flex-col justify-between h-screen gap-9 p-9 bg-transparent">
      <div>
        <div className="pb-3 border-b border-gray-700 text-center">
          <h2 className="text-xl text-white uppercase">Vision Electric UI</h2>
        </div>
        <ul className="mt-7 flex flex-col gap-3">
          {SidebarData.map(({ id, href, title, icon }) => (
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
          ))}
        </ul>
      </div>
      <div>
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
  );
};

export default Sidebar;
