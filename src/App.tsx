import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './Header';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';
import { Typewriter } from 'react-simple-typewriter';
import TiltedCard from './components/TiltedCard/TiltedCard';
import img from './assets/n1.png';
import AboutMe from './AboutMe';
import Journey from './Journey';
import Connect from './Connect';
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [currentTextColor, setCurrentTextColor] = useState('#fff');
  const [loaded, setLoaded] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  const funnyLines = [
    'Warming up neurons...',
    'Untangling wires...',
    'Calibrating confidence...',
    'Drawing cool borders...',
    'Almost there...',
    "Ready! Let's roll."
  ];

  useEffect(() => {
    document.body.classList.add('no-scroll');

    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < funnyLines.length - 1) return prev + 1;
        clearInterval(lineInterval);
        return prev;
      });
    }, 800);

    const timeout = setTimeout(() => {
      setLoaded(true);
      document.body.classList.remove('no-scroll');
    }, 5000);

    return () => {
      clearInterval(lineInterval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    // Add a small delay to ensure DOM is fully rendered
    const initializeScrollTrigger = () => {
      const mainContainer = document.querySelector('.main') as HTMLElement;
      if (!mainContainer) return;

      const scrollBar = Scrollbar.init(mainContainer, {
        damping: 0.06,
        alwaysShowTracks: false,
      });

      ScrollTrigger.scrollerProxy(mainContainer, {
        scrollTop(value) {
          if (arguments.length) scrollBar.scrollTop = value!;
          return scrollBar.scrollTop;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      scrollBar.addListener(ScrollTrigger.update);
      ScrollTrigger.defaults({ scroller: mainContainer });

      const sections = document.querySelectorAll('[data-bgcolor]');
      sections.forEach((section, i) => {
        const prev = i === 0 ? null : sections[i - 1];
        ScrollTrigger.create({
          trigger: section,
          scroller: mainContainer,
          start: 'top 50%',
          onEnter: () => {
            const textColor = section.getAttribute('data-textcolor') || '#fff';
            setCurrentTextColor(textColor);
            gsap.to(mainContainer, {
              backgroundColor: section.getAttribute('data-bgcolor') || '#000',
              color: textColor,
              duration: 0.6,
              ease: 'power1.out',
            });
          },
          onLeaveBack: () => {
            const prevTextColor = prev?.getAttribute('data-textcolor') || '#fff';
            setCurrentTextColor(prevTextColor);
            gsap.to(mainContainer, {
              backgroundColor: prev?.getAttribute('data-bgcolor') || '#000',
              color: prevTextColor,
              duration: 0.6,
              ease: 'power1.out',
            });
          },
        });
      });

      // Hero entrance animation
      gsap.from('.hero-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.6,
        rotateY: 15,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.3,
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        scrollBar.destroy();
      };
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      const cleanup = initializeScrollTrigger();
      return cleanup;
    });

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      const scrollBar = Scrollbar.get(document.querySelector('.main') as HTMLElement);
      if (scrollBar) scrollBar.destroy();
    };
  }, [loaded]);

  return (
    <div className="page-wrapper">
      <div className={`main ${!loaded ? 'disable-scroll' : ''}`}>
        <section
          id="welcome"
          data-bgcolor="#000"
          data-textcolor="#F0F0F0"
          style={{ padding: '100px 20px', minHeight: '100vh' }}
        >
          {loaded && <Header textColor={currentTextColor} />}

          {!loaded ? (
            <div className="funny-loader">
              <div className="loader-bot"></div>
              <p className="loader-line">{funnyLines[currentLine]}</p>
            </div>
          ) : (
            <div className="hero-section">
              <div className="hero-text">
                <h1 className="typewriter-welcome">Not just another portfolio.</h1>
                <div className="intro-fade">
                  <p className="noyal-line">
                    I'm <span className="hero-name">Noyal Santhosh</span> — I build things that work, and sometimes even look good doing it.
                  </p>
                  <p className="funny-line">
                    By day? I explore.<br />
                    By night? I debug life's mysteries.<br />
                    In between? I make time for problems, builds, and a bit of fun.
                  </p>
                  <p className="roles-line">
                    Call it what you want — I'm a&nbsp;
                    <span className="hero-role">
                      <Typewriter
                        words={[
                          "Ambitious",
                          "Tech Savvy",
                          "Problem Solver",
                          "Curious Learner",
                          "Cybersec Enthusiast",
                          "Photographer",
                          "Data Science Enthusiast",
                          "Visual Storyteller"
                        ]}
                        loop
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </span>
                    .
                  </p>
                </div>
              </div>

              <div className="hero-image decryption-card" ref={imageRef}>
                <TiltedCard
                  imageSrc={img}
                  captionText=""
                  containerWidth="350x"
                  containerHeight="350px"
                />
              </div>
            </div>
          )}
        </section>
        

        {loaded && <AboutMe />}
        <section id='journey'>{loaded && <Journey />}</section>

        <section id='connect'>
          {loaded && <Connect />}
        </section>
      </div>
    </div>
  );
};

export default App;