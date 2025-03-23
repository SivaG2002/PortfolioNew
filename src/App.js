import React, { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import arrowDownIcon from "./assets/arrow.png";

// Import Font Awesome icons from react-icons
import {
  FaHome,
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Toggle the panel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  // Swipe handlers using react-swipeable
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setIsPanelOpen(true),
    onSwipedLeft: () => setIsPanelOpen(false),
    delta: 10,
    preventDefaultTouchmoveEvent: true,
  });

  return (
    <Router>
      <div className="App" {...swipeHandlers}>
        {/* Hamburger Icon for Mobile */}
        <button className="hamburger" onClick={togglePanel}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navbar (visible on desktop, hidden on mobile) */}
        <nav className={`navbar ${isPanelOpen ? "panel-open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={togglePanel}>
                <FaHome className="nav-icon" />{" "}
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={togglePanel}>
                <FaUser className="nav-icon" />{" "}
                <span className="nav-text">Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/education" onClick={togglePanel}>
                <FaGraduationCap className="nav-icon" />{" "}
                <span className="nav-text">Education</span>
              </Link>
            </li>
            <li>
              <Link to="/experience" onClick={togglePanel}>
                <FaBriefcase className="nav-icon" />{" "}
                <span className="nav-text">Experience</span>
              </Link>
            </li>
            <li>
              <Link to="/works" onClick={togglePanel}>
                <FaProjectDiagram className="nav-icon" />{" "}
                <span className="nav-text">Works</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={togglePanel}>
                <FaEnvelope className="nav-icon" />{" "}
                <span className="nav-text">Contact</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Wrapper */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            {/* Add placeholder routes for other sections */}
            <Route path="/education" element={<Education/>} />
            <Route path="/experience" element={<Experience/>} />
            <Route path="/works" element={<div>Works Page (Coming Soon)</div>} />
            <Route path="/contact" element={<div>Contact Page (Coming Soon)</div>} />
          </Routes>
        </div>

        {/* Chevron at the bottom middle */}
        {/* <div className="scroll-indicator">
          <Link to="/profile">
            <img src={arrowDownIcon} alt="Scroll Down" className="chevron-icon" />
          </Link>
        </div> */}
      </div>
    </Router>
  );
}

export default App;