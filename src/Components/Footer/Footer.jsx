import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 w-full pt-16 pb-8 border-t border-primary/15 bg-card/60 dark:bg-[#0B0F17] backdrop-blur-xl">
      {/* Background ambient radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgb(var(--primary)/0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Footer Links Columns */}
      <div className="relative max-w-screen-xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 z-10">

        {/* Section 1: Brand Info */}
        <div className="flex flex-col space-y-5">
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1757125056/logo_pdqctw_ztwsvl.png"
              alt="Rotaract Club Logo"
              className="h-9 w-9 object-contain drop-shadow-sm"
            />
            <h2 className="text-xl font-black text-foreground uppercase tracking-wider">
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

        {/* Section 2: Explore */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-widest">
            Explore
          </h3>
          <ul className="flex flex-col space-y-2.5 text-sm text-muted font-medium">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
            <li><Link to="/events" className="hover:text-primary transition-colors">Upcoming Events</Link></li>
            <li><Link to="/achievement" className="hover:text-primary transition-colors">Our Achievements</Link></li>
          </ul>
        </div>

        {/* Section 3: Get Involved */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-bold text-foreground/90 uppercase tracking-widest">
            Get Involved
          </h3>
          <ul className="flex flex-col space-y-2.5 text-sm text-muted font-medium">
            <li><Link to="/meet-the-team" className="hover:text-primary transition-colors">Meet The Team</Link></li>
            <li><Link to="/avenue" className="hover:text-primary transition-colors">Avenues</Link></li>
            <li><Link to="/feedback" className="hover:text-primary transition-colors">Feedback</Link></li>
            <li><Link to="/join" className="hover:text-primary transition-colors">Join RCTCET</Link></li>
          </ul>
        </div>

        {/* Section 4: Socials */}
        <div className="flex flex-col space-y-5">
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

      {/* Massive Outlined Typography — Clean CodeRabbit Style (No blur, crisp stroke) */}
      <div className="relative w-full mt-14 md:mt-20 flex flex-col justify-center items-center overflow-hidden z-10 px-4 pointer-events-none select-none">
        <div
          aria-hidden="true"
          className="rctcet-footer-wordmark uppercase w-full text-center"
        >
          RCTCET
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar (CodeRabbit reference layout) */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8 pt-6 mt-2 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-muted">
        <div className="flex items-center gap-6">
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/join" className="hover:text-primary transition-colors">Membership</Link>
          <Link to="/feedback" className="hover:text-primary transition-colors">Contact</Link>
        </div>
        <div className="text-center sm:text-right">
          Rotaract Club of TCET • RID 3141 © {currentYear}
        </div>
      </div>
    </footer>
  );
}

export default Footer;