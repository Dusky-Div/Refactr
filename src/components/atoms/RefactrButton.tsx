import { Zap } from "lucide-react";
interface RefactrButtonProps {
  onClick: () => void;
}
const RefactrButton: React.FC<RefactrButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex w-fit h-fit self-center text-black items-center gap-1 px-5 py-3 m-3 bg-[#ACD83A] border-[3px] border-[#000] rounded-lg hover:shadow-none hover:translate-x-2 hover:translate-y-2 hover:transition-all shadow-[4px_4px_0px_0px_#fff] transition-transform duration-300 ease-out"
      onClick={onClick}
    >
      <Zap fill="black" />
      <p className="flex text-lg font-fustat font-semibold">Refactr</p>
    </button>
  );
};

export default RefactrButton;
