import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TestDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [testData, setTestData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get test data from navigation state
        if (location.state && location.state.testData) {
            setTestData(location.state.testData);
            setLoading(false);
        } else {
            // If no data provided, redirect back to test history
            navigate('/dashboard/testhistory');
        }
    }, [location.state, navigate]);

    // Format date for display
    const formatDate = (timestamp) => {
        if (!timestamp) return "Date not available";
        
        try {
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (err) {
            return "Date not available";
        }
    };

    // Calculate pass/fail status
    const getResultStatus = (score, totalQuestions) => {
        const percentage = (score / totalQuestions) * 100;
        return percentage >= 70 ? "Pass" : "Fail";
    };

    // Get badge class for result
    const getResultBadgeClass = (score, totalQuestions) => {
        const status = getResultStatus(score, totalQuestions);
        return status === "Pass" ? "badge-light-success" : "badge-light-danger";
    };

    // Format time duration
    const formatDuration = (seconds) => {
        if (!seconds) return "N/A";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    if (loading) {
        return (
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="settings-widget card-details">
                                <div className="settings-menu p-0">
                                    <div className="profile-heading">
                                        <h3>Test Details</h3>
                                    </div>
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        <p className="mt-3">Loading test details...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!testData) {
        return (
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="settings-widget card-details">
                                <div className="settings-menu p-0">
                                    <div className="profile-heading">
                                        <h3>Test Details</h3>
                                    </div>
                                    <div className="text-center py-5">
                                        <div className="alert alert-warning">
                                            <h5>No Data Available</h5>
                                            <p>Test details not found.</p>
                                            <button 
                                                className="btn btn-primary"
                                                onClick={() => navigate('/dashboard/testhistory')}
                                            >
                                                Back to Test History
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const percentage = Math.round((testData.score / testData.totalQuestions) * 100);

    return (
        <div className="page-content">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="settings-widget card-details">
                            <div className="settings-menu p-0">
                                <div className="profile-heading d-flex justify-content-between align-items-center">
                                    <h3>Test Details</h3>
                                    <button 
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/dashboard/testhistory')}
                                    >
                                        <i className="bx bx-arrow-back"></i> Back to History
                                    </button>
                                </div>
                                
                                {/* Test Summary */}
                                <div className="checkout-form">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card mb-4">
                                                <div className="card-body">
                                                    <h5 className="card-title">Test Summary</h5>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <p><strong>Quiz Title:</strong> {testData.quizTitle || "Quiz"}</p>
                                                            <p><strong>Category:</strong> {testData.quizCategory || "General"}</p>
                                                            <p><strong>Difficulty:</strong> {testData.quizDifficulty || "Beginner"}</p>
                                                            <p><strong>Student:</strong> {testData.studentName || "Student"}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p><strong>Date Taken:</strong> {formatDate(testData.timestamp)}</p>
                                                            <p><strong>Time Spent:</strong> {formatDuration(testData.timeSpent)}</p>
                                                            <p><strong>Total Questions:</strong> {testData.totalQuestions}</p>
                                                            <p><strong>Result:</strong> 
                                                                <span className={`ms-2 resut-badge ${getResultBadgeClass(testData.score, testData.totalQuestions)}`}>
                                                                    {getResultStatus(testData.score, testData.totalQuestions)}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Score Summary */}
                                        <div className="col-md-4">
                                            <div className="card mb-4">
                                                <div className="card-body text-center">
                                                    <h5 className="card-title">Score Summary</h5>
                                                    <div className="score-circle mx-auto mb-3" style={{
                                                        width: '120px',
                                                        height: '120px',
                                                        borderRadius: '50%',
                                                        background: `conic-gradient(#28a745 0deg ${percentage * 3.6}deg, #e9ecef ${percentage * 3.6}deg 360deg)`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '24px',
                                                        fontWeight: 'bold',
                                                        color: '#333'
                                                    }}>
                                                        {percentage}%
                                                    </div>
                                                    <p><strong>Score:</strong> {testData.score}/{testData.totalQuestions}</p>
                                                    <p><strong>Correct:</strong> {testData.correctAnswers || testData.score}</p>
                                                    <p><strong>Incorrect:</strong> {testData.incorrectAnswers || (testData.totalQuestions - testData.score)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Question-by-Question Review */}
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Question-by-Question Review</h5>
                                            
                                            {testData.questionsData && testData.questionsData.length > 0 ? (
                                                <div className="questions-review">
                                                    {testData.questionsData.map((question, index) => {
                                                        const userAnswer = testData.answers ? testData.answers[question.id] : null;
                                                        const isCorrect = userAnswer === question.correctAnswer;
                                                        
                                                        return (
                                                            <div key={index} className="question-item mb-4 p-3 border rounded">
                                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                                    <h6 className="mb-0">Question {index + 1}</h6>
                                                                    <span className={`badge ${isCorrect ? 'badge-success' : 'badge-danger'}`}>
                                                                        {isCorrect ? 'Correct' : 'Incorrect'}
                                                                    </span>
                                                                </div>
                                                                
                                                                <p className="question-text mb-3">
                                                                    <strong>{question.question}</strong>
                                                                </p>
                                                                
                                                                <div className="options mb-3">
                                                                    {question.options && question.options.map((option, optionIndex) => (
                                                                        <div 
                                                                            key={optionIndex} 
                                                                            className={`option-item p-2 mb-2 rounded ${
                                                                                optionIndex === question.correctAnswer 
                                                                                    ? 'bg-success text-white' 
                                                                                    : optionIndex === userAnswer && userAnswer !== question.correctAnswer
                                                                                    ? 'bg-danger text-white'
                                                                                    : 'bg-light'
                                                                            }`}
                                                                        >
                                                                            <div className="d-flex align-items-center">
                                                                                <span className="option-letter me-2 fw-bold">
                                                                                    {String.fromCharCode(65 + optionIndex)}.
                                                                                </span>
                                                                                <span>{option}</span>
                                                                                {optionIndex === question.correctAnswer && (
                                                                                    <i className="bx bx-check-circle ms-auto"></i>
                                                                                )}
                                                                                {optionIndex === userAnswer && userAnswer !== question.correctAnswer && (
                                                                                    <i className="bx bx-x-circle ms-auto"></i>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                
                                                                <div className="answer-summary">
                                                                    <p className="mb-1">
                                                                        <strong>Your Answer:</strong> 
                                                                        <span className={`ms-2 ${isCorrect ? 'text-success' : 'text-danger'}`}>
                                                                            {userAnswer !== null && userAnswer !== undefined 
                                                                                ? `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}`
                                                                                : 'Not answered'
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                    {!isCorrect && (
                                                                        <p className="mb-0">
                                                                            <strong>Correct Answer:</strong> 
                                                                            <span className="ms-2 text-success">
                                                                                {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                                                                            </span>
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="text-center py-4">
                                                    <p className="text-muted">Question details not available for this test.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestDetails; 