import React, { useState, useEffect } from 'react';
import DeskNavbar from './Topnavbar';
import MobileNavbar from './MobileNavbar';

function ResponsiveNavbar(props) {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 992 : false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 992);
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

  return (
    <>
      {isMobile ? (
        <MobileNavbar auth={props.auth} />
      ) : (
        <DeskNavbar auth={props.auth} />
      )}
    </>
  );
}

export default ResponsiveNavbar; 