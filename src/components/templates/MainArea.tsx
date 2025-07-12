import CodeEditor from "../atoms/CodeEditor";
import RefactrButton from "../atoms/RefactrButton";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ChevronUp } from "lucide-react";
import RefactredCodeWindow from "./RefactredCodeWindow";

const MainArea = () => {
  const [inputCode, setInputCode] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [refactoredCode, setRefactoredCode] = useState("");
  const [error, setError] = useState("");
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(true);
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
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        method: "POST",
        data: {
          contents: [
            {
              role: "user",
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
      } catch (jsonErr: any) {
        setError("Could not parse Gemini response.");
        console.error("Parsing error:", error, jsonErr);
      }
    } catch (err: any) {
      setError("Error fetching data from the API.");
      console.error("Gemini error response:", err?.response?.data);
    }
  };

  return (
    <div className="flex flex-col overflow-auto w-full h-fit bg-[#000]">
      <div className="flex flex-col w-full h-fit my-20 gap-2 items-center justify-center">
        <p
          className="font-fustat font-bold text-5xl bg-gradient-to-r from-[#ACD83A] to-[#76a301]
 bg-clip-text text-transparent"
        >
          Refactr
        </p>
        <p className="text-white font-fustat font-light text-3xl text-center">
          Choose the language. Drop the Code.
          <br />
          <span className="text-xl">
            Get your code reviewed and refactored in seconds.
          </span>
        </p>
        {/* <div
          className={
            "flex self-center rounded-full w-3/4 mt-20 min-h-[1px] bg-gradient-to-r from-transparent via-[#fff] to-transparent "
          }
        ></div> */}
      </div>

      <CodeEditor
        inputCode={inputCode}
        setInputCode={setInputCode}
        language={language}
        setLanguage={setLanguage}
      />
      <RefactrButton onClick={GeminiRequestHandler} />
      <div className="analysis-window w-full flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col h-fit self-center bg-[#000] rounded-lg px-4 m-3 w-4/5 border border-[#222222]">
          <div className="flex text-[#c9c9c9] font-medium text-lg whitespace-pre-wrap" />
          <div className="flex justify-between items-center w-full">
            <p className="text-[#fff] py-4 font-fustat font-normal text-2xl">
              Analysis Results
            </p>
            <button
              className="bg-[#ACD83A] w-fit h-fit rounded-full p-1"
              onClick={() => setIsAnalysisExpanded((prev) => !prev)}
            >
              <ChevronUp
                size={24}
                strokeWidth={2.2}
                className={`transition-transform duration-180 ${
                  !isAnalysisExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {isAnalysisExpanded && (
            <div
              className="bg-[#1E1E1E] border-[2px] font-fustat border-[#ACD83A] py-3 px-4 mb-4 w-full h-96 rounded-lg text-white overflow-auto whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: analysisResult
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\\n/g, "<br/>"),
              }}
            ></div>
          )}
        </div>
        <RefactredCodeWindow
          refactoredCode={refactoredCode}
          setRefactoredCode={setRefactoredCode}
          language={language}
        />
      </div>
    </div>
  );
};

export default MainArea;
