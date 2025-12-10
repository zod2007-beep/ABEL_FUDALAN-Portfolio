// Supabase configuration
const supabaseUrl = 'https://ftrlgqmizqnntzpfsqnq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0cmxncW1penFubnR6cGZzcW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyODk2OTEsImV4cCI6MjA3OTg2NTY5MX0.oWW_Xbs2oUL1sCcIOhEmHo_di29Vrg_oFlnPWODap00';

// Initialize Supabase client (will be set after script loads)
let supabase = null;

// Wait for Supabase to be available
function initSupabase() {
    if (window.supabase) {
        supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        return true;
    }
    return false;
}

async function handleSignUp(email, password) {
    if (!supabase && !initSupabase()) {
        return { success: false, error: 'Supabase not initialized' };
    }
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/index-plain.html`
            }
        });
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function handleSignIn(email, password) {
    if (!supabase && !initSupabase()) {
        return { success: false, error: 'Supabase not initialized' };
    }
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function handleSignOut() {
    if (!supabase && !initSupabase()) {
        return { success: false, error: 'Supabase not initialized' };
    }
    
    try {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function checkAuth() {
    if (!supabase && !initSupabase()) {
        return null;
    }
    
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
            return null;
        }
        
        return user;
    } catch (error) {
        return null;
    }
}

// Make functions available globally
window.handleSignUp = handleSignUp;
window.handleSignIn = handleSignIn;
window.handleSignOut = handleSignOut;
window.checkAuth = checkAuth;
