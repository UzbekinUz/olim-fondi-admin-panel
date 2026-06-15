import { Check, Newspaper, X } from "lucide-react";

function News({setNewsForm, setNewsModalOpen,editingNewsIdx,newsForm,setNews,triggerToast,news}) {
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
    return ( 
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* Overlay */}
                    
        
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
     );
}

export default News;