import { useState, useEffect } from 'react';
import { cmsService } from '../lib/cmsService';
import { FileText, Newspaper, Folder, Workflow, Download } from 'lucide-react';

export default function PublicContentDisplay({ section }: { section: 'articles' | 'news' | 'files' | 'n8n' }) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await cmsService.getCollection(section);
      setItems(data);
    };
    fetch();
  }, [section]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold capitalize text-slate-800 dark:text-slate-100">{section === 'n8n' ? 'n8n Automations' : section}</h2>
      <div className="grid gap-6">
        {items.map(item => (
          <div key={item.id} className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{item.title || item.name}</h3>
            {item.content && <p className="text-slate-600 dark:text-slate-300 mb-4">{item.content}</p>}
            {item.description && <p className="text-slate-600 dark:text-slate-300 mb-4">{item.description}</p>}
            {item.url && <a href={item.url} target="_blank" className="text-indigo-600 hover:underline flex items-center gap-1"><Download size={16}/> Download</a>}
            {item.fileUrl && <a href={item.fileUrl} target="_blank" className="text-indigo-600 hover:underline flex items-center gap-1"><Download size={16}/> Download N8n Workflow</a>}
          </div>
        ))}
      </div>
    </div>
  );
}
