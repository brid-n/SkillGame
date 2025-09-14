import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import { useState } from "react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <Topbar />
        <main className="pt-14 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
