
// supabase.js
const SUPABASE_URL = 'https://bxmxlbyxobtkyihiiyug.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bXhsYnl4b2J0a3lpaGlpeXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MTcxMTksImV4cCI6MjA5NDI5MzExOX0.YXV5PBWdPo43M-VwBwgwtjMQbyBRvXvz81p10Ku5Ays'

// Attach the client to the window object – no "const supabase" declaration
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)