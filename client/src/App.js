import './App.css';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import ScrapBook from "./components/ScrapBook";
import PainTracker from "./components/PainTracker";
import {
  ChatBubbleLeftEllipsisIcon,
  BookOpenIcon,
  HeartIcon,
  CakeIcon,
  FireIcon,
  MoonIcon
} from "@heroicons/react/24/outline";

import { requestNotificationPermission } from './utils/NotificationUtils';
import { registerServiceWorker } from './serviceWorkerRegistration';

function App() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/scrapbook" element={<ScrapBook />} />
          <Route path="/pain-tracker" element={<PainTracker />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </Router>
    </div>
  );
}

function Dashboard() {
  const [notificationsAllowed, setNotificationsAllowed] = useState(
    Notification.permission === 'granted'
  );

  const handleEnableNotifications = async () => {
    const permission = await requestNotificationPermission();
    if (permission === 'granted') {
      setNotificationsAllowed(true);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">HealthX Dashboard</h1>
        {/* Notification Button (only if not granted) */}
        {!notificationsAllowed && (
          <button
            onClick={handleEnableNotifications}
            className="notification-btn"
          >
            Enable Notifications
          </button>
        )}
      </header>

      {/* Feature Cards */}
      <main className="dashboard-grid">
        <DashboardCard
          title="AI Assistant"
          path="/chat"
          icon={<ChatBubbleLeftEllipsisIcon className="dashboard-card-icon h-6 w-6" />}
        />
        <DashboardCard
          title="Personal Journal"
          path="/scrapbook"
          icon={<BookOpenIcon className="dashboard-card-icon h-6 w-6" />}
        />
        <DashboardCard
          title="Pain Management"
          path="/pain-tracker"
          icon={<HeartIcon className="dashboard-card-icon h-6 w-6" />}
        />
        <DashboardCard
          title="Nutrition Tracker"
          path="#"
          icon={<CakeIcon className="dashboard-card-icon h-6 w-6" />}
        />
        <DashboardCard
          title="Exercise Planner"
          path="#"
          icon={<FireIcon className="dashboard-card-icon h-6 w-6" />}
        />
        <DashboardCard
          title="Sleep Optimizer"
          path="#"
          icon={<MoonIcon className="dashboard-card-icon h-6 w-6" />}
        />
      </main>
    </div>
  );
}

function DashboardCard({ title, path, icon }) {
  return (
    <a
      href={path}
      className="dashboard-card"
      aria-label={`Navigate to ${title}`}
    >
      {icon} {title}
    </a>
  );
}

export default App;

// import './App.css';
// import React, { useEffect, useState } from 'react';
// import { Toaster } from 'react-hot-toast';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Chat from "./components/Chat";
// import ScrapBook from "./components/ScrapBook";
// import PainTracker from "./components/PainTracker";
// import {
//   ChatBubbleLeftEllipsisIcon,
//   BookOpenIcon,
//   HeartIcon,
//   CakeIcon,
//   FireIcon,
//   MoonIcon
// } from "@heroicons/react/24/outline";

// // Import the function to request notifications
// import { requestNotificationPermission } from './utils/NotificationUtils';

// // Import service worker registration
// import { registerServiceWorker } from './serviceWorkerRegistration';

// /**
//  * Main Application Component
//  * Handles routing and wraps the dashboard in a scrollable container.
//  */
// function App() {
//   useEffect(() => {
//     registerServiceWorker(); // Register the Service Worker on load
//   }, []);

//   return (
//     <div className="app-container"> {/* This div can scroll if content is tall */}
//       <Router>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/chat" element={<Chat />} />
//           <Route path="/scrapbook" element={<ScrapBook />} />
//           <Route path="/pain-tracker" element={<PainTracker />} />
//         </Routes>
//         <Toaster position="top-center" reverseOrder={false} />
//       </Router>
//     </div>
//   );
// }

// /**
//  * Dashboard Component
//  * Displays feature cards in a vertical stack layout, plus an "Enable Notifications" button.
//  */
// function Dashboard() {
//   // Determine if notifications are already granted
//   const [notificationsAllowed, setNotificationsAllowed] = useState(
//     Notification.permission === 'granted'
//   );

//   const handleEnableNotifications = async () => {
//     const permission = await requestNotificationPermission();
//     if (permission === 'granted') {
//       setNotificationsAllowed(true);
//     }
//   };

//   return (
//     <div>
//       {/* Header */}
//       <header className="dashboard-header">
//         <h1 className="text-4xl font-bold text-gray-900">HealthX Dashboard</h1>
//       </header>

//       {/* Show button ONLY if notifications aren't granted */}
//       {!notificationsAllowed && (
//         <div className="mt-4 ml-4">
//           <button
//             onClick={handleEnableNotifications}
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           >
//             Enable Notifications
//           </button>
//         </div>
//       )}

//       {/* Feature Cards - Vertical Stack */}
//       <main className="dashboard-grid mt-8 ml-4">
//         <DashboardCard
//           title="AI Assistant"
//           path="/chat"
//           icon={<ChatBubbleLeftEllipsisIcon className="dashboard-card-icon h-6 w-6" />}
//         />
//         <DashboardCard
//           title="Personal Journal"
//           path="/scrapbook"
//           icon={<BookOpenIcon className="dashboard-card-icon h-6 w-6" />}
//         />
//         <DashboardCard
//           title="Pain Management"
//           path="/pain-tracker"
//           icon={<HeartIcon className="dashboard-card-icon h-6 w-6" />}
//         />
//         {/* Future Features */}
//         <DashboardCard
//           title="Nutrition Tracker"
//           path="#"
//           icon={<CakeIcon className="dashboard-card-icon h-6 w-6" />}
//         />
//         <DashboardCard
//           title="Exercise Planner"
//           path="#"
//           icon={<FireIcon className="dashboard-card-icon h-6 w-6" />}
//         />
//         <DashboardCard
//           title="Sleep Optimizer"
//           path="#"
//           icon={<MoonIcon className="dashboard-card-icon h-6 w-6" />}
//         />
//       </main>
//     </div>
//   );
// }

// /**
//  * Reusable Dashboard Card Component
//  */
// function DashboardCard({ title, path, icon }) {
//   return (
//     <a
//       href={path}
//       className="dashboard-card"
//       aria-label={`Navigate to ${title}`}
//     >
//       {icon} {title}
//     </a>
//   );
// }

// export default App;