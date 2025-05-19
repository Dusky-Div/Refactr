import { useNavigate } from "react-router";
import { useAuth } from "../../authContext/AuthContext.tsx";
const TopBar = ({ firstName }: { firstName: string }) => {
  const auth = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-fit px-6 py-4 bg-[#111111] text-white border-b border-[#2c2c2c]">
      <div className="flex justify-between items-center w-full">
        <p>Torimayikechodo.</p>
        {user ? (
          <div className="flex w-fit h-fit gap-2 items-center">
            <p>Hey there, {firstName}</p>
            <button className="flex w-8 h-8 rounded-full border border-1 bg-[#fff]"></button>
          </div>
        ) : (
          <div className="flex w-fit h-fit gap-2">
            <button
              className="flex h-fit w-fit px-2 py-1 border border-1 rounded-md bg-transparent text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="flex h-fit w-fit px-2 py-1 border border-1 rounded-md bg-transparent text-white"
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
