// auth.js

// Return the session or redirect to login
async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    window.location.href = 'login.html'
    return null
  }
  return session
}

// Get the current user object
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Sign out, wipe cart and cart owner, then go to landing
function logout() {
  localStorage.removeItem('selectedMedia')
  localStorage.removeItem('cartOwnerId')
  supabase.auth.signOut().then(() => {
    window.location.href = 'index.html'
  })
}

// If already logged in, send them to dashboard (for login/register pages)
async function redirectIfLoggedIn() {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    window.location.href = 'dashboard.html'
  }
}

// Clear cart if the current user ID changed since last check (prevents cross‑account cart leakage)
async function ensureCartBelongsToCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    localStorage.removeItem('selectedMedia')
    localStorage.removeItem('cartOwnerId')
    return
  }
  const lastUser = localStorage.getItem('cartOwnerId')
  if (lastUser !== user.id) {
    localStorage.removeItem('selectedMedia')
    localStorage.setItem('cartOwnerId', user.id)
  }
}

// Redirect to subscribe page if no active subscription (admins are exempt)
async function requireSubscription() {
  const user = await getCurrentUser()
  if (!user) {
    window.location.href = 'login.html'
    return false
  }

  // Admins bypass subscription check
  const { data: isAdmin } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .single()
  if (isAdmin) return true

  // Check for an active subscription (expires_at in the future)
  const { data: sub, error } = await supabase
    .from('subscriptions')
    .select('expires_at')
    .eq('user_id', user.id)
    .single()

  if (error || !sub || new Date(sub.expires_at) < new Date()) {
    window.location.href = 'subscribe.html'
    return false
  }
  return true
}