import SideNavListItem from "../atoms/SideNavListItem";
import { ScrollArea } from "../component-lib/ScrollArea";

const SideNavList = () => {
  return (
    <ScrollArea className="flex flex-col h-4/6 my-4 px-2">
      <SideNavListItem Title={"Firebase authentication setup"} />
      <SideNavListItem Title={"Python script to read a file"} />
      <SideNavListItem Title={"Basic Flask API example"} />
      <SideNavListItem Title={"AsyncIO in Python basics"} />
      <SideNavListItem Title={"How to use Python decorators"} />
      <SideNavListItem Title={"Python list comprehensions"} />
      <SideNavListItem Title={"Handling exceptions in Python"} />
      <SideNavListItem Title={"Django models and migrations"} />
      <SideNavListItem Title={"Python regex examples"} />
      <SideNavListItem Title={"Setting up a virtual environment"} />
      <SideNavListItem Title={"How to use `requests` module in Python"} />
      <SideNavListItem Title={"List slicing in Python"} />
      <SideNavListItem Title={"Understanding Python generators"} />
      <SideNavListItem Title={"Python dictionary operations"} />
      <SideNavListItem Title={"Python for data analysis with pandas"} />
    </ScrollArea>
  );
};

export default SideNavList;
