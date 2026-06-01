export type PSEOCategory = 'guide' | 'checklist' | 'template' | 'example' | 'compare';

export interface BenefitItem {
  title: string;
  description: string;
}

export interface StepItem {
  stepNumber: number;
  title: string;
  detail: string;
  codeSnippet?: string;
}

export interface ExampleBlock {
  title: string;
  description: string;
  code?: string;
  language?: string;
  outputMock?: string;
}

export interface MistakeItem {
  title: string;
  description: string;
  incorrect: string;
  correct: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelationPointer {
  title: string;
  slug: string;
  type: PSEOCategory;
}

export interface PSEOItem {
  slug: string;
  category: PSEOCategory;
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  subtitle: string;
  overviewHeading: string;
  overviewSummary: string;
  overviewContent: string[]; // multi-paragraphs for length
  benefitsHeading: string;
  benefitsList: BenefitItem[];
  stepByStepHeading: string;
  stepByStepIntro: string;
  stepsList: StepItem[];
  exampleHeading: string;
  exampleIntro: string;
  examplesList: ExampleBlock[];
  mistakesHeading: string;
  mistakesIntro: string;
  mistakesList: MistakeItem[];
  faqHeading: string;
  faqsList: FAQItem[];
  relatedTools: {
    id: string;
    name: string;
    description: string;
    actionLabel: string;
  }[];
  ctaTitle: string;
  ctaText: string;
  targetKeywords: string[];
}
