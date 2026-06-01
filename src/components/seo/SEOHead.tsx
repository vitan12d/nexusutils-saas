import { useEffect } from 'react';
import { PSEOItem } from '../../content/pseoTypes';
import { generateStructuredDataSchemas } from '../../content/loader';

interface SEOHeadProps {
  item: PSEOItem;
}

export default function SEOHead({ item }: SEOHeadProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Update document title
    document.title = item.metaTitle;

    // 2. Helper to manage standard meta name elements
    const setMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 3. Helper to manage link attributes (Canonical)
    const setLinkTag = (relValue: string, hrefValue: string) => {
      let element = document.querySelector(`link[rel="${relValue}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', relValue);
        document.head.appendChild(element);
      }
      element.setAttribute('href', hrefValue);
    };

    const currentUrl = window.location.href;

    // Standard SEO Meta Tags
    setMetaTag('name', 'description', item.metaDescription);
    setLinkTag('canonical', currentUrl);

    // Open Graph SEO Tags
    setMetaTag('property', 'og:title', item.metaTitle);
    setMetaTag('property', 'og:description', item.metaDescription);
    setMetaTag('property', 'og:type', 'article');
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:site_name', 'NexusUtils');

    // Twitter Card SEO Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', item.metaTitle);
    setMetaTag('name', 'twitter:description', item.metaDescription);

    // 4. Inject Combined JSON-LD Schema payloads
    const schemas = generateStructuredDataSchemas(item, currentUrl);
    
    // Remove any existing JSON-LD script blocks we created earlier to prevent accumulation
    const legacyBlocks = document.querySelectorAll('script[type="application/ld+json"][data-pseo-schema]');
    legacyBlocks.forEach(el => el.remove());

    // Create a new script element for each schema payload
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-pseo-schema', 'true');
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup logic when navigating away from the page
    return () => {
      // We keep standard tags but clear schema scripts
      const scripts = document.querySelectorAll('script[type="application/ld+json"][data-pseo-schema]');
      scripts.forEach(el => el.remove());
    };
  }, [item]);

  // This is a headless metadata controller
  return null;
}
