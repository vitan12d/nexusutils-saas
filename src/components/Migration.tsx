import { cmsService } from '../lib/cmsService';
import { N8N_WORKFLOWS } from '../data/n8nWorkflows';

export async function migrateN8nData() {
  for (const workflow of N8N_WORKFLOWS) {
    await cmsService.addDocument('n8n', workflow);
  }
  console.log('Migration completed');
}
