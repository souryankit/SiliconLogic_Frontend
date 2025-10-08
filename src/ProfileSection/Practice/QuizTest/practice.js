import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from "react-router-dom";
import { auth, addTestResultInDatabase, db } from "../../../Utils/firebase";
import { serverTimestamp } from "firebase/firestore";
import styles from './practice.module.css';

// import {
//   Button,
//   Typography,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Paper,
//   Container,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';

// This is a complete React application that fetches questions from Firebase
// First, we need to include the Firebase SDK
// Note: In a real application, you would install these packages via npm
// and import them properly

function Practice() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Get URL parameters for quiz information
  const urlParams = new URLSearchParams(window.location.search);
  const quizTitle = urlParams.get('quiz') || 'General Quiz';
  const quizCategory = urlParams.get('category') || 'General';
  const quizDifficulty = urlParams.get('difficulty') || 'Beginner';

  // State for the test
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(30 * 60); // 30 minutes in seconds
  const [answers, setAnswers] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [selectedQuestions, setSelectedQuestions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  

  
  // Firebase configuration
  // In a real application, you would store these in environment variables
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase (this would normally be done once at the app level)
  React.useEffect(() => {
    // This is a mock implementation since we can't actually initialize Firebase in this playground
    console.log("Firebase would be initialized here with:", firebaseConfig);
    
    // Fetch questions from Firebase
    fetchQuestionsFromFirebase();
  }, []);
  
  // Function to get questions based on category and difficulty
  const getQuestionsByCategory = (category, difficulty) => {
    const questionSets = {
      "VLSI Design": [
        {
          id: "vlsi1",
          question: "What does VLSI stand for?",
          options: ["Very Large Scale Integration", "Variable Logic System Interface", "Virtual Logic Scale Integration", "Voltage Level Scale Interface"],
          correctAnswer: 0
        },
        {
          id: "vlsi2",
          question: "Which process technology refers to smaller transistor sizes?",
          options: ["180nm", "90nm", "45nm", "7nm"],
          correctAnswer: 3
        },
        {
          id: "vlsi3",
          question: "What is the primary advantage of FinFET technology?",
          options: ["Lower cost", "Better power control", "Larger transistors", "Simpler manufacturing"],
          correctAnswer: 1
        }
      ],
      "Circuit Design": [
        {
          id: "circuit1",
          question: "What is Ohm's Law?",
          options: ["V = I × R", "I = V × R", "R = V × I", "P = V × I"],
          correctAnswer: 0
        },
        {
          id: "circuit2",
          question: "Which component stores electrical energy in an electric field?",
          options: ["Resistor", "Inductor", "Capacitor", "Transformer"],
          correctAnswer: 2
        },
        {
          id: "circuit3",
          question: "What is the unit of capacitance?",
          options: ["Henry", "Farad", "Ohm", "Volt"],
          correctAnswer: 1
        }
      ],
      "AI Tech": [
        {
          id: "ai1",
          question: "What is machine learning?",
          options: ["Programming computers to learn manually", "A subset of AI that learns from data", "A type of hardware", "A programming language"],
          correctAnswer: 1
        },
        {
          id: "ai2",
          question: "Which algorithm is commonly used for classification?",
          options: ["Linear Regression", "K-Means", "Decision Tree", "PCA"],
          correctAnswer: 2
        },
        {
          id: "ai3",
          question: "What is a neural network?",
          options: ["A network of computers", "A biological brain", "A computational model inspired by biological neurons", "A type of database"],
          correctAnswer: 2
        }
      ],
      "Embedded/IoT": [
        {
          id: "embedded1",
          question: "What is a microcontroller?",
          options: ["A small computer on a single chip", "A type of memory", "A programming language", "A communication protocol"],
          correctAnswer: 0
        },
        {
          id: "embedded2",
          question: "Which communication protocol is commonly used in IoT?",
          options: ["HTTP", "MQTT", "FTP", "SMTP"],
          correctAnswer: 1
        },
        {
          id: "embedded3",
          question: "What does GPIO stand for?",
          options: ["General Purpose Input/Output", "Global Programming Interface Option", "General Protocol Input/Output", "Global Purpose Interface Operation"],
          correctAnswer: 0
        }
      ],
      "Signal Processing": [
        {
          id: "dsp1",
          question: "What does DSP stand for?",
          options: ["Digital Signal Processing", "Data Signal Protocol", "Digital System Programming", "Data System Processing"],
          correctAnswer: 0
        },
        {
          id: "dsp2",
          question: "What is the Nyquist frequency?",
          options: ["Half the sampling frequency", "Twice the sampling frequency", "The sampling frequency", "Quarter of the sampling frequency"],
          correctAnswer: 0
        },
        {
          id: "dsp3",
          question: "Which transform is commonly used in signal analysis?",
          options: ["Laplace Transform", "Z-Transform", "Fourier Transform", "All of the above"],
          correctAnswer: 3
        }
      ],
      "Antenna": [
        {
          id: "antenna1",
          question: "What is antenna gain?",
          options: ["Power amplification", "Directional efficiency", "Signal strength", "Frequency response"],
          correctAnswer: 1
        },
        {
          id: "antenna2",
          question: "What is the radiation pattern of an isotropic antenna?",
          options: ["Directional", "Spherical", "Linear", "Elliptical"],
          correctAnswer: 1
        },
        {
          id: "antenna3",
          question: "What does VSWR stand for?",
          options: ["Very Small Wave Ratio", "Voltage Standing Wave Ratio", "Variable Signal Wave Rate", "Voltage Signal Wave Rate"],
          correctAnswer: 1
        }
      ],
      "Mobile Communication": [
        {
          id: "mobile1",
          question: "What does GSM stand for?",
          options: ["Global System for Mobile communications", "General Signal Method", "Global Signal Management", "General System for Mobile"],
          correctAnswer: 0
        },
        {
          id: "mobile2",
          question: "Which generation introduced LTE technology?",
          options: ["2G", "3G", "4G", "5G"],
          correctAnswer: 2
        },
        {
          id: "mobile3",
          question: "What is the main advantage of 5G over 4G?",
          options: ["Lower cost", "Larger coverage", "Higher speed and lower latency", "Better security"],
          correctAnswer: 2
        }
      ]
    };

    // Default to React questions if category not found
    const defaultQuestions = [
        {
          id: "q1",
          question: "What is React?",
          options: [
            "A JavaScript library for building user interfaces",
            "A programming language",
            "A database management system",
            "An operating system"
          ],
          correctAnswer: 0
        },
        {
          id: "q2",
          question: "Which hook is used for side effects in React?",
          options: [
            "useState",
            "useEffect",
            "useContext",
            "useReducer"
          ],
          correctAnswer: 1
        },
        {
          id: "q3",
          question: "What does JSX stand for?",
          options: [
            "JavaScript XML",
            "JavaScript Extension",
            "JavaScript Syntax",
            "Java Syntax Extension"
          ],
          correctAnswer: 0
        },
        {
          id: "q4",
          question: "Which of the following is NOT a React Hook?",
          options: [
            "useState",
            "useEffect",
            "useHistory",
            "useCallback"
          ],
          correctAnswer: 2
        },
        {
          id: "q5",
          question: "What is the virtual DOM?",
          options: [
            "A direct copy of the real DOM",
            "A lightweight copy of the real DOM in memory",
            "A browser feature",
            "A JavaScript engine"
          ],
          correctAnswer: 1
        }
      ];

    // Return questions for the specified category or default questions
    return questionSets[category] || defaultQuestions;
  };

  // Function to fetch questions from Firebase
  const fetchQuestionsFromFirebase = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get questions based on category
      const questionsForCategory = getQuestionsByCategory(quizCategory, quizDifficulty);
      
      // For this demo, we'll use the questions from the category
      // In a real application, you would fetch from Firebase:
      // const db = firebase.firestore();
      // const questionsSnapshot = await db.collection('questions')
      //   .where('category', '==', quizCategory)
      //   .where('difficulty', '==', quizDifficulty)
      //   .get();
      
      // Take the appropriate number of questions based on difficulty
      const questionCount = quizDifficulty === 'Beginner' ? 3 : 
                          quizDifficulty === 'Intermediate' ? 5 : 10;
      //Can be taken random selected questions from database
      const selectedQuestions = questionsForCategory.slice(0, questionCount);
      
      setSelectedQuestions(selectedQuestions);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions. Please try again ...");
      setIsLoading(false);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle timer
  React.useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  // Handle answer selection
  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Handle test submission
  const handleSubmit = async () => {
    setIsSubmitted(true);
    
    // Save the test results to Firebase
    await saveResultsToFirebase(answers);
  };
  
  // Function to save results to Firebase
  const saveResultsToFirebase = async (userAnswers) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No authenticated user found");
        return;
      }

      const score = calculateScore();
      const incorrectAnswers = selectedQuestions.length - score;
      
      const testResult = {
        userId: user.uid,
        studentName: user.displayName || "Student",
        quizTitle: quizTitle,
        quizCategory: quizCategory,
        quizDifficulty: quizDifficulty,
        answers: userAnswers,
        score: score,
        correctAnswers: score,
        incorrectAnswers: incorrectAnswers,
        totalQuestions: selectedQuestions.length,
        timestamp: serverTimestamp(),
        timeSpent: (30 * 60) - timeLeft, // Calculate time spent in seconds
        questionsData: selectedQuestions // Save the actual questions for future reference
      };

      await addTestResultInDatabase(testResult);
      console.log("Test results saved successfully:", testResult);
    } catch (err) {
      console.error("Error saving test results:", err);
    }
  };

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    selectedQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  // Reset test
  const resetTest = () => {
    setCurrentQuestion(0);
    setTimeLeft(30 * 60);
    setAnswers({});
    setIsSubmitted(false);
    fetchQuestionsFromFirebase();
  };

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loaderText}>Loading Test Questions...</div>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>Error</div>
          <p className={styles.errorMessage}>{error}</p>
          <button 
            onClick={() => fetchQuestionsFromFirebase()}
            className={styles.tryAgainBtn}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.testContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>{quizTitle}</h1>
          <div className={styles.timerContainer}>
            <div className={`${styles.timer} ${timeLeft < 300 ? styles.warning : ''}`}>
              Time Left: {formatTime(timeLeft)}
            </div>
            {!isSubmitted && (
              <button 
                onClick={handleSubmit}
                className={styles.submitBtn}
              >
                Submit Test
              </button>
            )}
          </div>
        </div>

        {!isSubmitted ? (
          <div className={styles.content}>
            <div className={styles.questionHeader}>
              <div className={styles.questionCounter}>
                Question {currentQuestion + 1} of {selectedQuestions.length}
              </div>
              <div className={styles.answeredCounter}>
                {Object.keys(answers).length} of {selectedQuestions.length} answered
              </div>
            </div>

            <div className={styles.questionText}>
              {selectedQuestions[currentQuestion].question}
            </div>
            
            <div className={styles.optionsContainer}>
              {selectedQuestions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index}
                  className={`${styles.option} ${answers[selectedQuestions[currentQuestion].id] === index ? styles.optionSelected : ''}`}
                  onClick={() => handleAnswerSelect(selectedQuestions[currentQuestion].id, index)}
                >
                  <input
                    type="radio"
                    className={styles.radioInput}
                    checked={answers[selectedQuestions[currentQuestion].id] === index}
                    onChange={() => handleAnswerSelect(selectedQuestions[currentQuestion].id, index)}
                  />
                  <span className={styles.optionText}>{option}</span>
                </div>
              ))}
            </div>

            <div className={styles.navigationBtns}>
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`${styles.prevBtn} ${currentQuestion === 0 ? styles.disabledBtn : ''}`}
              >
                Previous
              </button>
              <button
                onClick={nextQuestion}
                disabled={currentQuestion === selectedQuestions.length - 1}
                className={`${styles.nextBtn} ${currentQuestion === selectedQuestions.length - 1 ? styles.disabledBtn : ''}`}
              >
                Next
              </button>
            </div>

            <div className={styles.questionsNav}>
              {selectedQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`${styles.questionBtn} ${answers[q.id] !== undefined ? styles.answeredQuestionBtn : ''} ${currentQuestion === index ? styles.currentQuestionBtn : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.results}>
            <h2 className={styles.resultsTitle}>Test Completed!</h2>
            <p className={styles.score}>
              Your Score: <span className={styles.scoreValue}>{calculateScore()}</span> out of {selectedQuestions.length}
            </p>
            
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{
                  width: `${(calculateScore() / selectedQuestions.length) * 100}%`
                }}
              ></div>
            </div>
            <p className={styles.percentage}>
              {Math.round((calculateScore() / selectedQuestions.length) * 100)}% correct
            </p>
            
            <div className={styles.reviewContainer}>
              <h3 className={styles.reviewHeading}>Review Answers:</h3>
              {selectedQuestions.map((q, index) => (
                <div key={index} className={styles.reviewItem}>
                  <p className={styles.reviewQuestion}>Question {index + 1}: {q.question}</p>
                  <p className={styles.userAnswer}>
                    Your answer: <span className={answers[q.id] === q.correctAnswer ? styles.correctAnswer : styles.incorrectAnswer}>
                      {answers[q.id] !== undefined ? q.options[answers[q.id]] : "Not answered"}
                    </span>
                  </p>
                  {answers[q.id] !== q.correctAnswer && (
                    <p className={`${styles.userAnswer} ${styles.correctAnswer}`}>
                      Correct answer: {q.options[q.correctAnswer]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
              <button
                onClick={resetTest}
                className={styles.retakeBtn}
              >
                Retake Test
              </button>
              <button
                onClick={() => navigate('/dashboard/testhistory')}
                className={styles.retakeBtn}
                style={{backgroundColor: '#6b7280'}}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Practice;