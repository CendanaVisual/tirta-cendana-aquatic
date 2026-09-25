/**
 * TIRTA CENDANA AQUATIC — Core Application Logic
 * Themes, Session, Storage, Password Toggle, and Transitions
 */

const APP_KEYS = {
  THEME: "tc_theme",
  USERS: "tc_users",
  PROGRESS: "tc_progress",
  SESSION: "tc_session"
};

// ==========================================
// 1. THEME MANAGER (Light & Dark Theme)
// ==========================================
const ThemeManager = {
  init() {
    const savedTheme = localStorage.getItem(APP_KEYS.THEME) || "light";
    this.applyTheme(savedTheme);
    this.updateToggleButtons(savedTheme);
  },

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(APP_KEYS.THEME, theme);
  },

  toggle() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.applyTheme(newTheme);
    this.updateToggleButtons(newTheme);
    return newTheme;
  },

  updateToggleButtons(theme) {
    const isDark = theme === "dark";
    document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
      btn.innerHTML = isDark 
        ? `<span class="theme-icon">☀️</span> <span class="theme-text">Terang</span>` 
        : `<span class="theme-icon">🌙</span> <span class="theme-text">Gelap</span>`;
      btn.setAttribute("title", isDark ? "Ganti ke Tema Terang" : "Ganti ke Tema Gelap");
    });
  }
};

// ==========================================
// 2. DATA STORAGE HELPERS (No Demo Data)
// ==========================================
const DB = {
  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(APP_KEYS.USERS) || "[]");
    } catch (e) {
      return [];
    }
  },

  saveUsers(users) {
    localStorage.setItem(APP_KEYS.USERS, JSON.stringify(users));
  },

  getProgress() {
    try {
      return JSON.parse(localStorage.getItem(APP_KEYS.PROGRESS) || "[]");
    } catch (e) {
      return [];
    }
  },

  saveProgress(progressList) {
    localStorage.setItem(APP_KEYS.PROGRESS, JSON.stringify(progressList));
  },

  getSession() {
    try {
      return JSON.parse(localStorage.getItem(APP_KEYS.SESSION) || "null");
    } catch (e) {
      return null;
    }
  },

  setSession(session) {
    localStorage.setItem(APP_KEYS.SESSION, JSON.stringify(session));
  },

  clearSession() {
    localStorage.removeItem(APP_KEYS.SESSION);
  },

  hasAdmin() {
    return this.getUsers().some(u => u.role === "admin");
  }
};

// ==========================================
// 3. PASSWORD VISIBILITY TOGGLE HELPER
// ==========================================
const EyeIcons = {
  open: `<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  closed: `<svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
};

function setupPasswordToggle(inputSelector, buttonSelector) {
  const input = document.querySelector(inputSelector);
  const button = document.querySelector(buttonSelector);
  if (!input || !button) return;

  button.innerHTML = EyeIcons.closed;
  button.setAttribute("title", "Tampilkan kata sandi");

  button.addEventListener("click", (e) => {
    e.preventDefault();
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    button.innerHTML = isPassword ? EyeIcons.open : EyeIcons.closed;
    button.setAttribute("title", isPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
    input.focus();
  });
}

// ==========================================
// 4. UI NOTIFICATION TOAST
// ==========================================
function showMessage(targetId, text, type = "success", duration = 3500) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.className = `msg msg-${type}`;
  el.innerHTML = `<span>${type === 'success' ? '✓' : '⚠️'}</span> <span>${text}</span>`;
  el.style.display = "flex";
  
  if (window._msgTimer) clearTimeout(window._msgTimer);
  window._msgTimer = setTimeout(() => {
    el.style.display = "none";
    el.textContent = "";
  }, duration);
}

// Auto-run theme initialization
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
});
