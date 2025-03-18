'use client';

import { useState } from 'react';

import "./navbar.css";

interface Link {
    name: string;
    url: string;
}

export default function Navbar({ links }: { links: Link[] }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    
    const handleLinkClick = () => {
      setIsMenuOpen(false);
    };
    
    return (
      <nav className="navbar">
        <div className="navbar-logo">MINIFOLIO</div>
        <div className="navbar-right">
          <ul id="navbarNoDropdown" className={isMenuOpen ? 'active' : ''}>
            {links.map((link) => (
              <li key={`link-${link.name}`}>
                <a href={link.url} onClick={handleLinkClick}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    );
}
