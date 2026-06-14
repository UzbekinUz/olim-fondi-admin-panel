import { useState, useEffect } from 'react';
import "./App.css";
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Search, 
  Plus, 
  Eye, 
  Check, 
  X, 
  Download, 
  ChevronRight, 
  Calendar, 
  Bell, 
  User, 
  GraduationCap, 
  FlaskConical, 
  Users, 
  Phone, 
  Mail, 
  Trash2, 
  Edit3, 
  LogOut, 
  Menu, 
  FileCheck, 
  FileX, 
  Briefcase, 
  Home
} from 'lucide-react';
import Login from './login';

// Boshlang'ich arizalar to'plami (Mock Data)
const initialApplications = [
  {
    id: 1,
    studentFullName: "Anvarov Sardorbek Baxtiyor o'g'li",
    birthDate: "2003-05-12",
    nationality: "O'zbekiston",
    permanentAddress: "Toshkent shahri, Chilonzor tumani, 5-mavze, 12-uy",
    phoneNumber: "+998 90 123 45 67",
    emailAddress: "sardor.anvarov@gmail.com",
    universityName: "Toshkent Davlat Texnika Universiteti",
    studyForm: "Kunduzgi",
    studyField: "Axborot xavfsizligi",
    currentCourse: "3-kurs",
    isDoingResearch: true,
    researchDetails: "Kriptografiya va ma'lumotlarni shifrlashning yangi usullari bo'yicha ilmiy maqolalar tayyorlash.",
    hasConferenceParticipation: true,
    hasPublications: true,
    usedPreviousGrants: false,
    previousGrantDetails: "",
    contractAmount: "12,400,000",
    familyMembersCount: 5,
    fatherFullName: "Anvarov Baxtiyor",
    fatherWorkPlace: "Toshkent Shakar MCHJ",
    fatherPosition: "Injinir-texnolog",
    fatherBirthDate: "1975-02-18",
    motherFullName: "Anvarova Shohida",
    motherWorkPlace: "Maktabgacha ta'lim muassasasi",
    motherPosition: "Tarbiyachi",
    motherBirthDate: "1979-11-23",
    siblings: [
      { name: "Anvarova Diyora", role: "Sinfdosh / Maktab o'quvchisi", birth: "2010" },
      { name: "Anvarov Asilbek", role: "Kollej talabasi", birth: "2006" }
    ],
    cvFile: "sardor_rezyume.pdf",
    gpaFile: "gpa_sardor.pdf",
    universityCertificate: "turt_cert_anvarov.pdf",
    status: "pending", // pending, approved, rejected
    createdAt: "2026-06-12 14:30"
  },
  {
    id: 2,
    studentFullName: "Kamola Rustamova G'ayrat qizi",
    birthDate: "2002-09-30",
    nationality: "O'zbekiston",
    permanentAddress: "Samarqand viloyati, Kattaqo'rg'on tumani, Oydin ko'chasi 44",
    phoneNumber: "+998 94 987 65 43",
    emailAddress: "rustamova.k@edu.uz",
    universityName: "O'zbekiston Milliy Universiteti",
    studyForm: "Kunduzgi",
    studyField: "Fizika-Matematika va Kosmik Tadqiqotlar",
    currentCourse: "4-kurs",
    isDoingResearch: true,
    researchDetails: "Yarimo'tkazgichlar fizikasi va quyosh panellari effektivligini oshirish.",
    hasConferenceParticipation: true,
    hasPublications: false,
    usedPreviousGrants: true,
    previousGrantDetails: "2024-yilda jamg'arma tomonidan kichik tadqiqot granti ajratilgan.",
    contractAmount: "9,800,000",
    familyMembersCount: 4,
    fatherFullName: "G'ayratov Rustam",
    fatherWorkPlace: "Samarqand Suv Ta'minoti",
    fatherPosition: "Operator",
    fatherBirthDate: "1971-04-05",
    motherFullName: "G'ayratova Manzura",
    motherWorkPlace: "Sog'liqni Saqlash Tizimi",
    motherPosition: "Hamshira",
    motherBirthDate: "1976-08-12",
    siblings: [
      { name: "Rustamov Diyor", role: "Talaba (SamDU)", birth: "2004" }
    ],
    cvFile: "kamola_cv.pdf",
    gpaFile: "kamola_gpa_4_5.pdf",
    universityCertificate: "spravka_kamola.pdf",
    status: "approved",
    createdAt: "2026-06-10 10:15"
  },
  {
    id: 3,
    studentFullName: "Jamshid Qodirov Tolibovich",
    birthDate: "2004-01-15",
    nationality: "O'zbekiston",
    permanentAddress: "Farg'ona viloyati, Qo'qon shahri, Do'stlik ko'chasi 9",
    phoneNumber: "+998 93 456 12 34",
    emailAddress: "qodirov_j@bk.ru",
    universityName: "Farg'ona Davlat Universiteti",
    studyForm: "Sirtqi",
    studyField: "Biologiya va Mikrobiologiya",
    currentCourse: "2-kurs",
    isDoingResearch: false,
    researchDetails: "",
    hasConferenceParticipation: false,
    hasPublications: false,
    usedPreviousGrants: false,
    previousGrantDetails: "",
    contractAmount: "11,200,000",
    familyMembersCount: 6,
    fatherFullName: "Qodirov Tolib",
    fatherWorkPlace: "Kasanachilik",
    fatherPosition: "Hunarmand",
    fatherBirthDate: "1968-05-15",
    motherFullName: "Qodirova Jamila",
    motherWorkPlace: "Uy bekasi",
    motherPosition: "Ishlamaydi",
    motherBirthDate: "1972-10-10",
    siblings: [
      { name: "Qodirova Laylo", role: "Maktab o'quvchisi", birth: "2012" },
      { name: "Qodirova Sevara", role: "Kollej talabasi", birth: "2008" },
      { name: "Qodirov Begzod", role: "Bog'cha bolasi", birth: "2021" }
    ],
    cvFile: "jamshid_bio_cv.pdf",
    gpaFile: "gpa_jamshid.pdf",
    universityCertificate: "fardu_spravka.pdf",
    status: "rejected",
    createdAt: "2026-06-08 09:00"
  }
];

// Boshlang'ich yangiliklar to'plami (Mock Data)
const initialNews = [
  {
    id: 1,
    title: "2026-yilgi Yozgi Ilmiy Grantlar Tanlovi E'lon qilindi",
    category: "Grant",
    date: "2026-06-14",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
    content: "Olim Fondi yosh tadqiqotchilar va faol talabalarni qo'llab-quvvatlash uchun 2026-yilgi yozgi bosqich grantlarini e'lon qiladi. Arizalar joriy yilning 30-iyuniga qadar qabul qilinadi. Grant miqdori jami kontrakt summasining 100% gacha bo'lgan qismini qamrab oladi."
  },
  {
    id: 2,
    title: "Respublika Yosh Olimlarining Simpoziumi bo'lib o'tdi",
    category: "Tadbir",
    date: "2026-06-11",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600",
    content: "Toshkent shahridagi simpoziumda jamg'arma stipendiatlari o'z ilmiy loyihalarini taqdim qildilar. Eng faol 3 ta innovatsion tadqiqot mualliflariga xorijiy laboratoriyalarda malaka oshirish sertifikati berildi."
  },
  {
    id: 3,
    title: "Hujjatlar qabul qilish jarayonida yangi tahrirdagi shartlar",
    category: "E'lon",
    date: "2026-06-05",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600",
    content: "Diqqat! Joriy mavsumdan boshlab arizachilarning ilmiy rahbarlaridan olingan tavsiyanomalari ham talab qilinadi. Barcha fayllarni faqat PDF formatda va aniq skaner qilingan ko'rinishda taqdim etishingiz so'raladi."
  }
];

export default function App() {
  // --- STATES ---
  const [apps, setApps] = useState(initialApplications);
  const [news, setNews] = useState(initialNews);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Application filter states
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState('');
  const [studyFormFilter, setStudyFormFilter] = useState('');
  const [researchFilter, setResearchFilter] = useState('');

  // Modals
  const [selectedApp, setSelectedApp] = useState(null); // Detailed view
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNewsIdx, setEditingNewsIdx] = useState(null); // null means "Create" mode
  
  // News Form fields state
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: "E'lon",
    date: '',
    image: '',
    content: ''
  });

  // Custom Toast notification
  const [toast, setToast] = useState({ show: false, message: '', icon: null, color: '' });

  // Current Date String for header
  const [currentDateStr, setCurrentDateStr] = useState('');

  useEffect(() => {
    const dateObj = new Date();
    const monthsUz = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentDateStr(`${dateObj.getDate()}-${monthsUz[dateObj.getMonth()]}, ${dateObj.getFullYear()}`);
  }, []);

  // --- ACTIONS ---
  const triggerToast = (message, icon, colorClass = "text-emerald-400") => {
    setToast({ show: true, message, icon, color: colorClass });
    setTimeout(() => {
      setToast({ show: false, message: '', icon: null, color: '' });
    }, 3500);
  };

  const handleStatusChange = (appId, newStatus) => {
    setApps(prevApps => prevApps.map(app => {
      if (app.id === appId) {
        return { ...app, status: newStatus };
      }
      return app;
    }));

    let message = "Ariza kutilayotgan holatga qaytarildi!";
    let typeColor = "text-amber-400";
    if (newStatus === 'approved') {
      message = "Talabaning arizasi muvaffaqiyatli qabul qilindi!";
      typeColor = "text-emerald-400";
    } else if (newStatus === 'rejected') {
      message = "Ariza rad etildi.";
      typeColor = "text-rose-400";
    }

    triggerToast(message, <Check className="w-5 h-5" />, typeColor);
    
    // Close detail modal if open
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp(null);
    }
  };

  const deleteNewsItem = (idx) => {
    const targetNews = news[idx];
    setNews(prev => prev.filter((_, i) => i !== idx));
    triggerToast(`"${targetNews.title.substring(0, 20)}..." yangiligi o'chirildi!`, <Trash2 className="w-5 h-5" />, "text-rose-400");
  };

  const openAddNews = () => {
    setEditingNewsIdx(null);
    setNewsForm({
      title: '',
      category: "E'lon",
      date: new Date().toISOString().split('T')[0],
      image: '',
      content: ''
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
      content: item.content
    });
    setNewsModalOpen(true);
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (editingNewsIdx !== null) {
      // Edit mode
      setNews(prev => prev.map((item, i) => {
        if (i === editingNewsIdx) {
          return {
            ...item,
            title: newsForm.title,
            category: newsForm.category,
            date: newsForm.date,
            image: newsForm.image || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600",
            content: newsForm.content
          };
        }
        return item;
      }));
      triggerToast("Yangilik muvaffaqiyatli tahrirlandi!", <Check className="w-5 h-5" />, "text-indigo-400");
    } else {
      // Create mode
      const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
      const newNews = {
        id: newId,
        title: newsForm.title,
        category: newsForm.category,
        date: newsForm.date,
        image: newsForm.image || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600",
        content: newsForm.content
      };
      setNews(prev => [newNews, ...prev]);
      triggerToast("Yangi yangilik muvaffaqiyatli chop etildi!", <Newspaper className="w-5 h-5" />, "text-emerald-400");
    }
    setNewsModalOpen(false);
  };

  // Filter application helper
  const filteredApps = apps.filter(app => {
    if (filterStatus !== 'all' && app.status !== filterStatus) return false;
    
    const matchesSearch = app.studentFullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.studyField.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (studyFormFilter !== "" && app.studyForm !== studyFormFilter) return false;

    if (researchFilter !== "") {
      const isResearch = researchFilter === "true";
      if (app.isDoingResearch !== isResearch) return false;
    }

    return true;
  });

  // Stats
  const statTotal = apps.length;
  const statPending = apps.filter(a => a.status === 'pending').length;
  const statApproved = apps.filter(a => a.status === 'approved').length;
  const statRejected = apps.filter(a => a.status === 'rejected').length;



  const [admin, setAdmin] = useState(false);
  
  if(admin === false){
    return (
      <Login setAdmin={setAdmin} />
    )

  }else{
    return (
    <div className="h-screen overflow-hidden flex flex-col bg-slate-50 font-sans">
      
      {/* Top Navbar Mobile */}
      <header className="bg-slate-900 text-white flex items-center justify-between px-4 py-3 md:hidden shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600/30 p-2 rounded-lg border border-indigo-500/20">
            <GraduationCap className="text-yellow-400 w-6 h-6" />
          </div>
          <span className="font-bold text-md tracking-wider">OLIM FONDI</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="text-white hover:text-indigo-400 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <div className="flex flex-1 h-full overflow-hidden">
        {/* Sidebar Menu */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex md:flex-col shadow-2xl`}
        >
          {/* Brand header (Desktop only) */}
          <div className="hidden md:flex items-center space-x-3 px-6 py-5 border-b border-slate-800 bg-slate-950">
            <div className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/30">
              <GraduationCap className="text-yellow-400 w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-white text-sm tracking-wide leading-none">OLIM FONDI</h1>
              <span className="text-[10px] text-indigo-400 font-medium">Admin Panel v2.0 (React)</span>
            </div>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/30">
              J
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Jamoliddin A.</h4>
              <p className="text-xs text-slate-400 flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                Bosh Administrator
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            <button 
              onClick={() => { setCurrentTab('dashboard'); setSidebarOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800 hover:text-white text-slate-300'}`}
            >
              <LayoutDashboard className={`mr-3 w-5 h-5 ${currentTab === 'dashboard' ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
              Boshqaruv paneli
            </button>
            <button 
              onClick={() => { setCurrentTab('applications'); setSidebarOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === 'applications' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800 hover:text-white text-slate-300'}`}
            >
              <FileText className={`mr-3 w-5 h-5 ${currentTab === 'applications' ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
              Arizalar
              {statPending > 0 && (
                <span className="ml-auto bg-amber-500/10 text-amber-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-500/20">
                  {statPending}
                </span>
              )}
            </button>
            <button 
              onClick={() => { setCurrentTab('news'); setSidebarOpen(false); }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentTab === 'news' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800 hover:text-white text-slate-300'}`}
            >
              <Newspaper className={`mr-3 w-5 h-5 ${currentTab === 'news' ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
              Yangiliklar CMS
            </button>
          </nav>

          {/* Bottom logout info */}
          <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center bg-slate-950">
            <span>© 2026 Olim Fondi</span>
            <span className="hover:text-slate-300 cursor-pointer flex items-center gap-1">
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
                {currentTab === 'dashboard' && 'Boshqaruv paneli'}
                {currentTab === 'applications' && 'Arizalar reyestri'}
                {currentTab === 'news' && 'Yangiliklar boshqaruvi (CMS)'}
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
            {currentTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Xush kelibsiz, Bekzodbek!</h2>
                  <p className="text-sm text-slate-500">Bugungi arizalar oqimi va jamg'armaning dolzarb yangiliklari tahlili.</p>
                </div>

                {/* Stats widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                    <div className="p-4 bg-indigo-50 rounded-xl text-indigo-600"><FileText className="w-6 h-6" /></div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jami arizalar</p>
                      <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{statTotal}</h3>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                    <div className="p-4 bg-amber-50 rounded-xl text-amber-600"><Calendar className="w-6 h-6 animate-pulse" /></div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kutilayotganlar</p>
                      <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{statPending}</h3>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                    <div className="p-4 bg-emerald-50 rounded-xl text-emerald-600"><FileCheck className="w-6 h-6" /></div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tasdiqlanganlar</p>
                      <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{statApproved}</h3>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                    <div className="p-4 bg-rose-50 rounded-xl text-rose-600"><FileX className="w-6 h-6" /></div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rad etilganlar</p>
                      <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{statRejected}</h3>
                    </div>
                  </div>
                </div>

                {/* Subsections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Recent Submissions */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden lg:col-span-2">
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="font-bold text-slate-800 flex items-center">
                        <span className="inline-block w-2.5 h-2.5 bg-indigo-600 rounded-full mr-2"></span>
                        Oxirgi kelib tushgan arizalar
                      </h3>
                      <button 
                        onClick={() => setCurrentTab('applications')}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        Barchasi <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                          <tr className="bg-slate-50/50 text-slate-400 text-xs font-semibold uppercase">
                            <th className="py-3 px-5">F.I.SH</th>
                            <th className="py-3 px-5">Universitet</th>
                            <th className="py-3 px-5">Yo'nalish</th>
                            <th className="py-3 px-5 text-right">Amal</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-100">
                          {apps.slice(0, 4).map(app => (
                            <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-5">
                                <div className="font-semibold text-slate-800">{app.studentFullName}</div>
                                <div className="text-xs text-slate-400 font-mono">{app.emailAddress}</div>
                              </td>
                              <td className="py-4 px-5 text-slate-600 max-w-[150px] truncate">{app.universityName}</td>
                              <td className="py-4 px-5 text-slate-600 font-medium">{app.studyField}</td>
                              <td className="py-4 px-5 text-right">
                                <button 
                                  onClick={() => setSelectedApp(app)}
                                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center ml-auto gap-1"
                                >
                                  <Eye className="w-3.5 h-3.5" /> Ko'rish
                                </button>
                              </td>
                            </tr>
                          ))}
                          {apps.length === 0 && (
                            <tr>
                              <td colSpan="4" className="py-6 text-center text-slate-400">Hozircha arizalar mavjud emas.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right: Active News Snapshot */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center">
                          <Newspaper className="text-indigo-500 mr-2 w-5 h-5" />
                          Faol yangiliklar
                        </h3>
                        <span className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-0.5 rounded-full font-bold">
                          {news.length} ta
                        </span>
                      </div>
                      <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
                        {news.slice(0, 3).map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => setCurrentTab('news')}
                            className="flex items-start space-x-3 p-2 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                          >
                            <img 
                              src={item.image} 
                              alt={item.title}
                              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200"; }}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow-sm"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-800 truncate">{item.title}</h4>
                              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.content}</p>
                              <span className="inline-block mt-1 text-[10px] bg-indigo-50 text-indigo-600 font-bold px-1.5 py-0.2 rounded">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        ))}
                        {news.length === 0 && (
                          <p className="text-sm text-slate-400 py-4 text-center">Faol yangiliklar mavjud emas.</p>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => setCurrentTab('news')}
                      className="mt-4 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Yangilik qo'shish yoki tahrirlash
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. APPLICATIONS TAB */}
            {currentTab === 'applications' && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Arizalar reyestri</h2>
                      <p className="text-xs text-slate-500">Kelib tushgan barcha hujjatlarni saralashingiz, status bo'yicha tekshirishingiz mumkin.</p>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex p-1 bg-slate-100 rounded-xl space-x-1 text-xs font-semibold text-slate-600 border border-slate-200 max-w-max">
                      {['all', 'pending', 'approved', 'rejected'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setFilterStatus(status)}
                          className={`px-4 py-2 rounded-lg transition-all ${filterStatus === status ? 'bg-white text-indigo-700 shadow-sm' : 'hover:text-slate-800'}`}
                        >
                          {status === 'all' && 'Barchasi'}
                          {status === 'pending' && 'Kutilmoqda'}
                          {status === 'approved' && 'Qabul qilindi'}
                          {status === 'rejected' && 'Rad etildi'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filter grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
                      <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="F.I.SH yoki Universitet bo'yicha qidirish..." 
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div>
                      <select 
                        value={studyFormFilter}
                        onChange={(e) => setStudyFormFilter(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-600"
                      >
                        <option value="">O'qish shakli (Hammasi)</option>
                        <option value="Kunduzgi">Kunduzgi</option>
                        <option value="Sirtqi">Sirtqi</option>
                        <option value="Kechki">Kechki</option>
                        <option value="Masofaviy">Masofaviy</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        value={researchFilter}
                        onChange={(e) => setResearchFilter(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-600"
                      >
                        <option value="">Ilmiy tadqiqot (Hammasi)</option>
                        <option value="true">Tadqiqot olib borayotganlar</option>
                        <option value="false">Tadqiqot qilmayotganlar</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[950px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                          <th className="py-4 px-6">Talaba (F.I.SH)</th>
                          <th className="py-4 px-6">Universitet va Kurs</th>
                          <th className="py-4 px-6">Bog'lanish</th>
                          <th className="py-4 px-6">Tadqiqot</th>
                          <th className="py-4 px-6">Holat</th>
                          <th className="py-4 px-6 text-right">Amallar</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-slate-100">
                        {filteredApps.map(app => (
                          <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-4 px-6">
                              <div className="font-semibold text-slate-800">{app.studentFullName}</div>
                              <div className="text-xs text-slate-400 mt-0.5">{app.nationality} | {app.birthDate}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-slate-700 font-medium">{app.universityName}</div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                {app.studyForm} • {app.studyField} • <span className="text-slate-600 font-bold">{app.currentCourse}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-slate-700 text-xs font-semibold flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5 text-slate-400" /> {app.phoneNumber}
                              </div>
                              <div className="text-xs text-indigo-600 font-mono mt-0.5 flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-slate-400" /> {app.emailAddress}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              {app.isDoingResearch ? (
                                <span className="inline-flex items-center gap-0.5 bg-indigo-50 text-indigo-600 font-bold text-[10px] px-2 py-1 rounded border border-indigo-100">
                                  <FlaskConical className="w-3.5 h-3.5" /> Tadqiqotchi
                                </span>
                              ) : (
                                <span className="text-slate-400 text-xs">-</span>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              {app.status === 'pending' && (
                                <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>Kutilmoqda
                                </span>
                              )}
                              {app.status === 'approved' && (
                                <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>Qabul qilindi
                                </span>
                              )}
                              {app.status === 'rejected' && (
                                <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5"></span>Rad etildi
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="inline-flex rounded-lg shadow-sm border border-slate-200 overflow-hidden bg-white">
                                <button 
                                  onClick={() => setSelectedApp(app)}
                                  className="px-3 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border-r border-slate-200 text-xs font-bold transition-colors flex items-center gap-1"
                                >
                                  <Eye className="w-3.5 h-3.5" /> Batafsil
                                </button>
                                {app.status === 'pending' ? (
                                  <>
                                    <button 
                                      onClick={() => handleStatusChange(app.id, 'approved')}
                                      className="px-2 py-2 bg-emerald-50/50 hover:bg-emerald-500 text-emerald-600 hover:text-white border-r border-slate-200 transition-colors"
                                      title="Tasdiqlash"
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => handleStatusChange(app.id, 'rejected')}
                                      className="px-2 py-2 bg-rose-50/50 hover:bg-rose-500 text-rose-600 hover:text-white transition-colors"
                                      title="Rad etish"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </>
                                ) : (
                                  <button 
                                    onClick={() => handleStatusChange(app.id, 'pending')}
                                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
                                  >
                                    Qaytarish
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredApps.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 text-3xl">
                        <FileText className="w-8 h-8" />
                      </div>
                      <h4 className="font-bold text-slate-700 text-lg">Hech qanday ariza topilmadi</h4>
                      <p className="text-sm text-slate-400 mt-1 max-w-sm">Tanlangan filtrlar yoki so'rovga mos keladigan arizalar mavjud emas.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. NEWS CMS TAB */}
            {currentTab === 'news' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Yangiliklar boshqaruvi (CMS)</h2>
                    <p className="text-sm text-slate-500">Talaba/Foydalanuvchi sayti uchun yangiliklarni boshqaring.</p>
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
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600"; }}
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
                          <h3 className="font-bold text-slate-800 line-clamp-2 hover:text-indigo-600 transition-colors">{item.title}</h3>
                          <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">{item.content}</p>
                        </div>
                      </div>
                      <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">Foydalanuvchiga faol</span>
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
                    <h4 className="font-bold text-slate-700 text-lg">Yangiliklar mavjud emas</h4>
                    <p className="text-sm text-slate-400 mt-1 max-w-sm">Tizimda hali yangiliklar yaratilmagan. Yuqoridagi tugma orqali birinchi yangilikni qo'shing.</p>
                  </div>
                )}
              </div>
            )}

          </div>
        </main>
      </div>

      {/* ==================== DETAILED APPLICATION VIEW MODAL ==================== */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              onClick={() => setSelectedApp(null)} 
              className="fixed inset-0 bg-slate-900/60 transition-opacity" 
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-slate-100">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 px-6 py-5 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Ariza tafsilotlari</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Yuborilgan barcha shaxsiy va akademik hujjatlar ro'yxati</p>
                </div>
                <button 
                  onClick={() => setSelectedApp(null)} 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="max-h-[65vh] overflow-y-auto p-6 space-y-8 bg-slate-50">
                {/* Status Indicator Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ariza holati:</span>
                    {selectedApp.status === 'pending' && <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Tekshirilmoqda</span>}
                    {selectedApp.status === 'approved' && <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Qabul qilingan</span>}
                    {selectedApp.status === 'rejected' && <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Rad etilgan</span>}
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedApp.status === 'pending' ? (
                      <>
                        <button 
                          onClick={() => handleStatusChange(selectedApp.id, 'rejected')}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
                        >
                          Rad etish
                        </button>
                        <button 
                          onClick={() => handleStatusChange(selectedApp.id, 'approved')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition-colors"
                        >
                          Qabul qilish
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleStatusChange(selectedApp.id, 'pending')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                      >
                        Kutilayotgan holatga qaytarish
                      </button>
                    )}
                  </div>
                </div>

                {/* Section 1: Shaxsiy Ma'lumotlar */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Shaxsiy ma'lumotlar
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                      <label className="text-xs font-medium text-slate-400">To'liq ismi-sharifi (F.I.SH):</label>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedApp.studentFullName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400">Tug'ilgan sanasi:</label>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedApp.birthDate}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400">Fuqaroligi:</label>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedApp.nationality}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400">Doimiy yashash manzili:</label>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedApp.permanentAddress}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400">Telefon raqami:</label>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedApp.phoneNumber}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400">E-pochta manzili:</label>
                      <p className="text-sm font-semibold text-indigo-600 mt-0.5 font-mono">{selectedApp.emailAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: O'qish Ma'lumotlari */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" /> O'qish joyi va Akademik faoliyat
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="md:col-span-2">
                      <label className="text-xs font-medium text-slate-400">Oliy ta'lim muassasasi (Universitet) nomi:</label>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedApp.universityName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400">O'qish shakli:</label>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedApp.studyForm}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400">Ta'lim yo'nalishi / Mutaxassislik:</label>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedApp.studyField}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400">Hozirgi bosqich (Kurs):</label>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedApp.currentCourse}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-400">Yillik shartnoma (Kontrakt) summasi:</label>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedApp.contractAmount} UZS</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Ilmiy va grant faoliyati */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4" /> Ilmiy salohiyat va grantlar
                  </h4>
                  <div className="grid grid-cols-1 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="border-b border-slate-100 pb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Ilmiy tadqiqot olib boryaptimi?</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${selectedApp.isDoingResearch ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-500'}`}>
                          {selectedApp.isDoingResearch ? 'Ha' : "Yo'q"}
                        </span>
                      </div>
                      {selectedApp.isDoingResearch && (
                        <div className="mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <label className="text-[10px] text-slate-400 font-bold uppercase block">Tadqiqot tafsilotlari:</label>
                          <p className="text-xs text-slate-700 mt-1 leading-relaxed">{selectedApp.researchDetails}</p>
                        </div>
                      )}
                    </div>

                    <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">Konferensiyalarda ishtirok etganmi?</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${selectedApp.hasConferenceParticipation ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                        {selectedApp.hasConferenceParticipation ? 'Ha' : "Yo'q"}
                      </span>
                    </div>

                    <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">Ilmiy jurnallarda maqolalari chop etilganmi?</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${selectedApp.hasPublications ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                        {selectedApp.hasPublications ? 'Ha' : "Yo'q"}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Oldin ushbu jamg'arma grantlaridan foydalanganmi?</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${selectedApp.usedPreviousGrants ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-500'}`}>
                          {selectedApp.usedPreviousGrants ? 'Ha' : "Yo'q"}
                        </span>
                      </div>
                      {selectedApp.usedPreviousGrants && (
                        <div className="mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <label className="text-[10px] text-slate-400 font-bold uppercase block">Avvalgi grant tafsilotlari:</label>
                          <p className="text-xs text-slate-700 mt-1 leading-relaxed">{selectedApp.previousGrantDetails}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 4: Oila Ma'lumotlari */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> Oila a'zolari to'g'risida ma'lumot
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Father Card */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                        <h5 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4 text-slate-400" /> Otasi
                        </h5>
                        <div>
                          <label className="text-[10px] font-medium text-slate-400">F.I.SH:</label>
                          <p className="text-xs font-semibold text-slate-800">{selectedApp.fatherFullName || 'Kiritilmagan'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-medium text-slate-400">Tug'ilgan yili:</label>
                            <p className="text-xs font-semibold text-slate-800">{selectedApp.fatherBirthDate || 'Kiritilmagan'}</p>
                          </div>
                          <div>
                            <label className="text-[10px] font-medium text-slate-400">Lavozimi:</label>
                            <p className="text-xs font-semibold text-slate-800">{selectedApp.fatherPosition || 'Kiritilmagan'}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-slate-400">Ish joyi:</label>
                          <p className="text-xs font-semibold text-slate-800">{selectedApp.fatherWorkPlace || 'Kiritilmagan'}</p>
                        </div>
                      </div>

                      {/* Mother Card */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                        <h5 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                          <Home className="w-4 h-4 text-slate-400" /> Onasi
                        </h5>
                        <div>
                          <label className="text-[10px] font-medium text-slate-400">F.I.SH:</label>
                          <p className="text-xs font-semibold text-slate-800">{selectedApp.motherFullName || 'Kiritilmagan'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-medium text-slate-400">Tug'ilgan yili:</label>
                            <p className="text-xs font-semibold text-slate-800">{selectedApp.motherBirthDate || 'Kiritilmagan'}</p>
                          </div>
                          <div>
                            <label className="text-[10px] font-medium text-slate-400">Lavozimi:</label>
                            <p className="text-xs font-semibold text-slate-800">{selectedApp.motherPosition || 'Kiritilmagan'}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-slate-400">Ish joyi:</label>
                          <p className="text-xs font-semibold text-slate-800">{selectedApp.motherWorkPlace || 'Kiritilmagan'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Family Overview and Siblings */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="text-sm font-semibold text-slate-700">Oila a'zolari umumiy soni:</span>
                        <span className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-lg text-xs">
                          {selectedApp.familyMembersCount} ta
                        </span>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Aka-ukalari / Opa-singillari:</label>
                        <div className="mt-2 space-y-2">
                          {selectedApp.siblings && selectedApp.siblings.length > 0 ? (
                            selectedApp.siblings.map((sib, sIdx) => (
                              <div key={sIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
                                <div>
                                  <span className="font-semibold text-xs text-slate-700 block">{sib.name}</span>
                                  <span className="text-[10px] text-slate-400 block">{sib.role}</span>
                                </div>
                                <span className="text-xs bg-slate-200/60 text-slate-600 px-2.5 py-0.5 rounded font-medium">
                                  {sib.birth} yosh
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-slate-400 italic">Oka-ukalari yoki opa-singillari kiritilmagan.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5: Yuklangan Hujjatlar */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                    <Download className="w-4 h-4" /> Biriktirilgan akademik hujjatlar
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-red-500 text-2xl"><FileText className="w-6 h-6" /></div>
                        <div>
                          <span className="text-[10px] font-medium text-slate-400 block">CV (Tarjimai hol)</span>
                          <span className="text-xs font-semibold text-slate-700 line-clamp-1">{selectedApp.cvFile}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => triggerToast("CV yuklab olinmoqda...", <Download className="w-5 h-5" />, "text-sky-400")}
                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-emerald-500 text-2xl"><FileText className="w-6 h-6" /></div>
                        <div>
                          <span className="text-[10px] font-medium text-slate-400 block">GPA Transkript</span>
                          <span className="text-xs font-semibold text-slate-700 line-clamp-1">{selectedApp.gpaFile}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => triggerToast("GPA transkript yuklab olinmoqda...", <Download className="w-5 h-5" />, "text-sky-400")}
                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-blue-500 text-2xl"><FileText className="w-6 h-6" /></div>
                        <div>
                          <span className="text-[10px] font-medium text-slate-400 block">OTM Ma'lumotnoma</span>
                          <span className="text-xs font-semibold text-slate-700 line-clamp-1">{selectedApp.universityCertificate}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => triggerToast("OTM ma'lumotnomasi yuklab olinmoqda...", <Download className="w-5 h-5" />, "text-sky-400")}
                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="bg-slate-100 px-6 py-4 flex items-center justify-between rounded-b-3xl border-t border-slate-200">
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Yopish
                </button>
                <div className="flex space-x-2">
                  {selectedApp.status === 'pending' ? (
                    <>
                      <button 
                        onClick={() => handleStatusChange(selectedApp.id, 'rejected')}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-md shadow-rose-500/10"
                      >
                        Rad etish
                      </button>
                      <button 
                        onClick={() => handleStatusChange(selectedApp.id, 'approved')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-md shadow-emerald-600/10"
                      >
                        Ariza qabul qilinsin
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleStatusChange(selectedApp.id, 'pending')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-md shadow-indigo-600/10"
                    >
                      Kutilayotgan holatga o'tkazish
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== NEWS ADD / EDIT MODAL ==================== */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              onClick={() => setNewsModalOpen(false)} 
              className="fixed inset-0 bg-slate-900/60 transition-opacity" 
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-slate-100">
              {/* Header */}
              <div className="bg-indigo-900 px-6 py-5 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">
                    {editingNewsIdx !== null ? "Yangilikni tahrirlash" : "Yangi yangilik yaratish"}
                  </h3>
                  <p className="text-xs text-indigo-200 mt-0.5">
                    Foydalanuvchi sayti yangiliklar sahifasi uchun ma'lumotlarni to'ldiring
                  </p>
                </div>
                <button 
                  onClick={() => setNewsModalOpen(false)} 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleNewsSubmit}>
                <div className="p-6 space-y-4 bg-slate-50">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Sarlavha (Title)
                    </label>
                    <input 
                      type="text" 
                      required
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                      placeholder="Yangilik sarlavhasini kiriting..." 
                      className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                        Kategoriya
                      </label>
                      <select 
                        required
                        value={newsForm.category}
                        onChange={(e) => setNewsForm({...newsForm, category: e.target.value})}
                        className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                      >
                        <option value="E'lon">E'lon</option>
                        <option value="Grant">Grant</option>
                        <option value="Tadbir">Tadbir</option>
                        <option value="Natija">Natija</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                        E'lon qilish sanasi
                      </label>
                      <input 
                        type="date" 
                        required
                        value={newsForm.date}
                        onChange={(e) => setNewsForm({...newsForm, date: e.target.value})}
                        className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Rasm (Rasm havolasi / URL)
                    </label>
                    <input 
                      type="url" 
                      value={newsForm.image}
                      onChange={(e) => setNewsForm({...newsForm, image: e.target.value})}
                      placeholder="https://images.unsplash.com/photo-... kabi" 
                      className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                    <p className="text-slate-400 text-[10px] mt-1">Sifatli render uchun Unsplash yoki boshqa rasm havolasini bering.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Batafsil matn
                    </label>
                    <textarea 
                      required
                      rows={5}
                      value={newsForm.content}
                      onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                      placeholder="Yangilik matnini to'liq yozing..." 
                      className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-100 px-6 py-4 flex items-center justify-end space-x-2 rounded-b-3xl border-t border-slate-200">
                  <button 
                    type="button" 
                    onClick={() => setNewsModalOpen(false)}
                    className="bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors"
                  >
                    Bekor qilish
                  </button>
                  <button 
                    type="submit" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-md"
                  >
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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