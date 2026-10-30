import React, { useState, useEffect } from 'react';
import { 
  Play, Send, CheckCircle2, XCircle, Clock, Award, Users, ShieldAlert, 
  FileText, Code, ChevronRight, RefreshCw, Lock, AlertTriangle, 
  Download, Eye, BarChart2, Filter, Search
} from 'lucide-react';

const INITIAL_PROBLEMS = [
  {
    id: 1,
    title: "Subtract the Product and Sum of Digits of an Integer",
    difficulty: "Easy",
    points: 100,
    description: "Given an integer number n, return the difference between the product of its digits and the sum of its digits.",
    examples: [
      { input: "n = 234", output: "15", explanation: "Product of digits = 2 * 3 * 4 = 24. Sum of digits = 2 + 3 + 4 = 9. Result = 24 - 9 = 15." },
      { input: "n = 4421", output: "21", explanation: "Product of digits = 4 * 4 * 2 * 1 = 32. Sum of digits = 4 + 4 + 2 + 1 = 11. Result = 32 - 11 = 21." }
    ],
    constraints: ["1 <= n <= 10^5"],
    starterCode: {
      python: "def subtractProductAndSum(n: int) -> int:\n    # Write your solution here\n    pass",
      cpp: "class Solution {\npublic:\n    int subtractProductAndSum(int n) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: 234, expected: 15 },
      { input: 4421, expected: 21 }
    ]
  },
  {
    id: 2,
    title: "Concatenation of Array",
    difficulty: "Easy",
    points: 100,
    description: "Given an integer array nums of length n, you want to create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed). Specifically, ans is the concatenation of two nums arrays.",
    examples: [
      { input: "nums = [1,2,1]", output: "[1,2,1,1,2,1]", explanation: "The array ans is formed as follows: ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]" },
      { input: "nums = [1,3,2,1]", output: "[1,3,2,1,1,3,2,1]", explanation: "The array ans is formed as follows: ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]" }
    ],
    constraints: ["n == nums.length", "1 <= n <= 1000", "1 <= nums[i] <= 1000"],
    starterCode: {
      python: "def getConcatenation(nums: list[int]) -> list[int]:\n    # Write your solution here\n    pass",
      cpp: "class Solution {\npublic:\n    vector<int> getConcatenation(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};"
    },
    testCases: [
      { input: [1,2,1], expected: [1,2,1,1,2,1] },
      { input: [1,3,2,1], expected: [1,3,2,1,1,3,2,1] }
    ]
  },
  {
    id: 3,
    title: "Add Digits",
    difficulty: "Easy",
    points: 100,
    description: "Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.",
    examples: [
      { input: "num = 38", output: "2", explanation: "The process is: 38 -> 3 + 8 = 11, 11 -> 1 + 1 = 2. Since 2 has only one digit, return it." },
      { input: "num = 0", output: "0", explanation: "0 has only one digit, return 0." }
    ],
    constraints: ["0 <= num <= 2^31 - 1"],
    starterCode: {
      python: "def addDigits(num: int) -> int:\n    # Write your solution here\n    pass",
      cpp: "class Solution {\npublic:\n    int addDigits(int num) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: 38, expected: 2 },
      { input: 0, expected: 0 }
    ]
  },
  {
    id: 4,
    title: "XOR Operation in an Array",
    difficulty: "Easy",
    points: 100,
    description: "You are given an integer n and an integer start. Define an array nums where nums[i] = start + 2 * i (0-indexed) and n == nums.length. Return the bitwise XOR of all elements of nums.",
    examples: [
      { input: "n = 5, start = 0", output: "8", explanation: "Array nums is [0, 2, 4, 6, 8] where (0 ^ 2 ^ 4 ^ 6 ^ 8) = 8." },
      { input: "n = 4, start = 3", output: "8", explanation: "Array nums is [3, 5, 7, 9] where (3 ^ 5 ^ 7 ^ 9) = 8." }
    ],
    constraints: ["1 <= n <= 1000", "0 <= start <= 1000"],
    starterCode: {
      python: "def xorOperation(n: int, start: int) -> int:\n    # Write your solution here\n    pass",
      cpp: "class Solution {\npublic:\n    int xorOperation(int n, int start) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: { n: 5, start: 0 }, expected: 8 },
      { input: { n: 4, start: 3 }, expected: 8 }
    ]
  },
  {
    id: 5,
    title: "Squares of a Sorted Array",
    difficulty: "Easy",
    points: 100,
    description: "Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.",
    examples: [
      { input: "nums = [-4,-1,0,3,10]", output: "[0,1,9,16,100]", explanation: "After squaring, the array becomes [16,1,0,9,100]. After sorting, it becomes [0,1,9,16,100]." },
      { input: "nums = [-7,-3,2,3,11]", output: "[4,9,9,49,121]", explanation: "After squaring, array becomes [49,9,4,9,121]. Sorted: [4,9,9,49,121]." }
    ],
    constraints: ["1 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4", "nums is sorted in non-decreasing order."],
    starterCode: {
      python: "def sortedSquares(nums: list[int]) -> list[int]:\n    # Write your solution here\n    pass",
      cpp: "class Solution {\npublic:\n    vector<int> sortedSquares(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};"
    },
    testCases: [
      { input: [-4,-1,0,3,10], expected: [0,1,9,16,100] },
      { input: [-7,-3,2,3,11], expected: [4,9,9,49,121] }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('student');
  const [activeProblem, setActiveProblem] = useState(INITIAL_PROBLEMS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(INITIAL_PROBLEMS[0].starterCode.python);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  
  // Contest timer: 3 hours = 10800 seconds
  const [timeLeft, setTimeLeft] = useState(10800);
  const [contestActive, setContestActive] = useState(true);

  // Submissions state
  const [submissions, setSubmissions] = useState([
    {
      id: "SUB-101",
      studentId: "STU-8821",
      studentName: "Alex Chen",
      problemId: 1,
      problemTitle: "Subtract the Product and Sum of Digits",
      language: "cpp",
      code: "class Solution {\npublic:\n    int subtractProductAndSum(int n) {\n        int p = 1, s = 0;\n        while(n > 0) {\n            int d = n % 10;\n            p *= d;\n            s += d;\n            n /= 10;\n        }\n        return p - s;\n    }\n};",
      status: "Accepted",
      runtime: "0ms",
      memory: "6.2 MB",
      score: 100,
      timestamp: "10 mins ago",
      similarityScore: "12% (Clear)"
    }
  ]);

  const [selectedSubmissionModal, setSelectedSubmissionModal] = useState(null);

  useEffect(() => {
    let timer;
    if (contestActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
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

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(activeProblem.starterCode[lang]);
  };

  const handleProblemChange = (prob) => {
    setActiveProblem(prob);
    setCode(prob.starterCode[selectedLanguage]);
    setExecutionResult(null);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult({
        status: "Accepted",
        passedCases: activeProblem.testCases.length,
        totalCases: activeProblem.testCases.length,
        runtime: "2ms",
        memory: "14.2 MB",
        details: activeProblem.testCases.map((tc, idx) => ({
          case: idx + 1,
          passed: true,
          expected: JSON.stringify(tc.expected),
          actual: JSON.stringify(tc.expected)
        }))
      });
    }, 600);
  };

  const handleSubmit = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      const newSub = {
        id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
        studentId: "STU-YOU",
        studentName: "Current User",
        problemId: activeProblem.id,
        problemTitle: activeProblem.title,
        language: selectedLanguage,
        code: code,
        status: "Accepted",
        runtime: "1ms",
        memory: "13.8 MB",
        score: 100,
        timestamp: "Just now",
        similarityScore: "0% (Original)"
      };
      setSubmissions([newSub, ...submissions]);
      setExecutionResult({
        status: "Submitted & Accepted",
        passedCases: activeProblem.testCases.length,
        totalCases: activeProblem.testCases.length,
        runtime: "1ms",
        memory: "13.8 MB",
        submitted: true
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col">
      {/* Top Header */}
      <header className="border-b border-gray-800 bg-gray-900 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Code className="text-blue-500 w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            LeetCode Contest Arena
          </h1>
          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
            3-Hour Challenge
          </span>
        </div>

        {/* Global Contest Timer */}
        <div className="flex items-center space-x-6">
          <div className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg border font-mono font-bold ${
            timeLeft < 1800 ? 'border-red-500/40 bg-red-500/10 text-red-400' : 'border-gray-700 bg-gray-800 text-amber-400'
          }`}>
            <Clock className="w-4 h-4 animate-pulse" />
            <span>{formatTime(timeLeft)}</span>
            <span className="text-xs text-gray-400 font-sans">Remaining</span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-gray-800 p-1 rounded-lg border border-gray-700">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                activeTab === 'student' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Student Workspace
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                activeTab === 'leaderboard' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('judge')}
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

      {/* Main Content Area */}
      {activeTab === 'student' && (
        <div className="flex-1 grid grid-cols-12 overflow-hidden">
          {/* Problem Selector Sidebar */}
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
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-mono font-bold text-blue-400">P{prob.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {prob.difficulty}
                    </span>
                  </div>
                  <div className="text-sm font-medium line-clamp-1">{prob.title}</div>
                  <div className="text-xs text-gray-400 mt-1">{prob.points} Points</div>
                </button>
              ))}
            </div>
          </div>

          {/* Problem Statement Detail View */}
          <div className="col-span-4 border-r border-gray-800 p-6 overflow-y-auto bg-gray-900/20">
            <div className="mb-4">
              <span className="text-xs font-mono text-blue-400">Problem {activeProblem.id}</span>
              <h2 className="text-2xl font-bold text-white mt-1">{activeProblem.title}</h2>
            </div>

            <div className="prose prose-invert max-w-none text-sm text-gray-300 space-y-4">
              <p className="leading-relaxed">{activeProblem.description}</p>

              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Examples</h3>
                <div className="space-y-3">
                  {activeProblem.examples.map((ex, idx) => (
                    <div key={idx} className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/50 font-mono text-xs">
                      <div><span className="text-gray-400">Input:</span> {ex.input}</div>
                      <div><span className="text-gray-400">Output:</span> {ex.output}</div>
                      {ex.explanation && <div className="text-gray-400 text-[11px] mt-1 font-sans"><span className="font-semibold text-gray-300">Explanation:</span> {ex.explanation}</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Constraints</h3>
                <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-gray-400">
                  {activeProblem.constraints.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Code Editor & Test Runner */}
          <div className="col-span-5 flex flex-col bg-gray-950">
            {/* Editor Toolbar */}
            <div className="p-3 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-400">Language:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white text-xs rounded-md px-2.5 py-1 focus:outline-none focus:border-blue-500"
                >
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRunCode}
                  disabled={isExecuting || !contestActive}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md text-xs font-medium flex items-center space-x-1.5 transition disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Run Sample Cases</span>
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isExecuting || !contestActive}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-md text-xs font-medium flex items-center space-x-1.5 transition text-white shadow-lg shadow-blue-600/20 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>

            {/* Code Textarea */}
            <div className="flex-1 relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={!contestActive}
                className="w-full h-full bg-gray-950 p-4 font-mono text-sm text-gray-200 focus:outline-none resize-none leading-relaxed"
                placeholder="Write code here..."
              />
              {!contestActive && (
                <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                  <Lock className="w-12 h-12 text-red-400 mb-2" />
                  <h3 className="text-lg font-bold text-white">Contest Has Ended</h3>
                  <p className="text-xs text-gray-400 max-w-sm mt-1">The 3-hour duration has expired. Submissions and code execution are locked.</p>
                </div>
              )}
            </div>

            {/* Output / Test Console */}
            <div className="h-48 border-t border-gray-800 bg-gray-900/90 p-4 overflow-y-auto">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Execution Results
              </div>
              {executionResult ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      {executionResult.status}
                    </span>
                    <span className="text-xs text-gray-400">Passed: {executionResult.passedCases}/{executionResult.totalCases} cases</span>
                    <span className="text-xs text-gray-400">Runtime: {executionResult.runtime}</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-500 font-mono">
                  Click "Run Sample Cases" or "Submit Solution" to inspect test outputs...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard View */}
      {activeTab === 'leaderboard' && (
        <div className="flex-1 p-8 max-w-5xl mx-auto w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Live Contest Standings</h2>
            <p className="text-xs text-gray-400 mt-1">Real-time rank updates during the 3-hour window.</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-800/60 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Rank</th>
                  <th className="p-4">Participant</th>
                  <th className="p-4">Solved</th>
                  <th className="p-4">Total Score</th>
                  <th className="p-4">Time Penalty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="hover:bg-gray-800/30">
                  <td className="p-4 font-bold text-amber-400">#1</td>
                  <td className="p-4 font-medium">Alex Chen (STU-8821)</td>
                  <td className="p-4 text-emerald-400 font-bold">5 / 5</td>
                  <td className="p-4 font-mono font-semibold">500 pts</td>
                  <td className="p-4 font-mono text-gray-400">01:12:45</td>
                </tr>
                <tr className="hover:bg-gray-800/30">
                  <td className="p-4 font-bold text-gray-300">#2</td>
                  <td className="p-4 font-medium">Current User (STU-YOU)</td>
                  <td className="p-4 text-emerald-400 font-bold">1 / 5</td>
                  <td className="p-4 font-mono font-semibold">100 pts</td>
                  <td className="p-4 font-mono text-gray-400">00:15:20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Judge Portal View */}
      {activeTab === 'judge' && (
        <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Judge & Administrator Portal</h2>
              <p className="text-xs text-gray-400 mt-1">Review live student submissions, execute manual evaluations, and check similarity scores.</p>
            </div>
            <button className="px-3 py-1.5 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-xs font-medium rounded-lg flex items-center space-x-2">
              <Download className="w-3.5 h-3.5 text-gray-300" />
              <span>Export Submission Records (.CSV)</span>
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-800/60 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Submission ID</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Problem</th>
                  <th className="p-4">Lang</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Plagiarism Score</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-800/30">
                    <td className="p-4 font-mono text-xs text-gray-400">{sub.id}</td>
                    <td className="p-4 font-medium">{sub.studentName}</td>
                    <td className="p-4 text-xs">{sub.problemTitle}</td>
                    <td className="p-4 font-mono text-xs uppercase text-blue-400">{sub.language}</td>
                    <td className="p-4">
                      <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {sub.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-mono text-gray-300">{sub.similarityScore}</td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedSubmissionModal(sub)}
                        className="px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 rounded text-xs transition"
                      >
                        Inspect Code
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Submission Inspector Modal for Judges */}
      {selectedSubmissionModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/40">
              <div>
                <h3 className="text-base font-bold text-white">Code Inspection Workbench</h3>
                <p className="text-xs text-gray-400">Submission {selectedSubmissionModal.id} by {selectedSubmissionModal.studentName}</p>
              </div>
              <button
                onClick={() => setSelectedSubmissionModal(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto font-mono text-xs bg-gray-950 text-gray-200">
              <pre className="whitespace-pre-wrap">{selectedSubmissionModal.code}</pre>
            </div>

            <div className="p-4 border-t border-gray-800 bg-gray-900/60 flex justify-between items-center">
              <span className="text-xs text-gray-400">Language: {selectedSubmissionModal.language.toUpperCase()}</span>
              <button
                onClick={() => setSelectedSubmissionModal(null)}
                className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs font-medium rounded-lg text-white"
              >
                Close Workbench
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
