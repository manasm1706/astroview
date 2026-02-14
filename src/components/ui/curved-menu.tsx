"use client";
import React, { useState, useRef, useEffect } from "react";

import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Github, Dribbble, Figma } from "lucide-react";

interface iNavItem {
  heading: string;
  href: string;
  subheading?: string;
  imgSrc?: string;
}

interface iNavLinkProps extends iNavItem {
  setIsActive: (isActive: boolean) => void;
  index: number;
}

interface iCurvedNavbarProps {
  setIsActive: (isActive: boolean) => void;
  navItems: iNavItem[];
}

interface iHeaderProps {
  navItems?: iNavItem[];
  footer?: React.ReactNode;
}

const MENU_SLIDE_ANIMATION = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const defaultNavItems: iNavItem[] = [
  {
    heading: "Home",
    href: "/",
    subheading: "Back to landing",
  },
  {
    heading: "Dashboard",
    href: "/dashboard",
    subheading: "Your space intelligence hub",
  },
  {
    heading: "Sky Events",
    href: "/sky-events",
    subheading: "Tonight's celestial events",
  },
  {
    heading: "Space Impact",
    href: "/space-impact",
    subheading: "How space affects Earth",
  },
  {
    heading: "Live Tracker",
    href: "/live-tracker",
    subheading: "Real-time ISS tracking",
  },
];

const CustomFooter: React.FC = () => {
  return (
    <div className="flex w-full text-sm justify-between px-10 md:px-24 py-5" style={{ color: '#A0A7C0' }}>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <Linkedin size={24} />
      </a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <Github size={24} />
      </a>
      <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
        <Dribbble size={24} />
      </a>
      <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer">
        <Figma size={24} />
      </a>
      <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer">
        <Figma size={24} />
      </a>
    </div>
  );
};

const NavLink: React.FC<iNavLinkProps> = ({
  heading,
  href,
  setIsActive,
  index,
}) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const rect = ref.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleClick = () => {
    return setIsActive(false);
  };

  return (
    <motion.div
      onClick={handleClick}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b py-4 transition-colors duration-500 md:py-8 uppercase"
      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <Link ref={ref} onMouseMove={handleMouseMove} to={href}>
        <div className="relative flex items-start">
          <span className="transition-colors duration-500 text-4xl font-thin mr-2" style={{ color: '#00F5FF' }}>
            {index}.
          </span>
          <div className="flex flex-row gap-2">
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: -16 },
              }}
              transition={{
                type: "spring",
                staggerChildren: 0.075,
                delayChildren: 0.25,
              }}
              className="relative z-10 block text-4xl font-extralight transition-colors duration-500 md:text-4xl"
              style={{ color: '#ffffff' }}
            >
              {heading.split("").map((letter, i) => {
                return (
                  <motion.span
                    key={i}
                    variants={{
                      initial: { x: 0 },
                      whileHover: { x: 16 },
                    }}
                    transition={{ type: "spring" }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Curve: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!windowHeight) return null;

  const initialPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  return (
    <svg
      className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full"
      style={{ fill: '#0a0e1a' }}
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
};

const CurvedNavbar: React.FC<
  iCurvedNavbarProps & { footer?: React.ReactNode }
> = ({ setIsActive, navItems, footer }) => {
  return (
    <>
      {/* Blur backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => setIsActive(false)}
        className="fixed inset-0 z-30"
        style={{ background: 'rgba(3,5,15,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      />

      <motion.div
        variants={MENU_SLIDE_ANIMATION}
        initial="initial"
        animate="enter"
        exit="exit"
        className="h-[100dvh] w-screen max-w-screen-sm fixed right-0 top-0 z-40"
        style={{ background: '#0a0e1a', borderRadius: '40px 0 0 40px' }}
      >
        <div className="h-full pt-14 flex flex-col justify-between">
          <div className="flex flex-col text-5xl gap-3 mt-0 px-10 md:px-24">
            <div className="uppercase text-sm mb-0" style={{ color: '#A0A7C0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <p>Navigation</p>
            </div>
            <section className="bg-transparent mt-0">
              <div className="mx-auto max-w-7xl">
                {navItems.map((item, index) => {
                  return (
                    <NavLink
                      key={item.href}
                      {...item}
                      setIsActive={setIsActive}
                      index={index + 1}
                    />
                  );
                })}
              </div>
            </section>
          </div>
          {footer}
        </div>
        <Curve />
      </motion.div>
    </>
  );
};

const Header: React.FC<iHeaderProps> = ({
  navItems = defaultNavItems,
  footer = <CustomFooter />,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="relative">
        <div
          onClick={handleClick}
          className="fixed right-4 top-4 md:right-6 md:top-6 z-50 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
        >
          <div className="relative w-8 h-6 flex flex-col justify-between items-center">
            <span
              className={`block h-1 w-7 transition-transform duration-300 ${isActive ? "rotate-45 translate-y-2" : ""}`}
              style={{ background: '#ffffff' }}
            ></span>
            <span
              className={`block h-1 w-7 transition-opacity duration-300 ${isActive ? "opacity-0" : ""}`}
              style={{ background: '#ffffff' }}
            ></span>
            <span
              className={`block h-1 w-7 transition-transform duration-300 ${isActive ? "-rotate-45 -translate-y-3" : ""}`}
              style={{ background: '#ffffff' }}
            ></span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <CurvedNavbar
            setIsActive={setIsActive}
            navItems={navItems}
            footer={footer}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
