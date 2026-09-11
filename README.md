<div align="center">

### Rotaract Club of TCET Website

</div>

<div align="center">

[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?logo=Firebase&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)

</div>

---

### Overview

The official website for the Rotaract Club of Thakur College of Engineering and Technology (TCET). This modern web application serves as a digital hub for club information, events, projects, achievements, and member engagement. The site features a responsive design with light/dark mode support, dynamic content management, and seamless user experience for both members and visitors.

---

### Demo

Live Website: [https://www.rc.tcetmumbai.in](https://www.rc.tcetmumbai.in)

---

### Project Structure

```
RCTCETWebsiteLatest/
├── src/
│   ├── Components/          # Reusable UI components
│   │   ├── Header/         # Navigation and header
│   │   ├── Footer/         # Footer with links and info
│   │   ├── Admin/          # Admin dashboard components
│   │   └── ...             # Other UI components
│   ├── context/            # React context providers
│   ├── data/               # Static data and content
│   ├── hooks/              # Custom React hooks
│   ├── layout.jsx          # Main layout wrapper
│   ├── pages/              # Page components
│   └── index.css           # Global styles and theme
├── public/                 # Static assets
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
```

---

### Tech Stack

- **Frontend Framework**: React 18 with modern hooks and patterns
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom theme configuration for Rotaract brand colors
- **Routing**: React Router for client-side navigation
- **Backend**: Firebase for authentication, database, and hosting
- **Animations**: Framer Motion for smooth UI transitions
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API for theme and authentication

---

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/fuzzu05/RCTCETWebsiteLatest.git
cd RCTCETWebsiteLatest
npm install
```

---

### Usage

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

### Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory:

```env
VITE_CHATBOT_API_URL=your_chatbot_api_url
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

---

### Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Theme System**: Light and dark mode with Rotaract brand colors
- **Dynamic Content**: Event listings, project showcases, and member profiles
- **Admin Dashboard**: Secure admin panel for content management
- **Event Registration**: User registration system for club events
- **Achievement Tracking**: Display of club and member achievements
- **Team Showcase**: Member profiles and organizational structure
- **Contact Forms**: Feedback and membership inquiry forms

---

<div align="center">

Built by [Shaurya Chopra](https://shauryachopra.dev/)

</div>
