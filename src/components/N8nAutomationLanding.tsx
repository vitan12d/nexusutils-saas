import { BookOpen, Folder, ArrowLeft } from 'lucide-react';
import { cmsService } from '../lib/cmsService';
import { useEffect, useState } from 'react';

export default function N8nAutomationLanding({ onGoBack }: { onGoBack: () => void }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const files = await cmsService.listDocuments('files');
        const workflows = await cmsService.listDocuments('n8n'); // Assuming these collections exist based on previous turns
        setData([...files, ...workflows]);
      } catch (err) {
        console.error('Error fetching N8N data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 font-sans p-8">
      <button
        onClick={onGoBack}
        className="mb-8 flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 py-1.5 px-3.5 rounded-lg transition"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Home
      </button>

      <h1 className="text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
        N8n Automation & Workflows
      </h1>

      {loading ? (
        <p>Loading workflows and files...</p>
      ) : (
        <div className="space-y-12">
          {['All', 'Gmail_and_Email_Automation'].map(category => {
            const filteredData = category === 'All' ? data : data.filter(d => d.category === category);
            if (filteredData.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">{category.replace(/_/g, ' ')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredData.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                          {item.type === 'file' ? <Folder className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                        </div>
                        <h3 className="font-bold">{item.name || item.title || 'Untitled'}</h3>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{item.description}</p>
                      {item.instructions && (
                        <div className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                          <strong>Instructions:</strong> {item.instructions}
                        </div>
                      )}
                      <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-xs font-bold transition">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
