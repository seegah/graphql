import { useGlobalContext } from "../context/globalState";

const Header = () => {
  const { User } = useGlobalContext();

  return (
    <nav className="top-2 z-20 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="flex justify-center items-center p-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">Welcome</h1>
          {User && User[0] && (
            <p className="text-2xl text-primary max-w-4xl rounded-xl p-3 text-ellipsis">
              {User[0].firstName} {User[0].lastName}
            </p>
          )}
          <span className="text-4xl wave">👋</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
