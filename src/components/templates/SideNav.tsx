import { Zap } from "lucide-react";
import SideNavAddButton from "../atoms/SideNavAddButton";
import SideNavSearchButton from "../atoms/SideNavSearchButton";
import SideNavList from "../molecules/SideNavList";
import LogoutButton from "../atoms/LogoutButton";

const SideNav = () => {
  return (
    <div className="relative flex flex-col w-64 h-full bg-[#000] border-r border-[#212121]">
      <div className="flex gap-1 text-white text-center justify-center py-8 font-semibold text-2xl">
        <button className="flex self-center">
          <Zap color="#ACD83A" fill="#ACD83A" />
        </button>
        <button className="font-fustat font-normal">Refactr</button>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <SideNavAddButton />
        <SideNavSearchButton />
      </div>
      <SideNavList />
      <LogoutButton />
    </div>
  );
};

export default SideNav;
