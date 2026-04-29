import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !key) throw new Error('Missing Supabase environment variables');

export const supabase = createClient(url, key);

export interface Brief {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  created_at: string;
}
