"use client";

import { useGlobalContext } from "../context/globalState";
import { useRouter } from "next/navigation";
import { Avatar } from "antd";
import { LogoutOutlined, CloseOutlined } from "@ant-design/icons";
import { getUserRank } from "../utils";
import Skills from "./Skills";
import Loading from "./Loading";

const Sidebar = () => {
  const { openSidebar, setOpenSidebar, User, loading } = useGlobalContext();
  const router = useRouter();

  if (loading) return <Loading />;
  if (!User || User.length === 0) return <div>No data available</div>;

  const { events, auditRatio, attrs } = User[0];
  const level = events?.[0]?.level || 0;
  const userRank = getUserRank(level);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div
      className={`sm:none duration-200 fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 
  ${openSidebar ? "translate-x-0" : "-translate-x-96 xl:translate-x-0"}
  `}
    >
      <span
        onClick={() => setOpenSidebar(false)}
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
      >
        <CloseOutlined className="w-5 h-5 text-[#FF9B05]" />
      </span>
      <div className="flex flex-col items-center bg-white p-3 rounded-2xl text-black">
        <div className="mx-[45px] mt-[5px] flex items-center">
          <div className="ml-1 mt-1.5 font-semibold text-navy-700 dark:text-black">
            <h1 className="truncate max-w-[170px]">
              {User && User[0] && `${User[0].firstName} ${User[0].lastName}`}
              <span className="text-sm"> &#128075;</span>
            </h1>
          </div>
        </div>
        <div className="mx-[42px] mt-2 flex flex-col items-center">
          {attrs?.gender === "Masculin" ? (
            <Avatar size={100} src="/man.svg" />
          ) : (
            <Avatar size={100} src="/female.svg" />
          )}
          <div className="font-light text-sm mt-2">{userRank}</div>
          <div className="text-sm mt-1.5">
            <strong className="font-bold">Ratio:</strong>{" "}
            {auditRatio.toFixed(1)}
          </div>
        </div>
        <Skills />
        <button
          onClick={logout}
          className="btn bg-[#FF9B05] text-primary p-2 rounded-2xl px-5 mt-1.5"
        >
          <LogoutOutlined className="mr-2" />
          logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
