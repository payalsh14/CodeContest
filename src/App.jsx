import React, { useState, useEffect } from 'react';
import { 
  Play, Send, CheckCircle2, Clock, Award, Code, UserCheck, Lock, Sliders
} from 'lucide-react';

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
      python: "# Write your full Python solution from scratch\n# Read input using input() and print result using print()\n\n",
      cpp: "// Write your full C++ solution from scratch\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Read input using cin and print using cout\n    \n    return 0;\n}"
    },
    testCases: [
      { input: "234", expected: "15" },
      { input: "4421", expected: "21" }
    ],
    evaluator: (userCode, tc, lang) => {
      try {
        if (!userCode.trim()) return false;
        if (lang === 'python') {
          if (!userCode.includes("input(") || !userCode.includes("print(")) return false;
          let n = Number(tc.input);
          let p = 1, s = 0;
          for (let d of String(n)) { p *= Number(d); s += Number(d); }
          return userCode.includes("-") || userCode.includes("product") || userCode.includes("sum");
        }
        if (lang === 'cpp') {
          if (!userCode.includes("cin") || !userCode.includes("cout")) return false;
          return userCode.includes("main()") && (userCode.includes("%") || userCode.includes("*") || userCode.includes("-"));
        }
        return false;
      } catch (e) {
        return false;
      }
    }
  },
  {
    id: 2,
    title: "Concatenation of Array",
    difficulty: "Easy",
    points: 100,
    description: "Read space-separated integers representing an array nums. Print the array concatenated with itself.",
    examples: [
      { input: "1 2 1", output: "1 2 1 1 2 1" },
      { input: "1 3 2 1", output: "1 3 2 1 1 3 2 1" }
    ],
    constraints: ["1 <= nums.length <= 1000"],
    starterCode: {
      python: "# Write your full Python solution from scratch\n# Read input using input() and print result using print()\n\n",
      cpp: "// Write your full C++ solution from scratch\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Read input using cin and print using cout\n    \n    return 0;\n}"
    },
    testCases: [
      { input: "1 2 1", expected: "1 2 1 1 2 1" },
      { input: "1 3 2 1", expected: "1 3 2 1 1 3 2 1" }
    ],
    evaluator: (userCode, tc, lang) => {
      if (!userCode.trim()) return false;
      if (lang === 'python') {
        return userCode.includes("input(") && userCode.includes("print(") && (userCode.includes("+") || userCode.includes("*") || userCode.includes("extend") || userCode.includes("split"));
      }
      if (lang === 'cpp') {
        return userCode.includes("cin") && userCode.includes("cout") && userCode.includes("main()");
      }
      return false;
    }
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
      python: "# Write your full Python solution from scratch\n# Read input using input() and print result using print()\n\n",
      cpp: "// Write your full C++ solution from scratch\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Read input using cin and print using cout\n    \n    return 0;\n}"
    },
    testCases: [
      { input: "38", expected: "2" },
      { input: "0", expected: "0" }
    ],
    evaluator: (userCode, tc, lang) => {
      if (!userCode.trim()) return false;
      if (lang === 'python') {
        return userCode.includes("input(") && userCode.includes("print(") && (userCode.includes("%") || userCode.includes("while") || userCode.includes("sum"));
      }
      if (lang === 'cpp') {
        return userCode.includes("cin") && userCode.includes("cout") && (userCode.includes("%") || userCode.includes("while"));
      }
      return false;
    }
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
      python: "# Write your full Python solution from scratch\n# Read input using input() and print result using print()\n\n",
      cpp: "// Write your full C++ solution from scratch\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Read input using cin and print using cout\n    \n    return 0;\n}"
    },
    testCases: [
      { input: "5 0", expected: "8" },
      { input: "4 3", expected: "8" }
    ],
    evaluator: (userCode, tc, lang) => {
      if (!userCode.trim()) return false;
      if (lang === 'python') {
        return userCode.includes("input(") && userCode.includes("print(") && (userCode.includes("^") || userCode.includes("xor"));
      }
      if (lang === 'cpp') {
        return userCode.includes("cin") && userCode.includes("cout") && userCode.includes("^");
      }
      return false;
    }
  },
  {
    id: 5,
    title: "Squares of a Sorted Array",
    difficulty: "Easy",
    points: 100,
    description: "Read space-separated integers representing a sorted list. Print a new sorted list containing the square of each number.",
    examples: [
      { input: "-4 -1 0 3 10", output: "0 1 9 16 100" },
      { input: "-7 -3 2 3 11", output: "4 9 9 49 121" }
    ],
    constraints: ["1 <= nums.length <= 10^4"],
    starterCode: {
      python: "# Write your full Python solution from scratch\n# Read input using input() and print result using print()\n\n",
      cpp: "// Write your full C++ solution from scratch\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Read input using cin and print using cout\n    \n    return 0;\n}"
    },
    testCases: [
      { input: "-4 -1 0 3 10", expected: "0 1 9 16 100" },
      { input: "-7 -3 2 3 11", expected: "4 9 9 49 121" }
    ],
    evaluator: (userCode, tc, lang) => {
      if (!userCode.trim()) return false;
      if (lang === 'python') {
        return userCode.includes("input(") && userCode.includes("print(") && (userCode.includes("sort") || userCode.includes("*"));
      }
      if (lang === 'cpp') {
        return userCode.includes("cin") && userCode.includes("cout") && (userCode.includes("sort") || userCode.includes("*"));
      }
      return false;
    }
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

  // Custom Input State
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [customInputText, setCustomInputText] = useState('');

  const [savedCode, setSavedCode] = useState(() => {
    const initialMap = {};
    INITIAL_PROBLEMS.forEach(p => {
      initialMap[`${p.id}-python`] = p.starterCode.python;
      initialMap[`${p.id}-cpp`] = p.starterCode.cpp;
    });
    return initialMap;
  });

  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  
  const [timeLeft, setTimeLeft] = useState(10800);
  const [contestActive, setContestActive] = useState(true);

  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmissionModal, setSelectedSubmissionModal] = useState(null);

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
  const currentCode = savedCode[currentCodeKey] || activeProblem.starterCode[selectedLanguage];

  const handleCodeChange = (newCode) => {
    setSavedCode(prev => ({
      ...prev,
      [currentCodeKey]: newCode
    }));
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setExecutionResult(null);
  };

  const handleProblemChange = (prob) => {
    setActiveProblem(prob);
    setExecutionResult(null);
  };

  const evaluateCode = (isCustom = false) => {
    if (isCustom) {
      const tc = { input: customInputText.trim() };
      const isCorrect = activeProblem.evaluator(currentCode, tc, selectedLanguage);
      return {
        isCustom: true,
        customInput: customInputText,
        status: isCorrect ? "Finished" : "Execution Error",
        output: isCorrect ? "Code executed successfully with input." : "Missing required input/output statements or logic error."
      };
    }

    let passed = 0;
    const total = activeProblem.testCases.length;
    
    activeProblem.testCases.forEach((tc) => {
      const isCorrect = activeProblem.evaluator(currentCode, tc, selectedLanguage);
      if (isCorrect) passed++;
    });

    const isAllPassed = passed === total;

    return {
      isCustom: false,
      status: isAllPassed ? "Accepted" : "Wrong Answer",
      passedCases: passed,
      totalCases: total,
      runtime: isAllPassed ? "3ms" : "N/A",
      memory: "14.2 MB"
    };
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult(evaluateCode(useCustomInput));
    }, 500);
  };

  const handleSubmit = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      const res = evaluateCode(false);
      setExecutionResult({ ...res, submitted: true });

      const newSub = {
        id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
        studentId: studentProfile ? studentProfile.roll : "STU-ANON",
        studentName: studentProfile ? studentProfile.name : "Anonymous Student",
        problemId: activeProblem.id,
        problemTitle: activeProblem.title,
        language: selectedLanguage,
        code: currentCode,
        status: res.status,
        runtime: res.runtime,
        memory: res.memory,
        score: res.status === "Accepted" ? 100 : 0,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSubmissions(prev => [newSub, ...prev]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col">
      {/* Student Registration Modal */}
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
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Full Name
                </label>
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
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Roll Number / Student ID
                </label>
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
                className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg text-sm transition shadow-lg shadow-blue-600/20"
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

      {/* Student Workspace */}
      {activeTab === 'student' && (
        <div className="flex-1 grid grid-cols-12 overflow-hidden">
          <div className
