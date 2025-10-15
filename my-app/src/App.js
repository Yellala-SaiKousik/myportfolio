// App.js

import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import backgroundImage from './assets/bg.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faFolder, faGlobe, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

function App() {
  const [scroll, setScroll] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = useMemo(() => ['Full-Stack Developer', 'UI/UX Designer', 'Software Developer'], []);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    const typingInterval = setInterval(() => {
      const currentRole = roles[roleIndex];
      let index = typedText.length; // Track where in the string we are

      if (index < currentRole.length) {
        setTypedText((prev) => prev + currentRole[index]);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setTypedText('');
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 1000);
      }
    }, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(typingInterval);
    };
  }, [roleIndex, typedText, roles]);

  const bgOpacity = Math.max(1 - scroll / 300, 0.3);

  return (
    <div className="App">
      <div className="background-container">
        <div 
          className="background"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: bgOpacity,
          }}
        />
      </div>

      <div className="header">
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <h1 className="name">SAI KOUSIK YELLALA</h1>
            </div>
            <div className="card-back">
              <p className="about-text">
                A passionate full-stack developer specializing in modern web technologies.
              </p>
            </div>
          </div>
        </div>
        <div className="subtitle">
          <span className="typewriter">{typedText}</span>
        </div>
      </div>

      <div className="footer">
        <a href="#home" className="footer-icon">
          <FontAwesomeIcon icon={faHome} size="1.25x" />
        </a>
        <a href="mailto:your-email@example.com" className="footer-icon">
          <FontAwesomeIcon icon={faEnvelope} size="1.25x" />
        </a>
        <a href="www.linkedin.com/in/skyellala" className="footer-icon">
          <FontAwesomeIcon icon={faLinkedin} size="1.25x" />
        </a>
        <a href="#projects" className="footer-icon">
          <FontAwesomeIcon icon={faFolder} size="1.25x" />
        </a>
        <a href="https://your-website.com" className="footer-icon">
          <FontAwesomeIcon icon={faGlobe} size="1.25x" />
        </a>
        <a href="#resume" className="footer-icon">
          <FontAwesomeIcon icon={faFileAlt} size="1.25x" />
        </a>
      </div>
    </div>
  );
}

export default App;
