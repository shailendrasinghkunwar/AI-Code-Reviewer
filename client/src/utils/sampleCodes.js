export const SAMPLE_CODES = {
  javascript: `// JavaScript Code Sample: Unoptimized Array Operation & Security Concern
function processUserData(users, query) {
  let results = [];
  
  // Vulnerability: Potential Eval Injection
  if (query.startsWith("calc:")) {
    let expr = query.substring(5);
    results.push(eval(expr)); // Unsafe!
  }

  // Bug & Performance Issue: O(N^2) Nested Loop
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (users[i].id === users[j].id && i !== j) {
        console.log("Duplicate user found: " + users[i].name);
      }
    }
  }

  // Missing null checks
  const firstAdmin = users.find(u => u.role === 'admin');
  return firstAdmin.name.toUpperCase(); 
}

processUserData([{ id: 1, name: "Alice", role: "user" }], "calc:2+2");
`,

  python: `# Python Code Sample: Recursive Fibonacci (O(2^N) Complexity & Memory Bottleneck)
def calculate_fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        # Exponential recursion overhead
        return calculate_fibonacci(n - 1) + calculate_fibonacci(n - 2)

def process_file_data(filename):
    # Bug: Resource leak (file not closed properly)
    f = open(filename, 'r')
    data = f.read()
    
    # Redundant calculation in loop
    results = []
    for line in data.split('\\n'):
        val = len(line)
        fib_val = calculate_fibonacci(val % 30) # Heavy calculation
        results.append(fib_val)
        
    return results
`,

  java: `// Java Code Sample: Resource Leak & Null Reference Issue
import java.io.*;
import java.util.*;

public class UserProcessor {

    public static List<String> formatUserNames(List<String> names) {
        List<String> formatted = new ArrayList<>();
        
        // Bug: NullPointerException risk
        for (String name : names) {
            if (name.length() > 0) { // Will throw NPE if name is null
                formatted.add(name.trim().substring(0, 1).toUpperCase() + name.substring(1));
            }
        }
        
        return formatted;
    }

    public static void readLogFile(String path) {
        try {
            // Resource Leak: FileReader not closed in finally block or try-with-resources
            BufferedReader reader = new BufferedReader(new FileReader(path));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Bad practice: empty exception handling
        }
    }
}
`,

  cpp: `// C++ Code Sample: Memory Leak & Pointer Safety
#include <iostream>
#include <vector>
#include <string>

class StudentManager {
private:
    int* scores;
    int count;

public:
    StudentManager(int size) {
        count = size;
        // Bug: Raw dynamic allocation without smart pointers
        scores = new int[size]; 
    }

    // Missing Destructor causing Memory Leak!

    void setScore(int index, int val) {
        // Out-of-bounds bug: No bounds checking
        scores[index] = val; 
    }

    double getAverageScore() {
        int sum = 0;
        // Bug: Division by zero risk if count is 0
        for (int i = 0; i <= count; i++) { // Bug: Off-by-one error (<= instead of <)
            sum += scores[i];
        }
        return sum / count;
    }
};
`,
};
