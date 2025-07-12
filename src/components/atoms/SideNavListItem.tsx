// import SideNavDropdownMenu from "../component-lib/SideNavDropDown";
const SideNavListItem = ({ Title }: any) => {
  return (
    <button className="relative group font-fustat flex flex-col gap-2 w-60 border-b border-[#5c5c5c] text-start justify-start text-sm font-normal text-[#e4e4e4] hover:text-white hover:bg-[#1d1d1d] p-3">
      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
        <span className="truncate-text">{Title}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-[#4776db] rounded-full"></div>
        <p className="text-xs font-medium text-[#bababa]">Python</p>
      </div>
    </button>
  );
};

export default SideNavListItem;
