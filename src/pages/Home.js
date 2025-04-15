import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import MovingDots from './Work'; // Import MovingDots
import './Home.css';

function Home() {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['AI Developer', 'Web Designer', 'Full Stack Developer', 'Gamer'],
      typeSpeed: 40,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="home-wrapper">
      <MovingDots /> {/* Background effect */}
    <div className="home-container">
      <div className="photo-container">
        <img src="profilepic.png" alt="Your Photo" className="round-photo" />
      </div>
      <div className="text-container">
          <h1 className="static-text">
            I'm <span className="sivag">Siva G Nair</span>. I am a
          </h1>
        <span ref={typedRef} className="dynamic-text"></span>
      </div>
    </div>
    </div>
  );
}

export default Home;