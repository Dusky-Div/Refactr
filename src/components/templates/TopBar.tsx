import { useNavigate } from "react-router";
import { useAuth } from "../../authContext/AuthContext.tsx";

import { IconBrandGithub } from "@tabler/icons-react";
const TopBar = ({ firstName }: { firstName: string }) => {
  const auth = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-fit px-6 py-4 bg-[#000] text-white border-b border-[#212121]">
      <div className="flex justify-between items-center w-full">
        <button className="flex rounded-full gap-2 px-4 py-2 border-2 border-[#ACD83A]">
          <div className="flex items-center" onClick={() => navigate("/")}>
            <IconBrandGithub />
          </div>
          <p className="font-fustat">Github</p>
        </button>
        {user ? (
          <div className="flex w-fit h-fit gap-2 items-center">
            <button className="flex w-8 h-8 items-center text-lg font-semibold justify-center rounded-full border bg-white text-black uppercase">
              {firstName?.charAt(0)}
            </button>
            <p className="font-fustat text-lg">
              {firstName.charAt(0).toUpperCase() + firstName.slice(1)}
            </p>
          </div>
        ) : (
          <div className="flex w-fit h-fit gap-3">
            <button
              className="flex h-fit w-fit px-4 py-2 rounded-lg font-bold text-sm bg-[#ACD83A] border-2 border-black text-black hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:transition-all shadow-[2px_2px_0px_0px_#fff] transition-transform duration-300 ease-out"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="flex h-fit w-fit px-4 py-2 rounded-lg font-bold text-sm bg-[#fff] border-2 border-black text-black hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:transition-all shadow-[2px_2px_0px_0px_#fff] transition-transform duration-300 ease-out"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
