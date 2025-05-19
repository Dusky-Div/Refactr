import { Zap } from "lucide-react";
interface RefactrButtonProps {
  onClick: () => void;
}
const RefactrButton: React.FC<RefactrButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex w-fit h-fit self-center items-center gap-1 px-5 py-3 m-3 bg-[#fffff7] rounded-2xl"
      onClick={onClick}
    >
      <Zap />
      <p className="flex text-lg font-medium">Refactr</p>
    </button>
  );
};

export default RefactrButton;
