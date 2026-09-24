import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../themeButton";
import LimelightIndicator from "./LimelightIndicator";
import MobileMenu from "./MobileMenu";
import { Users, Compass, Award, MessageSquare, ChevronDown, Menu } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClubDropdownOpen, setIsClubDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const clubDropdownRef = useRef(null);
  const navItemRefs = useRef([]);
  const navRef = useRef(null);
  const menuTriggerRef = useRef(null);
  const isLockedClosedRef = useRef(false);
  const closeTimeoutRef = useRef(null);

  const handleCloseMenu = useCallback(() => setIsMenuOpen(false), []);
  const handleOpenMenu = useCallback(() => setIsMenuOpen(true), []);

  const handleMouseEnterDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // If locked closed by a user click, do not reopen until mouse has left
    if (isLockedClosedRef.current) return;
    setIsClubDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    // Small grace period ensuring smooth mouse movement, then resets lock
    closeTimeoutRef.current = setTimeout(() => {
      setIsClubDropdownOpen(false);
      isLockedClosedRef.current = false;
    }, 120);
  };

  const handleToggleClubDropdown = (e) => {
    e.stopPropagation();
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (isClubDropdownOpen) {
      // If currently open, user explicitly clicked to close it
      setIsClubDropdownOpen(false);
      isLockedClosedRef.current = true;
    } else {
      // If currently closed, user explicitly clicked to open it
      isLockedClosedRef.current = false;
      setIsClubDropdownOpen(true);
    }
  };

  const handleNavClick = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // Immediately close dropdown & mobile drawer and lock hover until mouse leaves
    isLockedClosedRef.current = true;
    setIsClubDropdownOpen(false);
    setIsMenuOpen(false);

    // Force instant scroll to top (handles same-page re-clicks as well)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  // Single, synchronous routing source of truth
  const getActiveNav = (rawPath) => {
    const path = ((rawPath || "/").replace(/\/+$/, "") || "/").toLowerCase();
    if (path === "/" || path === "") return { index: 0, name: "Home" };
    if (path === "/about") return { index: 1, name: "About us" };
    if (path === "/projects") return { index: 2, name: "Projects" };
    if (path === "/events" || path.startsWith("/event")) return { index: 3, name: "Upcoming Events" };
    if (
      [
        "/meet-the-team",
        "/achievement",
        "/club-insight",
        "/avenue",
        "/feedback",
        "/saa-fine",
      ].includes(path) ||
      path.startsWith("/meet-the-team") ||
      path.startsWith("/achievement") ||
      path.startsWith("/avenue") ||
      path.startsWith("/feedback") ||
      path.startsWith("/saa-fine")
    ) {
      return { index: 4, name: "Club hub" };
    }
    return { index: -1, name: "" };
  };

  const activeNav = getActiveNav(location.pathname);
  const activeIndex = activeNav.index;
  const activeLink = activeNav.name;

  // Auto-close drawers when navigating between different routes
  // (Do NOT unlock hover here so that a freshly clicked link doesn't reopen under the cursor)
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setIsMenuOpen(false);
      setIsClubDropdownOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        window.scrollY ||
        window.pageYOffset ||
        (window.__lenis ? window.__lenis.scroll : 0) ||
        0;
      setIsScrolled(currentScroll > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let unbindLenis;
    if (window.__lenis) {
      unbindLenis = window.__lenis.on("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (typeof unbindLenis === "function") unbindLenis();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clubDropdownRef.current &&
        !clubDropdownRef.current.contains(event.target)
      ) {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setIsClubDropdownOpen(false);
        isLockedClosedRef.current = false;
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setIsClubDropdownOpen(false);
        isLockedClosedRef.current = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About us", to: "/about" },
    { name: "Projects", to: "/projects" },
    { name: "Upcoming Events", to: "/events" },
  ];

  const clubLinks = [
    { name: "The Team", to: "/meet-the-team", icon: Users, desc: "See the faces behind the magic" },
    { name: "Avenues", to: "/avenue", icon: Compass, desc: "Explore our different departments" },
    { name: "Achievement", to: "/achievement", icon: Award, desc: "Our proudest moments & awards" },
    { name: "Get In Touch", to: "/feedback", icon: MessageSquare, desc: "Reach out to us directly" },
  ];

  return (
    <header
      className={`pointer-events-auto transition-all duration-300 ease-in-out ${
        isScrolled
          ? "mt-3 md:mt-4 mx-auto w-[95vw] lg:w-[90vw] xl:w-[85vw] max-w-7xl rounded-full border border-primary/25 shadow-2xl py-2 px-5 md:px-8 bg-card/90 backdrop-blur-2xl"
          : "mt-0 mx-auto w-full max-w-full rounded-none border-b border-primary/20 shadow-sm py-3.5 px-6 md:px-8 lg:px-12 bg-card/95 backdrop-blur-md"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center relative">
        
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" onClick={handleNavClick} className="flex items-center group">
            <img
              src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757125056/logo_pdqctw_ztwsvl.png"
              alt="Rotaract Club of TCET Logo"
              className={`transition-all duration-300 ease-in-out drop-shadow-md group-hover:rotate-12 ${
                isScrolled ? "h-9 w-9" : "h-11 w-11"
              }`}
            />
          </Link>
        </div>

        {/* Desktop Nav with Limelight */}
        <nav
          ref={navRef}
          className="relative hidden lg:flex justify-center items-center space-x-2 xl:space-x-4"
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              ref={(el) => (navItemRefs.current[index] = el)}
              to={link.to}
              onClick={handleNavClick}
              className={`relative px-3 py-2 rounded-full text-base font-bold tracking-wide group transition-all duration-300 ${
                activeIndex === index
                  ? "text-primary opacity-100"
                  : "text-foreground opacity-75 hover:opacity-100 hover:text-primary"
              }`}
            >
              <span className="relative z-20 transition-colors duration-300">
                {link.name}
              </span>
            </Link>
          ))}

          {/* Club Hub Dropdown */}
          <div
            className="relative flex items-center h-full"
            ref={clubDropdownRef}
            onMouseEnter={handleMouseEnterDropdown}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <button
              ref={(el) => (navItemRefs.current[4] = el)}
              onClick={handleToggleClubDropdown}
              className={`relative px-3 py-2 rounded-full text-base font-bold tracking-wide group flex items-center gap-1.5 transition-all duration-300 ${
                activeIndex === 4
                  ? "text-primary opacity-100"
                  : "text-foreground opacity-75 hover:opacity-100 hover:text-primary"
              }`}
            >
              <span className="relative z-20 flex items-center gap-1.5 transition-colors duration-300">
                Club Hub
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isClubDropdownOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </span>
            </button>

            {/* Premium Dropdown Card */}
            <AnimatePresence>
              {isClubDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 z-[200] w-[320px]"
                >
                  {/* Invisible hover bridge to prevent dead-zone hover leaves when crossing the 8px gap */}
                  <div className="absolute -top-3 left-0 right-0 h-3" aria-hidden="true" />

                  <div className="bg-card/95 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] rounded-2xl border border-primary/20 overflow-hidden p-2 grid grid-cols-1 gap-1">
                    {clubLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.to}
                        onClick={handleNavClick}
                        className="group/item flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
                      >
                        {/* Icons removed as per user request */}
                        <div>
                          <div className="text-foreground font-bold text-sm group-hover/item:text-primary transition-colors">
                            {link.name}
                          </div>
                          <div className="text-muted text-xs font-medium mt-0.5">
                            {link.desc}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Limelight Indicator mounted after nav items for reliable ref binding */}
          <LimelightIndicator
            activeIndex={activeIndex}
            navItemRefs={navItemRefs}
            containerRef={navRef}
            isScrolled={isScrolled}
          />
        </nav>

        {/* Desktop Contact & Theme Toggle */}
        <div className="hidden lg:flex flex-1 justify-end space-x-3 items-center">
          <Link
            to="/join"
            onClick={handleNavClick}
            className="btn-rotaract relative group bg-gradient-to-br from-primary via-secondary to-accent text-white font-semibold py-2 px-5 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.35)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap overflow-hidden"
          >
            <span className="relative z-10 text-sm tracking-wide">Become a member</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </Link>
          <div className="flex items-center justify-center">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="lg:hidden flex flex-1 justify-end items-center space-x-3">
          <div className="flex items-center justify-center">
            <ThemeToggle />
          </div>
          <button
            ref={menuTriggerRef}
            onClick={handleOpenMenu}
            className="p-2 bg-primary/10 text-primary rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-primary/20 active:scale-95 transition-all duration-200 cursor-pointer touch-manipulation"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-portal"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Full-Screen Glass Editorial Mobile Navigation Layer (from reference) */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        activeLink={activeLink}
        navLinks={navLinks}
        clubLinks={clubLinks}
        triggerRef={menuTriggerRef}
      />
    </header>
  );
}

export default Header;
