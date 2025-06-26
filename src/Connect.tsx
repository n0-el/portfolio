import { useEffect, useRef, useState } from 'react';

const Connect = () => {
  const connectRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const contactInfo = [
    {
      title: 'Email',
      value: '',
      href: 'mailto:noyalsanthosh2004@gmail.com',
      icon: '✉',
      description: 'Drop me a line',
      color: '#4ecdc4'
    },
    {
      title: 'GitHub',
      value: '',
      href: 'https://github.com/n0-el',
      icon: '⚡',
      description: 'Check out my code',
      color: '#f093fb'
    },
    {
      title: 'LinkedIn',
      value: '',
      href: 'https://www.linkedin.com/in/noyal-santhosh',
      icon: '💼',
      description: 'Professional network',
      color: '#45b7d1'
    },
    {
      title: 'Instagram',
      value: '',
      href: 'https://www.instagram.com/_n0.el_/',
      icon: '📸',
      description: 'Visual stories',
      color: '#ff6b6b'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (connectRef.current) {
      observer.observe(connectRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>
        {`
          .fade-container {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 1s ease, transform 1s ease;
          }

          .fade-container.fade-in {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>

      <div
        ref={connectRef}
        className={`fade-container ${isVisible ? 'fade-in' : ''}`}
        style={{
          minHeight: '100vh',
          background: '#000',
          color: '#fff',
          padding: '80px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255, 107, 107, 0.1), transparent)',
            borderRadius: '50%',
            top: '20%',
            left: '10%',
            filter: 'blur(40px)'
          }} />
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(78, 205, 196, 0.1), transparent)',
            borderRadius: '50%',
            bottom: '20%',
            right: '10%',
            filter: 'blur(40px)'
          }} />
          <div style={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(69, 183, 209, 0.1), transparent)',
            borderRadius: '50%',
            top: '60%',
            left: '60%',
            filter: 'blur(40px)'
          }} />
        </div>

        <div style={{ maxWidth: '1000px', width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h1 style={{
              fontSize: 'clamp(3rem, 6vw, 4.5rem)',
              fontWeight: 700,
              margin: '0 0 1.5rem 0',
              background: 'linear-gradient(135deg, #00ffff, #0080ff, #ff6b6b)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '300% 300%',
              lineHeight: 1.1
            }}>
              Let's Create Something Amazing
            </h1>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              color: '#aaa',
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Looking to connect? I’m just a message away.
            </p>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {contactInfo.map((contact, index) => (
              <a
                key={contact.title}
                href={contact.href}
                target={contact.title !== 'Email' ? '_blank' : undefined}
                rel={contact.title !== 'Email' ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
                  border: hoveredCard === index ? `1px solid ${contact.color}` : '1px solid #333',
                  borderRadius: '20px',
                  padding: '2rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCard === index
                    ? `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px ${contact.color}20`
                    : '0 4px 6px rgba(0, 0, 0, 0.1)',
                  display: 'block',
                  opacity: isVisible ? 1 : 0,
                  transformOrigin: 'bottom',
                  transitionDelay: `${index * 0.2}s`
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: contact.color,
                  transform: hoveredCard === index ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.4s ease',
                  transformOrigin: 'left'
                }}></div>

                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1.5rem',
                  filter: hoveredCard === index ? 'grayscale(0)' : 'grayscale(1)',
                  transition: 'filter 0.3s ease'
                }}>
                  {contact.icon}
                </div>

                <div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    margin: '0 0 0.5rem 0',
                    color: hoveredCard === index ? contact.color : '#fff',
                    transition: 'color 0.3s ease'
                  }}>
                    {contact.title}
                  </h3>

                  <p style={{
                    fontSize: '1rem',
                    color: '#ccc',
                    margin: '0 0 0.75rem 0',
                    fontFamily: "'Courier New', monospace"
                  }}>
                    {contact.value}
                  </p>

                  <span style={{
                    fontSize: '0.9rem',
                    color: '#888',
                    fontStyle: 'italic'
                  }}>
                    {contact.description}
                  </span>
                </div>

                <div style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  color: hoveredCard === index ? contact.color : '#666',
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === index ? 'translate(3px, -3px)' : 'translate(0, 0)'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            paddingTop: '3rem',
            borderTop: '1px solid #333'
          }}>
            <p style={{
              fontSize: '1.1rem',
              color: '#bbb',
              margin: '0 0 2rem 0',
              lineHeight: 1.6,
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Always excited about new opportunities, collaborations, and interesting conversations.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <span style={{
                width: '60px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #00ffff, transparent)'
              }}></span>
              <span style={{
                fontSize: '1.1rem',
                color: '#00ffff',
                fontWeight: 400,
                letterSpacing: '1px'
              }}>
                Noyal Santhosh
              </span>
              <span style={{
                width: '60px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #00ffff, transparent)'
              }}></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connect;
