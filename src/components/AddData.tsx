import { useEffect } from 'react';
import { cmsService } from '../lib/cmsService';
import { N8N_WORKFLOWS } from '../data/n8nWorkflows';

export default function AddData() {
  useEffect(() => {
    async function addData() {
      for (const workflow of N8N_WORKFLOWS) {
        await cmsService.addDocument('n8n', workflow);
      }
      console.log('Workflows added');
    }
    addData();
  }, []);
  return null;
}
