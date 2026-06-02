export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  iconName: string;
  popular?: boolean;
  trending?: boolean;
  rating?: number;
  runsClientSide: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  relatedTools: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ResourceHeader {
  slug: string;
  type: 'guide' | 'checklist' | 'template' | 'example' | 'compare';
  title: string;
  description: string;
}

export interface ResourceItem extends ResourceHeader {
  content: string;
  faq: FAQItem[];
  relatedTools: string[];
  relatedArticles: string[];
}
