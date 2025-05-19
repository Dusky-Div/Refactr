import CodeEditor from "../atoms/CodeEditor";
import RefactrButton from "../atoms/RefactrButton";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const MainArea = () => {
  const [inputCode, setInputCode] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [refactoredCode, setRefactoredCode] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("python");
  console.log(language, "is the selected language");

  const extractJSONFromGeminiResponse = (text: string) => {
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) return null;

    const possibleJSON = text.slice(jsonStart, jsonEnd + 1);

    try {
      return JSON.parse(possibleJSON);
    } catch (err) {
      console.error("JSON parse failed on:", possibleJSON);
      return null;
    }
  };

  useEffect(() => {
    console.log("Updated analysisResult:", analysisResult);
  }, [analysisResult]);

  useEffect(() => {
    console.log("Updated refactoredCode:", refactoredCode);
  }, [refactoredCode]);
  const GeminiRequestHandler = async () => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    const prompt = `
I have the following code written in:

\`\`\`
${inputCode}
\`\`\`

Please provide:
1. A detailed analysis of this code, including any shortcomings, vulnerabilities, performance issues, and areas for improvement.
2. A refactored version of this code that addresses all the issues identified in your analysis. 
   - IMPORTANT: Return the code as raw text.
   - DO NOT escape characters using \\n or \\".
   - DO NOT wrap the code inside triple backticks (no \`\`\`).
   - Just return the code block as a normal multi-line string, so that it can be rendered directly in a code editor.

Return your response in this exact JSON format:
{
  "analysis": "",
  "refactoredCode": ""
}
`;

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        method: "POST",
        data: {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
      });

      const responseText = response.data.candidates[0]?.content?.parts[0]?.text;

      try {
        const parsed = extractJSONFromGeminiResponse(responseText);
        if (!parsed) {
          setError("Could not extract valid JSON from Gemini response.");
          return;
        }

        setAnalysisResult(parsed.analysis || "");
        setRefactoredCode(parsed.refactoredCode?.trim() || "");
      } catch (jsonErr) {
        setError("Could not parse Gemini response.");
        console.error("Parsing error:", jsonErr);
      }
    } catch (err) {
      setError("Error fetching data from the API.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col overflow-auto w-full h-fit bg-[#0A0A0A]">
      <CodeEditor
        inputCode={inputCode}
        setInputCode={setInputCode}
        language={language}
        setLanguage={setLanguage}
      />
      <RefactrButton onClick={GeminiRequestHandler} />
      <div className="analysis-window w-full flex gap-4 items-center justify-center">
        <div className="flex flex-col h-fit self-center bg-[#111111] rounded-lg p-4 pt-0 m-3 w-2/5 border border-[#222222]">
          <div className="flex text-[#c9c9c9] font-medium text-lg whitespace-pre-wrap" />
          <p className="text-[#c9c9c9] py-4 font-medium text-lg">
            Analysis Results
          </p>
          <div
            className="bg-[#1E1E1E] py-3 px-4 w-full h-96 rounded-lg text-white overflow-auto whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: analysisResult
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\\n/g, "<br/>"),
            }}
          ></div>
        </div>
        <div className="refactred-code flex flex-col h-fit self-center bg-[#111111] rounded-lg p-4 pt-0 m-3 w-2/5 border border-[#222222]">
          <div className="flex text-[#c9c9c9] py-4 font-medium text-lg">
            This is the refactored code
          </div>
          <div className="flex bg-[#1E1E1E] w-full h-96 rounded-lg">
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
      </div>
    </div>
  );
};

export default MainArea;
