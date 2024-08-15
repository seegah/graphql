import { FiAlignJustify } from "react-icons/fi";
import { useGlobalContext } from "../context/globalState";

const Header = () => {
  const { setOpenSidebar, openSidebar } = useGlobalContext();

  return (
    <nav className="top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d] xl:hidden">
      <div className="relative flex mt-[3px] items-center justify-end gap-4 rounded-full bg-white px-2 py-2 shadow-xl dark:!bg-navy-800 dark:shadow-none xl:gap-2">
        <span
          onClick={() => setOpenSidebar(!openSidebar)}
          className="cursor-pointer text-xl text-gray-600 dark:text-white"
        >
          <FiAlignJustify className="h-5 w-5 text-[#FF9B05]" />
        </span>
      </div>
    </nav>
  );
};

export default Header;
