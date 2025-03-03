'use client';

import { useRef, useEffect } from 'react';
import { Twitter, Linkedin, Instagram, Link } from 'lucide-react';
import Typed from 'typed.js';

import './hero.css';
 
export default function Hero() {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                'the Unknown Developer',
                'a UI/UX Designer',
                'a Youtuber',
            ],
            typeSpeed: 150,
            backSpeed: 60,
            backDelay: 1000,
            loop: true,
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);
    return (
        <>
            <div id="hero" className="hero">
                <div className="container">
                    <div className="icons-container" />
                    Hi, my name is <span>Your Name</span> <br />
                    I&apos;m{' '}
                    <span id="role" ref={el}>
                        {' '}
                    </span>
                    <a className="button" href="#about">
                        Know more
                    </a>
                    <a className="buttonIcon">
                        {/* NOTE: onClick is currently removed */}
                        {/* FIXME: Icons currently do not work */}
                        <div className="boxes">
                            <Twitter />
                        </div>
                        <div className="boxes">
                            <Linkedin />
                        </div>
                        <div className="boxes">
                            <Instagram />
                        </div>
                        <div className="boxes">
                            <Link />
                        </div>
                    </a>
                </div>
            </div>
            <div className="px50" />
            <div className="px50" id="about" />
        </>
    );
}
