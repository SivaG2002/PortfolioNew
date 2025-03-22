import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js'; // Import Typed.js directly
import yourPhoto from '../assets/profile-img.png';
import './Home.css';

function Home() {
  const typedRef = useRef(null); // Create a ref for the DOM element

  useEffect(() => {
    // Initialize Typed.js
    const options = {
      strings: ['AI Developer', 'Web Designer', 'Full Stack Developer', 'Gamer'],
      typeSpeed: 40,
      backSpeed: 50,
      loop: true,
      showCursor: true, // Ensure the cursor is visible (this is true by default)
      cursorChar: '|', // Default cursor character (you can change this to '_', etc.)
    };

    const typed = new Typed(typedRef.current, options);

    // Cleanup on unmount
    return () => {
      typed.destroy();
    };
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="home-container">
      {/* Left Side: Round Photo */}
      <div className="photo-container">
        <img src={yourPhoto} alt="Your Photo" className="round-photo" />
      </div>

      {/* Right Side: Text */}
      <div className="text-container">
        <h1 className="static-text">I'm <span className='sivag'>Siva G Nair</span>. I am a</h1>
        <span ref={typedRef} className="dynamic-text"></span>
      </div>
    </div>
  );
}

export default Home;