import React, { useState, useEffect, useRef } from 'react';
import {
    MDBIcon,
    MDBBtn,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardFooter,
    MDBBadge
} from 'mdb-react-ui-kit';
import './support.css';

// Common quick responses for different types of inquiries
const QuickResponses = [
    {
        category: "Admission",
        options: [
            "I need information about the admission process.",
            "When is the last date for application submission?",
            "What are the eligibility criteria for admission?",
            "How can I check my application status?",
            "Is there an entrance exam for admission?"
        ]
    },
    {
        category: "Academics",
        options: [
            "I need information about my course syllabus.",
            "When are the upcoming exams scheduled?",
            "How can I view my attendance record?",
            "How do I access course materials online?",
            "I need to speak with a faculty member."
        ]
    },
    {
        category: "Fees & Payment",
        options: [
            "I'm having issues making an online payment.",
            "What are the fee payment deadlines?",
            "Is there any fee concession available?",
            "How can I get a receipt for my payment?",
            "Can I pay my fees in installments?"
        ]
    },
    {
        category: "Technical Issues",
        options: [
            "I'm unable to login to my student portal.",
            "I can't access my email account.",
            "The website is showing an error message.",
            "I'm having trouble with online class access.",
            "My uploaded documents are not showing in my profile."
        ]
    }
];

// Auto responses for certain user queries
const AutoResponses = {
    'admission': "Thank you for your admission-related query. Our admissions office is open from Monday to Friday, 9 AM to 5 PM. For immediate assistance, please provide your application ID if you have one.",
    'payment': "For payment-related queries, please ensure you have your student ID and transaction details ready. Our finance office can help resolve any payment issues promptly.",
    'deadline': "Most academic deadlines are posted in the academic calendar on our website. If you need specific deadline information, please mention which program or activity you're inquiring about.",
    'login': "If you're experiencing login issues, please try clearing your browser cache and cookies, then restart your browser. If the problem persists, please provide the exact error message you're seeing.",
    'exam': "For exam-related queries, please specify which course or semester exam you're inquiring about. This will help us provide you with the most accurate information.",
    'certificate': "Certificate requests typically take 5-7 working days to process. If you've submitted a request, please provide your request ID for status updates.",
    'course': "For course-specific information, please mention the course code or full name so we can direct your query to the appropriate department.",
};

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showQuickResponses, setShowQuickResponses] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isOnline, setIsOnline] = useState(true);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Simulate random online/offline status changes for demonstration
    useEffect(() => {
        const interval = setInterval(() => {
            // 80% chance of being online
            setIsOnline(Math.random() < 0.8);
        }, 60000); // Check every minute
        
        return () => clearInterval(interval);
    }, []);

    // Initial welcome message
    useEffect(() => {
        setTimeout(() => {
            const welcomeMessage = {
                id: Date.now(),
                text: "Welcome to Silicon Institute student support chat! How can we assist you today? You can type your question or choose from our quick responses below.",
                sender: 'support',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isSystem: true
            };
            setMessages([welcomeMessage]);
        }, 1000);
    }, []);

    // Auto-scroll to bottom of chat when new messages come in
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const userMessage = {
            id: Date.now(),
            text: newMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setNewMessage('');
        setShowQuickResponses(false);

        // Show typing indicator
        setIsTyping(true);

        // Check for automatic responses based on keywords
        const lowerMessage = newMessage.toLowerCase();
        let autoResponseTriggered = false;

        for (const [keyword, response] of Object.entries(AutoResponses)) {
            if (lowerMessage.includes(keyword)) {
                setTimeout(() => {
                    const autoResponse = {
                        id: Date.now() + 1,
                        text: response,
                        sender: 'support',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        isAutomatic: true
                    };
                    setMessages(prevMessages => [...prevMessages, autoResponse]);
                    setIsTyping(false);
                }, 1500);
                autoResponseTriggered = true;
                break;
            }
        }

        // If no automatic response was triggered, send a generic response
        if (!autoResponseTriggered) {
            setTimeout(() => {
                const supportResponse = {
                    id: Date.now() + 1,
                    text: "Thank you for your message. A support representative will respond shortly. Our typical response time is within 15-30 minutes during business hours (9 AM - 5 PM, Monday to Friday).",
                    sender: 'support',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prevMessages => [...prevMessages, supportResponse]);
                setIsTyping(false);
                
                // After a short delay, suggest choosing a category for quick responses
                setTimeout(() => {
                    const categorySuggestion = {
                        id: Date.now() + 2,
                        text: "In the meantime, you can select a category below to see common questions:",
                        sender: 'support',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        isSystem: true,
                        showCategories: true
                    };
                    setMessages(prevMessages => [...prevMessages, categorySuggestion]);
                }, 2000);
            }, 2000);
        }
    };

    const handleQuickResponseSelect = (response) => {
        const userMessage = {
            id: Date.now(),
            text: response,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isQuickResponse: true
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setShowQuickResponses(false);
        
        // Show typing indicator
        setIsTyping(true);

        // Simulate response based on the quick response selected
        setTimeout(() => {
            let responseText = "";
            
            // Generate appropriate response based on the query
            if (response.includes("admission process")) {
                responseText = "Our admission process involves online application submission, document verification, entrance exam (if applicable), and interview. For detailed steps, please visit the Admissions section on our website or contact the Admissions Office at admissions@silicontech.com.";
            } else if (response.includes("last date")) {
                responseText = "The last date for application submission for the upcoming academic year is May 30th. We recommend completing your application at least a week before the deadline to avoid any technical issues.";
            } else if (response.includes("eligibility criteria")) {
                responseText = "Eligibility criteria vary by program. Generally, you need a minimum of 60% marks in your qualifying examination. For specific program requirements, please visit our website's admission page or provide the name of the program you're interested in.";
            } else if (response.includes("application status")) {
                responseText = "You can check your application status by logging into the student portal with your application ID and password. If you're having trouble accessing the portal, please provide your application ID so we can assist you.";
            } else if (response.includes("entrance exam")) {
                responseText = "Yes, most programs require an entrance examination. The exam schedule is published on our website. Would you like information about a specific program's entrance exam?";
            } else if (response.includes("course syllabus")) {
                responseText = "Course syllabi are available on your student portal under the 'Academics' section. If you're looking for a specific course syllabus, please provide the course code or name.";
            } else if (response.includes("exams scheduled")) {
                responseText = "The exam schedule for the current semester is available on your student portal. Mid-semester exams are typically held in the 8th week and end-semester exams in the 16th week of the semester.";
            } else if (response.includes("attendance record")) {
                responseText = "You can view your attendance record on the student portal under 'My Attendance'. If you notice any discrepancies, please contact your course instructor or the academic office.";
            } else if (response.includes("course materials")) {
                responseText = "Course materials are available on the Learning Management System (LMS). You can access them by logging in with your student credentials. If you're having trouble accessing specific materials, please provide the course details.";
            } else if (response.includes("faculty member")) {
                responseText = "You can contact faculty members through their official email addresses or during their office hours. The faculty directory with contact details is available on our website. Would you like contact information for a specific faculty member?";
            } else if (response.includes("issues making an online payment")) {
                responseText = "I'm sorry you're having trouble with online payment. This could be due to server issues, payment gateway problems, or banking restrictions. Please tell us what error message you're seeing or at which step the payment is failing.";
            } else if (response.includes("fee payment deadlines")) {
                responseText = "The fee payment deadline for the current semester is the 15th of this month. Late payments incur a penalty of 5% for the first week and 10% thereafter. Please ensure timely payment to avoid any inconvenience.";
            } else if (response.includes("fee concession")) {
                responseText = "Yes, fee concessions are available for students based on merit and financial need. You need to apply through the Financial Aid Office with supporting documents. Would you like more information about the application process?";
            } else if (response.includes("receipt for my payment")) {
                responseText = "Payment receipts are automatically generated and sent to your registered email address. You can also download them from the student portal under 'Fee Payment History'. If you haven't received a receipt, please provide your transaction ID.";
            } else if (response.includes("pay my fees in installments")) {
                responseText = "Yes, the institute offers a fee installment plan for eligible students. You need to apply for this at the beginning of the semester through the Financial Aid Office. There is a nominal processing fee for installment plans.";
            } else if (response.includes("unable to login")) {
                responseText = "I'm sorry you're having login issues. Please try these steps: 1) Clear browser cache, 2) Ensure caps lock is off, 3) Use the 'Forgot Password' option if needed. If the problem persists, please provide the error message you're seeing.";
            } else {
                responseText = "Thank you for your question. We'll get back to you with a detailed response shortly. Our support team is reviewing your inquiry.";
            }

            const supportResponse = {
                id: Date.now() + 1,
                text: responseText,
                sender: 'support',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prevMessages => [...prevMessages, supportResponse]);
            setIsTyping(false);
        }, 2000);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowQuickResponses(true);
    };

    const renderMessages = () => {
        return messages.map(message => (
            <div key={message.id} className={`message-container ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                {message.sender === 'support' && (
                    <div className="avatar me-2">
                        <MDBIcon fas icon="headset" className="support-icon" />
                    </div>
                )}
                <div className={`message ${message.sender === 'user' ? 'user-message' : 'support-message'} ${message.isSystem ? 'system-message' : ''}`}>
                    <div className="message-text">{message.text}</div>
                    <div className="message-meta">
                        <small className="timestamp">{message.timestamp}</small>
                        {message.isAutomatic && (
                            <MDBBadge color="info" pill size="sm" className="ms-2">Auto</MDBBadge>
                        )}
                    </div>
                    {message.showCategories && (
                        <div className="category-buttons mt-3">
                            {QuickResponses.map(category => (
                                <MDBBtn 
                                    key={category.category}
                                    color="light"
                                    size="sm"
                                    className="me-2 mb-2"
                                    onClick={() => handleCategorySelect(category.category)}
                                >
                                    {category.category}
                                </MDBBtn>
                            ))}
                        </div>
                    )}
                </div>
                {message.sender === 'user' && (
                    <div className="avatar ms-2">
                        <MDBIcon fas icon="user" className="user-icon" />
                    </div>
                )}
            </div>
        ));
    };

    const renderQuickResponses = () => {
        if (!showQuickResponses) return null;
        
        const categoryResponses = QuickResponses.find(cat => cat.category === selectedCategory);
        if (!categoryResponses) return null;
        
        return (
            <div className="quick-responses-container">
                <div className="quick-responses-header">
                    <h6 className="mb-2">
                        <MDBIcon fas icon="lightbulb" className="me-2 text-warning" />
                        Common {selectedCategory} Questions
                    </h6>
                    <MDBBtn 
                        color="link"
                        size="sm"
                        className="p-0"
                        onClick={() => setShowQuickResponses(false)}
                    >
                        <MDBIcon fas icon="times" />
                    </MDBBtn>
                </div>
                <div className="quick-responses-list">
                    {categoryResponses.options.map((response, index) => (
                        <div 
                            key={index} 
                            className="quick-response-item"
                            onClick={() => handleQuickResponseSelect(response)}
                        >
                            <MDBIcon fas icon="comment" className="me-2" size="sm" />
                            {response}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <MDBCard className="chat-card shadow-sm">
            <MDBCardHeader className="bg-primary text-white">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <MDBIcon fas icon="comments" className="me-2" />
                        <div>
                            <h5 className="mb-0">Student Support Chat</h5>
                            <div className="online-status">
                                <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></span>
                                <span className="small">{isOnline ? 'Support agents online' : 'Support offline - leave a message'}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <MDBBtn color="light" size="sm" onClick={() => setShowQuickResponses(!showQuickResponses)}>
                            <MDBIcon fas icon="question-circle" />
                            <span className="ms-2 d-none d-md-inline">Quick Questions</span>
                        </MDBBtn>
                    </div>
                </div>
            </MDBCardHeader>
            
            <MDBCardBody className="chat-body" ref={chatContainerRef}>
                <div className="messages-container">
                    {renderMessages()}
                    {isTyping && (
                        <div className="message-container justify-content-start">
                            <div className="avatar me-2">
                                <MDBIcon fas icon="headset" className="support-icon" />
                            </div>
                            <div className="message support-message typing-indicator">
                                <div className="typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </MDBCardBody>
            
            {renderQuickResponses()}
            
            <MDBCardFooter className="bg-light">
                <form onSubmit={handleSendMessage} className="chat-form">
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Type your message here..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <MDBBtn 
                            type="submit" 
                            color="primary"
                            disabled={!newMessage.trim()}
                        >
                            <MDBIcon fas icon="paper-plane" />
                        </MDBBtn>
                    </div>
                </form>
                <div className="chat-footer-info text-center mt-2">
                    <small className="text-muted">
                        <MDBIcon fas icon="info-circle" className="me-1" />
                        Messages sent outside business hours will be responded to on the next working day
                    </small>
                </div>
            </MDBCardFooter>
        </MDBCard>
    );
};

export default LiveChat; 