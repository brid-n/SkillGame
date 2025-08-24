import { Home, Gamepad2, Brain, Users, Phone, Menu, X } from "lucide-react";

export default function Navbar({ isOpen, setIsOpen }) {
  const navLinks = [
    { name: "Trang chủ", href: "#", icon: <Home size={22} /> },
    { name: "Mini Games", href: "#games", icon: <Gamepad2 size={22} /> },
    { name: "Kỹ năng sống", href: "#skills", icon: <Brain size={22} /> },
    { name: "Về chúng tôi", href: "#about", icon: <Users size={22} /> },
    { name: "Liên hệ", href: "#contact", icon: <Phone size={22} /> },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-white shadow-lg h-screen fixed top-0 left-0 transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && (
          <span className="font-bold text-xl text-blue-600">SkillGames</span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 hover:text-blue-600"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu items */}
      <nav className="mt-4 flex flex-col space-y-2">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="group relative flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md mx-2 transition-colors"
          >
            {link.icon}
            {isOpen && <span className="font-medium">{link.name}</span>}
            {!isOpen && (
              <span className="absolute left-14 bg-gray-800 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {link.name}
              </span>
            )}
          </a>
        ))}
      </nav>
    </div>
  );
}