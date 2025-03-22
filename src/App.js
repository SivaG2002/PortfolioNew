import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import Home from './components/Home';
import arrowDownIcon from './assets/arrow.png';

// Import Font Awesome icons from react-icons
import { FaHome, FaUser, FaGraduationCap, FaBriefcase, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

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
        <nav className={`navbar ${isPanelOpen ? 'panel-open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={togglePanel}>
                <FaHome className="nav-icon" /> <span className="nav-text">Home</span>
              </Link>
            </li>
            <li>
              <a href="#profile" onClick={togglePanel}>
                <FaUser className="nav-icon" /> <span className="nav-text">Profile</span>
              </a>
            </li>
            <li>
              <a href="#education" onClick={togglePanel}>
                <FaGraduationCap className="nav-icon" /> <span className="nav-text">Education</span>
              </a>
            </li>
            <li>
              <a href="#experience" onClick={togglePanel}>
                <FaBriefcase className="nav-icon" /> <span className="nav-text">Experience</span>
              </a>
            </li>
            <li>
              <a href="#works" onClick={togglePanel}>
                <FaProjectDiagram className="nav-icon" /> <span className="nav-text">Works</span>
              </a>
            </li>
            <li>
              <a href="#contact" onClick={togglePanel}>
                <FaEnvelope className="nav-icon" /> <span className="nav-text">Contact</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Home Component */}
        <Home />

        {/* Chevron at the bottom middle */}
        <div className="scroll-indicator">
          <a href="#profile">
            <img src={arrowDownIcon} alt="Scroll Down" className="chevron-icon" />
          </a>
        </div>

      </div>
    </Router>
  );
}

export default App;