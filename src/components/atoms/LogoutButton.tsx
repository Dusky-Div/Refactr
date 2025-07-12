import { useAuth } from "../../authContext/AuthContext.tsx";
import { LogOut } from "lucide-react";
const LogoutButton = () => {
  const auth = useAuth();
  const logout = auth?.logout;
  const user = auth?.user;
  return (
    user && (
      <button
        onClick={logout}
        className="font-fustat items-center flex gap-2 px-4 py-2 w-fit self-center border-2 bg-[#ed7575] border-[#000] text-[#000] rounded-lg font-extrabold text-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:transition-all shadow-[2px_2px_0px_0px_#fff] transition-transform duration-300 ease-out"
      >
        <LogOut size="18" strokeWidth={2.6} />
        <p>Logout</p>
      </button>
    )
  );
};

export default LogoutButton;
