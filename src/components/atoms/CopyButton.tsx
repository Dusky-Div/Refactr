import { useState } from "react";
import { Check, Copy } from "lucide-react";

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="relative flex items-center gap-2 px-3 py-1.5 h-fit w-fit self-center text-sm font-medium text-white bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg border border-[#ACD83A] transition-all duration-200 ease-in-out group"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-gray-300 group-hover:text-white transition" />
      )}
      <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>

      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {copied ? "Copied!" : "Copy to clipboard"}
      </span>
    </button>
  );
};

export default CopyButton;
