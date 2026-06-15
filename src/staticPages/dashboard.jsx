import { Calendar, ChevronRight, Eye, FileCheck, FileText, FileX, Newspaper, Plus } from "lucide-react";

function Dashboard({news, apps, setCurrentTab, setSelectedApp,statTotal, statPending, statApproved, statRejected}) {
    return ( <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Xush kelibsiz, Bekzodbek!
                </h2>
                <p className="text-sm text-slate-500">
                  Bugungi arizalar oqimi va jamg'armaning dolzarb yangiliklari
                  tahlili.
                </p>
              </div>

              {/* Stats widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                  <div className="p-4 bg-indigo-50 rounded-xl text-indigo-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Jami arizalar
                    </p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-0.5">
                      {statTotal}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                  <div className="p-4 bg-amber-50 rounded-xl text-amber-600">
                    <Calendar className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Kutilayotganlar
                    </p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-0.5">
                      {statPending}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                  <div className="p-4 bg-emerald-50 rounded-xl text-emerald-600">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Tasdiqlanganlar
                    </p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-0.5">
                      {statApproved}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                  <div className="p-4 bg-rose-50 rounded-xl text-rose-600">
                    <FileX className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Rad etilganlar
                    </p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-0.5">
                      {statRejected}
                    </h3>
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
                      onClick={() => setCurrentTab("applications")}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      Barchasi <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-125">
                      <thead>
                        <tr className="bg-slate-50/50 text-slate-400 text-xs font-semibold uppercase">
                          <th className="py-3 px-5">F.I.SH</th>
                          <th className="py-3 px-5">Universitet</th>
                          <th className="py-3 px-5">Yo'nalish</th>
                          <th className="py-3 px-5 text-right">Amal</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-slate-100">
                        {apps.slice(0, 4).map((app) => (
                          <tr
                            key={app.id}
                            className="hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="py-4 px-5">
                              <div className="font-semibold text-slate-800">
                                {app.studentFullName}
                              </div>
                              <div className="text-xs text-slate-400 font-mono">
                                {app.emailAddress}
                              </div>
                            </td>
                            <td className="py-4 px-5 text-slate-600 max-w-37.5 truncate">
                              {app.universityName}
                            </td>
                            <td className="py-4 px-5 text-slate-600 font-medium">
                              {app.studyField}
                            </td>
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
                            <td
                              colSpan="4"
                              className="py-6 text-center text-slate-400"
                            >
                              Hozircha arizalar mavjud emas.
                            </td>
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
                    <div className="space-y-4 max-h-70 overflow-y-auto pr-1">
                      {news.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setCurrentTab("news")}
                          className="flex items-start space-x-3 p-2 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200";
                            }}
                            className="w-12 h-12 rounded-lg object-cover shrink-0 shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 truncate">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                              {item.content}
                            </p>
                            <span className="inline-block mt-1 text-[10px] bg-indigo-50 text-indigo-600 font-bold px-1.5 py-0.2 rounded">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      ))}
                      {news.length === 0 && (
                        <p className="text-sm text-slate-400 py-4 text-center">
                          Faol yangiliklar mavjud emas.
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentTab("news")}
                    className="mt-4 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Yangilik qo'shish yoki
                    tahrirlash
                  </button>
                </div>
              </div>
            </div> );
}

export default Dashboard;