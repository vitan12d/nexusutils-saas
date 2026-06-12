/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Utility to dynamically inject ad scripts into the document.
 * Handles both standard script tags (Adsterra / Clickadilla) and Google AdSense
 */
export function injectAdScript(code: string, containerId?: string) {
  if (!code || typeof window === 'undefined') return;

  // If container ID is provided, inject it there, otherwise append to body
  const container = containerId ? document.getElementById(containerId) : document.body;
  if (!container) return;

  // Parse HTML string to find script tags
  const parser = new DOMParser();
  const parsedDoc = parser.parseFromString(code, 'text/html');
  const scriptTags = parsedDoc.querySelectorAll('script');

  // Also check if there are non-script HTML elements to mount (e.g. divs, ins tags for Google AdSense)
  const nonScriptElements = parsedDoc.body.children;
  if (containerId) {
    // For specific ad boxes, clean up old non-script children to avoid duplicates
    const adContainer = document.getElementById(containerId);
    if (adContainer) {
      adContainer.innerHTML = '';
    }
  }

  // Append HTML markup (AdSense ins tag, etc.)
  Array.from(nonScriptElements).forEach((el) => {
    if (el.tagName !== 'SCRIPT') {
      container.appendChild(el.cloneNode(true));
    }
  });

  // Inject each script tag safely
  scriptTags.forEach((oldScript) => {
    const newScript = document.createElement('script');
    
    // Copy all attributes (src, async, data-cfasync, etc.)
    Array.from(oldScript.attributes).forEach((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    });

    // Copy inner javascript code if any
    if (oldScript.innerHTML) {
      newScript.innerHTML = oldScript.innerHTML;
    }

    container.appendChild(newScript);
  });
}
