import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zogzvtrwqjsdffprxibw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZ3p2dHJ3cWpzZGZmcHJ4aWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0OTkyMDAsImV4cCI6MjA2NTA3NTIwMH0.aYGJyFqfCwEBLy7VeodqYJdq_7th_9GQ8mEbfNRCfyE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);