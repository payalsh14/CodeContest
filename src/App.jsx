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
      cpp: "// Write your full C++ solution from scratch\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Read input using cin and print output using cout\n    \n    return 0;\n}"
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
      python: "# Write your full Python solution from scratch\n# Read input using input() and print result using print()\n\n",
      cpp: "// Write your full C++ solution from scratch\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Read input using cin and print output using cout\n    \n    return 0;\n}"
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
      python: "# Write your full Python solution from scratch\n# Read input using input() and print result using print()\n\n",
      cpp: "// Write your full C++ solution from scratch\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Read input using cin and print output using cout\n    \n    return 0;\n}"
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
      python: "# Write your full Python solution from scratch\n# Read input using input() and print result using print()\n\n",
      cpp: "// Write your full C++ solution from scratch\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Read input using cin and print output using cout\n    \n    return 0;\n}"
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
      python: "# Write your full Python solution from scratch\n# Read input using input() and print result using print()\n\n",
      cpp: "// Write your full C++ solution from scratch\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Read input using cin and print output using cout\n    \n    return 0;\n}"
    },
    testCases: [
      { input: "-4 -1 0 3 10", expected: "0 1 9 16 100" },
      { input: "-7 -3 2 3 11", expected: "4 9 9 49 121" }
    ]
  }
];
