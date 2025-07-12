import Editor from "@monaco-editor/react";
import CopyButton from "../atoms/CopyButton";

interface RefactredCodeWindowProps {
  refactoredCode: string;
  setRefactoredCode: (value: string) => void;
  language: string;
}

const RefactredCodeWindow: React.FC<RefactredCodeWindowProps> = ({
  refactoredCode,
  setRefactoredCode,
  language,
}) => {
  return (
    <div className="refactred-code flex flex-col h-fit self-center bg-[#000] rounded-lg p-4 pt-0 m-3 w-4/5 border border-[#222222]">
      <div className="flex justify-between ">
        <div className="flex text-[#fff] font-fustat py-4 font-normal text-2xl">
          This is the refactored code
        </div>
        <CopyButton textToCopy={refactoredCode} />
      </div>

      <div className="flex bg-[#1E1E1E] border-[2px] border-[#ACD83A] w-full h-96 rounded-lg mb-4">
        <Editor
          value={refactoredCode}
          onChange={(value) => setRefactoredCode(value || "")}
          language={language}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
};

export default RefactredCodeWindow;
