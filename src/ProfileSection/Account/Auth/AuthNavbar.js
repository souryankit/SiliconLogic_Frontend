import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { LogOut, Menu, X, User } from "react-feather";
import { auth } from "../../../Utils/firebase";

function AuthNav(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const navigate = useNavigate();
  const isAuthenticated = props.auth ? true : false;

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (event && event.target && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      try {
        document.removeEventListener('mousedown', handleClickOutside);
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, []);

  const handleNextButtonClick = () => {
    if (isAuthenticated) navigate("/dashboard");
    else navigate("/login");
    console.log("handleNext button clicked");
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const menuItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Course", path: "/course" },
    { title: "Notice", path: "/notice" },
    { title: "Pricing", path: "/pricing" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <section>
      <nav ref={menuRef} className="sticky top-0 w-full bg-[#d9d9d9] shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Visible on all screens */}
            <Link to="/" className="flex-shrink-0">
              {/* <img
                src="/static_img/weblogo.png"
                className="h-12 w-48 object-contain"
                alt="logo"
              /> */} LOGO
            </Link>

            {/* Desktop Menu - Only visible on md and larger screens */}
            <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="nav-link px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <b className="nav-text">{item.title}</b>
                </Link>
              ))}

              {/* Desktop Profile Section */}
              <div className="relative">
                <div onClick={handleNextButtonClick}>
                  {isAuthenticated ? (
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsProfileOpen(!isProfileOpen);
                        }}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                      >
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <span className="font-bold text-gray-700">My Profile</span>
                      </button>

                      {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                          <Link
                            to="/dashboard/account"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Profile
                          </Link>
                          <Link
                            to="/getcomp"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Get Component
                          </Link>
                          <div className="border-t border-gray-100"></div>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Log Out
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link className="nav-link">
                      <img
                        src="/static_img/userid.png"
                        className="h-10 w-10"
                        alt="user"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button - Only visible on small screens */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu - Only rendered when isMenuOpen is true and on small screens */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="py-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-2 text-base font-bold text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              <div className="border-t border-gray-200 my-2"></div>

              {/* Mobile Profile Section */}
              <div onClick={handleNextButtonClick}>
                {isAuthenticated ? (
                  <div className="px-4 py-2 space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="font-bold text-gray-700">My Profile</div>
                    </div>
                    <Link
                      to="/dashboard/account"
                      className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <Link
                      to="/getcomp"
                      className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Component
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-2 py-2 text-red-600 hover:bg-gray-50 rounded-md"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-2">
                    <img
                      src="/static_img/userid.png"
                      className="h-10 w-10"
                      alt="user"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </section>
  );
}

export default AuthNav;