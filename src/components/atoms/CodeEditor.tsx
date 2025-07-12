import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  inputCode: string;
  setInputCode: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
}

const CodeEditor = ({
  inputCode,
  setInputCode,
  language,
  setLanguage,
}: CodeEditorProps) => {
  const languages = [
    "python",
    "javascript",
    "java",
    "cpp",
    "csharp",
    "html",
    "css",
    "typescript",
    "ruby",
    "go",
    "php",
    "swift",
    "kotlin",
    "rust",
    "sql",
  ];

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
  };

  const handleEditorDidMount = (editor: any) => {
    editor.onDidPaste(() => {
      editor.trigger("source", "editor.action.formatDocument", {});
    });
  };

  return (
    <div className="flex flex-col self-center bg-[#000] rounded-lg p-4 pt-0 mb-3 w-4/5 border border-[#222222]">
      <div className="flex justify-end items-center p-2 pr-0">
        <div className="w-28">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-[#111111] border border-[#2b2b2b] text-white rounded-lg px-1 py-1 w-full"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-96 overflow-auto border-[2px] border-[#ACD83A] rounded-lg">
        <Editor
          value={inputCode}
          onChange={(value) => setInputCode(value || "")}
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
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
