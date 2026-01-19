// Supabase Auth Configuration
const SUPABASE_URL = 'https://nzutywxvzcrjopvyayml.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dXR5d3h2emNyam9wdnlheW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MzIzMTEsImV4cCI6MjA4NDIwODMxMX0.C4UdwnQEebRwUrdbiNeQN2Wl4nQFeCLVAmzhDI8LKWI';

// Initialize Supabase client (singleton pattern)
if (!window._supabaseClient) {
    window._supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
const supabaseClient = window._supabaseClient;

// Auth functions
async function signUp(email, password) {
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/course.html`
        }
    });
    if (error) throw error;
    return data;
}

async function signIn(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;
    return data;
}

async function signOut() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    window.location.href = '/';
}

async function getCurrentUser() {
    const { data: { user }, error } = await supabaseClient.auth.getUser();
    if (error) {
        console.error('Error getting user:', error);
        return null;
    }
    return user;
}

async function getSession() {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error) {
        console.error('Error getting session:', error);
        return null;
    }
    return session;
}

// Protection function - call on protected pages
async function requireAuth() {
    const session = await getSession();
    if (!session) {
        window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
        return false;
    }
    return true;
}

// Check if user is logged in (for nav display)
async function isLoggedIn() {
    const session = await getSession();
    return !!session;
}

// Update nav to show logout button if logged in
async function updateNavForAuth() {
    const loggedIn = await isLoggedIn();
    const authNavItems = document.querySelectorAll('.auth-nav-item');
    const loginNavItems = document.querySelectorAll('.login-nav-item');
    
    authNavItems.forEach(item => {
        item.style.display = loggedIn ? 'block' : 'none';
    });
    
    loginNavItems.forEach(item => {
        item.style.display = loggedIn ? 'none' : 'block';
    });
}


// Password reset
async function resetPassword(email) {
    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password.html`
    });
    if (error) throw error;
    return data;
}

// Update password (for logged-in users or after reset)
async function updatePassword(newPassword) {
    const { data, error } = await supabaseClient.auth.updateUser({
        password: newPassword
    });
    if (error) throw error;
    return data;
}
