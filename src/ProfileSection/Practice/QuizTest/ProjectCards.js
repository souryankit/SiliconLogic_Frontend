import React, { useState } from 'react';
import "../../../component/style.css"
import { Link } from 'react-router-dom';

const ProjectCard = (props) => {
    const cardStyle = {
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: '#fff'
    };

    const imageContainerStyle = {
        position: 'relative',
        height: '180px'
    };

    const imageStyle = {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        borderBottom: '1px solid #f0f0f0'
    };

    const cardBodyStyle = {
        padding: '0 rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    };

    const cardTitleStyle = {
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#2c3e50'
    };

    const cardTextStyle = {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        marginBottom: '15px',
        flexGrow: 1
    };

    const buttonStyle = {
        backgroundColor: '#4a69bd',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        color: 'white',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background-color 0.2s ease'
    };

    const difficultyBadgeStyle = {
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '3px 6px',
        borderRadius: '4px',
        fontSize: '0.7rem',
        fontWeight: '600',
        zIndex: 2,
        backgroundColor: props.heading.includes('L1') ? 'rgba(3, 169, 244, 0.85)' : 
                         props.heading.includes('L2') ? 'rgba(255, 193, 7, 0.85)' : 'rgba(244, 67, 54, 0.85)',
        color: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
    };

    const quizInfoStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: '#95a5a6',
        marginBottom: '15px'
    };

    return (
        <div className="row">
            <div className="col-sm">
                <div className="card" id="card-cont" style={cardStyle} 
                     onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
                     onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={imageContainerStyle}>
                        <div style={difficultyBadgeStyle}>
                            {props.heading.includes('L1') ? 'Beginner' : 
                             props.heading.includes('L2') ? 'Intermediate' : 'Advanced'}
                        </div>
                        <img className="card-img-top" src={props.icon} alt="Test Card" style={imageStyle} />
                    </div>
                    <div className="card-body" style={cardBodyStyle}>
                        <h5 className="card-title" style={cardTitleStyle}>{props.heading}</h5>
                        <p className="card-text" style={cardTextStyle}>{props.text}</p>
                        
                        <div style={quizInfoStyle}>
                            <span>15 questions</span>
                            <span>20 min</span>
                        </div>
                        
                        <Link 
                            to={`/dashboard/quiz?id=${encodeURIComponent(props.heading)}&category=${encodeURIComponent(props.category || 'General')}&difficulty=${props.heading.includes('L1') ? 'Beginner' : props.heading.includes('L2') ? 'Intermediate' : 'Advanced'}`} 
                            className="btn" 
                            style={buttonStyle}
                        >
                            Start Test <i className="fa fa-arrow-right ml-2"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;






