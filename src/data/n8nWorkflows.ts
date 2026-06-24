export const N8N_WORKFLOWS = [
  {
    id: 'email-summary-line',
    name: 'Summarize emails with A.I. then send to messenger',
    category: 'Gmail_and_Email_Automation',
    description: 'Summarize emails with A.I. then send to Line messenger',
    instructions: '1. Connect your Gmail/IMAP. 2. Configure the A.I. model (OpenRouter recommended). 3. Set up the Line API token.'
  },
  {
    id: 'email-ai-approval',
    name: 'AI Email processing autoresponder with approval (Yes/No)',
    category: 'Gmail_and_Email_Automation',
    description: 'Automates drafting email replies with A.I. and approval.',
    instructions: '1. Configure IMAP. 2. Set up OpenAI credentials. 3. Configure Gmail for draft creation.'
  },
  {
    id: 'ai-email-assistant',
    name: 'Effortless Email Management with AI',
    category: 'Gmail_and_Email_Automation',
    description: 'Summarizes emails, drafts replies with RAG, and gets approval.',
    instructions: '1. Configure Gmail/IMAP. 2. Set up Qdrant vector store. 3. Configure OpenAI for drafts.'
  },
  {
    id: 'outlook-ai-assistant',
    name: 'Microsoft Outlook AI Email Assistant',
    category: 'Gmail_and_Email_Automation',
    description: 'Categorizes Outlook emails using AI.',
    instructions: '1. Configure Outlook. 2. Set up OpenAI. 3. Define categories in the workflow.'
  },
  {
    id: 'human-loop-email',
    name: 'Very simple Human in the loop system email',
    category: 'Gmail_and_Email_Automation',
    description: 'Human-in-the-loop email summarization and response.',
    instructions: '1. Configure IMAP. 2. Set up OpenAI. 3. Configure SMTP for replies.'
  }
];
