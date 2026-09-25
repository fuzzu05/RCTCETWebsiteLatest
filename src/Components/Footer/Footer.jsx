import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  };

  return (
    <footer className="relative z-20 w-full pt-16 pb-8 border-t border-primary/20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] bg-gradient-to-b from-background via-accent/20 to-primary/10 dark:from-[#1e293b] dark:to-[#0f172a] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--primary)/0.04)_0%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto px-6 sm:px-8 z-10">
        {/* 1. Main 4-Column Navigation Grid (Matches Reference Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 items-start">

          {/* Column 1: Club Identity, Institution, Address & Email */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757125056/logo_pdqctw_ztwsvl.png"
                alt="Rotaract Logo"
                className="h-7 w-7 object-contain"
              />
              <h2 className="text-base font-black text-foreground uppercase tracking-wider">
                Rotaract Club
              </h2>
            </div>

            <div className="space-y-1">
              <a
                href="https://www.tcetmumbai.in/"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-foreground hover:text-primary transition-colors block leading-snug"
              >
                Thakur College of Engineering & Technology
              </a>
              <p className="text-xs md:text-sm text-muted leading-relaxed">
                A Block, Thakur Educational Campus, <br />
                Thakur Village, <br />
                Kandivali East, Mumbai 400101, MH-IN
              </p>
            </div>

            <div>
              <a
                href="mailto:tcetrotaract@gmail.com"
                className="text-xs md:text-sm font-semibold text-foreground hover:text-primary transition-colors inline-block"
              >
                tcetrotaract@gmail.com
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="flex flex-col">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              Explore
            </h2>
            <ul className="flex flex-col space-y-2.5 text-xs md:text-sm text-muted font-medium">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" onClick={scrollToTop} className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/projects" onClick={scrollToTop} className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link to="/events" onClick={scrollToTop} className="hover:text-primary transition-colors">Upcoming Events</Link></li>
              <li><Link to="/achievement" onClick={scrollToTop} className="hover:text-primary transition-colors">Our Achievements</Link></li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div className="flex flex-col">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              Get Involved
            </h2>
            <ul className="flex flex-col space-y-2.5 text-xs md:text-sm text-muted font-medium">
              <li><Link to="/meet-the-team" onClick={scrollToTop} className="hover:text-primary transition-colors">Meet The Team</Link></li>
              <li><Link to="/avenue" onClick={scrollToTop} className="hover:text-primary transition-colors">Avenues</Link></li>
              <li><Link to="/feedback" onClick={scrollToTop} className="hover:text-primary transition-colors">Feedback</Link></li>
              <li><Link to="/join" onClick={scrollToTop} className="hover:text-primary transition-colors">Join RCTCET</Link></li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="flex flex-col">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              Follow Us
            </h2>
            <p className="text-xs md:text-sm text-muted leading-relaxed mb-5 max-w-xs">
              Stay updated with our latest events and community initiatives!
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/rc_tcet"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on X"
                className="w-9 h-9 bg-background/60 hover:bg-primary/10 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-primary/20 hover:border-primary/50 group"
              >
                <img
                  src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1756746683/xIcon_xn4fbb.png"
                  alt="X"
                  className="w-4 h-4 filter dark:invert opacity-75 group-hover:opacity-100 transition-opacity"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/rotaract-club-tcet-1158811b4/"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on LinkedIn"
                className="w-9 h-9 bg-background/60 hover:bg-primary/10 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-primary/20 hover:border-primary/50 group"
              >
                <img
                  src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1756746683/linkedinIcon_cyydqx.png"
                  alt="LinkedIn"
                  className="w-4 h-4 filter dark:invert opacity-75 group-hover:opacity-100 transition-opacity"
                />
              </a>
              <a
                href="https://www.instagram.com/rc_tcet/"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Instagram"
                className="w-9 h-9 bg-background/60 hover:bg-primary/10 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-primary/20 hover:border-primary/50 group"
              >
                <img
                  src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1757119301/47bd8384-8446-479d-9a42-485a28b09c09_zsozfe.png"
                  alt="Instagram"
                  className="w-4 h-4 filter dark:invert opacity-75 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>

        {/* 2. Institutional Branding Logos (Properly proportioned & centered) */}
        <div className="flex justify-center items-center gap-8 mt-12 mb-2 opacity-80 hover:opacity-100 transition-opacity">
          <img
            src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_200,c_limit/v1757125056/logo_pdqctw_ztwsvl.png"
            alt="RCTCET Logo"
            className="h-16 w-16 md:h-20 md:w-20 object-contain drop-shadow-sm hover:scale-105 transition-transform"
          />
          <div className="h-12 w-px bg-primary/20" />
          <img
            src="https://res.cloudinary.com/aaqzfmzc/image/upload/v1787231323/TCET_new_logo.png"
            alt="TCET Logo"
            className="h-16 w-16 md:h-20 md:w-20 object-contain drop-shadow-sm hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* 3. Massive Footer Text — CodeRabbit-inspired outlined atmospheric typography (EXACTLY UNTOUCHED) */}
      <div className="relative w-full mt-6 md:mt-8 pt-4 flex flex-col justify-center items-center overflow-hidden z-10 px-4 pointer-events-none">
        <div
          aria-hidden="true"
          className="rctcet-footer-wordmark uppercase w-full text-center"
        >
          RCTCET
        </div>
      </div>

      {/* 4. Bottom Utility Links & Legal Copyright Row (Directly Below Giant RCTCET) */}
      <div className="relative max-w-screen-xl mx-auto px-6 sm:px-8 mt-4 pt-6 border-t border-primary/10 z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          {/* Left: About | Membership | Contact */}
          <div className="flex items-center space-x-6 font-medium">
            <Link to="/about" onClick={scrollToTop} className="hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/join" onClick={scrollToTop} className="hover:text-primary transition-colors">
              Membership
            </Link>
            <Link to="/feedback" onClick={scrollToTop} className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Right: Copyright info */}
          <div className="text-center sm:text-right font-medium tracking-wide">
            Rotaract Club of TCET • RID 3141 © {currentYear}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;