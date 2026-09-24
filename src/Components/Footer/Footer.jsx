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
    <footer className="relative z-20 w-full pt-16 pb-8 border-t border-primary/20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] bg-gradient-to-b from-background via-accent/20 to-primary/10 dark:from-[#1e293b] dark:to-[#0f172a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--primary)/0.05)_0%,transparent_100%)] pointer-events-none" />

      {/* ── 1. Top Section: 4 Information Columns ── */}
      <div className="relative max-w-screen-xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 z-10">
        {/* Column 1: Brand & College Info */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_80,c_limit/v1757125056/logo_pdqctw_ztwsvl.png"
              alt="Rotaract Club Logo"
              className="w-8 h-8 object-contain"
            />
            <h2 className="text-base font-extrabold text-foreground uppercase tracking-widest">
              Rotaract Club
            </h2>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            <a
              href="https://www.tcetmumbai.in/"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-primary transition-colors font-semibold"
            >
              Thakur College of Engineering & Technology
            </a>
            <br />
            A Block, Thakur Educational Campus, Thakur Village,
            <br />
            Kandivali East, Mumbai 400101, MH-IN
          </p>
          <a
            href="mailto:tcetrotaract@gmail.com"
            className="text-sm text-muted hover:text-primary font-semibold transition-colors"
          >
            tcetrotaract@gmail.com
          </a>
        </div>

        {/* Column 2: Explore */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-widest">
            Explore
          </h3>
          <ul className="flex flex-col space-y-2.5 text-sm text-muted font-medium">
            <li><Link to="/" onClick={scrollToTop} className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/about" onClick={scrollToTop} className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/projects" onClick={scrollToTop} className="hover:text-primary transition-colors">Projects</Link></li>
            <li><Link to="/events" onClick={scrollToTop} className="hover:text-primary transition-colors">Upcoming Events</Link></li>
            <li><Link to="/achievement" onClick={scrollToTop} className="hover:text-primary transition-colors">Our Achievements</Link></li>
          </ul>
        </div>

        {/* Column 3: Get Involved */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-widest">
            Get Involved
          </h3>
          <ul className="flex flex-col space-y-2.5 text-sm text-muted font-medium">
            <li><Link to="/meet-the-team" onClick={scrollToTop} className="hover:text-primary transition-colors">Meet The Team</Link></li>
            <li><Link to="/avenue" onClick={scrollToTop} className="hover:text-primary transition-colors">Avenues</Link></li>
            <li><Link to="/feedback" onClick={scrollToTop} className="hover:text-primary transition-colors">Feedback</Link></li>
            <li><Link to="/join" onClick={scrollToTop} className="hover:text-primary transition-colors">Join RCTCET</Link></li>
          </ul>
        </div>

        {/* Column 4: Follow Us */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-widest">
            Follow Us
          </h3>
          <p className="text-sm text-muted">
            Stay updated with our latest events and community initiatives!
          </p>
          <div className="flex gap-3">
            <a
              href="https://x.com/rc_tcet"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on X"
              className="w-10 h-10 bg-background rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-primary/20 hover:border-primary group"
            >
              <img
                src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1756746683/xIcon_xn4fbb.png"
                alt="Twitter"
                className="w-5 h-5 filter dark:invert opacity-75 group-hover:opacity-100 transition-opacity"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/rotaract-club-tcet-1158811b4/"
              target="_blank"
              rel="noreferrer"
              aria-label="Connect with us on LinkedIn"
              className="w-10 h-10 bg-background rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-primary/20 hover:border-primary group"
            >
              <img
                src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1756746683/linkedinIcon_cyydqx.png"
                alt="LinkedIn"
                className="w-5 h-5 filter dark:invert opacity-75 group-hover:opacity-100 transition-opacity"
              />
            </a>
            <a
              href="https://www.instagram.com/rc_tcet/"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on Instagram"
              className="w-10 h-10 bg-background rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-primary/20 hover:border-primary group"
            >
              <img
                src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1757119301/47bd8384-8446-479d-9a42-485a28b09c09_zsozfe.png"
                alt="Instagram"
                className="w-5 h-5 filter dark:invert opacity-75 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. Middle Section: Massive Outlined Typography ── */}
      <div className="relative w-full mt-12 md:mt-16 flex flex-col justify-center items-center overflow-hidden z-10 px-4 pointer-events-none select-none">
        <div
          aria-hidden="true"
          className="rctcet-footer-wordmark uppercase w-full text-center"
        >
          RCTCET
        </div>
      </div>

      {/* ── 3. Bottom Section (Below RCTCET): Expanded About & Info Section ── */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8 pt-8 pb-4 border-t border-primary/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pb-6 border-b border-primary/10">
          {/* About RCTCET Brief */}
          <div className="lg:col-span-7 flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-black tracking-widest text-primary uppercase">
                About Rotaract Club of TCET
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Chartered under Rotary International District 3141, the Rotaract Club of TCET is a student-led organization committed to leadership development, community service, professional growth, and social impact through Thakur College of Engineering & Technology.
            </p>
          </div>

          {/* Quick Info & Affiliation Badges */}
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-2.5 text-xs font-semibold">
            <span className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              RID 3141
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Sponsored by RC Bombay Airport
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              TCET Kandivali
            </span>
          </div>
        </div>

        {/* Bottom Navigation Links & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-muted">
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/about" onClick={scrollToTop} className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/join" onClick={scrollToTop} className="hover:text-primary transition-colors">
              Membership
            </Link>
            <Link to="/projects" onClick={scrollToTop} className="hover:text-primary transition-colors">
              Projects
            </Link>
            <Link to="/events" onClick={scrollToTop} className="hover:text-primary transition-colors">
              Upcoming Events
            </Link>
            <Link to="/feedback" onClick={scrollToTop} className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <div className="text-center sm:text-right">
            Rotaract Club of TCET • RID 3141 © {currentYear}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;