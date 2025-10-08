import React, { useState, useRef } from 'react';
import emailjs from "@emailjs/browser";
import {
    MDBBtn,
    MDBSpinner,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBTextArea,
    MDBCardHeader,
    MDBIcon
} from "mdb-react-ui-kit";
import './support.css';

// Custom Alert Component
const CustomAlert = ({ color, children, onClose }) => {
    return (
        <MDBCard className={`mb-4 border-${color}`}>
            <MDBCardBody className={`alert-${color}`}>
                {children}
                {onClose && (
                    <button 
                        type="button" 
                        className="btn-close position-absolute top-0 end-0 m-2" 
                        onClick={onClose} 
                        aria-label="Close"
                    ></button>
                )}
            </MDBCardBody>
        </MDBCard>
    );
};

const InquiryOptions = {
    "Admission": [
        "Application Process",
        "Eligibility Criteria",
        "Entrance Exam",
        "Required Documents",
        "Fee Structure",
        "Scholarship Information",
        "Admission Timeline"
    ],
    "Academics": [
        "Course Information",
        "Syllabus Query",
        "Faculty Information",
        "Exam Schedule",
        "Grading System",
        "Study Materials",
        "Academic Calendar",
        "Internship Opportunities"
    ],
    "Hostel & Facilities": [
        "Hostel Availability",
        "Mess and Food",
        "Room Facilities",
        "Campus Amenities",
        "Library Resources",
        "Lab Facilities",
        "Sports Facilities",
        "Transportation"
    ],
    "Finance": [
        "Tuition Fee Query",
        "Payment Methods",
        "Fee Refund Policy",
        "Scholarship Application",
        "Financial Aid",
        "Education Loan"
    ],
    "Technical Issues": [
        "Portal Login Problems",
        "Registration Issues",
        "Fee Payment Issues",
        "Document Upload Problems",
        "Application Form Issues",
        "Result Access Problems"
    ],
    "Others": [
        "Event Information",
        "Placement Assistance",
        "Alumni Relations",
        "Certificate Verification",
        "General Feedback",
        "Other Query"
    ]
};

const EmailForm = () => {
    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        subject: '',
        message: '',
        category: '',
        subcategory: '',
        student_id: ''
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSelectedSubCategory('');
        setFormData({
            ...formData,
            category: category,
            subcategory: '',
            subject: category ? `${category} Inquiry` : ''
        });
    };

    const handleSubCategoryChange = (e) => {
        const subcategory = e.target.value;
        setSelectedSubCategory(subcategory);
        setFormData({
            ...formData,
            subcategory: subcategory,
            subject: subcategory ? `${selectedCategory} - ${subcategory}` : (selectedCategory ? `${selectedCategory} Inquiry` : '')
        });
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);
        setShowSuccess(false);
        setShowError(false);

        // Prepare the form data with the category information
        const completeForm = form.current;

        emailjs
            .sendForm(
                "service_i1cg9pe",
                "template_t7h8hwf",
                completeForm,
                "okWr80IdqTe4hHqw-"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    completeForm.reset();
                    setIsSending(false);
                    setShowSuccess(true);
                    setSelectedCategory('');
                    setSelectedSubCategory('');
                    setFormData({
                        user_name: '',
                        user_email: '',
                        subject: '',
                        message: '',
                        category: '',
                        subcategory: '',
                        student_id: ''
                    });
                    
                    // Auto hide success message after 5 seconds
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 5000);
                },
                (error) => {
                    console.log(error.text);
                    setIsSending(false);
                    setShowError(true);
                    
                    // Auto hide error message after 5 seconds
                    setTimeout(() => {
                        setShowError(false);
                    }, 5000);
                }
            );
    };

    const generatePlaceholder = () => {
        if (selectedSubCategory) {
            switch (selectedCategory) {
                case 'Admission':
                    return `Please provide details about your ${selectedSubCategory.toLowerCase()} inquiry. Include any specific questions or information that would help us assist you better.`;
                case 'Academics':
                    return `Please provide details about your ${selectedSubCategory.toLowerCase()} inquiry. Include course name, semester, or specific academic information if applicable.`;
                case 'Hostel & Facilities':
                    return `Please provide details about your ${selectedSubCategory.toLowerCase()} inquiry. Include any specific requirements or concerns you have.`;
                case 'Finance':
                    return `Please provide details about your ${selectedSubCategory.toLowerCase()} inquiry. Include payment/transaction ID or student ID if applicable.`;
                case 'Technical Issues':
                    return `Please describe the ${selectedSubCategory.toLowerCase()} you're experiencing in detail. Include error messages, browser information, and steps to reproduce if possible.`;
                default:
                    return `Please provide details about your ${selectedSubCategory.toLowerCase()} inquiry. We'll get back to you as soon as possible.`;
            }
        }
        return "Kindly tell us your concern in detail!";
    };

    return (
        <MDBCard className="shadow-sm">
            <MDBCardHeader className="bg-primary text-white">
                <h5 className="mb-0">
                    <MDBIcon fas icon="envelope" className="me-2" />
                    Contact Support
                </h5>
                <p className="small mb-0">Please fill out this form with your inquiry details</p>
            </MDBCardHeader>
            <MDBCardBody>
                {showSuccess && (
                    <CustomAlert color="success" onClose={() => setShowSuccess(false)}>
                        <h5 className="alert-heading">
                            <MDBIcon fas icon="check-circle" className="me-2" />
                            Message Sent Successfully!
                        </h5>
                        <p className="mb-0">Thank you for contacting us. We will respond to your inquiry as soon as possible.</p>
                    </CustomAlert>
                )}

                {showError && (
                    <CustomAlert color="danger" onClose={() => setShowError(false)}>
                        <h5 className="alert-heading">
                            <MDBIcon fas icon="exclamation-circle" className="me-2" />
                            Error Sending Message
                        </h5>
                        <p className="mb-0">There was a problem sending your message. Please try again or contact us directly.</p>
                    </CustomAlert>
                )}

                <form ref={form} onSubmit={sendEmail}>
                    <MDBRow className="mb-3">
                        <MDBCol md="6">
                            <div className="form-group mb-3">
                                <label htmlFor="user_name">
                                    <strong>Full Name</strong>
                                </label>
                                <MDBInput
                                    type="text"
                                    name="user_name"
                                    id="user_name"
                                    value={formData.user_name}
                                    onChange={handleFormChange}
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                        </MDBCol>
                        <MDBCol md="6">
                            <div className="form-group mb-3">
                                <label htmlFor="user_email">
                                    <strong>Email Address</strong>
                                </label>
                                <MDBInput
                                    type="email"
                                    name="user_email"
                                    id="user_email"
                                    value={formData.user_email}
                                    onChange={handleFormChange}
                                    placeholder="Your email address"
                                    required
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-3">
                        <MDBCol md="6">
                            <div className="form-group mb-3">
                                <label htmlFor="student_id">
                                    <strong>Student ID</strong> <span className="text-muted">(if applicable)</span>
                                </label>
                                <MDBInput
                                    type="text"
                                    name="student_id"
                                    id="student_id"
                                    value={formData.student_id}
                                    onChange={handleFormChange}
                                    placeholder="Your student ID"
                                />
                            </div>
                        </MDBCol>
                        <MDBCol md="6">
                            <div className="form-group mb-3">
                                <label htmlFor="category">
                                    <strong>Inquiry Category</strong>
                                </label>
                                <select 
                                    className="form-select" 
                                    name="category" 
                                    id="category"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(InquiryOptions).map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </MDBCol>
                    </MDBRow>

                    {selectedCategory && (
                        <MDBRow className="mb-3">
                            <MDBCol md="12">
                                <div className="form-group mb-3">
                                    <label htmlFor="subcategory">
                                        <strong>Specific Topic</strong>
                                    </label>
                                    <select 
                                        className="form-select" 
                                        name="subcategory" 
                                        id="subcategory"
                                        value={selectedSubCategory}
                                        onChange={handleSubCategoryChange}
                                        required
                                    >
                                        <option value="">Select Topic</option>
                                        {InquiryOptions[selectedCategory]?.map(subCategory => (
                                            <option key={subCategory} value={subCategory}>{subCategory}</option>
                                        ))}
                                    </select>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    )}

                    <MDBRow className="mb-3">
                        <MDBCol md="12">
                            <div className="form-group mb-3">
                                <label htmlFor="subject">
                                    <strong>Subject</strong>
                                </label>
                                <MDBInput
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleFormChange}
                                    placeholder="Subject of your inquiry"
                                    required
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-3">
                        <MDBCol md="12">
                            <div className="form-group mb-3">
                                <label htmlFor="message">
                                    <strong>Message</strong>
                                </label>
                                <MDBTextArea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleFormChange}
                                    placeholder={generatePlaceholder()}
                                    required
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>

                    <div className="form-check mb-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="terms"
                            required
                        />
                        <label className="form-check-label" htmlFor="terms">
                            I agree to the <a href="#!" className="text-primary">terms and conditions</a> and <a href="#!" className="text-primary">privacy policy</a>
                        </label>
                    </div>

                    <div className="d-grid">
                        <MDBBtn type="submit" color="primary" disabled={isSending} block>
                            {isSending ? (
                                <>
                                    <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <MDBIcon fas icon="paper-plane" className="me-2" />
                                    Send Message
                                </>
                            )}
                        </MDBBtn>
                    </div>
                </form>
            </MDBCardBody>
        </MDBCard>
    );
};

export default EmailForm; 