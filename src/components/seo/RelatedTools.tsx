import React from 'react';
import { TOOLS, Tool } from '../../types';

interface RelatedToolsProps {
  currentToolId: string;
  onNavigateSlug: (slug: string) => void;
  slugMapping: Record<string, string>;
}

export default function RelatedTools({
  currentToolId,
  onNavigateSlug,
  slugMapping
}: RelatedToolsProps) {
  // Find related tools (by matching category first, then selecting up to 3)
  const currentTool = TOOLS.find((t) => t.id === currentToolId);
  const related = TOOLS.filter((t) => t.id !== currentToolId)
    .filter((t) => !currentTool || t.category === currentTool.category)
    .slice(0, 3);

  // If we don't have enough tools in the same category, grab some general developer/seo ones
  if (related.length < 3) {
    const general = TOOLS.filter((t) => t.id !== currentToolId && !related.find((r) => r.id === t.id))
      .slice(0, 3 - related.length);
    related.push(...general);
  }

  // Get slug from toolId matching our dictionary
  const getSlugFromId = (id: string): string => {
    const found = Object.entries(slugMapping).find(([_, value]) => value === id);
    return found ? found[0] : id;
  };

  return (
    <div className="space-y-6">
      <div className="text-left space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Related Digital Services
        </h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
          Recommended high-performance utilities matching your active pipeline matches
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((tool) => {
          const slug = getSlugFromId(tool.id);
          return (
            <div
              key={tool.id}
              onClick={() => onNavigateSlug(slug)}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 hover:border-blue-500 hover:dark:border-blue-500 rounded-2xl cursor-pointer hover:-translate-y-0.5 transition duration-150 group flex flex-col justify-between text-left"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-extrabold uppercase bg-blue-550/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 px-2 py-0.5 rounded font-mono">
                    {tool.category.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Tool →
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-850 dark:text-white group-hover:text-blue-500 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold line-clamp-2">
                  {tool.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
