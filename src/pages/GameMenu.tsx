import { Link } from "react-router-dom";
import { Joystick, Gamepad2 } from "lucide-react";

export default function GameMenu() {
  const games = [
    {
      name: "Bullet Hell",
      path: "/games/bullet-hell",
      icon: <Joystick className="w-10 h-10 text-blue-500" />,
      color: "from-blue-100 to-blue-200",
    },
    {
      name: "Logic Puzzle",
      path: "/games/logic-puzzle",
      icon: <Gamepad2 className="w-10 h-10 text-green-500" />,
      color: "from-green-100 to-green-200",
    },
    {
      name: "Coming Soon...",
      path: "#",
      icon: <Gamepad2 className="w-10 h-10 text-gray-400" />,
      color: "from-gray-100 to-gray-200",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 px-6">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-12 drop-shadow-lg">
        🎮 Game Menu
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {games.map((game, i) => (
          <Link
            key={i}
            to={game.path}
            className={`p-8 rounded-2xl shadow-xl bg-gradient-to-br ${game.color} flex flex-col items-center justify-center transform hover:scale-105 transition duration-300`}
          >
            <div className="mb-4">{game.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800">{game.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
