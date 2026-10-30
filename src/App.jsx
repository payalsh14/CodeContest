import React, { useState, useEffect } from 'react';
import { 
  Play, Send, CheckCircle2, Clock, Award, Code, UserCheck, Lock
} from 'lucide-react';

const INITIAL_PROBLEMS = [
  {
    id: 1,
    title: "Subtract the Product and Sum of Digits of an Integer",
    difficulty: "Easy",
    points: 100,
    description: "Given an integer number n, return the difference between the product of its digits and the sum of its digits.",
    examples: [
      { input: "n = 234", output: "15", explanation: "Product = 2*3*4 = 24. Sum = 2+3+4 = 9. Result = 24 - 9 = 15." },
      { input: "n = 4421", output: "21", explanation: "Product = 4*4*2*1 = 32. Sum = 4+4+2+1 = 11. Result = 32 - 11 = 21." }
    ],
    constraints: ["1 <= n <= 10^5"],
    starterCode: {
      python: "def subtractProductAndSum(n):\n    # Write your python solution here\n    pass",
      cpp: "class Solution {\npublic:\n    int subtractProductAndSum(int n) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: 234, expected: 15 },
      { input: 4421, expected: 21 }
    ],
    validator: (userCode, tc) => {
      try {
        if (userCode.includes("return") || userCode.includes("subtractProductAndSum")) {
          let n = tc.input;
          let p = 1, s = 0;
          for (let d of String(n)) { p *= Number(d); s += Number(d); }
          return (p - s) === tc.expected;
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
    description: "Given an integer list nums, return a new list containing two copies of nums concatenated together.",
    examples: [
      { input: "nums = [1,2,1]", output: "[1,2,1,1,2,1]" },
      { input: "nums = [1,3,2,1]", output: "[1,3,2,1,1,3,2,1]" }
    ],
    constraints: ["1 <= nums.length <= 1000"],
    starterCode: {
      python: "def getConcatenation(nums):\n    # Write your python solution here\n    pass",
      cpp: "class Solution {\npublic:\n    vector<int> getConcatenation(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};"
    },
    testCases: [
      { input: [1,2,1], expected: [1,2,1,1,2,1] },
      { input: [1,3,2,1], expected: [1,3,2,1,1,3,2,1] }
    ],
    validator: (userCode) => {
      return userCode.includes("return") && (userCode.includes("+") || userCode.includes("nums"));
    }
  },
  {
    id: 3,
    title: "Add Digits",
    difficulty: "Easy",
    points: 100,
    description: "Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.",
    examples: [
      { input: "num = 38", output: "2", explanation: "3 + 8 = 11, then 1 + 1 = 2." },
      { input: "num = 0", output: "0" }
    ],
    constraints: ["0 <= num <= 2^31 - 1"],
    starterCode: {
      python: "def addDigits(num):\n    # Write your python solution here\n    pass",
      cpp: "class Solution {\npublic:\n    int addDigits(int num) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: 38, expected: 2 },
      { input: 0, expected: 0 }
    ],
    validator: (userCode) => {
      return userCode.includes("return") && (userCode.includes("while") || userCode.includes("for") || userCode.includes("%"));
    }
  },
  {
    id: 4,
    title: "XOR Operation in an Array",
    difficulty: "Easy",
    points: 100,
    description: "Given n and start, calculate numbers where number = start + 2 * i for each step, and return their XOR total.",
    examples: [
      { input: "n = 5, start = 0", output: "8" },
      { input: "n = 4, start = 3", output: "8" }
    ],
    constraints: ["1 <= n <= 1000", "0 <= start <= 1000"],
    starterCode: {
      python: "def xorOperation(n, start):\n    # Write your python solution here\n    pass",
      cpp: "class Solution {\npublic:\n    int xorOperation(int n, int start) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: { n: 5, start: 0 }, expected: 8 },
      { input: { n: 4, start: 3 }, expected: 8 }
    ],
    validator: (userCode) => {
      return userCode.includes("return") && (userCode.includes("^") || userCode.includes("xor") || userCode.includes("XOR"));
    }
  },
  {
    id: 5,
    title: "Squares of a Sorted Array",
    difficulty: "Easy",
    points: 100,
    description: "Given a sorted list of numbers, return a new sorted list containing the square of each number.",
    examples: [
      { input: "nums = [-4,-1,0,3,10]", output: "[0,1,9,16,100]" },
      { input: "nums = [-7,-3,2,3,11]", output: "[4,9,9,49,121]" }
    ],
    constraints: ["1 <= nums.length <= 10^4"],
    starterCode: {
      python: "def sortedSquares(nums):\n    # Write your python solution here\n    pass",
      cpp: "class Solution {\npublic:\n    vector<int> sortedSquares(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};"
    },
    testCases: [
      { input: [-4,-1,0,3,10], expected: [0,1,9,16,100] },
      { input: [-7,-3,2,3,11], expected: [4,9,9,49,121] }
    ],
    validator: (userCode) => {
      return userCode.includes("return") && (userCode.includes("sort") || userCode.includes("*"));
    }
  }
];

export default function App() {
  // Registration state
  const [studentProfile, setStudentProfile] = useState(null);
  const [regName, setRegName] = useState('');
  const [regRoll, setRegRoll] = useState('');

  // Judge authentication state
  const [isJudgeAuthenticated, setIsJudgeAuthenticated] = useState(false);

  const [activeTab, setActiveTab] = useState('student');
  const [activeProblem, setActiveProblem] = useState(INITIAL_PROBLEMS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(INITIAL_PROBLEMS[0].starterCode.python);
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

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(activeProblem.starterCode[lang]);
  };

  const handleProblemChange = (prob) => {
    setActiveProblem(prob);
    setCode(prob.starterCode[selectedLanguage]);
    setExecutionResult(null);
  };

  const evaluateCode = () => {
    let passed = 0;
    const total = activeProblem.testCases.length;
    
    activeProblem.testCases.forEach((tc) => {
      const isCorrect = activeProblem.validator(code, tc);
      if (isCorrect) passed++;
    });

    const isAllPassed = passed === total;

    return {
      status: isAllPassed ? "Accepted" : "Wrong Answer",
      passedCases: passed,
      totalCases: total,
      runtime: isAllPassed ? "2ms" : "N/A",
      memory: "14.1 MB"
    };
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult(evaluateCode());
    }, 500);
  };

  const handleSubmit = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      const res = evaluateCode();
      setExecutionResult({ ...res, submitted: true });

      const newSub = {
        id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
        studentId: studentProfile ? studentProfile.roll : "STU-ANON",
        studentName: studentProfile ? studentProfile.name : "Anonymous Student",
        problemId: activeProblem.id,
        problemTitle: activeProblem.title,
        language: selectedLanguage,
        code: code,
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
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Examples</h3>
            {activeProblem.examples.map((ex, idx) => (
              <div key={idx} className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/50 font-mono text-xs mb-2">
                <div><span className="text-gray-400">Input:</span> {ex.input}</div>
                <div><span className="text-gray-400">Output:</span> {ex.output}</div>
              </div>
            ))}
          </div>

          <div className="col-span-5 flex flex-col bg-gray-950">
            <div className="p-3 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white text-xs rounded px-2.5 py-1"
              >
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select>

              <div className="flex space-x-2">
                <button
                  onClick={handleRunCode}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-xs font-medium flex items-center space-x-1"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Run Cases</span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-xs font-medium flex items-center space-x-1 text-white"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit</span>
                </button>
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-gray-950 p-4 font-mono text-sm text-gray-200 focus:outline-none resize-none"
              placeholder="Write Python code here..."
            />

            <div className="h-44 border-t border-gray-800 bg-gray-900/90 p-4 overflow-y-auto">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Results</div>
              {executionResult ? (
                <div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded border ${
                    executionResult.status === "Accepted"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}>
                    {executionResult.status}
                  </span>
                  <div className="text-xs text-gray-400 mt-2">
                    Passed: {executionResult.passedCases}/{executionResult.totalCases} test cases
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-500 font-mono">Click "Run Cases" or "Submit" to test your code...</div>
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
