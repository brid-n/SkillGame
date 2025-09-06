import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import AuthForm from "./components/AuthForm";
import { useState } from "react";

function App() {
  const [user] = useAuthState(auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) return <AuthForm />;

  return (
    <div className="flex">
      <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        <Topbar />
        <main className="pt-14 p-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Xin chào {user.email} 🎉
          </h1>
          <p className="mt-4 text-gray-600">
            Học kỹ năng sống qua những mini game thú vị.
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;
