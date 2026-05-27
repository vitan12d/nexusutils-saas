export type ToolCategory = 'pdf' | 'image' | 'text' | 'finance' | 'developer' | 'seo' | 'ai';

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  iconName: string;
  description: string;
  summary: string;
  seoGuide: string;
}

export const CATEGORIES = [
  { id: 'pdf' as ToolCategory, name: 'PDF Tools', icon: 'FileText', desc: 'Merge, compress, and convert PDF documents' },
  { id: 'image' as ToolCategory, name: 'Image Tools', icon: 'Image', desc: 'Optimize, resize, and convert images' },
  { id: 'text' as ToolCategory, name: 'Text Tools', icon: 'Type', desc: 'Analyze, process, and generate text content' },
  { id: 'finance' as ToolCategory, name: 'Finance Tools', icon: 'DollarSign', desc: 'Calculate taxes, generate invoices, convert currencies' },
  { id: 'developer' as ToolCategory, name: 'Developer Tools', icon: 'Code', desc: 'Validate, format, generate, and pick colors' },
  { id: 'seo' as ToolCategory, name: 'SEO Tools', icon: 'Search', desc: 'Optimize search metadata and web configurations' },
  { id: 'ai' as ToolCategory, name: 'AI Tools', icon: 'Sparkles', desc: 'Leverage state-of-the-art AI for content' },
];

export const TOOLS: Tool[] = [
  // PDF Tools (3)
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    category: 'pdf',
    iconName: 'Combine',
    description: 'Combine multiple PDF files into a single document in any custom order.',
    summary: 'Upload up to 10 PDF documents (max 50MB each), drag or rearrange their order, and download the combined PDF document with a single click.',
    seoGuide: `## Comprehensive Guide to Merging PDF Documents

In today's digital workflow, Adobe PDF (Portable Document Format) is the gold standard for secure, immutable documents. Often, you will find yourself with multiple scattered PDFs—such as invoices, receipts, project report chapters, or application forms—that need to be stitched into a single professional file.

### Why Merge PDFs?

1. **Better Organization**: Avoid emailing or storage of five individual files when a single compiled PDF is much cleaner.
2. **Seamless Presentation**: Presenting material to clients is far more professional when they can scroll through one single, structured document.
3. **Optimized Archiving**: Government compliance and institutional record-keeping are simpler with singular, well-organized dossiers.

### How this PDF Merging Tool Works

Our high-performance online tool uses the industry-standard \`pdf-lib\` library running directly inside your browser. This means and guarantees:
* **Zero Server Overhead**: The files never leave your device. Your data is 100% private and secure.
* **Instant Assembly**: Merging speeds are limited only by your computer’s local memory and processing power.

### Best Practices for File Merging

* **Consistent Sizing**: While our compiler supports varying page dimensions, your final document will look best if all source files share standard Letter or A4 scales.
* **Sequential Numbering**: Pre-sort your documents on your computer by name (e.g., "01_Cover.pdf", "02_Introduction.pdf") to make matching and arrangement in our interactive list lightning-fast.
* **Compressed Sources**: To prevent generating giant, multi-gigabyte outputs, compress high-resolution scanned PDFs before stitching them.

### Frequently Asked Questions (FAQs)

**Q: Are my files uploaded to your server?**
A: Absolutely not. Unlike other online converters, our Merge PDF tool operates entirely client-side. Your private documents are never sent over the web, making it secure and fully compliant with privacy standards such as GDPR and HIPAA.

**Q: Is there any size limit?**
A: We support files up to 50MB each, up to a maximum of 10 files. Browser memory constraints are the only limiting factor.

**Q: Does it preserve links, forms, and digital signatures?**
A: Basic interactive elements and hyperlinks are preserved. However, cryptographic digital signatures of individual documents will be invalidated and stripped. This is a security feature to prevent signatures from being misapplied to modified document groups.`
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    category: 'pdf',
    iconName: 'Shrink',
    description: 'Reduce PDF file size while maintaining optimal page and visual quality.',
    summary: 'Upload high-resolution PDF documents (max 100MB), choose from three flexible compression presets (low, medium, or high), and view estimated file size reductions prior to download.',
    seoGuide: `## The Ultimate Guide to PDF Compression and Optimization

Scanned files, comprehensive digital portfolios, and rich graphics frequently lead to astronomical PDF file sizes. These large files fail to send over mainstream email networks (which commonly restrict attachments to 20MB or 25MB) and cause significant delays when clients try to load them in-browser.

### Understanding PDF Compression Metrics

PDF optimization involves analyzing document components:
1. **DPI Reduction (Dots Per Inch)**: Modifying high-DPI scan images down to 72 DPI (web) or 150 DPI (standard reading).
2. **Color Space Consolidation**: Converting heavy CMYK graphics (for print) to lightweight sRGB variants.
3. **Font Subsetting**: Removing duplicate font characters embedded across multiple chapters.

### How to Select the Ideal Compression Level

* **High Compression (Low Quality)**: Best suited for pure text documents, drafts, or standard receipts where text legibility is the only priority and vector shapes can be simplified. Saves up to 80% on storage.
* **Medium Compression (Standard Quality)**: The recommended setting for normal office files, flyers, and slides. Strikes a perfect balance between text crispness and image clarity.
* **Low Compression (High Quality)**: Optimized for design portfolios, resumes containing fine visual elements, and documents with colorful charts. Shrinks file size cleanly without compromising fine details.

### How Our Browser-Dedicated Compressor Operates

Most standard online platforms upload your files to remote cloud containers, process them, and send them back. This uses massive bandwidth and exposes sensitive details. NexusUtils uses a smarter client-side processor which works on PDF graphics objects using advanced browser drawing contexts—compressing on the fly and ensuring absolute security.

### Troubleshooting Large Files

If a compressed PDF remains too large, check if it contains built-in video assets, complex CAD vectors, or duplicate embedded fonts. In such cases, breaking the document into several parts or converting vector grids to flat raster structures before processing is highly recommended.`
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    category: 'pdf',
    iconName: 'FileSymlink',
    description: 'Convert PDF documents into editable Word (.docx / .rtf) structure.',
    summary: 'Easily transcribe layout objects, paragraphs, and lists into editable documents for instant Microsoft Word compatibility.',
    seoGuide: `## Practical Guide: Converting PDFs into Editable Word Documents

A PDF is designed as a digital paper format—focused on rendering layout and fonts identically across all operating systems. Because of this, editing a PDF directly is a tedious task. Converting it to a Microsoft Word format (.docx or .doc) remains the optimal standard when you need to make fundamental text changes.

### The Conversion Challenge

Unlike HTML or Word files, PDFs do not naturally store structured paragraphs or tables. Instead, they store coordinate maps indicating where individual text strings should appear on a canvas. Our PDF-to-Word engine reconstructs these fragmented locations into a continuous stream:
* **Text Preservation**: High-fidelity OCR simulation maps overlapping lines into cohesive paragraphs.
* **Style Mapping**: Boldness, scale, and general line offsets are converted into relative heading levels.
* **Font Fallbacks**: Fonts unavailable on your target operating system are safely matched to universal standards (like Arial or Times New Roman).

### Steps to Achieve Perfect Editable Formats

1. **Use Text-Based PDFs**: Documents generated directly from Word, Google Docs, or LaTeX convert effortlessly.
2. **Clear Scans**: If you must process a manual scan, ensure the page alignment is perfectly vertical. Curved pages or faint text lines will degrade OCR readability.
3. **Remove Background Grids**: Intricate watermarks or textured page backings can occasionally be misinterpreted as letters. Strip or flatten them prior to conversion.

### Security and Local Conversions

When processing documents containing confidential records or proprietary company data, cloud-based tools present a severe security risk. Since NexusUtils operates directly on your local device, the files are rendered safely within your sandbox. Confidential contracts, bank statements, and legal briefs remain strictly on your machine.`
  },

  // Image Tools (3)
  {
    id: 'compress-image',
    name: 'Compress Image',
    category: 'image',
    iconName: 'Sparkle',
    description: 'Optimize image file sizes in JPG, PNG, and WebP formats.',
    summary: 'Drag and drop your images, use a real-time slider to trade off quality and file size, and view live feedback of the optimized dimensions.',
    seoGuide: `## Professional Image Compression: Optimizing for Speed & Quality

Web speed is heavily tethered to asset optimization. Over 60% of all internet byte-traffic is made of image resources. Non-optimized banners and raw photographs are primary causes of high bounce rates and poor core web vitals.

### Lossless vs. Lossy Image Compression

* **Lossy Compression (WebP, JPEG)**: Strips out chromatic variations that the human eye struggle to perceive. It delivers massive file size reductions (up to 95%) with almost imperceptible visual degradation.
* **Lossless Compression (PNG)**: Combines duplicate pixel ranges without discarding any file information. Ideal for screenshots, text overlays, and transparent UI assets, though final files remain larger.

### Finding the Quality Sweet Spot

For standard e-commerce galleries, blog illustrations, and landing pages, **75% to 85% JPEG/WebP quality** is the absolute sweet spot. Going below 60% begins showing compression artifacts (blocky, blurry visual grids around contrast points), while going above 90% is typically wasted storage as the visual improvement is invisible to mobile and standard monitor users.

### The Power of WebP Format

Converting legacy JPG and PNG archives into Google’s modern **WebP** standard instantly shaves off 25-35% of the file size at identical quality. Ensure your compression workflow outputs WebP to give your pages elite performance and maximize Google Lighthouse scores.`
  },
  {
    id: 'resize-image',
    name: 'Resize Image',
    category: 'image',
    iconName: 'Maximize2',
    description: 'Change the dimensions of your images with custom parameters and ratios.',
    summary: 'Scale width and height using custom inputs, maintain original aspect ratios automatically, and render high-quality resized images.',
    seoGuide: `## Custom Digital Image Resizing: Standards and Best Practices

Image sizing is about adapting your graphics to perfectly match their display destination. Uploading a high-resolution 4000x3000 photo to place inside a tiny 200x200 user avatar card is a severe web performance anti-pattern.

### Understanding Aspect Ratios and Resolutions

The aspect ratio refers to the proportional relationship between an image’s width and height. For example, standard widescreen displays utilize **16:9**, social postings are commonly **1:1** (square) or **4:5** (portrait), and high-resolution mobile cameras utilize **4:3**.

* **Maintain Aspect Ratio**: Active by default on our resizer, this ensures that modifying the width automatically calculates the proportionate height, avoiding stretched, squeezed, or distorted graphics.
* **Pixel Density**: Scaling an image *up* (upsampling) can introduce blurring and jagged pixel lines because the browser must interpolate and invent missing detail. For professional results, always scale down from larger source graphics.

### Standard Dimensions Cheat Sheet

* **Avatar/Profile**: 150px x 150px (Square)
* **Blog Cover Banner**: 1200px x 630px (Optimized for Facebook / Twitter preview shares)
* **E-Commerce Product Thumb**: 600px x 600px
* **Full Screen HD Background**: 1920px x 1080px`
  },
  {
    id: 'convert-image',
    name: 'Convert Image',
    category: 'image',
    iconName: 'RefreshCw',
    description: 'Convert between popular formats including JPEG, PNG, and WebP.',
    summary: 'Instantly convert photos to different standards while maintaining high accuracy and transparency indicators.',
    seoGuide: `## Formats Demystified: Which Image Standard is Best When?

The digital universe is occupied by various image formats, each custom-engineered for specific storage, clarity, and structural use cases. Choosing the incorrect format can lead to enormous files or pixelated interfaces.

### Standard formats summarized:

1. **JPEG (Joint Photographic Experts Group)**: Best for complex photographs with thousands of active color gradients. Does not support transparent backgrounds, but offers high lossy compression.
2. **PNG (Portable Network Graphics)**: Ideal for screenshots, website logos, graphics with sparse solid colors, and UI elements. Supports deep 8-bit or 24-bit alpha transparency.
3. **WebP (Modern Browser Standard)**: The ultimate crown of modern formats. Supports outstanding transparency, lossy photographic optimization, and lossless graphics, all while producing files 30% smaller than legacy variants.

### How Conversion Works Under the Hood

Our converter uses HTML canvas. When an image is loaded, its raw pixel buffer is written directly to the memory context. It is then encoded using browser engine APIs based on your desired standard (JPEG, PNG, or WebP) and quality sliders. This ensures that the conversion occurs instantly and locally on your computer with zero leak risks.`
  },

  // Text Tools (4)
  {
    id: 'word-counter',
    name: 'Word Counter',
    category: 'text',
    iconName: 'Hash',
    description: 'Analyze text statistics including word, character, and sentence count.',
    summary: 'Paste or type text to view real-time characters, words, sentences, reading time calculations, and writing complexity statistics.',
    seoGuide: `## Advanced Text Analytics and Word Counting Tool

Whether you are writing a guest blog post with a strict 1000-word limit, crafting Google Meta titles that must stay under 60 characters, or publishing essays, keeping a real-time monitor on your text statistics is essential.

### Why Precise Counters Matter

* **SEO Optimization**: To rank on Google, articles usually require structured, detailed content. Monitoring length helps gauge if you meet standard benchmark thresholds (such as 1500+ words).
* **Social Limits**: Twitter has a strict 280-character limit, LinkedIn posts prefer keeping titles short, and SMS standards utilize 160-character clusters.
* **Aesthetic Consistency**: Maintaining uniform text limits across website item cards makes grids look wonderfully balanced and professional.

### Calculating Modern Reading Speed

Our tool uses the standard international benchmark of **200 words-per-minute (WPM)** for normal reading speeds. This helps estimate standard session times for audiences, allowing you to add useful metadata like "5 mins read" onto your publication headers to elevate the overall reading experience.`
  },
  {
    id: 'char-counter',
    name: 'Character Counter',
    category: 'text',
    iconName: 'Baseline',
    description: 'Detailed character analysis with option to include or exclude spaces.',
    summary: 'Read precise character length metrics, spaces frequency, paragraph splits, and unique symbol distributions instantly.',
    seoGuide: `## Professional Character Analysis: Character-Level Optimization

When dealing with strict database limits, system API endpoints, meta description tag formatting, or physical SMS protocols, every character matters. A character counter that fails to correctly split spaces or handle hidden line brakes can break critical templates.

### Inside the Character Map

Our character analyzer breaks down input logs across multiple useful vectors:
* **Characters including Spaces**: The base storage cost of modern text.
* **Characters excluding Spaces**: The raw alphabetical and symbol volume, useful for academics evaluating essay density.
* **Unique Symbol Occurrences**: Highlights if your vocabulary is varied, helping developers spot redundant letter loops or excessive punctuation patterns.

### Developer & SEO Use Cases

* **Meta Properties**: A Google Title should remain below 60 characters, and a Meta Description must reside under 160 characters to avoid being truncated with a messy digital trailing ellipsis (...).
* **API Payloads**: Standard legacy systems often map strings to strict limited types like VARCHAR(255) or VARCHAR(100). Validating string footprint avoids database truncation crashes.`
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    category: 'text',
    iconName: 'ToggleLeft',
    description: 'Transform text across 10+ standard case and typography variants.',
    summary: 'Instantly convert your text into UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case, and more.',
    seoGuide: `## Standard Reference to Case Conversion in Programming and Content

Manually retyping paragraphs because you left Caps Lock on, or transforming code variables from camelCase back into clean user-facing titles, is a massive waste of precious developer and editor time.

### The Case Options Demystified:

* **Sentence Case**: Standard writing format, capitalizing only the very first letter of sentences and proper nouns.
* **Title Case**: Capitalizes study topics, headings, and essays according to key conventions (e.g., maximizing main verbs and nouns).
* **camelCase**: Standard nomenclature in JavaScript where the first letter is lowercase and subsequent connected words are capitalized.
* **snake_case**: Snake casing replaces spaces with underscores. Used in Python databases and variables.
* **kebab-case**: Kebab casing replaces spaces with dashes. Ideal for clean web URLs and Tailwind class modules.
* **PascalCase**: Similar to camelCase but starts with a capitalized letter. The global standard for React component files and C++ classes.`
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    category: 'text',
    iconName: 'AlignLeft',
    description: 'Generate high-quality layout and typography placeholder text.',
    summary: 'Select desired lengths, paragraph parameters, and sentence boundaries to output classic or modern placeholder streams.',
    seoGuide: `## History and Uses of the Classic Lorem Ipsum Placeholder Text

Lorem Ipsum is a classic dummy standard dating back to the 1500s. Its origins lie in Cicero's Latin philosophical treaties, scrambled to produce a balanced, natural distribution of alphabetical vowels and consonants.

### Why Use Placeholder Typography?

The ultimate objective of dummy text is to distract readers from the actual verbal meaning of words. If you fill a mock landing page with actual English sentences, stakeholders will focus on reading the copy rather than evaluating the layout, typography, proportions, contrast, and alignment of the interface.

### Customize Mock Content with Our Panel

Our modern generator allows targeting your precise layouts:
* **Word Sizing**: Best for small isolated cards or input indicators.
* **Sentences**: Optimized for testimonial reviews or sparse feature highlights.
* **Paragraphs**: Ideal for testing long-format blog layouts, text wrap features, and typographic rhythm across bento grids.`
  },

  // Finance Tools (3)
  {
    id: 'invoice-gen',
    name: 'Invoice Generator',
    category: 'finance',
    iconName: 'Receipt',
    description: 'Generate professional invoices with custom line items and automatic tax calculations.',
    summary: 'Add company details, list products or hourly services, specify discount rates and tax systems, and export as beautiful, ready-to-print PDFs.',
    seoGuide: `## Ultimate Guide to Professional Invoicing & Compliance

Clear, consistent invoicing is the path to ensuring your business gets paid on time. An incomplete or unorganized invoice creates friction, causes questions, and delays processing cycles within accounts receivable departments.

### Primary Anatomy of a Complaint Invoice

To make sure your client reads and accepts your billing quickly, always include:
1. **Clear Header**: The word "INVOICE" styled prominently at the top, along with a unique sequential Invoice Number.
2. **Identity Blocks**: Full legal corporate name, email address, physical layout address, andTax IDs of both you and your client.
3. **Date Stamps**: The issue date and precise payment term boundaries (e.g., "Net 30 days").
4. **Detailed Line Items**: Precise, non-ambiguous breakdowns of hours or products provided, including standard individual unit costs.
5. **Clear Totals**: Subtotal, tax breakdown percentages, applied coupon discounts, and overall final balance due.

### Exporting and Sending Best Practices

* **Always send PDF**: Never send invoices in editable formats like Word or Excel as details can accidentally be altered or corrupted during reading.
* **Keep backups**: Ensure you download and archive invoice outputs in a secure folder for yearly tax reporting.
* **Automated numbering**: Follow a clear numbering sequence like "INV-2026-001" to keep bookkeeping elegant.`
  },
  {
    id: 'tax-calc',
    name: 'Tax Calculator',
    category: 'finance',
    iconName: 'Calculator',
    description: 'Calculate income tax brackets, deductions, and final net take-home salary.',
    summary: 'Input gross earnings, declare active deduction amounts, choose regional bracket structures, and output detailed marginal tax breakdowns.',
    seoGuide: `## Demystifying Income Tax: Marginal Brackets & Deductions

Understanding how income tax works is paramount for personal budgeting, setting contractor fees, and planning investments. Many people mistakenly believe that entering a higher tax bracket reduces overall take-home earnings, which is incorrect.

### How Marginal Tax Brackets Work

Most progressive tax systems operate using hierarchical marginal tiers:
* **The Progressive Shield**: You do not pay the highest percentage on your entire earnings. Instead, your income is partitioned into portions.
* **The Lower Tiers**: For instance, if the first bracket is 10% on $10k, and 15% on any earnings above that, you will only pay 10% on the first $10,000 even if you make $50,000.

### Deductions vs. Credits

* **Tax Deductions**: Reduce the total amount of income that can be taxed. If you make $100k and claim a $15k deduction, your tax liability is calculated solely on $85k.
* **Tax Credits**: Direct dollar-for-dollar subtractions from your calculated tax due. A $1,000 credit reduces your final tax bill by exactly $1,000.`
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    category: 'finance',
    iconName: 'CircleDollarSign',
    description: 'Convert amounts across world currencies with global standard coefficients.',
    summary: 'Compare currency conversion rates (USD, EUR, GBP, JPY, and more), swap fields instantly, and calculate accurate totals.',
    seoGuide: `## Understanding Global Currency Exchange & Market Trends

In our interconnected worldwide economy, currency exchange rates are a cornerstone of vacation planning, e-commerce pricing, and international freelancing.

### How Exchange Rates Are Determined

Exchange values fluctuate constantly based on global market indicators:
* **Interest Rates**: Central bank regulations heavily anchor local currency strength as higher yields draw global investors.
* **Political Stability**: Solid, growing infrastructure boosts confidence and creates higher demand for the associated currency.
* **Trade Balances**: Countries exporting more goods than they import experience a natural appreciation of their currency's market value.

### Avoiding Hidden Exchange Fees

When purchasing items in a foreign currency or exchanging hard notes at an airport, watch out for "zero commission" marketing lines. Most providers hide their fees by offering an unfavorable exchange rate that deviates from the true mid-market rate. Our tool provides a clean reference utility to help you verify rates before making financial commitments.`
  },

  // Developer Tools (4)
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    category: 'developer',
    iconName: 'Braces',
    description: 'Format, validate, beautify, and minify complex JSON inputs.',
    summary: 'Paste raw JSON data to instantly structure it with custom nested indentations, validate syntax, catch syntax errors, or compress it to a single line.',
    seoGuide: `## Developer Reference: JSON Syntax, Standards, and Troubleshooting

JSON (JavaScript Object Notation) is the dominant data interchange format on the modern web, having mostly replaced XML due to its simplicity, light syntax weight, and universal compatibility of parsing models across programming languages.

### Traditional Rules of Valid JSON

A simple mistake can easily break an API pipeline. To ensure your JSON remains fully compliant:
1. **Double Quotes Mandatory**: All keys and string values must be enclosed in double quotes (\`"\`). Single quotes (\`'\`) are strictly invalid.
2. **No Trailing Commas**: The final item inside an array or key-value object must not contain a trailing comma.
3. **Escaped Sequences**: Backslashes, tabs, and nested quotes within property strings must be correctly escaped.

### Beautify vs. Minify

* **Beautifying (Beautify)**: Enhances human readability by adding line breaks, nesting indentation offsets (typically 2 or 4 spaces), and organizing brackets consistently.
* **Minifying (Minify)**: Stripped of all optional whitespace, tabs, and carriage returns, minified JSON shrinks the footprint of your payload, accelerating data transfers across network protocols.`
  },
  {
    id: 'base64-tool',
    name: 'Base64 Encoder/Decoder',
    category: 'developer',
    iconName: 'Binary',
    description: 'Encode standard text strings into Base64 or decode Base64 back into text.',
    summary: 'Convert unicode text inputs into secure Base64 segments, or translate encoded inputs back into readable characters safely.',
    seoGuide: `## Modern Guide to Base64 Encoding: Formats and Web Protocols

Base64 is a binary-to-text encoding schema that translates raw bytes into a safe character set containing 64 symbols: uppercase and lowercase Roman letters (\`A-Z\`, \`a-z\`), Arabic numbers (\`0-9\`), plus signs (\`+\`), and forward slashes (\`/\`).

### Why is Base64 Needed?

When transmitting files or textual binary data across platforms designed exclusively for traditional ASCII text, raw bytes can often be misinterpreted as control characters. Converting files to Base64 guarantees that the content remains unchanged and completely uncorrupted.

### Typical Use Cases in Development

* **Data URIs**: Embedding miniature icons or font components directly inside CSS stylesheets using \`data:image/png;base64,...[\` to skip additional network connection headers.
* **Basic Auth**: Appending encoded user credentials inside the standard \`Authorization: Basic <base64>\` network API headers.
* **Safe Transmissions**: Sending complex structured text safely through query parameters without running into URL character encoding issues.`
  },
  {
    id: 'password-gen',
    name: 'Password Generator',
    category: 'developer',
    iconName: 'Key',
    description: 'Generate high-entropy, secure, customizable random passwords.',
    summary: 'Adjust password length, toggle uppercase, lowercase, numbers, and special characters, and instantly generate passwords with strength ratings.',
    seoGuide: `## Bulletproof Security: Designing Passwords Resilient to Attacks

A secure digital perimeter begins with high-entropy credentials. Cybercriminals use high-powered processing arrays to execute brute-force and dictionary attacks, meaning standard dictionary phrases can be cracked in seconds.

### The Mathematics of Password Entropy

The strength of a password is measured in bits of entropy, which depend on:
1. **Alphabet Size (L)**: The total variety of symbols chosen (e.g., lowercase only yields 26 symbols, while incorporating capital letters, digits, and special characters expands the set to 94).
2. **Length (N)**: The absolute number of characters chosen in the password sequence.

An 8-character password, regardless of the unique symbols used, is trivially easy to crack. In contrast, expanding the character sequence to **14 or more characters** with numbers and special symbols elevates the complexity parameters beyond billions of combinations.

### Managing and Safeguarding Passwords

* **Never Reuse**: Always use a unique password for every single account to ensure a compromise at one service doesn't jeopardize other platforms.
* **Leverage Password Managers**: Store your complex random passwords securely inside a trusted local or cloud-encrypted repository (like Bitwarden or 1Password).`
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    category: 'developer',
    iconName: 'Pipette',
    description: 'Explore, select, and convert colors between HEX, RGB, and HSL formats.',
    summary: 'Utilize an interactive visual picker, view variations, check contrast ratios, and copy output codes in HEX, RGB, and HSL formats.',
    seoGuide: `## Comprehensive Color Theory for Designers and Web Developers

Colors form the emotional anchor of a user interface. Selecting cohesive palette schemes dictates whether your product feels professional, premium, exciting, or clean.

### Explaining Digital Color Formats

Each digital color standard defines a coordinate layout system:
* **HEX (Hexadecimal)**: A six-character base-16 code (e.g., \`#2563EB\`) directly representing Red, Green, and Blue levels. The ultimate standard for web and UI styling.
* **RGB (Red, Green, Blue)**: Numerical representations from 0 to 255 (e.g., \`rgb(37, 99, 235)\`), perfect for adjusting color thresholds in code.
* **HSL (Hue, Saturation, Lightness)**: Defines colors using an intuitive cylindrical coordinate system. Hue is the color spectrum angle (0-360), saturation controls color density, and lightness maps bright-to-dark. HSL makes adjusting contrast and harmony very straightforward.

### Contrast Accessibility Standards (WCAG)

To ensure your layout remains fully accessible and highly legible for people with visual differences, maintain a clear contrast ratio (at least **4.5:1** for standard text, of **3:1** for bold, large heading text) as defined by WCAG AA guidelines.`
  },

  // SEO Tools (3)
  {
    id: 'meta-generator',
    name: 'Meta Tag Generator',
    category: 'seo',
    iconName: 'Tags',
    description: 'Generate search-optimized HTML meta tags for Google and social networks.',
    summary: 'Fill in page titles, descriptions, and keywords, configure Open Graph (Facebook) and Twitter Card tags, and copy clean, ready-to-use HTML code.',
    seoGuide: `## Master Class in SEO: Structuring Perfect Web Meta Tags

Meta tags are invisible descriptors that reside within the \`<head>\` segment of an HTML document. They do not render on the screen, but they are crucial for search crawlers like Googlebot to index your site accurately.

### The Pillars of On-Page SEO Meta Tags

1. **Title Tag**: The primary hyperlink searchers click. It should contain target keywords, run between **50 to 60 characters**, and describe the page topic accurately.
2. **Meta Description**: A summary highlighting page value. Keep it under **155-160 characters** to prevent search engines from truncating it in search results.
3. **Open Graph Tags (OG)**: Standard tags (e.g., \`og:title\`, \`og:image\`) that define how your page renders when shared on Facebook, WhatsApp, or LinkedIn.
4. **Twitter Cards**: Custom Twitter metadata ensuring social previews include clean vertical cards and media columns.

### Elevating the Click-Through-Rate (CTR)

The copy you write in your meta descriptions is practically an advertisement for your page. Craft compelling call-to-action indicators (such as "Learn more," "Build today," or "Download instantly") to entice searchers to select your site over other search results.`
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density Checker',
    category: 'seo',
    iconName: 'BarChart3',
    description: 'Analyze keyword frequency and target density to prevent keyword stuffing.',
    summary: 'Paste text or blog articles to instantly get a structured breakdown of word frequencies, percentages, and search compliance flags.',
    seoGuide: `## Optimizing Content: Avoid Keyword Stuffing and Keep Density Balanced

Keyword density measures the relative frequency of a specific word or phrase within a written article compared to its total word count. Properly balancing density is essential to rank well on search engines.

### The Risks of Keyword Stuffing

Historically, webmasters could rank highly simply by copying and pasting a keyword dozens of times into hidden footer layers. Today, search algorithms are incredibly smart and prioritize natural, high-value language over repetitive keyword patterns:
* **Over-optimization Penalty**: Exceeding safe keyword frequency thresholds can signal search crawlers that your article is low-value search spam.
* **Legibility Loss**: Writing solely for robots ruins natural readability, alienates human visitors, and spikes your bounce rates.

### Deciding the Safe Target Density

Most experienced SEO specialists target a keyword density of **1.0% to 2.5%** for primary focus keywords. Always remember to write naturally first, then use our checker as a post-writing tool to verify that you haven't accidentally overused certain phrases.`
  },
  {
    id: 'robots-generator',
    name: 'Robots.txt Generator',
    category: 'seo',
    iconName: 'Bot',
    description: 'Generate standard robots.txt instructions to manage search crawl paths.',
    summary: 'Declare allowed and disallowed paths for search crawlers, reference your sitemap, and export perfect robots.txt configurations.',
    seoGuide: `## Web Archival Protocols: Designing Robots.txt for Crawler Coordination

A \`robots.txt\` file is a fundamental file that websites place in their root directory to tell web crawlers which paths they are allowed to scan. It is part of the Robots Exclusion Protocol (REP).

### The Syntax of Robots.txt

The file uses straightforward, simple declarations:
* **User-agent**: Declares which crawler a rule applies to (e.g., \`*\` targets all spider engines, \`Googlebot\` targets Google’s indexer).
* **Disallow**: Specifies directories or secure files that crawler robots are forbidden from scanning (such as admin panels, shopping carts, or temporary API files).
* **Allow**: Overrides a disallow rule to let crawlers scan specific files within a restricted folder.
* **Sitemap**: Links directly to the XML sitemap index file, making it easy for search bots to locate your entire URL directory.

### Important Robots.txt Caveats

Robots.txt rules are guidelines, and not all bots are friendly. Malicious scrapers will ignore disallow directives, so never rely on Robots.txt to hide sensitive or confidential data; always lock private content behind secure logins instead.`
  },

  // AI Tools (1)
  {
    id: 'ai-assistant',
    name: 'AI Writing Assistant',
    category: 'ai',
    iconName: 'Sparkles',
    description: 'Optimize, rewrite, summarize, or expand text instantly using Gemini AI.',
    summary: 'Paste your content, choose an action (Summarize, Rewrite, Expand, or Improve), set your desired tone, and let Gemini generate elite-quality copy.',
    seoGuide: `## Transforming Workflows: Using Generative AI to Craft High-Value Content

Generative AI is changing the landscape of online writing, enabling content creators, marketers, social media experts, and developers to draft high-quality content at scale.

### Harnessing Key AI Editing Paths

* **Summarization**: Condense long documents, client emails, or research reports into direct, clear takeaways, saving thousands of reading hours.
* **Tone Adaptation**: Translate technical jargon into friendly copy, or rewrite messages into an academic style with a single click.
* **Text Expansion**: Outline raw ideas and let the writing model expand them into complete, detailed explanations.
* **Style Improvement**: Correct spelling, fix awkward sentence structures, and elevate vocabulary to polish your draft.

### Merits of Server-Side Integration

NexusUtils uses server-side API proxy routing powered by the \`@google/genai\` SDK and **Gemini 3.5 Flash** models. This architecture keeps your credentials perfectly safe, guarantees fast response times, and ensures your experience is smooth and uninterrupted.

### Best Practices for Getting the Best AI Outputs

Provide clear, detailed context. The more precise your text input is, the more accurate and polished the model's generated response will be. Strip out unstructured notes and focus on your core messages.`
  }
];
