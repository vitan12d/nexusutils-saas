import { TOOLS } from '../types';
import { ALL_50_POSTS_METADATA } from '../data/blogData';
import { cmsService } from '../lib/cmsService';
import { useState, useEffect } from 'react';
import { Search, FileText, Newspaper, Workflow } from 'lucide-react';

export default function SearchResults({ query, onSelectTool }: { query: string, onSelectTool: (tool: any) => void }) {
  const [n8nItems, setN8nItems] = useState<any[]>([]);
  
  useEffect(() => {
    cmsService.getCollection('n8n').then(setN8nItems);
  }, []);

  const filteredTools = TOOLS.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase()));
  const filteredPosts = ALL_50_POSTS_METADATA.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
  const filteredN8n = n8nItems.filter(i => i.title?.toLowerCase().includes(query.toLowerCase()) || i.description?.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-8 space-y-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Search results for "{query}"</h2>
      
      {filteredTools.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2"><FileText size={20}/> Tools</h3>
          {filteredTools.map(t => (
            <button key={t.id} onClick={() => onSelectTool(t)} className="block text-indigo-600 dark:text-indigo-400 hover:underline">{t.name}</button>
          ))}
        </section>
      )}
      {filteredPosts.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2"><Newspaper size={20}/> Blog Posts</h3>
          {filteredPosts.map(p => <div key={p.id} className="text-slate-600 dark:text-slate-300">{p.title}</div>)}
        </section>
      )}
      {filteredN8n.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2"><Workflow size={20}/> N8n Automations</h3>
          {filteredN8n.map(i => <div key={i.id} className="text-slate-600 dark:text-slate-300">{i.title}</div>)}
        </section>
      )}
      {filteredTools.length === 0 && filteredPosts.length === 0 && filteredN8n.length === 0 && (
        <p className="text-slate-500">No results found.</p>
      )}
    </div>
  );
}
