import { useState, useEffect } from 'react';
import { cmsService } from '../lib/cmsService';
import { Plus, Trash2, FileText, Newspaper, Folder, Workflow, Image, Video, Save, RotateCcw } from 'lucide-react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'articles' | 'news' | 'files' | 'n8n'>('articles');
  const [items, setItems] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    const data = await cmsService.getCollection(activeTab);
    setItems(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await cmsService.addDocument(activeTab, formData);
    setFormData({});
    fetchItems();
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">CMS Control Panel</h2>
      
      <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        {(['articles', 'news', 'files', 'n8n'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize pb-2 px-2 whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-indigo-600 font-bold text-indigo-600' : 'text-slate-500'}`}
          >
            {tab === 'n8n' ? 'n8n Automation' : tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="mb-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-lg text-slate-700 dark:text-slate-200">Add New {activeTab}</h3>
        {activeTab === 'articles' && (
          <>
            <input placeholder="Title" className="w-full p-2 rounded" onChange={e => setFormData({...formData, title: e.target.value})} />
            <textarea placeholder="Content" className="w-full p-2 rounded" onChange={e => setFormData({...formData, content: e.target.value})} />
          </>
        )}
        {activeTab === 'news' && (
          <>
            <input placeholder="Title" className="w-full p-2 rounded" onChange={e => setFormData({...formData, title: e.target.value})} />
            <textarea placeholder="News Content" className="w-full p-2 rounded" onChange={e => setFormData({...formData, content: e.target.value})} />
          </>
        )}
        {activeTab === 'files' && (
          <>
            <input placeholder="File Name" className="w-full p-2 rounded" onChange={e => setFormData({...formData, name: e.target.value})} />
            <input placeholder="File URL" className="w-full p-2 rounded" onChange={e => setFormData({...formData, url: e.target.value})} />
          </>
        )}
        {activeTab === 'n8n' && (
          <>
            <input placeholder="Workflow Title" className="w-full p-2 rounded" onChange={e => setFormData({...formData, title: e.target.value})} />
            <textarea placeholder="Description" className="w-full p-2 rounded" onChange={e => setFormData({...formData, description: e.target.value})} />
            <input placeholder="File URL" className="w-full p-2 rounded" onChange={e => setFormData({...formData, fileUrl: e.target.value})} />
            <input placeholder="Image URL" className="w-full p-2 rounded" onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
          </>
        )}
        <button type="submit" className="bg-indigo-600 text-white p-2 rounded flex items-center gap-2" disabled={loading}>
          <Save size={18} /> Save
        </button>
      </form>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center gap-3">
              {activeTab === 'articles' && <FileText className="text-indigo-500" />}
              {activeTab === 'news' && <Newspaper className="text-blue-500" />}
              {activeTab === 'files' && <Folder className="text-emerald-500" />}
              {activeTab === 'n8n' && <Workflow className="text-amber-500" />}
              <span className="font-medium text-slate-700 dark:text-slate-200">{item.title || item.name}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={async () => { await cmsService.deleteDocument(activeTab, item.id); fetchItems(); }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
