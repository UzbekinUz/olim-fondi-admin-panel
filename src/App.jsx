import { useState, useEffect } from "react";
import "./App.css";
import { Check } from "lucide-react";
import Login from "./login";
import News from "./pages/news";
import SelectedApp from "./pages/selectedApp";
import Header from "./pages/header";
import SideBar from "./pages/sidebar";
import { initialApplications, initialNews } from "./data/static.json";

export default function App() {
  // --- STATES ---
  const [apps, setApps] = useState(initialApplications);
  const [news, setNews] = useState(initialNews);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null); // Detailed view
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNewsIdx, setEditingNewsIdx] = useState(null); // null means "Create" mode

  // News Form fields state
  const [newsForm, setNewsForm] = useState({
    title: "",
    category: "E'lon",
    date: "",
    image: "",
    content: "",
  });

  // Custom Toast notification
  const [toast, setToast] = useState({
    show: false,
    message: "",
    icon: null,
    color: "",
  });
  // Current Date String for header
  const [currentDateStr, setCurrentDateStr] = useState("");

  useEffect(() => {
    const dateObj = new Date();
    const monthsUz = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentDateStr(
      `${dateObj.getDate()}-${monthsUz[dateObj.getMonth()]}, ${dateObj.getFullYear()}`,
    );
  }, []);

  // --- ACTIONS ---
  const triggerToast = (message, icon, colorClass = "text-emerald-400") => {
    setToast({ show: true, message, icon, color: colorClass });
    setTimeout(() => {
      setToast({ show: false, message: "", icon: null, color: "" });
    }, 3500);
  };

  const handleStatusChange = (appId, newStatus) => {
    setApps((prevApps) =>
      prevApps.map((app) => {
        if (app.id === appId) {
          return { ...app, status: newStatus };
        }
        return app;
      }),
    );

    let message = "Ariza kutilayotgan holatga qaytarildi!";
    let typeColor = "text-amber-400";
    if (newStatus === "approved") {
      message = "Talabaning arizasi muvaffaqiyatli qabul qilindi!";
      typeColor = "text-emerald-400";
    } else if (newStatus === "rejected") {
      message = "Ariza rad etildi.";
      typeColor = "text-rose-400";
    }

    triggerToast(message, <Check className="w-5 h-5" />, typeColor);

    // Close detail modal if open
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp(null);
    }
  };

  const [admin, setAdmin] = useState(false);

  if (admin === false) {
    return <Login setAdmin={setAdmin} />;
  } else {
    return (
      <div className="h-screen overflow-hidden flex flex-col bg-slate-50 font-sans">
        {/* Top Navbar Mobile */}
        <Header setSidebarOpen={setSidebarOpen} />

        <SideBar
          app={apps}
          currentDateStr={currentDateStr}
          sidebarOpen={sidebarOpen}
          setEditingNewsIdx={setEditingNewsIdx}
          news={news}
          apps={apps}
          handleStatusChange={handleStatusChange}
          currentDateStr={currentDateStr}
          setSelectedApp={setSelectedApp}
          setAdmin={setAdmin}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setNews={setNews}
          triggerToast={triggerToast}
          setEditingNewsIdx={setEditingNewsIdx}
          setNewsForm={setNewsForm}
          setNewsModalOpen={setNewsModalOpen}
        />

        {/* ==================== DETAILED APPLICATION VIEW MODAL ==================== */}
        {selectedApp && (
          <SelectedApp
            setSelectedApp={setSelectedApp}
            selectedApp={selectedApp}
            handleStatusChange={handleStatusChange}
            triggerToast={triggerToast}
          />
        )}

        {/* ==================== NEWS ADD / EDIT MODAL ==================== */}
        {newsModalOpen && (
          <News
            news={news}
            setNewsForm={setNewsForm}
            setNewsModalOpen={setNewsModalOpen}
            editingNewsIdx={editingNewsIdx}
            newsForm={newsForm}
            setNews={setNews}
            triggerToast={triggerToast}
          />
        )}

        {/* ==================== TOAST NOTIFICATION ==================== */}
        {toast.show && (
          <div className="fixed bottom-5 right-5 z-50 transform translate-y-0 opacity-100 transition-all duration-300">
            <div className="bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 border border-slate-800">
              <span className={`${toast.color} text-lg`}>{toast.icon}</span>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
