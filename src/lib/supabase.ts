import { createClient } from '@supabase/auth-helpers-sveltekit';

export const supabaseClient = createClient(
	'https://dhtjismktxvaesghpgxc.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRodGppc21rdHh2YWVzZ2hwZ3hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5ODg4MjYsImV4cCI6MTk5MjU2NDgyNn0.8adHtHFc-pHBAOjnV4jjUd6z26FEEpfDWa-B2CR5Gyg'
);
