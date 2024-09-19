import './assets/css/index.css';
import {useRef} from 'react';
import useScrollAndSwipe from './hooks/useScrollAndSwipe.js';
import logo from './assets/img/logo.png';
import Home from "./components/sections/Home.tsx";
import Work from "./components/sections/Work.tsx";
import About from "./components/sections/About.tsx";
import Contact from "./components/sections/Contact.tsx";
import Hire from "./components/sections/Hire.tsx";

function App() {
    const containerRef = useRef<HTMLDivElement>(null);
    const outerNavRef = useRef<HTMLUListElement>(null);
    const sideNavRef = useRef<HTMLUListElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);

    useScrollAndSwipe(containerRef, outerNavRef, sideNavRef, ctaRef);

    return (
        <>
            <div className="device-notification">
                <a className="device-notification--logo" href="#0">
                    <img src={logo as string} alt="Global"/>
                    <p>Global</p>
                </a>
                <p className="device-notification--message">
                    Global has so much to offer that we must request you orient your device to portrait or find a larger
                    screen. You won't be disappointed.
                </p>
            </div>

            <div className="perspective effect-rotate-left" ref={containerRef}>
                <div className="container">
                    <div className="outer-nav--return">Test</div>
                    <div id="viewport" className="l-viewport">
                        <div className="l-wrapper">
                            <header className="header">
                                <a className="header--logo" href="#0">
                                    <img src={logo as string} alt="Global"/>
                                    <p>Global</p>
                                </a>
                                <div className="header--nav-toggle">
                                    <span></span>
                                </div>
                            </header>
                            <nav className="l-side-nav">
                                <ul className="side-nav" ref={sideNavRef}>
                                    <li className="is-active"><span>Home</span></li>
                                    <li><span>Works</span></li>
                                    <li><span>About</span></li>
                                    <li><span>Contact</span></li>
                                    <li><span>Hire us</span></li>
                                </ul>
                            </nav>
                            <ul className="l-main-content main-content">
                                <Home ctaRef={ctaRef}/>
                                <Work/>
                                <About/>
                                <Contact/>
                                <Hire/>
                            </ul>
                        </div>
                    </div>
                </div>
                <nav className="l-outer-nav" ref={outerNavRef}>
                    <ul className="outer-nav">
                        <li><span>Home</span></li>
                        <li><span>Works</span></li>
                        <li><span>About</span></li>
                        <li><span>Contact</span></li>
                        <li><span>Hire us</span></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default App;
