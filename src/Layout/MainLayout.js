import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../ProfileSection/Sidebar/sidebar';
import styles from './mainlayout.module.css';

const MainLayout = () => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    
    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setWindowWidth(window.innerWidth);
            }
        };
        
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }
        
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);
    // ${windowWidth <= 767 ? styles.mobileView : ''}
    return (
        <div className={`${styles.dashboardContainer}`}>
            <div className={styles.sideContent}>
            <Sidebar />
            </div>
            
            <div className={styles.mainContent}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;