import { useState, useEffect } from "react";

export default function Login({  setAdmin }) {
  // --- TIZIM HOLATLARI (STATES) ---
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shake, setShake] = useState(false);
  const [toasts, setToasts] = useState([]);
  const keytoenter = "admin";
  const passtoadmin = "admin2026";
  // --- DINAMIK TOAST TIZIMI ---
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // 3.5 soniyadan keyin bildirishnomani o'chirish
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  };

  // --- MAVZUNI TIZIM SOZLAMALARIGA KO'RA ANIQLASH VA YUKLASH ---
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // --- TUNG/KUNDUZGI REJIMNI ALMASHTIRISH ---
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      addToast("Tungi mavzuga o'tildi", "info");
    } else {
      document.documentElement.classList.remove("dark");
      addToast("Kunduzgi mavzuga o'tildi", "info");
    }
  };

  // --- TIZIMGA KIRISHNI TEKSHIRISH ---
  const handleLogin = () => {
    if (username === keytoenter && password === passtoadmin) {
      setAdmin({ admin: true });
    }else {
      setError("Foydalanuvchi nomi yoki parol noto'g'ri!");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  // --- DEMO MA'LUMOTLARNI AVTOMATIK TO'LDIRISH ---
  const fillDemoCredentials = (e) => {
    e.preventDefault();
    setUsername("admin");
    setPassword("admin123");
    addToast("Demo ma'lumotlar avtomatik to'ldirildi!", "success");
    setError("");
  };

  // --- TIZIMDAN CHIQISH ---
  const handleLogout = () => {
    addToast("Tizimdan muvaffaqiyatli chiqdingiz.", "info");
    setIsLoggedIn(false);
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300 font-sans">
      {/* CSS Animatsiyalar va Glassmorphism elementlari uchun maxsus inline uslublar */}
      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .dark .glass-panel {
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>

      {/* TEPPA QISM / SHAKILLANTIRILGAN HEADER */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10">
        

        {/* Tungi/Kunduzgi rejim tugmasi */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Mavzuni o'zgartirish"
        >
          {theme === "dark" ? (
            /* Quyosh (Kunduzgi rejim uchun) */
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
          ) : (
            /* Oy (Tungi rejim uchun) */
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </header>

      {/* ASOSIY QISM */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Orqa fondagi yorug'liklar */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-300 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-300 dark:bg-violet-900/20 rounded-full blur-3xl opacity-40 -z-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {!isLoggedIn ? (
          /* STAGE 1: TIZIMGA KIRISH FORMASI */
          <div
            className={`w-full max-w-md transition-all duration-500 ease-out transform opacity-100 scale-100 ${shake ? "animate-shake" : ""}`}
          >
            <div className="glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-2xl rounded-3xl p-8 sm:p-10 relative overflow-hidden">
              {/* Yuqoridagi gradient chiziq */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              <div className="text-center mb-8">
                <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Xush kelibsiz!
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Tizimga kirish uchun login va parolingizni kiriting
                </p>
              </div>

              {/* Xatolik yuz berganda chiqadigan oyna */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm flex items-start space-x-3 transition-all duration-300">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Form elementi */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Login kiritish maydoni */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Foydalanuvchi nomi
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                      placeholder="Masalan: admin"
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Parol kiritish maydoni */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Parol
                    </label>
                    <a
                      href="#"
                      onClick={fillDemoCredentials}
                      className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                    >
                      Parolni unutdingizmi?
                    </a>
                  </div>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-11 pr-12 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                    {/* Parolni ko'rsatish/yashirish ko'z tugmasi */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Eslab qolish chekboksi */}
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 rounded transition-all duration-150"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-slate-600 dark:text-slate-400 select-none"
                  >
                    Meni eslab qol
                  </label>
                </div>

                {/* Tizimga kirish tugmasi */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/25 dark:shadow-indigo-900/30 transition-all duration-150 transform active:scale-[0.98]"
                  >
                    {!isLoading ? (
                      <span>Tizimga kirish</span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Tekshirilmoqda...
                      </span>
                    )}
                  </button>
                </div>
              </form>

              {/* Yordamchi ma'lumotlar bloki */}
              <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Demo uchun ma'lumotlar: <br className="sm:hidden" />
                  <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300">
                    Login: admin
                  </span>
                  <span className="inline-flex items-center mt-1 ml-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300">
                    Parol: admin123
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* STAGE 2: INTERAKTIV MOCK DASHBOARD OYNASI */
          <div className="w-full max-w-4xl transition-all duration-500 ease-out transform opacity-100 scale-100">
            <div className="glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-2xl rounded-3xl overflow-hidden">
              {/* Dashboard Header qismi */}
              <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                    Tizim Faol
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {username}@apex.com
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 hover:bg-red-100 dark:hover:bg-red-950/80 transition-colors"
                  >
                    Tizimdan chiqish
                  </button>
                </div>
              </div>

              {/* Dashboard kontenti */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">
                    Admin Boshqaruv Paneli
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    ApexControl boshqaruv markaziga muvaffaqiyatli kirdingiz.
                  </p>
                </div>

                {/* Statistika kartalari paneli */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30">
                    <span className="text-xs font-medium text-slate-400">
                      Jami foydalanuvchilar
                    </span>
                    <div className="text-2xl font-bold mt-1">1,248</div>
                    <span className="text-xs font-semibold text-green-500 mt-2 inline-flex items-center">
                      <svg
                        className="w-3.5 h-3.5 mr-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      +12% bu oy
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30">
                    <span className="text-xs font-medium text-slate-400">
                      Oylik daromad
                    </span>
                    <div className="text-2xl font-bold mt-1">$14,235.00</div>
                    <span className="text-xs font-semibold text-green-500 mt-2 inline-flex items-center">
                      <svg
                        className="w-3.5 h-3.5 mr-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      +8.4% bu oy
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30">
                    <span className="text-xs font-medium text-slate-400">
                      Server yuklamasi
                    </span>
                    <div className="text-2xl font-bold mt-1">42%</div>
                    <span className="text-xs font-semibold text-amber-500 mt-2 inline-flex items-center">
                      <svg
                        className="w-3.5 h-3.5 mr-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                        />
                      </svg>
                      Barqaror
                    </span>
                  </div>
                </div>

                {/* Dashboard ichidagi mock jadval */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white/30 dark:bg-slate-900/20">
                  <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Oxirgi loglar (Tizimga kirishlar)
                    </h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                      <thead className="bg-slate-50/10 dark:bg-slate-900/10">
                        <tr>
                          <th className="px-6 py-3 text-left font-medium text-slate-400">
                            Foydalanuvchi
                          </th>
                          <th className="px-6 py-3 text-left font-medium text-slate-400">
                            Rol
                          </th>
                          <th className="px-6 py-3 text-left font-medium text-slate-400">
                            IP Manzil
                          </th>
                          <th className="px-6 py-3 text-left font-medium text-slate-400">
                            Holat
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        <tr>
                          <td className="px-6 py-4 font-semibold text-indigo-600 dark:text-indigo-400">
                            admin
                          </td>
                          <td className="px-6 py-4">Bosh Admin</td>
                          <td className="px-6 py-4">192.168.1.102</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                              Muvaffaqiyatli
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                            operator_bobur
                          </td>
                          <td className="px-6 py-4">Moderator</td>
                          <td className="px-6 py-4">178.12.35.45</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                              Muvaffaqiyatli
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                            anon_user
                          </td>
                          <td className="px-6 py-4">Mehmon</td>
                          <td className="px-6 py-4">82.200.15.22</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                              Rad etildi
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* DINAMIK TOAST BILDIRIShNOMALAR STACKI */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((toast) => {
          let colorClasses = "";
          let iconSvg = "";

          if (toast.type === "success") {
            colorClasses =
              "border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-300";
            iconSvg = (
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            );
          } else if (toast.type === "error") {
            colorClasses =
              "border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300";
            iconSvg = (
              <svg
                className="w-5 h-5 mr-2 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            );
          } else {
            colorClasses =
              "border-indigo-200 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300";
            iconSvg = (
              <svg
                className="w-5 h-5 mr-2 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            );
          }

          return (
            <div
              key={toast.id}
              className={`flex items-center p-4 rounded-xl shadow-lg border text-sm transition-all duration-300 glass-panel ${colorClasses}`}
            >
              <div className="flex items-center w-full">
                {iconSvg}
                <div className="font-medium">{toast.message}</div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
