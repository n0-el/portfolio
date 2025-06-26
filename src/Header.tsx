import React, { useEffect, useState } from 'react';
import './Header.css';
import Scrollbar from 'smooth-scrollbar';

interface HeaderProps {
  textColor: string;
}

const Header: React.FC<HeaderProps> = ({ textColor }) => {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const mainContainer = document.querySelector('.main') as HTMLElement;
    const scrollBar = Scrollbar.get(mainContainer);

    const handleScroll = () => {
      const scrollY = scrollBar?.scrollTop || 0;
      setShowHeader(scrollY < window.innerHeight - 100);
    };

    scrollBar?.addListener(handleScroll);
    return () => scrollBar?.removeListener(handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(targetId) as HTMLElement;
    const mainContainer = document.querySelector('.main') as HTMLElement;

    if (target && mainContainer) {
      const scrollBarInstance = Scrollbar.get(mainContainer);
      if (scrollBarInstance) {
        const targetPosition = target.offsetTop - 100;
        scrollBarInstance.scrollTo(0, targetPosition, 800);
      }
    }
  };

  if (!showHeader) return null;

  return (
    <div className="header" style={{ color: textColor }}>
      <div className="top-right">
        <a className="themed-link" href="#about" onClick={(e) => handleNavClick(e, '#about')}>
          <span className="label-default">About Me</span>
          <span className="label-alt">Who Dis</span>
        </a>
        <a className="themed-link" href="#journey" onClick={(e) => handleNavClick(e, '#journey')}>
          <span className="label-default">Journey</span>
          <span className="label-alt">Quest</span>
        </a>
        <a className="themed-link" href="#connect" onClick={(e) => handleNavClick(e, '#connect')}>
          <span className="label-default">Contact</span>
          <span className="label-alt">Ping</span>
        </a>
      </div>
    </div>
  );
};

export default Header;
