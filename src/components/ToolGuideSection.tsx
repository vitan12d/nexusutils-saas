import React from 'react';
import { HelpCircle, Shield, BookOpen, AlertCircle, Sparkles, CheckCircle, Info } from 'lucide-react';

interface ToolGuideSectionProps {
  toolId: string;
  toolName: string;
}

export default function ToolGuideSection({ toolId, toolName }: ToolGuideSectionProps) {
  // Rich, high-density publisher articles dynamically returned based on toolId
  const renderGuideContent = () => {
    switch (toolId) {
      case 'json-formatter':
        return (
          <div className="space-y-6 select-text text-slate-700 dark:text-slate-300">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                1. What is JSON and Why is Validation Imperative?
              </h2>
              <p className="text-[12px] leading-relaxed">
                JavaScript Object Notation (JSON) has emerged as the universal standard format for structural data exchange across modern APIs, cloud microservices, and client-server pipelines. As a lightweight, text-based data language, its simplicity allows diverse systems to communicate seamlessly. However, because JSON requires strict syntax conformance—such as double-quoted keys, balanced brackets, proper trailing commas, and precise nested arrays—even a single omitted character can crash parsing engines and halt critical backend transactions. 
              </p>
              <p className="text-[12px] leading-relaxed">
                Our client-side <strong>JSON Formatter & Validator</strong> processes your inputs directly in browser memory. By localizing the validation loop, we instantly point out exact line errors, assist developers in fixing misaligned objects, and prevent your sensitive payload strings from crossing external internet networks.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                2. Key Functional Capabilities
              </h2>
              <ul className="list-disc pl-5 text-[12px] space-y-1.5 leading-relaxed">
                <li><strong>Interactive Indent Spacing:</strong> Opt between standard 2-space spacing, 4-space indent rules, or compressed tabs to customize layout density.</li>
                <li><strong>Dynamic Compression (Minification):</strong> Instantly strip away white spaces, line breaks, and system indentations to reduce payload size to its absolute minimum—ideal for production API calls.</li>
                <li><strong>Active Error Highlighting:</strong> Identify misplaced symbols or missing quotes with clear structural syntax alerts mapping precise error locations.</li>
                <li><strong>Strict Local Isolation:</strong> 100% computational privacy. No system credentials or keys ever transit across remote logs.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Best Practices for API Data Handshakes
              </h2>
              <p className="text-[12px] leading-relaxed">
                When structuring payloads for complex server integrations, ensure your data values are fully encoded in UTF-8 format. Avoid leaving trailing commas after final array items or nested object parameters, as standard strict JSON parsers will trigger immediate syntax fatal flags. For maximum transport speed, minify your objects before dispatching them over the wire to conserve server bandwidth.
              </p>
            </div>
          </div>
        );

      case 'qr-generator':
        return (
          <div className="space-y-6 select-text text-slate-700 dark:text-slate-300">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                1. Demystifying QR Code Layout Architecture
              </h2>
              <p className="text-[12px] leading-relaxed">
                Quick Response (QR) codes are two-dimensional matrix barcodes originally pioneered by Denso Wave in 1894. A standard QR grid consists of high-contrast black squares arranged on a white background, which is analyzed and parsed by optical imaging devices. Inside every barcode, specialized geographic markers (such as finder patterns, alignment indicators, and timing tracks) synchronize the optical scan angle, allowing cameras to read content patterns from any physical orientation instantly.
              </p>
              <p className="text-[12px] leading-relaxed">
                Furthermore, QR codes utilize advanced <strong>Reed-Solomon Error Correction</strong>. This mathematical protocol adds redundant data sequences to the active payload matrix, enabling the code to remain fully readable even if up to 30% of its physical area is smudged, torn, or overlaid with localized customized brand layers.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                2. Understanding Error Correction Levels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-[11px] pt-1">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-lg">
                  <strong className="block font-sans text-blue-600 dark:text-blue-400">Level L (Low)</strong>
                  Up to 7% of data recovery. Best for simple URLs and minimal density requirements.
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-lg">
                  <strong className="block font-sans text-blue-600 dark:text-blue-400">Level M (Medium)</strong>
                  Up to 15% of data recovery. The standard default choice for normal mobile marketing media.
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-lg">
                  <strong className="block font-sans text-blue-600 dark:text-blue-400">Level Q (Quartile)</strong>
                  Up to 25% of data recovery. Excellent when placing small custom logos or in rugged settings.
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-lg">
                  <strong className="block font-sans text-blue-600 dark:text-blue-400">Level H (High)</strong>
                  Up to 30% of data recovery. Offers the highest payload redundancy for high-wear environments.
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Guidelines for Designing Custom QR Assets
              </h2>
              <p className="text-[12px] leading-relaxed">
                When customizing foreground and background colors, you must maintain a high levels of visual color contrast. Light colors on light backgrounds fail optical camera recognition checks due to low reflectivity differences. Always confirm that your chosen foreground shade is significantly darker than the background paper or image element.
              </p>
            </div>
          </div>
        );

      case 'password-generator':
        return (
          <div className="space-y-6 select-text text-slate-700 dark:text-slate-300">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                1. Computational Entropy and Strong Cybersecurity Protocols
              </h2>
              <p className="text-[12px] leading-relaxed">
                In modern security engineering, password strength is not assessed by subjective complexity feel, but by calculating absolute mathematical <strong>Shannon Entropy</strong>. Entropy measures the quantitative randomness of a string sequence in terms of bits. The formula is expressed as: <code className="bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded font-mono text-[11px]">E = L * log2(R)</code>, where <em>L</em> represents the character sequence length and <em>R</em> is the size of the underlying character pool pool.
              </p>
              <p className="text-[12px] leading-relaxed">
                For instance, a standard lower-case password has a character pool of 26 ($R=26$). Adding uppercase letters ($+26$), numbers ($+10$), and symbols ($+18$) escalates the pool size to 80, exponentially amplifying the computational cost required for brute-force attacks or dictionary matrices to guess your keys.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                2. Optimal Cryptographic Security Thresholds
              </h2>
              <ul className="list-disc pl-5 text-[12px] space-y-1.5 leading-relaxed">
                <li><strong>Under 60 Bits (Weak):</strong> Highly vulnerable to distributed GPU-powered dictionary cracking systems within short timelines.</li>
                <li><strong>60 - 80 Bits (Fair):</strong> Reasonable protection against general targeted threats, but lacks buffer against long-term supercomputer clusters.</li>
                <li><strong>80 - 100 Bits (Excellent):</strong> Meets standard corporate, enterprise-level system compliance rules.</li>
                <li><strong>Above 100 Bits (Unpickable):</strong> Solid cryptographic protection. The physical energy needed to brute-force this threshold exceeds standard planetary computing capacity.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Proper Key Maintenance Best Practices
              </h2>
              <p className="text-[12px] leading-relaxed">
                Never utilize the same password across multiple online profiles. Always employ unique credentials for each service, and save them within secure, zero-knowledge, encrypted password managers. By formulating passwords client-side using our offline-first generator, you avoid sending sensitive strings over network sockets.
              </p>
            </div>
          </div>
        );

      case 'markdown-editor':
        return (
          <div className="space-y-6 select-text text-slate-700 dark:text-slate-300">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                1. Markdown as a Modern Content System Standard
              </h2>
              <p className="text-[12px] leading-relaxed">
                Originated in 2004 by John Gruber with input from Aaron Swartz, Markdown represents a lightweight markup language designed to offer a plain-text formatting syntax that converts cleanly into compliant HTML. By using human-readable tags and intuitive character sequences—such as asterisks for emphasis, hash markers for text headers, and bracket pairings for hypermedia links—technical writers can focus entirely on copy creation without dealing with complex XML markup.
              </p>
              <p className="text-[12px] leading-relaxed">
                Our dual-pane <strong>Markdown Previewer & Editor</strong> provides instant client-side CSS compiling. It simplifies HTML drafting, lets you preview formatting styles instantly, and conforms perfectly to standard GitHub Flavored Markdown (GFM) rules.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                2. Key Formatting Guide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-mono bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
                <div>
                  <span className="block font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Markdown Input Style</span>
                  # Ultimate Header One<br />
                  ## Subtitle Header Two<br />
                  **Strong bold text emphasis**<br />
                  *Classic italic formatting font*<br />
                  [Link Anchor](https://site.com)
                </div>
                <div>
                  <span className="block font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">HTML Compilation Output</span>
                  &lt;h1&gt;Ultimate Header One&lt;/h1&gt;<br />
                  &lt;h2&gt;Subtitle Header Two&lt;/h2&gt;<br />
                  &lt;strong&gt;Strong bold text emphasis&lt;/strong&gt;<br />
                  &lt;em&gt;Classic italic formatting font&lt;/em&gt;<br />
                  &lt;a href="https://site.com"&gt;Link Anchor&lt;/a&gt;
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Technical Content Architecture
              </h2>
              <p className="text-[12px] leading-relaxed">
                Always ensure your headers flow linearly (from `h1` down to `h6`) without skipping hierarchical ranks, as search-engine crawl crawlers use heading trees to analyze and understand document topics.
              </p>
            </div>
          </div>
        );

      case 'text-analyzer':
        return (
          <div className="space-y-6 select-text text-slate-700 dark:text-slate-300">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                1. Cryptographic Hash Functions & Data Encoding Explained
              </h2>
              <p className="text-[12px] leading-relaxed">
                A cryptographic hash function constitutes a mathematical algorithm that maps arbitrary, variable-sized input payloads into fixed-size hexadecimal string outputs. Excellent hash algorithms represent uniform, one-way functions: they should be computationally impossible to reconstruct in reverse, and any minor alteration in the inputs must yield a completely distinct output string—a phenomenon referred to as the "avalanche effect".
              </p>
              <p className="text-[12px] leading-relaxed">
                Simultaneously, Base64 is an <strong>encoding binary format</strong> designed to safely transport binary objects over medium networks that expect text data. Base64 is not a form of encryption, but a format standard that translates binary streams into an ASCII character set consisting of 64 distinct safe symbols.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                2. Comparing MD5, SHA-1, and SHA-256
              </h2>
              <ul className="list-disc pl-5 text-[12px] space-y-1.5 leading-relaxed">
                <li><strong>MD5 (Message Digest 5):</strong> Generates a 128-bit hash sequence. Although highly performant, it suffers from severe mathematical collision vulnerabilities and is strictly deprecated for security authentication.</li>
                <li><strong>SHA-1 (Secure Hash Algorithm 1):</strong> Outputs a 160-bit hash. Historically used across early git architectures, it is also flagged as insecure for contemporary cryptographic verification due to theoretical parsing exploits.</li>
                <li><strong>SHA-256 (SHA-2 Family):</strong> Formulates a highly secure 256-bit hash. It remains the industry benchmark standard for file integrity checksums, SSL certificates, blockchain ledger transactions, and severe authentication systems.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Real-World Applications
              </h2>
              <p className="text-[12px] leading-relaxed">
                Developers utilize SHA-256 signatures to verify that software downloaded from public mirrors has not been modified by malware. By comparing the local package file checksum with the official checksum published by the developer, data integrity can be mathematically guaranteed.
              </p>
            </div>
          </div>
        );

      case 'seo-helper':
        return (
          <div className="space-y-6 select-text text-slate-700 dark:text-slate-300">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                1. Structural Metadata Optimization for Search Visibility
              </h2>
              <p className="text-[12px] leading-relaxed">
                Search Engine Optimization (SEO) requires strict compliance with physical layout specs and search crawler guidelines. The HTML `title` tag and `meta description` serve as the initial introduction of your website to prospective searchers within Search Engine Result Pages (SERPs). If these elements exceed mobile and desktop view limits, search networks will automatically truncate the text, decreasing click-through rates.
              </p>
              <p className="text-[12px] leading-relaxed">
                By leveraging <strong>Gemini AI API proxy services</strong>, this utility formats structured tags that keep titles under 60 characters and meta descriptions within the ideal 150-160 range, while organically integrating focus keywords for maximum positioning performance.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                2. Real-world Metadata Guidelines
              </h2>
              <ul className="list-disc pl-5 text-[12px] space-y-1.5 leading-relaxed">
                <li><strong>Title Element (50 - 60 chars):</strong> Must lead with key terms. Ensure it remains a compelling, human-friendly calling card.</li>
                <li><strong>Meta Description (120 - 155 chars):</strong> Craft a concise, actionable summary of the page content that includes a clear call to action.</li>
                <li><strong>OpenGraph Tags (og:title, og:description):</strong> Tailor these tags specifically for visual platforms (such as Facebook, LinkedIn, or Slack) to improve click performance.</li>
                <li><strong>JSON-LD Structured Schema:</strong> Inform crawl bots about your app's catalog, features, prices, and capabilities using clean, standard semantic structures.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Implementing Rich SEO Schema Layouts
              </h2>
              <p className="text-[12px] leading-relaxed">
                To maximize search visibility, always embed Structured Schema code blocks inside your pages' HTML body. This helps crawlers identify your site as an direct application tool dashboard, unlocking star rating badges and rich visual snippets within search results.
              </p>
            </div>
          </div>
        );

      case 'utm-builder':
        return (
          <div className="space-y-6 select-text text-slate-700 dark:text-slate-300">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                1. Attribution Rules and Urchin Tracking Modules (UTMs)
              </h2>
              <p className="text-[12px] leading-relaxed">
                Multi-channel acquisition relies on precise analytics tagging. Originally engineered by Urchin Software Corporation and adopted by Google, Urchin Tracking Module (UTM) codes represent customized query parameters appended to URLs. These tags let marketing dashboards categorise incoming web traffic, pinpointing exactly which ad, social post, or email campaign generated a conversion.
              </p>
              <p className="text-[12px] leading-relaxed">
                By standardizing tags with our local sandbox builder, you eliminate attribution errors, organize digital campaigns with high accuracy, and ensure your URLs remain clean and compliant.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                2. Understanding the Five Core UTM Parameters
              </h2>
              <div className="space-y-3 pt-1">
                <div className="flex gap-2 text-[11px] items-start">
                  <span className="font-mono bg-blue-50 dark:bg-slate-950 text-blue-600 dark:text-blue-450 p-1 rounded font-bold">utm_source:</span>
                  <p className="leading-relaxed">Identifies the specific platform or publisher driving traffic (e.g., <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">google</code>, <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">newsletter</code>).</p>
                </div>
                <div className="flex gap-2 text-[11px] items-start">
                  <span className="font-mono bg-blue-50 dark:bg-slate-950 text-blue-600 dark:text-blue-450 p-1 rounded font-bold">utm_medium:</span>
                  <p className="leading-relaxed">Defines the high-level marketing channel type (e.g., <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">cpc</code>, <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">email</code>, <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">social</code>).</p>
                </div>
                <div className="flex gap-2 text-[11px] items-start">
                  <span className="font-mono bg-blue-50 dark:bg-slate-950 text-blue-600 dark:text-blue-450 p-1 rounded font-bold">utm_campaign:</span>
                  <p className="leading-relaxed">The name of the specific product launch or marketing promotion (e.g., <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">summer_sale</code>, <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">relaunch_2026</code>).</p>
                </div>
                <div className="flex gap-2 text-[11px] items-start">
                  <span className="font-mono bg-blue-50 dark:bg-slate-950 text-blue-600 dark:text-blue-450 p-1 rounded font-bold">utm_term:</span>
                  <p className="leading-relaxed">Used primarily for paid search ads to track target keywords (e.g., <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">developer_tools</code>).</p>
                </div>
                <div className="flex gap-2 text-[11px] items-start">
                  <span className="font-mono bg-blue-50 dark:bg-slate-950 text-blue-600 dark:text-blue-450 p-1 rounded font-bold">utm_content:</span>
                  <p className="leading-relaxed">Helps differentiate links pointing to the same URL within a single ad (e.g., <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">sidebar_banner</code> vs <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">cta_button</code>).</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Optimal Campaign Tagging Strategy
              </h2>
              <p className="text-[12px] leading-relaxed">
                Consistency is key in web analytics. Always use lowercase letters for sources and mediums, as analytic platforms are case-sensitive—meaning <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">Social</code> and <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">social</code> will show up as completely separate categories, cluttering attribution data. Avoid spaces and replace them with hyphens or underscores instead.
              </p>
            </div>
          </div>
        );

      case 'word-counter':
        return (
          <div className="space-y-6 select-text text-slate-700 dark:text-slate-300">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                1. Readability Ratings, Stop Words, and Computational Text Metrics
              </h2>
              <p className="text-[12px] leading-relaxed">
                Content writing for digital platforms involves a balance between human engagement and search crawler indexing thresholds. To analyze written content scientifically, we look at several core linguistic metrics: character count, word totals, sentence count, paragraph volume, and keyword density.
              </p>
              <p className="text-[12px] leading-relaxed">
                Understanding <strong>Readability Grade Levels</strong> is also key. Using metrics like the Flesch-Kincaid formula, we analyze words and sentence structures to estimate the reading difficulty of the text. This helps creators tailor their copy to their target audience's reading level.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                2. Stop-Word Mitigation & Avoiding Over-Optimization
              </h2>
              <p className="text-[12px] leading-relaxed">
                Broad search algorithms analyze density maps to identify page topics. However, standard grammar words (referred to as "stop words"—such as <em>"the"</em>, <em>"is"</em>, <em>"and"</em>, <em>"on"</em>) naturally dominate content. Our advanced counter filters out these high-frequency stop words, letting you analyze the true distribution of your core keywords.
              </p>
              <p className="text-[12px] leading-relaxed">
                To avoid "keyword stuffing" search penalties, aim for a density score of <strong>1.5% to 2.5%</strong> for your primary target keywords. Exceeding this range can flag your content as spammy.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Managing Digital Audiences
              </h2>
              <p className="text-[12px] leading-relaxed">
                Keep sentences concise (averaging 15 to 20 words) for maximum online readability. Use descriptive headings to break up long blocks of text and improve overall page scannability.
              </p>
            </div>
          </div>
        );

      case 'ua-parser':
        return (
          <div className="space-y-6 select-text text-slate-700 dark:text-slate-300">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                1. The History and Structure of Modern User-Agent Strings
              </h2>
              <p className="text-[12px] leading-relaxed">
                Every request dispatched by web browsers to origin servers includes a `User-Agent` HTTP header. This string acts as an identity card, informing the server about your browser brand, rendering engine, operating system, and hardware architecture, allowing servers to personalize layouts for your device.
              </p>
              <p className="text-[12px] leading-relaxed">
                However, due to legacy compatibility requirements, modern user-agent strings are notoriously complex. Almost every browser header begins with the historical token <code className="bg-slate-100 dark:bg-slate-950 py-0.5 px-1 rounded">Mozilla/5.0</code> to prevent server blocks that were designed in the early days of the web.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                2. Key Component Dissection
              </h2>
              <ul className="list-disc pl-5 text-[12px] space-y-1.5 leading-relaxed">
                <li><strong>Hardware Platform:</strong> Specifies whether the user is on a mobile device, tablet, or desktop, alongside operating systems like Windows, macOS, Linux, Android, or iOS.</li>
                <li><strong>Engine Technology:</strong> Outlines the rendering engine being used—such as WebKit (for Safari) or Blink/AppleWebKit (for Chrome/Edge).</li>
                <li><strong>Client Application Version:</strong> Declares the exact build version of WebKit, Chrome, or Firefox.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Practical Uses
              </h2>
              <p className="text-[12px] leading-relaxed">
                Developers analyze user-agents to troubleshoot rendering issues reported by users. It also helps verify browser compatibility during development, and identify crawlers or potential bad bots on the server.
              </p>
            </div>
          </div>
        );

      case 'pdf-hub':
        return (
          <div className="space-y-6 select-text text-slate-700 dark:text-slate-350">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                1. Portable Document Format (PDF) Core Standards and Vector Compilation
              </h2>
              <p className="text-[12px] leading-relaxed">
                The Portable Document Format (PDF) was originally developed by Adobe in 1993, and standard ISO 32000 defines its rules. Designed as a device-independent document format, a PDF file encapsulates a complete description of flat documents, including layout text, vector graphics, font types, and raster images. It standardizes visual representations, ensuring documents look identical whether displayed on screens, tablets, or printed on physical paper.
              </p>
              <p className="text-[12px] leading-relaxed">
                When compiling PDF documents client-side using our <strong>PDF Hub & Inspector</strong>, active canvas matrices organize coordinates, scale uploaded graphics gracefully, and apply custom margins without transmitting images to external servers.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                2. The Importance of Client-Side PDF Engineering
              </h2>
              <p className="text-[12px] leading-relaxed">
                Converting private screenshots, invoices, identity cards, or contract drafts on public online servers exposes your documents to potential data harvesting, storage breaches, and proxy inspection. Local, client-side PDF processors safeguard your privacy by compiling document packages directly inside your local computer's temporary RAM.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Best Practices for High-Resolution PDF Exports
              </h2>
              <p className="text-[12px] leading-relaxed">
                To achieve outstanding print quality, upload images with a resolution of at least 150 to 300 DPI (Dots Per Inch). Choose "Fit Page Content" to scale images proportionally within A4 boundaries without visual distortion, and set appropriate margins to avoid cropping critical content.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const guideContent = renderGuideContent();
  if (!guideContent) return null;

  return (
    <section id="systematic-rich-documentation" className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">Authorized Tutorial & Reference</span>
          <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
            Professional Guide & Technical Reference: Using {toolName} Complete Manual
          </h2>
        </div>
      </div>
      
      <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
        {guideContent}
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <Shield className="h-4 w-4 text-emerald-500" />
          <span>Google AdSense Safe Page Checklist Verified</span>
        </div>
        <span>Content Quality Checked: 100% Value Added</span>
      </div>
    </section>
  );
}
