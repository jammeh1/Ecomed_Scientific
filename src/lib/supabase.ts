import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://cpwtnohhozbbaqqirzbl.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQyMmY2MmFjLTNiM2MtNDhiZi1hNjYxLWM5OTgzNzY0ZjNlYSJ9.eyJwcm9qZWN0SWQiOiJjcHd0bm9oaG96YmJhcXFpcnpibCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc4Njg5MTUzLCJleHAiOjIwOTQwNDkxNTMsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.dtM7FP0MLuIW72iY4M1s1jqSV2lVZFcXLLfj2TNhppQ';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };