# Code Test Environment Setup Guide

## Overview

This is a comprehensive coding test interface that supports multiple programming languages including Verilog, SystemVerilog, C, C++, and Embedded C. The interface provides a modern code editor with syntax highlighting, test case management, and code execution capabilities.

## Features

### 🎯 Core Features
- **Multi-language Support**: Verilog, SystemVerilog, C, C++, Embedded C
- **Monaco Editor**: Professional code editor with syntax highlighting
- **Test Case Management**: Create, edit, and run test cases
- **Real-time Execution**: Execute code and see results instantly
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with tabs and smooth animations

### 🛠️ Technical Features
- **Language Selection**: Easy dropdown to switch between languages
- **Code Formatting**: Auto-format code with proper indentation
- **Error Handling**: Comprehensive error messages and debugging info
- **File Management**: Temporary file handling for secure execution
- **API Integration**: RESTful API for code execution and submission

## Installation

### Prerequisites

Make sure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- GCC compiler (for C/C++)
- Icarus Verilog (for Verilog/SystemVerilog)

### Frontend Setup

1. **Install dependencies**:
```bash
npm install @monaco-editor/react react-select
```

2. **Update your component imports**:
The CodeTest component is now available at:
```javascript
import CodeTest from './src/ProfileSection/CodeTest/codebox.js';
```

### Backend Setup

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Install system dependencies**:

For C/C++ support:
```bash
# Ubuntu/Debian
sudo apt-get install gcc g++

# macOS
xcode-select --install

# Windows
# Install MinGW or Visual Studio
```

For Verilog/SystemVerilog support:
```bash
# Ubuntu/Debian
sudo apt-get install iverilog

# macOS
brew install icarus-verilog

# Windows
# Download from: http://bleyer.org/icarus/
```

4. **Start the backend server**:
```bash
npm start
# or for development
npm run dev
```

The backend server will run on `http://localhost:3001`

## Usage

### Basic Usage

1. **Select Language**: Choose from the dropdown (Verilog, SystemVerilog, C, C++, Embedded C)
2. **Write Code**: Use the Monaco editor to write your code
3. **Add Test Cases**: Switch to the "Test Cases" tab to add input/output test cases
4. **Run Code**: Click "Run Code" to execute and see results
5. **Submit Code**: Click "Submit Code" to submit your solution

### Code Editor Features

- **Syntax Highlighting**: Language-specific syntax highlighting
- **Line Numbers**: Easy navigation with line numbers
- **Auto-completion**: Intelligent code completion
- **Error Indicators**: Real-time error detection
- **Format Code**: Auto-format your code with proper indentation
- **Reset**: Reset to template code

### Test Case Management

- **Add Test Cases**: Provide input and expected output
- **Multiple Test Cases**: Add as many test cases as needed
- **Remove Test Cases**: Delete test cases you don't need
- **View Results**: See pass/fail status for each test case

### API Endpoints

The backend provides several REST endpoints:

#### Execute Code
```
POST /api/execute
Content-Type: application/json

{
  "language": "c",
  "code": "your code here",
  "testCases": [
    {
      "input": "test input",
      "expected": "expected output"
    }
  ]
}
```

#### Submit Code
```
POST /api/submit
Content-Type: application/json

{
  "language": "c",
  "code": "your code here",
  "testCases": [...]
}
```

#### Check Submission Status
```
GET /api/submission/:id
```

#### Health Check
```
GET /api/health
```

## Language-Specific Examples

### C Example
```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

### C++ Example
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

### Verilog Example
```verilog
module hello_world;
  initial begin
    $display("Hello, World!");
    $finish;
  end
endmodule
```

### SystemVerilog Example
```systemverilog
module hello_world;
  initial begin
    $display("Hello, World!");
    $finish;
  end
endmodule
```

## Configuration

### Frontend Configuration

Update the API endpoint in your CodeTest component:
```javascript
// Change this to your backend URL
const API_BASE_URL = 'http://localhost:3001';
```

### Backend Configuration

Environment variables you can set:
```bash
PORT=3001                    # Server port
NODE_ENV=development         # Environment
MAX_EXECUTION_TIME=10000     # Max execution time (ms)
TEMP_DIR_CLEANUP=true        # Clean up temp files
```

## Security Considerations

⚠️ **Important Security Notes**:

1. **Sandboxing**: In production, run code execution in isolated containers
2. **Resource Limits**: Set memory and CPU limits for code execution
3. **Input Validation**: Validate all inputs before execution
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **File System**: Restrict file system access for executed code

## Troubleshooting

### Common Issues

1. **Monaco Editor not loading**:
   - Check if @monaco-editor/react is installed
   - Verify React version compatibility

2. **Backend compilation errors**:
   - Ensure GCC/G++ is installed and in PATH
   - Check Icarus Verilog installation for Verilog support

3. **CORS errors**:
   - Verify backend CORS configuration
   - Check if frontend is making requests to correct backend URL

4. **Code execution timeouts**:
   - Increase timeout values in backend configuration
   - Check for infinite loops in submitted code

### Debug Mode

Enable debug mode by setting:
```javascript
const DEBUG = true;
```

This will show additional console logs and error information.

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Note**: This is a development setup. For production deployment, additional security measures, containerization, and proper database integration should be implemented. 