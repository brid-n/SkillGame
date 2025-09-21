import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import AuthForm from "./components/AuthForm";
import { useState } from "react";

import Home from "./pages/Home";
import GameMenu from "./pages/GameMenu";
import BulletHell from "./games/BulletHell";
import LightsOutGame from "./games/lightsout/LightsOutGame";

function App() {
  const [user] = useAuthState(auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) return <AuthForm />;

  return (
    <div className="flex">
      {/* Navbar bên trái */}
      <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Nội dung */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <Topbar />
        <main className="pt-14 p-8 min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<GameMenu />} />
            <Route path="/games/bullethell" element={<BulletHell />} />
            <Route path="/games/lightsout" element={<LightsOutGame />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
