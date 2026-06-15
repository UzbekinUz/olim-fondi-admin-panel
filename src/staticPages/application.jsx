import { Check, Eye, FileText, FlaskConical, Mail, Phone, Search, X } from "lucide-react";

function Application({setFilterStatus, filterStatus, searchTerm, setSearchTerm, studyFormFilter, setStudyFormFilter, researchFilter, setResearchFilter, filteredApps, handleStatusChange, setSelectedApp}) {
    return ( 
        <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Arizalar reyestri
                    </h2>
                    <p className="text-xs text-slate-500">
                      Kelib tushgan barcha hujjatlarni saralashingiz, status
                      bo'yicha tekshirishingiz mumkin.
                    </p>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex p-1 bg-slate-100 rounded-xl space-x-1 text-xs font-semibold text-slate-600 border border-slate-200 max-w-max">
                    {["all", "pending", "approved", "rejected"].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => setFilterStatus(status)}
                          className={`px-4 py-2 rounded-lg transition-all ${filterStatus === status ? "bg-white text-indigo-700 shadow-sm" : "hover:text-slate-800"}`}
                        >
                          {status === "all" && "Barchasi"}
                          {status === "pending" && "Kutilmoqda"}
                          {status === "approved" && "Qabul qilindi"}
                          {status === "rejected" && "Rad etildi"}
                        </button>
                      ),
                    )}
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
                  <table className="w-full text-left border-collapse min-w-237.5">
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
                      {filteredApps.map((app) => (
                        <tr
                          key={app.id}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="font-semibold text-slate-800">
                              {app.studentFullName}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {app.nationality} | {app.birthDate}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-slate-700 font-medium">
                              {app.universityName}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {app.studyForm} • {app.studyField} •{" "}
                              <span className="text-slate-600 font-bold">
                                {app.currentCourse}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-slate-700 text-xs font-semibold flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />{" "}
                              {app.phoneNumber}
                            </div>
                            <div className="text-xs text-indigo-600 font-mono mt-0.5 flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />{" "}
                              {app.emailAddress}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            {app.isDoingResearch ? (
                              <span className="inline-flex items-center gap-0.5 bg-indigo-50 text-indigo-600 font-bold text-[10px] px-2 py-1 rounded border border-indigo-100">
                                <FlaskConical className="w-3.5 h-3.5" />{" "}
                                Tadqiqotchi
                              </span>
                            ) : (
                              <span className="text-slate-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            {app.status === "pending" && (
                              <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                                Kutilmoqda
                              </span>
                            )}
                            {app.status === "approved" && (
                              <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                                Qabul qilindi
                              </span>
                            )}
                            {app.status === "rejected" && (
                              <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5"></span>
                                Rad etildi
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
                              {app.status === "pending" ? (
                                <>
                                  <button
                                    onClick={() =>
                                      handleStatusChange(app.id, "approved")
                                    }
                                    className="px-2 py-2 bg-emerald-50/50 hover:bg-emerald-500 text-emerald-600 hover:text-white border-r border-slate-200 transition-colors"
                                    title="Tasdiqlash"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleStatusChange(app.id, "rejected")
                                    }
                                    className="px-2 py-2 bg-rose-50/50 hover:bg-rose-500 text-rose-600 hover:text-white transition-colors"
                                    title="Rad etish"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleStatusChange(app.id, "pending")
                                  }
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
                    <h4 className="font-bold text-slate-700 text-lg">
                      Hech qanday ariza topilmadi
                    </h4>
                    <p className="text-sm text-slate-400 mt-1 max-w-sm">
                      Tanlangan filtrlar yoki so'rovga mos keladigan arizalar
                      mavjud emas.
                    </p>
                  </div>
                )}
              </div>
            </div>
     );
}

export default Application;