// Return the session or redirect to login
async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    window.location.href = 'login.html'
    return null
  }
  return session
}

async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function logout() {
  supabase.auth.signOut().then(() => {
    window.location.href = 'index.html'
  })
}

// Redirect to gallery if already logged in (for login/register pages)
async function redirectIfLoggedIn() {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    window.location.href = 'gallery.html'
  }
}