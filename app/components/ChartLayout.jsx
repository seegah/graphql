"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../dashboard/page";

const CommonLayout = ({ children }) => {
  const pathName = usePathname();

  if (pathName === "/") return children;

  return (
    <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
      <Sidebar />
      <div className="h-full w-full font-dm dark:bg-navy-900">
        <main className="mx-2.5 flex-none transition-all dark:bg-navy-900 md:pr-2 xl:ml-[323px]">
          <div>
            <Header/>
            <div className="mx-auto min-h-screen p-2 !pt-[10px] md:p-2">
              {pathName === "/dashboard" ? <Dashboard /> : children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommonLayout;
