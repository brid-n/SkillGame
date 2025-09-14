import { useState } from "react";
import type { FormEvent } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50"
        >
          {/* Google icon bằng lucide-react */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M21.35 11.1h-9.17v2.98h5.42c-.23 1.23-.93 2.27-1.97 2.97v2.47h3.18c1.86-1.71 2.94-4.23 2.94-7.21 0-.64-.06-1.25-.18-1.84z"
            />
            <path
              fill="#34A853"
              d="M12.18 22c2.67 0 4.9-.89 6.53-2.43l-3.18-2.47c-.88.6-2.01.96-3.35.96-2.57 0-4.74-1.74-5.52-4.09H3.32v2.56C4.94 19.98 8.29 22 12.18 22z"
            />
            <path
              fill="#FBBC05"
              d="M6.66 13.97c-.2-.6-.31-1.24-.31-1.97s.11-1.37.31-1.97V7.47H3.32A9.96 9.96 0 002.18 12c0 1.62.39 3.15 1.14 4.53l3.34-2.56z"
            />
            <path
              fill="#EA4335"
              d="M12.18 5.91c1.45 0 2.75.5 3.78 1.48l2.83-2.83C17.08 2.74 14.85 2 12.18 2 8.29 2 4.94 4.02 3.32 7.47l3.34 2.56c.78-2.35 2.95-4.09 5.52-4.09z"
            />
          </svg>
          Đăng nhập với Google
        </button>

        <p className="text-center text-sm mt-4">
          {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
          <button
            type="button"
            className="text-blue-600 font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Đăng ký" : "Đăng nhập"}
          </button>
        </p>
      </div>
    </div>
  );
}
