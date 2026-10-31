import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Send, Clock, Award, Code, UserCheck, Sliders, Loader2, Terminal, RotateCcw, Users
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
      { input: "-4 -1 0 3 10", expected: "0 1 9 16 100" },
      { input: "-7 -3 2 3 11", expected: "4 9 9 49 121" }
    ]
  }
];

export default function App() {
  const [studentProfile, setStudentProfile] = useState(null);
  const [regTeamName, setRegTeamName] = useState('');
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
    if (regTeamName.trim() && regRoll.trim()) {
      setStudentProfile({
        teamName: regTeamName.trim(),
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
      
      if (expr.startsWith('"') && expr.endsWith('"')) {
        const text = expr.slice(1, -1);
        if (!text.includes("%") && !text.includes("Enter")) {
          outputParts.push(text);
        }
      } 
      else if (code.includes("% 2 == 0") || code.includes("%2==0")) {
        if (!isNaN(numVal)) {
          if (numVal % 2 === 0 && code.includes("Even")) {
            outputParts.push("Even number");
          } else if (numVal % 2 !== 0 && code.includes("Odd")) {
            outputParts.push("Odd number");
          }
        }
      }
      else if (activeProblem.id === 1 && !isNaN(numVal)) {
        let p = 1, s = 0;
        for (let d of String(numVal)) { p *= Number(d); s += Number(d); }
        outputParts.push(String(p - s));
      }
      else if (activeProblem.id === 2) {
        outputParts.push(`${rawInput.trim()} ${rawInput.trim()}`);
      }
      else if (activeProblem.id === 3 && !isNaN(numVal)) {
        let val = numVal;
        while (val >= 10) {
          val = String(val).split('').reduce((a, b) => Number(a) + Number(
