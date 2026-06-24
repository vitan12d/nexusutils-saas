import { useEffect } from 'react';
import { cmsService } from '../lib/cmsService';

const articles = [
  { title: "Top 5 Automation Tools for 2026", content: "Automation is key. Here are the top 5 tools...", category: 'articles' },
  { title: "Streamlining Email with AI", content: "Email automation has evolved...", category: 'articles' },
  { title: "Building Scalable Workflows", content: "Scalability is essential for long-term growth...", category: 'articles' },
  { title: "The Future of AI in Business", content: "AI is reshaping business operations...", category: 'articles' },
  { title: "Optimizing Your CRM Data", content: "Data optimization is crucial...", category: 'articles' }
];

const news = [
  { title: "Tech Breakthrough in AI", content: "New breakthroughs in AI...", category: 'news' },
  { title: "Cybersecurity Trends 2026", content: "Cybersecurity is evolving fast...", category: 'news' },
  { title: "New N8n Features Released", content: "N8n has released new powerful features...", category: 'news' },
  { title: "Automation Market Growth", content: "The automation market is growing...", category: 'news' },
  { title: "Cloud Computing Innovations", content: "Cloud computing is at a new peak...", category: 'news' }
];

export default function AddArticles() {
  useEffect(() => {
    async function addData() {
      for (const item of [...articles, ...news]) {
        await cmsService.addDocument(item.category, {title: item.title, content: item.content});
      }
      console.log('Articles/News added');
    }
    addData();
  }, []);
  return null;
}
