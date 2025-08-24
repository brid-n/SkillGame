import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // quản lý trạng thái sidebar

  return (
    <div className="flex">
      <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main
        className={`transition-all duration-300 p-8 flex-1 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Chào mừng đến với SkillGames 🎮
        </h1>
        <p className="mt-4 text-gray-600">
          Học kỹ năng sống qua những mini game thú vị.
        </p>
      </main>
    </div>
  );
}

export default App;
