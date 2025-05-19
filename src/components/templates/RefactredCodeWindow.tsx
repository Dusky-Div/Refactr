w;
const RefactredCodeWindow = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");

  return (
    <div className="flex flex-col h-fit self-center bg-[#111111] rounded-lg p-4 pt-0 m-3 w-2/5 border border-[#222222]">
      <div className="flex text-[#c9c9c9] py-4 font-medium text-lg">
        This is the refactored code
      </div>
      <div className="flex bg-[#1E1E1E] w-full h-96 rounded-lg">
        <Editor
          value={code}
          onChange={(value) => setCode(value || "")}
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
