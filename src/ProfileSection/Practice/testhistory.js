import { React, useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { auth, getAllTestResultsForUser } from "../../Utils/firebase";

const TestHistory = () => {
    const [testResults, setTestResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage] = useState(6); // Show 6 results per page
    const navigate = useNavigate();

    // Fetch test results for the current user
    const fetchTestResults = async () => {
        try {
            setLoading(true);
            const user = auth.currentUser;
            
            if (!user) {
                setError("Please login to view test history");
                setLoading(false);
                return;
            }

            const querySnapshot = await getAllTestResultsForUser(user.uid);
            const results = [];
            
            querySnapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Sort by timestamp (most recent first)
            results.sort((a, b) => {
                if (a.timestamp && b.timestamp) {
                    return b.timestamp.toDate() - a.timestamp.toDate();
                }
                return 0;
            });

            setTestResults(results);
            setError(null);
        } catch (err) {
            console.error("Error fetching test results:", err);
            setError("Failed to load test history. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestResults();
    }, []);

    // Calculate pagination
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = testResults.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(testResults.length / resultsPerPage);

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

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // If no test results and not loading, show some sample data for demonstration
    const getSampleData = () => {
        return [
            {
                id: "sample1",
                timestamp: new Date("2024-03-12T17:40:00"),
                quizTitle: "React Fundamentals Quiz",
                totalQuestions: 2,
                score: 1,
                correctAnswers: 1,
                incorrectAnswers: 1,
                userId: "demo"
            },
            {
                id: "sample2", 
                timestamp: new Date("2024-03-05T16:15:00"),
                quizTitle: "JavaScript Basics Quiz",
                totalQuestions: 3,
                score: 2,
                correctAnswers: 2,
                incorrectAnswers: 1,
                userId: "demo"
            },
            {
                id: "sample3",
                timestamp: new Date("2024-02-27T15:20:00"),
                quizTitle: "Web Development Quiz",
                totalQuestions: 5,
                score: 2,
                correctAnswers: 2,
                incorrectAnswers: 3,
                userId: "demo"
            }
        ];
    };

    // Use sample data if no real data exists
    const displayResults = testResults.length > 0 ? currentResults : getSampleData();

    if (loading) {
        return (
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="settings-widget card-details">
                                <div className="settings-menu p-0">
                                    <div className="profile-heading">
                                        <h3>My Quiz Attempts</h3>
                                    </div>
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        <p className="mt-3">Loading test history...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="settings-widget card-details">
                                <div className="settings-menu p-0">
                                    <div className="profile-heading">
                                        <h3>My Quiz Attempts</h3>
                                    </div>
                                    <div className="text-center py-5">
                                        <div className="alert alert-danger">
                                            <h5>Error</h5>
                                            <p>{error}</p>
                                            <button 
                                                className="btn btn-primary"
                                                onClick={fetchTestResults}
                                            >
                                                Retry
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

    return (
        <div>
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 ">
                            <div className="settings-widget card-details">
                                <div className="settings-menu p-0">
                                    <div className="profile-heading">
                                        <h3>My Quiz Attempts</h3>
                                        {testResults.length === 0 && (
                                            <p className="text-muted">Showing sample data - Take a quiz to see your actual results</p>
                                        )}
                                    </div>
                                    <div className="checkout-form">
                                        <div className="table-responsive custom-table">
                                            <table className="table table-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Quiz Info</th>
                                                        <th>Question</th>
                                                        <th>Total Marks</th>
                                                        <th>Correct Answers</th>
                                                        <th>Incorrect Answers</th>
                                                        <th>Earned Marks</th>
                                                        <th>Result</th>
                                                        <th>Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {displayResults.map((result) => {
                                                        const percentage = Math.round((result.score / result.totalQuestions) * 100);
                                                        return (
                                                            <tr key={result.id}>
                                                                <td>
                                                                    <div className="quiz-table">
                                                                        <p>{formatDate(result.timestamp)}</p>
                                                                        <p>{result.quizTitle || "Quiz"} <i className="bx bx-info-circle"></i></p>
                                                                        <p><span>Category</span> : {result.quizCategory || "General"} | <span>Level</span> : {result.quizDifficulty || "Beginner"}</p>
                                                                        <p><span>Student</span> : {result.studentName || "Student"} </p>
                                                                    </div>
                                                                </td>
                                                                <td>{result.totalQuestions}</td>
                                                                <td>{result.totalQuestions}</td>
                                                                <td>{result.correctAnswers || result.score}</td>
                                                                <td>{result.incorrectAnswers || (result.totalQuestions - result.score)}</td>
                                                                <td>{result.score}({percentage}%)</td>
                                                                <td>
                                                                    <span className={`resut-badge ${getResultBadgeClass(result.score, result.totalQuestions)}`}>
                                                                        {getResultStatus(result.score, result.totalQuestions)}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button 
                                                                        className="btn btn-light-danger quiz-view"
                                                                        onClick={() => {
                                                                            navigate('/dashboard/testdetails', { 
                                                                                state: { testData: result } 
                                                                            });
                                                                        }}
                                                                    >
                                                                        Details
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                    {displayResults.length === 0 && (
                                                        <tr>
                                                            <td colSpan="8" className="text-center py-4">
                                                                <p className="text-muted">No quiz attempts found. Take a quiz to see your results here!</p>
                                                                <Link to="/dashboard/practice" className="btn btn-primary">
                                                                    Take a Quiz
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Only show pagination if there are real results */}
                            {testResults.length > resultsPerPage && (
                                <div className="dash-pagination">
                                    <div className="row align-items-center">
                                        <div className="col-6">
                                            <p>Page {currentPage} of {totalPages}</p>
                                        </div>
                                        <div className="col-6">
                                            <ul className="pagination">
                                                {/* Previous button */}
                                                {currentPage > 1 && (
                                                    <li>
                                                        <button 
                                                            onClick={() => handlePageChange(currentPage - 1)}
                                                            style={{border: 'none', background: 'none'}}
                                                        >
                                                            <i className="fa fa-angle-left"></i>
                                                        </button>
                                                    </li>
                                                )}
                                                
                                                {/* Page numbers */}
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                                    <li key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>
                                                        <button 
                                                            onClick={() => handlePageChange(pageNumber)}
                                                            style={{border: 'none', background: 'none'}}
                                                        >
                                                            {pageNumber}
                                                        </button>
                                                    </li>
                                                ))}
                                                
                                                {/* Next button */}
                                                {currentPage < totalPages && (
                                                    <li>
                                                        <button 
                                                            onClick={() => handlePageChange(currentPage + 1)}
                                                            style={{border: 'none', background: 'none'}}
                                                        >
                                                            <i className="fa fa-angle-right"></i>
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestHistory;