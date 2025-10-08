import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { 
  LogOut, 
  Home, 
  Book, 
  Code, 
  List, 
  Folder, 
  User, 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  FileText,
  Menu,
  X,
  Play,
  Edit,
  Briefcase,
  CreditCard,
  Archive
} from "react-feather";
import { auth } from "../../Utils/firebase.js";
import styles from './sidebar.module.css';

const Sidebar = () => {
    const location = useLocation();
    const [learningOpen, setLearningOpen] = useState(false);
    const [practiceOpen, setPracticeOpen] = useState(false);
    const [archiveOpen, setArchiveOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
    const [isHovered, setIsHovered] = useState(false);
    const sidebarRef = useRef(null);
    const hoverAreaRef = useRef(null);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Check screen size and update mobile state
    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth <= 767;
            setIsMobile(newIsMobile);
            
            // Clean up hover class when switching to mobile
            if (newIsMobile) {
                document.body.classList.remove('sidebar-hovered');
                setIsHovered(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle hover events for desktop
    useEffect(() => {
        if (!isMobile) {
            const handleMouseEnter = () => {
                setCollapsed(false);
                setIsHovered(true);
                // Add class to body to shift main content
                document.body.classList.add('sidebar-hovered');
            };

            const handleMouseLeave = (e) => {
                // Don't close if mouse is still over the sidebar
                if (sidebarRef.current && !sidebarRef.current.contains(e.relatedTarget)) {
                    setCollapsed(true);
                    setIsHovered(false);
                    // Remove class from body
                    document.body.classList.remove('sidebar-hovered');
                }
            };

            const hoverArea = hoverAreaRef.current;
            const sidebar = sidebarRef.current;

            if (hoverArea && sidebar) {
                hoverArea.addEventListener('mouseenter', handleMouseEnter);
                sidebar.addEventListener('mouseleave', handleMouseLeave);
            }

            return () => {
                if (hoverArea && sidebar) {
                    hoverArea.removeEventListener('mouseenter', handleMouseEnter);
                    sidebar.removeEventListener('mouseleave', handleMouseLeave);
                }
                // Clean up class on unmount
                document.body.classList.remove('sidebar-hovered');
            };
        }
    }, [isMobile]);

    const toggleSidebar = () => {
        // Only allow manual toggle on mobile
        if (isMobile) {
            setCollapsed(!collapsed);
        }
    };

    const closeSidebar = () => {
        // Only close manually on mobile, or when clicking menu items
        if (isMobile) {
            setCollapsed(true);
        }
    };

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: Home },
        { path: '/dashboard/account', label: 'Account', icon: User },
        { path: '/dashboard/notification', label: 'Notifications', icon: Bell },
        { path: '/dashboard/support', label: 'Support', icon: HelpCircle },
    ];

    const learningItems = [
        { path: '/dashboard/learning', label: 'My Courses', icon: BookOpen },    
        { path: '/dashboard/blogs', label: 'Blog Posts', icon: FileText },
    ];

    const practiceItems = [
        { path: '/dashboard/quizbox', label: 'Quiz Box', icon: Code },      
        { path: '/dashboard/codebox', label: 'Code Box', icon: Code },
        { path: '/dashboard/testhistory', label: 'Test Results', icon: List },
        
    ];

    const archiveItems = [
        { path: '/dashboard/myproject', label: 'My Projects', icon: Folder },
        { path: '/dashboard/mynotes', label: 'My Notes', icon: FileText },
    ];

    const renderMenuItem = (item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
            <NavLink
                key={item.path}
                to={item.path}
                className={isActive ? styles['active-menu-item'] : styles['menu-item']}
                onClick={() => {
                    if (isMobile) {
                        closeSidebar();
                    }
                }}
            >
                <div className={styles['sidebar-menu-item']}>
                    <IconComponent size={16} className={styles['sidebar-icon']} />
                    <span>{item.label}</span>
                </div>
            </NavLink>
        );
    };

    const renderSubmenuItem = (item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
            <NavLink
                key={item.path}
                to={item.path}
                className={isActive ? styles['active-menu-item'] : styles['menu-item']}
                onClick={() => {
                    if (isMobile) {
                        closeSidebar();
                    }
                }}
            >
                <div className={styles['sidebar-submenu-item']}>
                    <IconComponent size={14} className={styles['sidebar-icon']} />
                    <span>{item.label}</span>
                </div>
            </NavLink>
        );
    };

    return (
        <>
            {/* Hover area for desktop - invisible trigger zone */}
            {!isMobile && (
                <div 
                    ref={hoverAreaRef}
                    className={styles['sidebar-hover-area']}
                    
                />
            )}
            
            {/* Sidebar trigger button - only show on mobile */}
            {isMobile && (
                <button 
                    className={styles['sidebar-trigger']}
                    onClick={toggleSidebar}
                    aria-label="Toggle menu"
                >
                    {collapsed ? <Menu size={18} /> : <X size={18} />}
                </button>
            )}
            
            <div 
                ref={sidebarRef}
                className={`${styles['sidebar-wrapper']} ${collapsed ? styles['collapsed'] : styles['expanded']}`}
            >
                <div className={styles['sidebar-custom']}>
                    <div className={styles['sidebar-header']}>
                        <div className={styles['sidebar-title']}>
                            <img 
                                src="/static_img/weblogo.png" 
                                alt="Silicon Logo" 
                                
                            />
                            {/* <span className={styles['sidebar-title']}></span> */}
                        </div>
                    </div>
                    
                    <div className={styles['sidebar-content']}>
                        <nav className={styles['sidebar-nav']}>
                            {/* Dashboard */}
                            {renderMenuItem(menuItems[0])}
                            
                            {/* Learning Section */}
                            <div className={styles['menu-section']}>
                                <div className={styles['menu-header']} onClick={() => setLearningOpen(!learningOpen)}>
                                    <div className={styles['sidebar-menu-item']}>
                                        <Book size={16} className={styles['sidebar-icon']} />
                                        <span>Learning</span>
                                        {learningOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </div>
                                </div>
                                {learningOpen && (
                                    <div className={styles['menu-items']}>
                                        {learningItems.map(item => renderSubmenuItem(item))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Practice Section */}
                            <div className={styles['menu-section']}>
                                <div className={styles['menu-header']} onClick={() => setPracticeOpen(!practiceOpen)}>
                                    <div className={styles['sidebar-menu-item']}>
                                        <Code size={16} className={styles['sidebar-icon']} />
                                        <span>Practice</span>
                                        {practiceOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </div>
                                </div>
                                {practiceOpen && (
                                    <div className={styles['menu-items']}>
                                        {practiceItems.map(item => renderSubmenuItem(item))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Archives Section */}
                            <div className={styles['menu-section']}>
                                <div className={styles['menu-header']} onClick={() => setArchiveOpen(!archiveOpen)}>
                                    <div className={styles['sidebar-menu-item']}>
                                        <Archive size={16} className={styles['sidebar-icon']} />
                                        <span>Archives</span>
                                        {archiveOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </div>
                                </div>
                                {archiveOpen && (
                                    <div className={styles['menu-items']}>
                                        {archiveItems.map(item => renderSubmenuItem(item))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Other Menu Items */}
                            {menuItems.slice(1).map(item => renderMenuItem(item))}
                        </nav>
                    </div>

                    <div className={styles['sidebar-footer']}>
                        <button 
                            className={styles['logout-button']} 
                            onClick={handleLogout}
                            aria-label="Log out"
                        >
                            <div className={styles['sidebar-menu-item']}>
                                <LogOut size={16} className={styles['sidebar-icon']} />
                                <span>Log Out</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;