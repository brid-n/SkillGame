import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import AuthForm from "./components/AuthForm";
import AnalysisPage from "./pages/PhanTich";

import HomePage from "./pages/Home";
import MainGameMenu from "./pages/GameMenu/MainGameMenu";
import ReflexMenu from "./pages/GameMenu/ReflexMenu";
import LogicMenu from "./pages/GameMenu/LogicMenu";
import MathMenu from "./pages/GameMenu/MathMenu";

import BulletHell from "./games/BulletHell";
import LightsOutGame from "./games/lightsout/LightsOutGame";
import PrimeGame from "./games/prime/PrimeGame";

import { useState } from "react";

export default function App() {
  const [user] = useAuthState(auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) return <AuthForm />;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Topbar */}
        <Topbar />

        {/* Pages */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<MainGameMenu />} />
            <Route path="/games/reflex" element={<ReflexMenu />} />
            <Route path="/games/logic" element={<LogicMenu />} />
            <Route path="/games/math" element={<MathMenu />} />
            <Route path="/games/reflex/bullethell" element={<BulletHell />} />
            <Route path="/games/logic/lightsout" element={<LightsOutGame />} />
            <Route path="/games/math/primegame" element={<PrimeGame />} />
            <Route path="/analysis" element={<AnalysisPage />} />

          </Routes>
        </main>
      </div>
    </div>
  );
}
