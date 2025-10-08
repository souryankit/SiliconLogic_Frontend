import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import axios from 'axios';
import styles from './CodeTest.module.css';

const CodeTest = () => {
  const [selectedLanguage, setSelectedLanguage] = useState({
    value: 'verilog',
    label: 'Verilog',
    extension: '.v',
    monaco: 'verilog'
  });

  // Independent Testbench editor language
  const [tbSelectedLanguage, setTbSelectedLanguage] = useState({
    value: 'systemverilog',
    label: 'SystemVerilog',
    extension: '.sv',
    monaco: 'systemverilog'
  });

  const [code, setCode] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [currentTestCase, setCurrentTestCase] = useState({ input: '', expected: '' });
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState([]);
  // const [activeTab, setActiveTab] = useState('editor');

  const editorRef = useRef(null);
  const untitledCounterRef = useRef(1);
  const fileIdCounterRef = useRef(1);
  const [isRunningDesign, setIsRunningDesign] = useState(false);
  const [isSavingDesign, setIsSavingDesign] = useState(false);
  const [isRunningTestbench, setIsRunningTestbench] = useState(false);
  const [isSavingTestbench, setIsSavingTestbench] = useState(false);

  // Independent Testbench editor state
  const tbEditorRef = useRef(null);
  const [tbCode, setTbCode] = useState('');
  const tbUntitledCounterRef = useRef(1);
  const tbFileIdCounterRef = useRef(1);

  const [files, setFiles] = useState(() => {
    const initialId = fileIdCounterRef.current; // 1
    const initialContent = '';
    return [
      {
        id: initialId,
        name: `untitled${untitledCounterRef.current}${'.v'}`,
        language: 'verilog',
        monaco: 'verilog',
        extension: '.v',
        content: initialContent,
        isDirty: false,
      },
    ];
  });
  const [activeFileId, setActiveFileId] = useState(1);
  const [renamingFileId, setRenamingFileId] = useState(null);
  const [renameDraft, setRenameDraft] = useState('');

  // Testbench: independent files state
  const [tbFiles, setTbFiles] = useState(() => {
    const initialId = tbFileIdCounterRef.current; // 1
    const initialContent = '';
    return [
      {
        id: initialId,
        name: `tb_untitled${tbUntitledCounterRef.current}${'.sv'}`,
        language: 'systemverilog',
        monaco: 'systemverilog',
        extension: '.sv',
        content: initialContent,
        isDirty: false,
      },
    ];
  });
  const [tbActiveFileId, setTbActiveFileId] = useState(1);
  const [tbRenamingFileId, setTbRenamingFileId] = useState(null);
  const [tbRenameDraft, setTbRenameDraft] = useState('');

  const languageOptions = [
    { value: 'verilog', label: 'Verilog', extension: '.v', monaco: 'verilog' },
    { value: 'systemverilog', label: 'SystemVerilog', extension: '.sv', monaco: 'systemverilog' },
    { value: 'c', label: 'C', extension: '.c', monaco: 'c' },
    { value: 'cpp', label: 'C++', extension: '.cpp', monaco: 'cpp' },
    { value: 'embedded-c', label: 'Embedded C', extension: '.c', monaco: 'c' }
  ];

  const sampleCodes = {
    verilog: `module testbench;
  reg clk, reset;
  wire [7:0] output_signal;
  
  // Your Verilog code here
  initial begin
    clk = 0;
    reset = 1;
    #10 reset = 0;
    
    // Test your design
    $finish;
  end
  
  always #5 clk = ~clk;
  
endmodule`,
    systemverilog: `class test_class;
  rand bit [7:0] data;
  
  function new();
    // Constructor
  endfunction
  
  task run();
    // Your SystemVerilog code here
  endtask
  
endclass

module testbench;
  test_class tc;
  
  initial begin
    tc = new();
    tc.run();
    $finish;
  end
  
endmodule`,
    c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Your C code here
    printf("Hello, World!\\n");
    return 0;
}`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    // Your C++ code here
    cout << "Hello, World!" << endl;
    return 0;
}`,
    'embedded-c': `#include <stdio.h>
#include <stdint.h>

// Embedded C example
#define LED_PIN 13
#define DELAY_MS 1000

void setup() {
    // Initialize hardware
}

void loop() {
    // Your embedded C code here
    // Toggle LED
    // delay(DELAY_MS);
}

int main() {
    setup();
    while(1) {
        loop();
    }
    return 0;
}`
  };

  const getTemplateForLanguage = (langValue) => sampleCodes[langValue] || '';
  const getTbTemplateForLanguage = (langValue) => sampleCodes[langValue] || '';

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    setCode(sampleCodes[selectedOption.value] || '');
    setOutput('');
    setResults([]);
    // Update active file metadata to reflect language switch
    setFiles((prev) => {
      return prev.map((f) => {
        if (f.id !== activeFileId) return f;
        return {
          ...f,
          language: selectedOption.value,
          monaco: selectedOption.monaco,
          extension: selectedOption.extension,
        };
      });
    });
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const handleTbEditorMount = (editor) => {
    tbEditorRef.current = editor;
  };

  const handleTbLanguageChange = (selectedOption) => {
    setTbSelectedLanguage(selectedOption);
    setTbCode(sampleCodes[selectedOption.value] || '');
    // Update active TB file metadata only
    setTbFiles((prev) => {
      return prev.map((f) => {
        if (f.id !== tbActiveFileId) return f;
        return {
          ...f,
          language: selectedOption.value,
          monaco: selectedOption.monaco,
          extension: selectedOption.extension,
        };
      });
    });
  };

  const addTestCase = () => {
    if (currentTestCase.input.trim() || currentTestCase.expected.trim()) {
      setTestCases([...testCases, { ...currentTestCase, id: Date.now() }]);
      setCurrentTestCase({ input: '', expected: '' });
    }
  };

  const removeTestCase = (id) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
  };

  const addFile = () => {
    const count = ++untitledCounterRef.current;
    const ext = selectedLanguage.extension || '';
    const newId = ++fileIdCounterRef.current;
    const template = getTemplateForLanguage(selectedLanguage.value);
    const newFile = {
      id: newId,
      name: `untitled${count}${ext}`,
      language: selectedLanguage.value,
      monaco: selectedLanguage.monaco,
      extension: ext,
      content: template,
      isDirty: true,
    };
    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newId);
    setCode(template);
  };

  const switchActiveFile = (fileId) => {
    setActiveFileId(fileId);
    const file = files.find((f) => f.id === fileId);
    if (file) setCode(file.content || '');
  };

  const saveActiveFile = async () => {
    const file = files.find((f) => f.id === activeFileId);
    if (!file) return;
    await saveLocally({ file, content: code, updateFiles: setFiles, fileId: activeFileId, namespace: 'design' });
  };

  const deleteActiveFile = () => {
    if (files.length <= 1) {
      alert('At least one design file must remain.');
      return;
    }
    setFiles((prev) => prev.filter((f) => f.id !== activeFileId));
    // Pick next file as active
    const remaining = files.filter((f) => f.id !== activeFileId);
    const next = remaining[remaining.length - 1];
    if (next) {
      setActiveFileId(next.id);
      setCode(next.content || '');
    }
  };

  const deleteFileById = (fileId) => {
    if (files.length <= 1) {
      alert('At least one design file must remain.');
      return;
    }
    const remaining = files.filter((f) => f.id !== fileId);
    setFiles(remaining);
    if (fileId === activeFileId) {
      const next = remaining[remaining.length - 1];
      if (next) {
        setActiveFileId(next.id);
        setCode(next.content || '');
      }
    }
  };

  const runCode = async () => {
    if (!code.trim()) {
      alert('Please write some code first!');
      return;
    }

    setIsRunningDesign(true);
    setOutput('Running code...');

    try {
      const response = await axios.post('/api/execute', {
        language: selectedLanguage.value,
        code: code,
        testCases: testCases
      });

      setOutput(response.data.output);
      setResults(response.data.results || []);
    } catch (error) {
      setOutput(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsRunningDesign(false);
    }
  };

  const submitCode = async () => {
    if (!code.trim()) {
      alert('Please write some code first!');
      return;
    }

    setIsSavingDesign(true);

    try {
      const response = await axios.post('/api/submit', {
        language: selectedLanguage.value,
        code: code,
        testCases: testCases
      });

      alert('Code submitted successfully!');
      setOutput(response.data.message);
    } catch (error) {
      alert(`Submission failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSavingDesign(false);
    }
  };

  // Testbench actions have their own independent states and handlers
  const tbRunCode = async () => {
    if (!tbCode.trim()) {
      alert('Please write some testbench code first!');
      return;
    }
    setIsRunningTestbench(true);
    setOutput('Running testbench...');
    try {
      const response = await axios.post('/api/execute', {
        language: tbSelectedLanguage.value,
        code: tbCode,
        testCases: testCases,
      });
      setOutput(response.data.output);
      setResults(response.data.results || []);
    } catch (error) {
      setOutput(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsRunningTestbench(false);
    }
  };

  const tbSaveCode = async () => {
    const file = tbFiles.find((f) => f.id === tbActiveFileId);
    if (!file) return;
    setIsSavingTestbench(true);
    await saveLocally({ file, content: tbCode, updateFiles: setTbFiles, fileId: tbActiveFileId, namespace: 'testbench' });
    setIsSavingTestbench(false);
  };

  const tbDeleteFileById = (fileId) => {
    if (tbFiles.length <= 1) {
      alert('At least one testbench file must remain.');
      return;
    }
    const remaining = tbFiles.filter((f) => f.id !== fileId);
    setTbFiles(remaining);
    if (fileId === tbActiveFileId) {
      const next = remaining[remaining.length - 1];
      if (next) {
        setTbActiveFileId(next.id);
        setTbCode(next.content || '');
      }
    }
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  const formatTbCode = () => {
    if (tbEditorRef.current) {
      tbEditorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  // Utility: download current file to local machine
  const downloadFile = (filename, content) => {
    const blob = new Blob([content ?? ''], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'untitled.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // File System Access API helpers (saves locally without download)
  const hasFSAccess = () => typeof window !== 'undefined' && 'showSaveFilePicker' in window;

  const pickFileHandle = async (suggestedName, extension) => {
    const opts = {
      suggestedName: suggestedName || 'untitled' + (extension || ''),
      types: extension
        ? [
            {
              description: 'Source file',
              accept: { 'text/plain': [extension] },
            },
          ]
        : undefined,
    };
    // @ts-ignore - available in Chromium-based browsers
    return await window.showSaveFilePicker(opts);
  };

  const writeToHandle = async (handle, content) => {
    const writable = await handle.createWritable();
    await writable.write(content ?? '');
    await writable.close();
  };

  const saveLocally = async ({
    file,
    content,
    updateFiles,
    fileId,
    namespace,
  }) => {
    try {
      if (hasFSAccess()) {
        let handle = file.handle;
        if (!handle) {
          handle = await pickFileHandle(file.name, file.extension);
        }
        await writeToHandle(handle, content);
        updateFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, isDirty: false, content, handle } : f))
        );
      } else {
        // Fallback: persist to localStorage
        const key = `codebox:${namespace}:${file.name}`;
        window.localStorage.setItem(key, content ?? '');
        updateFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, isDirty: false, content } : f)));
      }
    } catch (err) {
      console.error('Save failed', err);
      alert('Save failed. Please try again.');
    }
  };

  const resetCode = () => {
    setCode(sampleCodes[selectedLanguage.value] || '');
    setOutput('');
    setResults([]);
  };

  return (
    <div style={{ transform: 'scale(0.7)', transformOrigin: 'top left', width: '142.8571%' }}>
      <div className={styles.codeTestContainer}>
        {/* <div className={styles.header}>
        <h3 className={styles.title}>Your CodeBox </h3>
        <div className={styles.languageSelector}>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            options={languageOptions}
            className={styles.selectContainer}
            classNamePrefix="select"
            placeholder="Select Language"
          />
        </div>
      </div> */}

        {/* Combined layout: Editor | Test Cases (top), Results (bottom) */}
        {/* <div className={styles.mainContent}> */}
        <div className={styles.topRow}>
          <div className={`${styles.frame} ${styles.editorSection}`}>
            <div className={styles.frameHeader}>
              Design Code
              <button
                className={styles.addBtn}
                onClick={addFile}
              >
                +
              </button>
              <button
                className={`${styles.addBtn} ${isSubmitting ? styles.disabled : ''}`}
                onClick={saveActiveFile}
                disabled={isSubmitting}
              >
                Save
              </button>
              <button
                className={`${styles.addBtn} ${isSubmitting ? styles.disabled : ''}`}
                onClick={deleteActiveFile}
                disabled={isSubmitting}
              >
                Delete
              </button>
              <div className={styles.actionButtons}>
                <button
                  className={`${styles.submitBtn} ${isSavingDesign ? styles.disabled : ''}`}
                  onClick={submitCode}
                  disabled={isSavingDesign}
                >
                  {isSavingDesign ? 'Saving...' : 'Save Code'}
                </button>
                <button
                  className={`${styles.runBtn} ${isRunningDesign ? styles.disabled : ''}`}
                  onClick={runCode}
                  disabled={isRunningDesign}
                >
                  {isRunningDesign ? 'Running...' : 'Run Design'}
                </button>


                <div className={styles.languageSelector}>
                  <Select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    options={languageOptions}
                    className={styles.selectContainer}
                    classNamePrefix="select"
                    placeholder="Select Language"
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, padding: '8px 12px', borderBottom: '1px solid #2b2b2b', alignItems: 'center' }}>
              {files.map((f) => (
              <div key={f.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                {renamingFileId === f.id ? (
                  <input
                    autoFocus
                    value={renameDraft}
                    onChange={(e) => setRenameDraft(e.target.value)}
                    onBlur={() => {
                      const newName = renameDraft.trim() || f.name;
                      setFiles((prev) => prev.map((x) => (x.id === f.id ? { ...x, name: newName } : x)));
                      setRenamingFileId(null);
                      setRenameDraft('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const newName = renameDraft.trim() || f.name;
                        setFiles((prev) => prev.map((x) => (x.id === f.id ? { ...x, name: newName } : x)));
                        setRenamingFileId(null);
                        setRenameDraft('');
                      } else if (e.key === 'Escape') {
                        setRenamingFileId(null);
                        setRenameDraft('');
                      }
                    }}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 4,
                      border: '1px solid #333',
                      background: '#1f1f1f',
                      color: '#eee',
                      minWidth: 120
                    }}
                  />
                ) : (
                  <button
                    onDoubleClick={() => {
                      setRenamingFileId(f.id);
                      setRenameDraft(f.name);
                    }}
                    onClick={() => switchActiveFile(f.id)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 4,
                      border: '1px solid #333',
                      background: f.id === activeFileId ? '#3a3a3a' : '#1f1f1f',
                      color: '#eee',
                      cursor: 'pointer'
                    }}
                  >
                    {f.name}{f.isDirty ? '*' : ''}
                  </button>
                )}
                <button
                  title="Close file"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFileById(f.id);
                  }}
                  style={{
                    padding: '2px 6px',
                    borderRadius: 4,
                    border: '1px solid #333',
                    background: '#7a1f1f',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  x
                </button>
              </div>
              ))}
            </div>

            <div className={styles.editorContainer}>
              <Editor
                height="100%"
                language={files.find((f) => f.id === activeFileId)?.monaco || selectedLanguage.monaco}
                value={code}
                onChange={(value) => {
                  const next = value || '';
                  setCode(next);
                setFiles((prev) => prev.map((f) => (f.id === activeFileId ? { ...f, content: next, isDirty: true } : f)));
                }}
                onMount={handleEditorMount}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          <div className={`${styles.frame} ${styles.testCasesSection}`}>
            <div className={styles.frameHeader}>
              Testbench Code
              <button
                className={styles.addBtn}
                onClick={() => {
                  const count = ++tbUntitledCounterRef.current;
                  const ext = tbSelectedLanguage.extension || '';
                  const newId = ++tbFileIdCounterRef.current;
                  const template = getTbTemplateForLanguage(tbSelectedLanguage.value);
                  const newFile = {
                    id: newId,
                    name: `tb_untitled${count}${ext}`,
                    language: tbSelectedLanguage.value,
                    monaco: tbSelectedLanguage.monaco,
                    extension: ext,
                    content: template,
                    isDirty: true,
                  };
                  setTbFiles((prev) => [...prev, newFile]);
                  setTbActiveFileId(newId);
                  setTbCode(template);
                }}
              >
                +
              </button>
              <button
                className={styles.addBtn}
                onClick={async () => {
                  const file = tbFiles.find((f) => f.id === tbActiveFileId);
                  if (!file) return;
                  await saveLocally({ file, content: tbCode, updateFiles: setTbFiles, fileId: tbActiveFileId, namespace: 'testbench' });
                }}
              >
                Save
              </button>
              <button
                className={styles.addBtn}
                onClick={() => {
                  if (tbFiles.length <= 1) {
                    alert('At least one testbench file must remain.');
                    return;
                  }
                  setTbFiles((prev) => prev.filter((f) => f.id !== tbActiveFileId));
                  const remaining = tbFiles.filter((f) => f.id !== tbActiveFileId);
                  const next = remaining[remaining.length - 1];
                  if (next) {
                    setTbActiveFileId(next.id);
                    setTbCode(next.content || '');
                  }
                }}
              >
                Delete
              </button>
              <div className={styles.actionButtons}>
                <button
                  className={`${styles.submitBtn} ${isSavingTestbench ? styles.disabled : ''}`}
                  onClick={tbSaveCode}
                  disabled={isSavingTestbench}
                >
                  {isSavingTestbench ? 'Saving...' : 'Save TB'}
                </button>
                <button
                  className={`${styles.runBtn} ${isRunningTestbench ? styles.disabled : ''}`}
                  onClick={tbRunCode}
                  disabled={isRunningTestbench}
                >
                  {isRunningTestbench ? 'Running...' : 'Run TB'}
                </button>


                <div className={styles.languageSelector}>
                  <Select
                    value={tbSelectedLanguage}
                    onChange={handleTbLanguageChange}
                    options={languageOptions}
                    className={styles.selectContainer}
                    classNamePrefix="select"
                    placeholder="Select Language"
                  />
                </div>
              </div>
              
            </div>
              <div style={{ display: 'flex', gap: 8, padding: '8px 12px', borderBottom: '1px solid #2b2b2b', alignItems: 'center' }}>
            {tbFiles.map((f) => (
              <div key={f.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                {tbRenamingFileId === f.id ? (
                  <input
                    autoFocus
                    value={tbRenameDraft}
                    onChange={(e) => setTbRenameDraft(e.target.value)}
                    onBlur={() => {
                      const newName = tbRenameDraft.trim() || f.name;
                      setTbFiles((prev) => prev.map((x) => (x.id === f.id ? { ...x, name: newName } : x)));
                      setTbRenamingFileId(null);
                      setTbRenameDraft('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const newName = tbRenameDraft.trim() || f.name;
                        setTbFiles((prev) => prev.map((x) => (x.id === f.id ? { ...x, name: newName } : x)));
                        setTbRenamingFileId(null);
                        setTbRenameDraft('');
                      } else if (e.key === 'Escape') {
                        setTbRenamingFileId(null);
                        setTbRenameDraft('');
                      }
                    }}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 4,
                      border: '1px solid #333',
                      background: '#1f1f1f',
                      color: '#eee',
                      minWidth: 120
                    }}
                  />
                ) : (
                  <button
                    onDoubleClick={() => {
                      setTbRenamingFileId(f.id);
                      setTbRenameDraft(f.name);
                    }}
                    onClick={() => {
                      setTbActiveFileId(f.id);
                      setTbCode(f.content || '');
                    }}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 4,
                      border: '1px solid #333',
                      background: f.id === tbActiveFileId ? '#3a3a3a' : '#1f1f1f',
                      color: '#eee',
                      cursor: 'pointer'
                    }}
                  >
                    {f.name}{f.isDirty ? '*' : ''}
                  </button>
                )}
                <button
                  title="Close file"
                  onClick={(e) => {
                    e.stopPropagation();
                    tbDeleteFileById(f.id);
                  }}
                  style={{
                    padding: '2px 6px',
                    borderRadius: 4,
                    border: '1px solid #333',
                    background: '#7a1f1f',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  x
                </button>
              </div>
              ))}
            </div>
            <div className={styles.editorContainer}>
              <Editor
                height="100%"
                language={tbSelectedLanguage.monaco}
                value={tbCode}
              onChange={(value) => {
                const next = value || '';
                setTbCode(next);
                setTbFiles((prev) => prev.map((f) => (f.id === tbActiveFileId ? { ...f, content: next, isDirty: true } : f)));
              }}
                onMount={handleTbEditorMount}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>

          </div>
        </div>

        <div className={`${styles.frame} ${styles.resultsFrame}`}>
          <div className={styles.frameHeader}>
            Results
          </div>

          {/* <div className={styles.frameScrollable}> */}


        </div>


        {/* <div className={styles.actionButtons}>
        <button
          className={`${styles.runBtn} ${isSubmitting ? styles.disabled : ''}`}
          onClick={runCode}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Running...' : 'Run Design'}
        </button>
        <button
          className={`${styles.submitBtn} ${isSubmitting ? styles.disabled : ''}`}
          onClick={submitCode}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Code'}
        </button>
      </div> */}
      </div>
    </div>
  );
};

export default CodeTest; 