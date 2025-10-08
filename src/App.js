import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import { auth, getUserFromDatabase } from "./Utils/firebase";
import Auth from "./ProfileSection/Account/Auth/Auth";

import ScrollToTop from "./hooks/ScrollTop";
import AuthNav from "./ProfileSection/Account/Auth/AuthNavbar";
import ResponsiveNavbar from "./component/NavbarCode/ResponsiveNavbar";
import Footer from "./component/footer";
import Homepage from "./Pages/Home/homepage";
import About from "./Pages/AboutPage/about";
import Clubs from "./Pages/AboutPage/clubs";
import Contact from "./Pages/ContactUs/contact";
import Notice from "./Pages/NoticePage/noticeboard";
import Course from "./Pages/Courses/course";
import Policy from "./component/policy";
import CodeBox from "./ProfileSection/Practice/CodeTest/codebox";

import MainLayout from "./Layout/MainLayout";
import Account from "./ProfileSection/Account/Account";
import EditProfile from "./ProfileSection/Account/EditProfile";
import Dashboard from "./ProfileSection/Dashboard/Dashboard";
import Myproject from "./ProfileSection/Archives/Myproject/Myproject";
import MyNotes from "./ProfileSection/Archives/MyNotes/MyNotes";
import MyCourse from "./ProfileSection/Learning/mycourse";
import CourseVideoPlayer from './ProfileSection/Learning/coursevideoplayer';
import Notify from "./ProfileSection/Notifications/Notification";
import Career from "./Pages/CareerPage/career";
import PracticeList from "./ProfileSection/Practice/QuizTest/practicelist";
import Practice from "./ProfileSection/Practice/QuizTest/practice";
import Support from "./ProfileSection/Support/support";
import CourseDetails from "./Pages/Courses/coursedetails";
import TestHistory from "./ProfileSection/Practice/testhistory"; 
import TestDetails from "./ProfileSection/Practice/TestDetails"; 
import Checkout from "./Pages/Pricing/billing";
import PricingPlans from "./Pages/Pricing/pricing";
import BlogList from "./ProfileSection/Learning/Blogs/BlogList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  // const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchUserDetails = async (uid) => {
    const userDetails = await getUserFromDatabase(uid);
    setUserDetails(userDetails);
    // setIsDataLoaded(true);
  };
  console.log(userDetails);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (!user) {
        // setIsDataLoaded(true);
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);
      fetchUserDetails(user.uid);
    });

    return () => listener();
  }, []);

  return (
    <>
      <Router>
      <ScrollToTop>
        <ResponsiveNavbar auth={isAuthenticated} />
        {/* <AuthNav auth={isAuthenticated}/> */}
        <div className="container-margin"></div>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" exact element={<Homepage />} />
          <Route path="/about" exact element={<About />} />         
          <Route path="/clubs" exact element={<Clubs />} />
          <Route path="/course" exact element={<Course />} />          
          <Route path="coursedetails" element={<CourseDetails />} />
          <Route path="/notice" exact element={<Notice/>} />
          <Route path="/pricing" exact element={<PricingPlans/>} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/policy" exact element={<Policy />} />
          {!isAuthenticated && (
            <>
              <Route path="/login" element={<Auth />} />
              <Route path="/signup" element={<Auth signup />} />
              
            </>
          )}

          {isAuthenticated && (
            <>
              <Route path="/billing" element={<Checkout userDetails={userDetails} auth={isAuthenticated} />} />
              <Route path="/dashboard" element={<MainLayout userDetails={userDetails} auth={isAuthenticated} />}>
                <Route index element={<Dashboard userDetails={userDetails} auth={isAuthenticated}/>} />
                <Route path="account" element={<Account userDetails={userDetails} auth={isAuthenticated} />} />
                <Route path="editprofile" element={<EditProfile userDetails={userDetails} auth={isAuthenticated} />} />
                <Route path="myproject" element={<Myproject userDetails={userDetails} auth={isAuthenticated} />} />
                <Route path="mynotes" element={<MyNotes userDetails={userDetails} auth={isAuthenticated} />} />
                <Route path="blogs" element={<BlogList userDetails={userDetails} auth={isAuthenticated} />} />
                <Route path="learning" element={<MyCourse userDetails={userDetails} auth={isAuthenticated} />} />
                <Route path="courseplayer" element={<CourseVideoPlayer userDetails={userDetails} auth={isAuthenticated} />} />                
                <Route path="quizbox" element={<PracticeList userDetails={userDetails} auth={isAuthenticated} />} />
                <Route path="quiz" element={<Practice userDetails={userDetails} auth={isAuthenticated} />} />
                <Route path="codebox" element={<CodeBox userDetails={userDetails} auth={isAuthenticated} />} />
                <Route path="testhistory" element={<TestHistory userDetails={userDetails} auth={isAuthenticated} />} />
                <Route path="testdetails" element={<TestDetails userDetails={userDetails} auth={isAuthenticated} />} />                
                <Route path="notification" element={<Notify userDetails={userDetails} auth={isAuthenticated} />} />
                <Route path="support" element={<Support userDetails={userDetails} auth={isAuthenticated} />} />
                {/* <Route path="career" element={<Career userDetails={userDetails} auth={isAuthenticated} />} />                 */}
               
              </Route>
            </>
          )}
        </Routes>

        <Footer />
      </ScrollToTop>
      </Router>
    </>
  );
}

export default App;
