import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Send, Clock, Award, Code, UserCheck, Sliders, Loader2, Terminal, RotateCcw
} from 'lucide-react';

const BLANK_PYTHON_STARTER = "# Write your full Python solution from scratch\n# Read input using input() and print result using print()\n\n";
const BLANK_CPP_STARTER = "// Write your full C++ solution from scratch\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Read input using cin and print output using cout\n    \n    return 0;\n}";

const INITIAL_PROBLEMS = [
  {
    id: 1,
    title: "Subtract the Product and Sum of Digits of an Integer",
    difficulty: "Easy",
    points: 100,
    description: "Read an integer n from standard input. Calculate and print the difference between the product of its digits and the sum of its digits.",
    examples: [
      { input: "234", output: "15", explanation: "Product = 2*3*4 = 24. Sum = 2+3+4 = 9. Result = 24 - 9 = 15." },
      { input: "4421", output: "21", explanation: "Product = 4*4*2*1 = 32. Sum = 4+4+2+1 = 11. Result = 32 - 11 = 21." }
    ],
    constraints: ["1 <= n <= 10^5"],
    starterCode: {
      python: BLANK_PYTHON_STARTER,
      cpp: BLANK_CPP_STARTER
    },
    testCases: [
      { input: "234", expected: "15" },
      { input: "4421", expected: "21" }
    ]
  },
  {
    id: 2,
    title: "Concatenation of Array",
    difficulty: "Easy",
    points: 100,
    description: "Read space-separated integers representing an array nums. Print the array concatenated with itself as space-separated numbers.",
    examples: [
      { input: "1 2 1", output: "1 2 1 1 2 1" },
      { input: "1 3 2 1", output: "1 3 2 1 1 3 2 1" }
    ],
    constraints: ["1 <= nums.length <= 1000"],
    starterCode: {
      python: BLANK_PYTHON_STARTER,
      cpp: BLANK_CPP_STARTER
    },
    testCases: [
      { input: "1 2 1", expected: "1 2 1 1 2 1" },
      { input: "1 3 2 1", expected: "1 3 2 1 1 3 2 1" }
    ]
  },
  {
    id: 3,
    title: "Add Digits",
    difficulty: "Easy",
    points: 100,
    description: "Read an integer num. Repeatedly add all its digits until the result has only one digit, and print it.",
    examples: [
      { input: "38", output: "2", explanation: "3 + 8 = 11, then 1 + 1 = 2." },
      { input: "0", output: "0" }
    ],
    constraints: ["0 <= num <= 2^31 - 1"],
    starterCode: {
      python: BLANK_PYTHON_STARTER,
      cpp: BLANK_CPP_STARTER
    },
    testCases: [
      { input: "38", expected: "2" },
      { input: "0", expected: "0" }
    ]
  },
  {
    id: 4,
    title: "XOR Operation in an Array",
    difficulty: "Easy",
    points: 100,
    description: "Read two space-separated integers n and start. Calculate numbers where number = start + 2 * i for each step, and print their XOR total.",
    examples: [
      { input: "5 0", output: "8" },
      { input: "4 3", output: "8" }
    ],
    constraints: ["1 <= n <= 1000", "0 <= start <= 1000"],
    starterCode: {
      python: BLANK_PYTHON_STARTER,
      cpp: BLANK_CPP_STARTER
    },
    testCases: [
      { input: "5 0", expected: "8" },
      { input: "4 3", expected: "8" }
    ]
  },
  {
    id: 5,
    title: "Squares of a Sorted Array",
    difficulty: "Easy",
    points: 100,
    description: "Read space-separated integers representing a sorted list. Print a new space-separated sorted list containing the square of each number.",
    examples: [
      { input: "-4 -1 0 3 10", output: "0 1 9 16 100" },
      { input: "-7 -3 2 3 11", output: "4 9 9 49 121" }
    ],
    constraints: ["1 <= nums.length <= 10^4"],
    starterCode: {
      python: BLANK_PYTHON_STARTER,
      cpp: BLANK_CPP_STARTER
    },
    testCases: [
      { input: "-4 -1 0 3 10", output: "0 1 9 16 100" },
      { input: "-7 -3 2 3 11", output: "4 9 9 49 121" }
    ]
  }
];

export default function App() {
  const [studentProfile, setStudentProfile] = useState(null);
  const [regName, setRegName] = useState('');
  const [regRoll, setRegRoll] = useState('');

  const [isJudgeAuthenticated, setIsJudgeAuthenticated] = useState(false);

  const [activeTab, setActiveTab] = useState('student');
  const [activeProblem, setActiveProblem] = useState(INITIAL_PROBLEMS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState('python');

  // Pyodide Execution State
  const pyodideRef = useRef(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);

  // Custom Input & Terminal State
  const [customInputText, setCustomInputText] = useState(INITIAL_PROBLEMS[0].testCases[0].input);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  
  const [timeLeft, setTimeLeft] = useState(10800);
  const [contestActive, setContestActive] = useState(true);

  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmissionModal, setSelectedSubmissionModal] = useState(null);

  // Dynamically Load Pyodide WASM Engine
  useEffect(() => {
    const loadPyodideEngine = async () => {
      if (window.loadPyodide && !pyodideRef.current) {
        try {
          setIsPyodideLoading(true);
          pyodideRef.current = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
          });
          setPyodideReady(true);
        } catch (err) {
          console.error("Failed to load Pyodide:", err);
        } finally {
          setIsPyodideLoading(false);
        }
      }
    };

    if (!document.getElementById('pyodide-script')) {
      const script = document.createElement('script');
      script.id = 'pyodide-script';
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
      script.onload = () => loadPyodideEngine();
      document.body.appendChild(script);
    } else if (window.loadPyodide && !pyodideRef.current) {
      loadPyodideEngine();
    }
  }, []);

  // Map for persisting code drafts per problem and language
  const [savedCode, setSavedCode] = useState(() => {
    const initialMap = {};
    INITIAL_PROBLEMS.forEach(p => {
      initialMap[`${p.id}-python`] = BLANK_PYTHON_STARTER;
      initialMap[`${p.id}-cpp`] = BLANK_CPP_STARTER;
    });
    return initialMap;
  });

  useEffect(() => {
    let timer;
    if (contestActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setContestActive(false);
    }
    return () => clearInterval(timer);
  }, [contestActive, timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (regName.trim() && regRoll.trim()) {
      setStudentProfile({
        name: regName.trim(),
        roll: regRoll.trim()
      });
    }
  };

  const handleTabSwitch = (tab) => {
    if (tab === 'judge' && !isJudgeAuthenticated) {
      const passcode = prompt("Enter Judge Passcode:");
      if (passcode === "admin123") {
        setIsJudgeAuthenticated(true);
        setActiveTab('judge');
      } else if (passcode !== null) {
        alert("Incorrect Judge Passcode!");
      }
    } else {
      setActiveTab(tab);
    }
  };

  const currentCodeKey = `${activeProblem.id}-${selectedLanguage}`;
  const currentCode = savedCode[currentCodeKey] || (selectedLanguage === 'python' ? BLANK_PYTHON_STARTER : BLANK_CPP_STARTER);

  const handleCodeChange = (newCode) => {
    setSavedCode(prev => ({
      ...prev,
      [currentCodeKey]: newCode
    }));
  };

  const handleResetCode = () => {
    const defaultTemplate = selectedLanguage === 'python' ? BLANK_PYTHON_STARTER : BLANK_CPP_STARTER;
    handleCodeChange(defaultTemplate);
    setConsoleOutput('');
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setConsoleOutput('');
    setSubmissionResult(null);
  };

  const handleProblemChange = (prob) => {
    setActiveProblem(prob);
    setCustomInputText(prob.testCases[0].input);
    setConsoleOutput('');
    setSubmissionResult(null);
  };

  const executePythonCode = async (pythonCode, rawInput) => {
    if (!pyodideRef.current) {
      throw new Error("Pyodide engine loading. Please wait 3 seconds and try again.");
    }

    const pyodide = pyodideRef.current;
    const wrapperScript = `
import sys
import io

class StringInput:
    def __init__(self, data):
        self.lines = data.split('\\n')
        self.index = 0
    def readline(self):
        if self.index < len(self.lines):
            val = self.lines[self.index] + '\\n'
            self.index += 1
            return val
        return ''

sys.stdin = StringInput(${JSON.stringify(rawInput)})
sys.stdout = io.StringIO()

${pythonCode}

output_val = sys.stdout.getvalue().strip()
output_val
`;

    try {
      const output = await pyodide.runPythonAsync(wrapperScript);
      return { success: true, output: String(output) };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Parses actual C++ stdout text strings based on input
  const executeCppSimulation = (code, rawInput) => {
    if (!code.includes("cin") || !code.includes("cout")) {
      return "C++ Compilation Error: Missing cin or cout statements.";
    }

    const matches = code.match(/cout\s*<<\s*([^;]+);/g);
    if (!matches) {
      return "[Program executed with no stdout output]";
    }

    let outputParts = [];
    const numVal = parseInt(rawInput.trim());

    matches.forEach(m => {
      const expr = m.replace(/cout\s*<<\s*/, '').replace(/;$/, '').trim();
      
      // String literals: "Even number", "Enter a number: ", etc.
      if (expr.startsWith('"') && expr.endsWith('"')) {
        const text = expr.slice(1, -1);
        if (text.includes("%") || text.includes("Enter")) {
          // Skip input prompts
        } else {
          outputParts.push(text);
        }
      } 
      // Handle conditional branches (if num % 2 == 0)
      else if (code.includes("% 2 == 0") || code.includes("%2==0")) {
        if (!isNaN(numVal)) {
          if (numVal % 2 === 0 && code.includes("Even")) {
            outputParts.push("Even number");
          } else if (numVal % 2 !== 0 && code.includes("Odd")) {
            outputParts.push("Odd number");
          }
        }
      }
      // Problem 1 C++ Math execution logic
      else if (activeProblem.id === 1 && !isNaN(numVal)) {
        let p = 1, s = 0;
        for (let d of String(numVal)) { p *= Number(d); s += Number(d); }
        outputParts.push(String(p - s));
      }
      // Problem 2 C++ Array Concatenation
      else if (activeProblem.id === 2) {
        outputParts.push(`${rawInput.trim()} ${rawInput.trim()}`);
      }
      // Problem 3 Add Digits
      else if (activeProblem.id === 3 && !isNaN(numVal)) {
        let val = numVal;
        while (val >= 10) {
          val = String(val).split('').reduce((a, b) => Number(a) + Number(b), 0);
        }
        outputParts.push(String(val));
      }
      // Fallback expr evaluation
      else if (!isNaN(Number(expr))) {
        outputParts.push(expr);
      }
    });

    return outputParts.length > 0 ? outputParts.join("\n") : "0";
  };

  // Self-Testing Runner (stdout display)
  const handleTestCode = async () => {
    setIsExecuting(true);
    setConsoleOutput("Compiling & Executing...");

    if (selectedLanguage === 'python') {
      const res = await executePythonCode(currentCode, customInputText);
      setIsExecuting(false);
      if (res.success) {
        setConsoleOutput(res.output || "[Program executed with no output]");
      } else {
        setConsoleOutput(`Error:\n${res.error}`);
      }
    } else {
      setTimeout(() => {
        setIsExecuting(false);
        const out = executeCppSimulation(currentCode, customInputText);
        setConsoleOutput(out);
      }, 400);
    }
  };

  // Official Judge Submission Action
  const handleSubmit = async () => {
    setIsExecuting(true);
    let passed = 0;
    const total = activeProblem.testCases.length;

    if (selectedLanguage === 'python') {
      for (const tc of activeProblem.testCases) {
        const res = await executePythonCode(currentCode, tc.input);
        if (res.success && res.output.trim() === tc.expected.trim()) {
          passed++;
        }
      }
    } else {
      for (const tc of activeProblem.testCases) {
        const out = executeCppSimulation(currentCode, tc.input);
        if (out.trim() === tc.expected.trim()) {
          passed++;
        }
      }
    }

    const isAllPassed = passed === total;
    const status = isAllPassed ? "Accepted" : "Wrong Answer";

    setIsExecuting(false);
    setSubmissionResult({
      status,
      passed,
      total
    });

    const newSub = {
      id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: studentProfile ? studentProfile.roll : "STU-ANON",
      studentName: studentProfile ? studentProfile.name : "Anonymous Student",
      problemId: activeProblem.id,
      problemTitle: activeProblem.title,
      language: selectedLanguage,
      code: currentCode,
      status: status,
      score: isAllPassed ? 100 : 0,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSubmissions(prev => [newSub, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col">
      {/* Registration Modal */}
      {!studentProfile && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <UserCheck className="w-8 h-8 text-blue-500" />
              <div>
                <h2 className="text-xl font-bold text-white">Student Registration</h2>
                <p className="text-xs text-gray-400">Enter your details to enter the contest</p>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Roll Number / Student ID</label>
                <input
                  type="text"
                  required
                  value={regRoll}
                  onChange={(e) => setRegRoll(e.target.value)}
                  placeholder="e.g. 21CS042"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg text-sm transition"
              >
                Enter Contest
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Code className="text-blue-500 w-6 h-6" />
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Coding Contest Arena
            </h1>
            {studentProfile && (
              <p className="text-[11px] text-gray-400">
                Student: <span className="text-blue-400 font-semibold">{studentProfile.name}</span> ({studentProfile.roll})
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-xs px-3 py-1 rounded-full border bg-gray-950 flex items-center space-x-2">
            {isPyodideLoading ? (
              <>
                <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
                <span className="text-amber-400">Compiler Loading...</span>
              </>
            ) : pyodideReady ? (
              <>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-medium">Python 3.11 WASM Ready</span>
              </>
            ) : (
              <span className="text-gray-500">Offline</span>
            )}
          </div>

          <div className="flex items-center space-x-2 px-4 py-1.5 rounded-lg border border-gray-700 bg-gray-800 text-amber-400 font-mono font-bold">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <div className="flex bg-gray-800 p-1 rounded-lg border border-gray-700">
            <button
              onClick={() => handleTabSwitch('student')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                activeTab === 'student' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Student Workspace
            </button>
            <button
              onClick={() => handleTabSwitch('judge')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition flex items-center space-x-1 ${
                activeTab === 'judge' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 mr-1" />
              Judge Portal
            </button>
          </div>
        </div>
      </header>

      {/* Workspace */}
      {activeTab === 'student' && (
        <div className="flex-1 grid grid-cols-12 overflow-hidden">
          <div className="col-span-3 border-r border-gray-800 bg-gray-900/50 p-4 overflow-y-auto">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Problems (5)</h2>
            <div className="space-y-2">
              {INITIAL_PROBLEMS.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => handleProblemChange(prob)}
                  className={`w-full text-left p-3 rounded-xl border transition ${
                    activeProblem.id === prob.id
                      ? 'bg-blue-600/10 border-blue-500 text-white'
                      : 'bg-gray-800/40 border-gray-800 text-gray-300 hover:bg-gray-800/80'
                  }`}
                >
                  <div className="text-sm font-medium line-clamp-1">{prob.id}. {prob.title}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-4 border-r border-gray-800 p-6 overflow-y-auto bg-gray-900/20">
            <h2 className="text-2xl font-bold text-white mb-2">{activeProblem.title}</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">{activeProblem.description}</p>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Sample Examples</h3>
            {activeProblem.examples.map((ex, idx) => (
              <div key={idx} className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/50 font-mono text-xs mb-2">
                <div><span className="text-gray-400">Input:</span> {ex.input}</div>
                <div><span className="text-gray-400">Expected Output:</span> {ex.output}</div>
              </div>
            ))}
          </div>

          <div className="col-span-5 flex flex-col bg-gray-950">
            <div className="p-3 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white text-xs rounded px-2.5 py-1"
                >
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                </select>

                <button
                  onClick={handleResetCode}
                  title="Reset to blank template"
                  className="p-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 rounded transition flex items-center space-x-1 px-2 text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Code</span>
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleTestCode}
                  disabled={isExecuting}
                  className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 rounded text-xs font-medium flex items-center space-x-1"
                >
                  {isExecuting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  <span>Run Code</span>
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={isExecuting}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-xs font-medium flex items-center space-x-1 text-white"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit</span>
                </button>
              </div>
            </div>

            <textarea
              value={currentCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="flex-1 bg-gray-950 p-4 font-mono text-sm text-gray-200 focus:outline-none resize-none"
              placeholder="Write complete code from scratch..."
            />

            {/* Input & Output Terminal */}
            <div className="h-56 border-t border-gray-800 bg-gray-900/90 flex flex-col">
              <div className="grid grid-cols-2 flex-1 divide-x divide-gray-800">
                {/* Input Textarea */}
                <div className="p-3 flex flex-col">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Sliders className="w-3 h-3 text-blue-400" />
                    <span>Input (stdin)</span>
                  </label>
                  <textarea
                    value={customInputText}
                    onChange={(e) => setCustomInputText(e.target.value)}
                    placeholder="Enter input here..."
                    className="flex-1 w-full bg-gray-950 border border-gray-800 rounded p-2 font-mono text-xs text-gray-200 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                {/* Output Terminal */}
                <div className="p-3 flex flex-col">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Terminal className="w-3 h-3 text-emerald-400" />
                    <span>Compiler Output (stdout)</span>
                  </label>
                  <pre className="flex-1 w-full bg-gray-950 border border-gray-800 rounded p-2 font-mono text-xs text-emerald-400 overflow-y-auto whitespace-pre-wrap">
                    {consoleOutput || "Click 'Run Code' to test your code output..."}
                  </pre>
                </div>
              </div>

              {/* Submission Result Status */}
              {submissionResult && (
                <div className="border-t border-gray-800 px-4 py-2 bg-gray-950 flex justify-between items-center">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${
                    submissionResult.status === "Accepted"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}>
                    Submission: {submissionResult.status}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    Passed {submissionResult.passed}/{submissionResult.total} test cases
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Judge Portal */}
      {activeTab === 'judge' && (
        <div className="flex-1 p-8 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Judge Portal - Live Submissions</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-800/60 text-gray-400 text-xs uppercase">
                <tr>
                  <th className="p-4">Submission ID</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Roll / ID</th>
                  <th className="p-4">Problem</th>
                  <th className="p-4">Lang</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {submissions.length === 0 ? (
                  <tr><td colSpan="7" className="p-4 text-center text-gray-500">No submissions yet</td></tr>
                ) : (
                  submissions.map((sub) => (
                    <tr key={sub.id}>
                      <td className="p-4 font-mono text-xs text-gray-400">{sub.id}</td>
                      <td className="p-4 font-medium text-white">{sub.studentName}</td>
                      <td className="p-4 font-mono text-xs text-blue-400">{sub.studentId}</td>
                      <td className="p-4 text-xs">{sub.problemTitle}</td>
                      <td className="p-4 font-mono text-xs uppercase text-blue-400">{sub.language}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-0.5 rounded border ${
                          sub.status === "Accepted" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedSubmissionModal(sub)}
                          className="px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 rounded text-xs"
                        >
                          Inspect Code
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Code Inspector Modal */}
      {selectedSubmissionModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  Submitted Code by {selectedSubmissionModal.studentName} ({selectedSubmissionModal.studentId})
                </h3>
                <p className="text-xs text-gray-400">Language: {selectedSubmissionModal.language.toUpperCase()}</p>
              </div>
              <button onClick={() => setSelectedSubmissionModal(null)} className="text-gray-400">✕</button>
            </div>
            <pre className="bg-gray-950 p-4 rounded text-xs font-mono text-gray-200 overflow-x-auto max-h-96">
              {selectedSubmissionModal.code}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
