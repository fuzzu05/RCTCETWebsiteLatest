
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './layout';
import { ThemeProvider } from './context/themeContext';
import { HelmetProvider } from 'react-helmet-async';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './Components/Admin/ProtectedRoute';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setupLenisGsapTicker, initRotaractLightAnimations, ScrollTrigger } from './utils/gsapAnimations';
import { useTheme } from './hooks/useTheme';

// Scroll to top on route change with Lenis & ScrollTrigger compatibility
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // 1. Immediate native scroll reset
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 2. Immediate Lenis virtual scroll reset
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }

    // 3. Post-render re-assertion to prevent late-loading element scroll drift
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
}

// Manages Lenis Smooth Scroll, GSAP ScrollTrigger synchronization, and Rotaract Light Mode animations
function AnimationManager({ children }) {
  const { theme } = useTheme();

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;

    // 2. Synchronize Lenis with GSAP ScrollTrigger Ticker
    const cleanupTicker = setupLenisGsapTicker(lenis);

    return () => {
      cleanupTicker();
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    // 3. Trigger Rotaract Light Mode visual effects (gradient shift & entrance effects)
    // Only re-runs when the theme changes — NOT on every route change to prevent
    // GSAP ScrollTrigger instances from accumulating and causing lag.
    const cleanupAnimations = initRotaractLightAnimations(theme);
    ScrollTrigger.refresh();

    return () => {
      cleanupAnimations();
    };
  }, [theme]);

  return children;
}

const Home = lazy(() => import('./pages/home'));
const Achievement = lazy(() => import('./pages/Achievement').then(m => ({ default: m.Achievement })));
const TeamPage = lazy(() => import('./pages/meetTheTeam'));
const About = lazy(() => import('./pages/about'));
const Projects = lazy(() => import('./pages/projects'));
const RegistrationForm = lazy(() => import('./pages/Registration'));
const UpcomingEvents = lazy(() => import('./pages/UpcomingEvents'));
const EventRegistration = lazy(() => import('./pages/EventRegistration'));
const Avenue = lazy(() => import('./Components/Avenue').then(m => ({ default: m.Avenue })));
const SaaFineTable = lazy(() => import('./Components/Admin/SaaFineTable'));
const FeedBack = lazy(() => import('./Components/Feedback/FeedBack'));
const AttendanceAdmin = lazy(() => import('./pages/AttendanceAdmin'));

// Admin pages (outside main Layout — no navbar/footer)
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminCreateEvent = lazy(() => import('./pages/Admin/CreateEvent'));
const AdminEditEvent = lazy(() => import('./pages/Admin/EditEvent'));

function App() {
  useEffect(() => {
    // Coldstart the backend
    fetch(`${import.meta.env.VITE_CHATBOT_API_URL}/activate`)
      .then(() => console.log('Backend wake-up initiated'))
      .catch(err => console.error('Failed to wake up backend:', err));
  }, []);

  const Loader = (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AdminAuthProvider>
          <Router basename="/">
            <AnimationManager>
              <ScrollToTop />
              <Suspense fallback={Loader}>
                <Routes>
                  {/* ── Admin routes (no Layout wrapper) ── */}
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/create-event" element={<ProtectedRoute><AdminCreateEvent /></ProtectedRoute>} />
                  <Route path="/admin/edit-event/:eventId" element={<ProtectedRoute><AdminEditEvent /></ProtectedRoute>} />

                  {/* ── Public routes (with Layout) ── */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="about" element={<About />} />
                    {/* club hub start */}
                    <Route path="avenue" element={<Avenue />} />
                    <Route path="achievement" element={<Achievement />} />
                    <Route path="saa-fine" element={<SaaFineTable />} />
                    <Route path="meet-the-team" element={<TeamPage />} />
                    <Route path="feedback" element={<FeedBack />} />
                    <Route path="admin/attendance" element={<AttendanceAdmin />} />
                    {/* club hub finish */}
                    <Route path="join" element={<RegistrationForm />} />
                    <Route path="events" element={<UpcomingEvents />} />
                    <Route path="event/:eventId" element={<EventRegistration />} />
                  </Route>
                </Routes>
              </Suspense>
            </AnimationManager>
          </Router>
        </AdminAuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
