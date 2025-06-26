import React, { useEffect, useRef } from 'react';
import TextPressure from './components/TextAnimations/TextPressure/TextPressure';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutMe: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, x: -80 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
              scroller: '.main',
            },
          }
        );
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            transformOrigin: 'left center',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              scroller: '.main',
            },
          }
        );
      }

      if (paragraphRef.current) {
        gsap.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              scroller: '.main',
            },
          }
        );
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-bgcolor="#000000"
      data-textcolor="#f0f0f0"
      style={{
        backgroundColor: '#000',
        color: '#f0f0f0',
        padding: '60px 5vw',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        gap: '5vw',
      }}
    >
      {/* Left Content */}
      <div style={{ maxWidth: '900px', flex: 1, zIndex: 2 }}>
        <div className="about-heading-fade" ref={headingRef}>
          <TextPressure
            text="Little Bit About Me"
            flex={true}
            alpha={false}
            stroke={true}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#00ffff"
            minFontSize={28}
          />
        </div>

        {/* Divider Line */}
        <div
          ref={lineRef}
          style={{
            width: '60px',
            height: '3px',
            backgroundColor: '#00ffff',
            margin: '20px 0',
            transform: 'scaleX(0)',
          }}
        ></div>

        {/* Paragraph */}
        <div>
          <p
            ref={paragraphRef}
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              marginBottom: '2rem',
              color: '#ffffff',
              opacity: 0,
            }}
          >
            Hey, I'm <strong>Noyal Santhosh</strong>, a final-year IT undergrad with a passion for the ever-evolving world of Artificial Intelligence. I'm especially curious about how data drives decisions and how intelligent systems adapt and learn. Alongside my interest in AI and Data Science, I love crafting dynamic, user-focused web applications that blend thoughtful design with practical functionality. I'm always exploring new technologies that push creative and technical boundaries.

            Right now, I’m working toward building a major project that brings together multiple technologies—focused on intuitive design, smooth interactions, and real-world usefulness. I thrive on the challenge of turning ideas into polished, meaningful digital experiences.

            Outside of tech, I’m drawn to photography. Capturing spontaneous moments and visual stories helps fuel my creativity and offers a fresh perspective that often finds its way into my work.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
