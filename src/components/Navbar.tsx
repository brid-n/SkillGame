import { Home, Gamepad2, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-300 
        ${isOpen ? "w-64" : "w-16"}`}
    >
      {/* Toggle */}
      <button
        className="p-2 m-2 rounded hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Menu */}
      <nav className="mt-6 space-y-2">
        <Link
          to="/"
          className="flex items-center w-full px-4 py-2 hover:bg-gray-700"
        >
          <Home size={20} />
          {isOpen && <span className="ml-3">Home</span>}
        </Link>

        <Link
          to="/games"
          className="flex items-center w-full px-4 py-2 hover:bg-gray-700"
        >
          <Gamepad2 size={20} />
          {isOpen && <span className="ml-3">Games</span>}
        </Link>

        {/* Settings */}
        <div className="relative">
          <button
            onClick={() => setOpenSettings(!openSettings)}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-700"
          >
            <Settings size={20} />
            {isOpen && <span className="ml-3">Settings</span>}
          </button>

          {openSettings && isOpen && (
            <div className="ml-8 mt-1 bg-gray-800 rounded shadow-lg">
              <p className="px-4 py-2">Settings Menu (Coming soon...)</p>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
