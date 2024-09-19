import './assets/css/index.css';
import {useRef} from 'react';
import useScrollAndSwipe from './hooks/useScrollAndSwipe.js';
import logo from './assets/img/logo.png';
import Home from "./components/sections/Home";
import Work from "./components/sections/Work";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Hire from "./components/sections/Hire";

function App() {
    const containerRef = useRef(null);
    const outerNavRef = useRef(null);
    const sideNavRef = useRef(null);
    const ctaRef = useRef(null);

    useScrollAndSwipe(containerRef, outerNavRef, sideNavRef, ctaRef);

    return (
        <>
            <div className="device-notification">
                <a className="device-notification--logo" href="/">
                    <img src={logo} alt="Global"/>
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
                                    <img src={logo} alt="Global"/>
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
