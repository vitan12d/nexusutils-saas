import React from 'react';
import { FAQItem } from './ToolFAQ';

interface ToolSchemaProps {
  toolName: string;
  toolDescription: string;
  slug: string;
  faqs: FAQItem[];
  category: string;
}

export default function ToolSchema({
  toolName,
  toolDescription,
  slug,
  faqs,
  category
}: ToolSchemaProps) {
  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://nexusutils.com';
  const pageUrl = `${domain}/tools/${slug}`;

  // 1. Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${domain}/`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Tools',
        'item': `${domain}/#categories`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': toolName,
        'item': pageUrl
      }
    ]
  };

  // 2. SoftwareApplication Schema (Custom categorizers based on tags)
  const appCategoryMap: Record<string, string> = {
    pdf: 'MultimediaApplication',
    image: 'ImageEditorApplication',
    text: 'TextEditorApplication',
    finance: 'BusinessApplication',
    developer: 'DeveloperApplication',
    seo: 'SEOApplication',
    ai: 'AIApplication'
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': `${toolName} - Free Local Web Utility`,
    'operatingSystem': 'All',
    'applicationCategory': appCategoryMap[category] || 'DeveloperApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'description': toolDescription,
    'author': {
      '@type': 'Organization',
      'name': 'NexusUtils',
      'url': domain
    }
  };

  // 3. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((f) => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
