import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  Newspaper,
  LogOut,
  ChevronRight,
  Bell,
  Calendar,
  Edit3,
  Trash2,
  Plus,
} from "lucide-react";
import { useState } from "react";
import Dashboard from "../staticPages/dashboard";
import Application from "../staticPages/application";

function SideBar({
  news,
  apps,
  handleStatusChange,
  currentDateStr,
  setSelectedApp,
  setAdmin,
  sidebarOpen,
  setSidebarOpen,
  setNews,
  triggerToast,
  setEditingNewsIdx,
  setNewsForm,
  setNewsModalOpen
}) {
  const [currentTab, setCurrentTab] = useState("dashboard");

  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState("");
  const [studyFormFilter, setStudyFormFilter] = useState("");
  const [researchFilter, setResearchFilter] = useState("");

  const deleteNewsItem = (idx) => {
    const targetNews = news[idx];
    setNews((prev) => prev.filter((_, i) => i !== idx));
    triggerToast(
      `"${targetNews.title.substring(0, 20)}..." yangiligi o'chirildi!`,
      <Trash2 className="w-5 h-5" />,
      "text-rose-400",
    );
  };

  const openAddNews = () => {
    setEditingNewsIdx(null);
    setNewsForm({
      title: "",
      category: "E'lon",
      date: new Date().toISOString().split("T")[0],
      image: "",
      content: "",
    });
    setNewsModalOpen(true);
  };

  const openEditNews = (idx) => {
    setEditingNewsIdx(idx);
    const item = news[idx];
    setNewsForm({
      title: item.title,
      category: item.category,
      date: item.date,
      image: item.image,
      content: item.content,
    });
    setNewsModalOpen(true);
  };
  const filteredApps = apps.filter((app) => {
    if (filterStatus !== "all" && app.status !== filterStatus) return false;

    const matchesSearch =
      app.studentFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studyField.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (studyFormFilter !== "" && app.studyForm !== studyFormFilter)
      return false;

    if (researchFilter !== "") {
      const isResearch = researchFilter === "true";
      if (app.isDoingResearch !== isResearch) return false;
    }

    return true;
  });
  const statTotal = apps.length;
  const statPending = apps.filter((a) => a.status === "pending").length;
  const statApproved = apps.filter((a) => a.status === "approved").length;
  const statRejected = apps.filter((a) => a.status === "rejected").length;

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* Sidebar Menu */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex md:flex-col shadow-2xl`}
      >
        {/* Brand header (Desktop only) */}
        <div className="hidden md:flex items-center space-x-3 px-6 py-5 border-b border-slate-800 bg-slate-950">
          <div className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/30">
            <GraduationCap className="text-yellow-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm tracking-wide leading-none">
              OLIM FONDI
            </h1>
          </div>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center space-x-3">
          <div>
            <h4 className="text-sm font-semibold text-slate-200">Bekzodbek</h4>
            <p className="text-xs text-slate-400 flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
              Bosh Administrator
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => {
              setCurrentTab("dashboard");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "dashboard" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <LayoutDashboard
              className={`mr-3 w-5 h-5 ${currentTab === "dashboard" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Boshqaruv paneli
          </button>
          <button
            onClick={() => {
              setCurrentTab("applications");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "applications" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <FileText
              className={`mr-3 w-5 h-5 ${currentTab === "applications" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Arizalar
            {statPending > 0 && (
              <span className="ml-auto bg-amber-500/10 text-amber-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-500/20">
                {statPending}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setCurrentTab("news");
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === "news" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-800 hover:text-white text-slate-300"}`}
          >
            <Newspaper
              className={`mr-3 w-5 h-5 ${currentTab === "news" ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`}
            />
            Yangiliklar CMS
          </button>
        </nav>

        {/* Bottom logout info */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center bg-slate-950">
          <span>© 2026 Olim Fondi</span>
          <span
            onClick={() => setAdmin(false)}
            className="hover:text-slate-300 cursor-pointer flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" /> Chiqish
          </span>
        </div>
      </aside>

      {/* Sidebar Overlay (Mobile only) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-100">
        {/* Header bar (Desktop only) */}
        <header className="hidden md:flex items-center justify-between bg-white px-8 py-4 border-b border-slate-200 shadow-sm z-10">
          <div className="flex items-center space-x-1">
            <span className="text-slate-400 text-sm">Tizim</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1" />
            <span className="font-medium text-slate-800 text-sm">
              {currentTab === "dashboard" && "Boshqaruv paneli"}
              {currentTab === "applications" && "Arizalar reyestri"}
              {currentTab === "news" && "Yangiliklar boshqaruvi (CMS)"}
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer hover:text-indigo-600 transition-colors">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
            </div>
            <div className="text-sm font-medium text-slate-500 flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Calendar className="mr-2 text-indigo-500 w-4 h-4" />
              <span>{currentDateStr}</span>
            </div>
          </div>
        </header>

        {/* Wrapper for dynamic content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* 1. DASHBOARD TAB */}
          {currentTab === "dashboard" && (
            <Dashboard news={news} apps={apps} setCurrentTab={setCurrentTab} setSelectedApp={setSelectedApp} statTotal={statTotal} statPending={statPending} statApproved={statApproved} statRejected={statRejected} />
          )}

          {/* 2. APPLICATIONS TAB */}
          {currentTab === "applications" && (
            <Application setFilterStatus={setFilterStatus} filterStatus={filterStatus} searchTerm={searchTerm} setSearchTerm={setSearchTerm} studyFormFilter={studyFormFilter} setStudyFormFilter={setStudyFormFilter} researchFilter={researchFilter} setResearchFilter={setResearchFilter} filteredApps={filteredApps} handleStatusChange={handleStatusChange} setSelectedApp={setSelectedApp} />
          )}

          {/* 3. NEWS CMS TAB */}
          {currentTab === "news" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Yangiliklar boshqaruvi (CMS)
                  </h2>
                  <p className="text-sm text-slate-500">
                    Talaba/Foydalanuvchi sayti uchun yangiliklarni boshqaring.
                  </p>
                </div>
                <button
                  onClick={openAddNews}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Yangilik qo'shish
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600";
                          }}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wide">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {item.date}
                        </div>
                        <h3 className="font-bold text-slate-800 line-clamp-2 hover:text-indigo-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">
                        Foydalanuvchiga faol
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => openEditNews(idx)}
                          className="p-2 bg-white border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 rounded-lg text-xs transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteNewsItem(idx)}
                          className="p-2 bg-white border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 rounded-lg text-xs transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {news.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200">
                  <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-400 mb-4">
                    <Newspaper className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-700 text-lg">
                    Yangiliklar mavjud emas
                  </h4>
                  <p className="text-sm text-slate-400 mt-1 max-w-sm">
                    Tizimda hali yangiliklar yaratilmagan. Yuqoridagi tugma
                    orqali birinchi yangilikni qo'shing.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SideBar;