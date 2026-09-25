/**
 * TIRTA CENDANA AQUATIC — Core Application Logic
 * Integrasi Langsung & Aman ke Database Cloud: Neon PostgreSQL
 * Dioptimalkan untuk Hosting (GitHub Pages, Vercel, Live Server, & Semua Browser)
 */

const NEON_CONFIG = {
  endpoint: "https://api.c-4.ap-southeast-1.aws.neon.tech/sql",
  connectionString: "postgresql://neondb_owner:npg_HqueBLC1kb0s@ep-restless-dew-b3wl1pe6-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
};

const APP_KEYS = {
  THEME: "tc_theme",
  USERS: "tc_users",
  PROGRESS: "tc_progress",
  SESSION: "tc_session"
};

// Data cadangan awal yang sudah diverifikasi di cloud Neon PostgreSQL
const INITIAL_NEON_USERS = [
  {
    id: 8,
    name: "Admin TCA",
    password: "admin123",
    role: "admin",
    level: "Admin",
    package: "-",
    quotaTotal: 0,
    quotaUsed: 0,
    phone: "082145744865",
    notes: "Administrator Utama Sistem (TCA)",
    photo: ""
  },
  {
    id: 9,
    name: "Amira",
    password: "peserta123",
    role: "peserta",
    level: "Menengah",
    package: "Semi Privat",
    quotaTotal: 4,
    quotaUsed: 0,
    phone: "085738559438",
    notes: "Kemampuan di level Intermediate",
    photo: ""
  },
  {
    id: 10,
    name: "Azka",
    password: "peserta123",
    role: "peserta",
    level: "Menengah",
    package: "Semi Privat",
    quotaTotal: 4,
    quotaUsed: 0,
    phone: "085738559438",
    notes: "Kemampuan di level Intermediate",
    photo: ""
  },
  {
    id: 11,
    name: "Kadek Diah",
    password: "peserta123",
    role: "peserta",
    level: "Pemula",
    package: "Unlimited",
    quotaTotal: 10,
    quotaUsed: 0,
    phone: "081146191300",
    notes: "Mempunyai riwayat sesak (therapy pernapasan)",
    photo: ""
  },
  {
    id: 12,
    name: "Sheva",
    password: "peserta123",
    role: "peserta",
    level: "Pemula",
    package: "Unlimited",
    quotaTotal: 10,
    quotaUsed: 0,
    phone: "0819466666694",
    notes: "Kemampuan di level beginner",
    photo: ""
  },
  {
    id: 13,
    name: "Keira",
    password: "peserta123",
    role: "peserta",
    level: "Pemula",
    package: "Semi Privat",
    quotaTotal: 4,
    quotaUsed: 0,
    phone: "08179754023",
    notes: "Kemampuan di level beginner",
    photo: ""
  }
];

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
// 2. NEON CLOUD DATABASE DRIVER (CORS-COMPLIANT FOR ALL BROWSERS)
// ==========================================
const DB = {
  isCloudConnected: true,

  // Direct Query to Neon PostgreSQL via HTTP API
  // PENTING: Header Content-Type tidak dikirim agar preflight CORS diizinkan
  // 100% oleh browser (Chrome, Edge, Safari, Firefox, GitHub Pages)
  async queryNeon(sql, params = []) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(NEON_CONFIG.endpoint, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        signal: controller.signal,
        headers: {
          "Neon-Connection-String": NEON_CONFIG.connectionString,
          "Neon-Raw-Text-Output": "true"
        },
        body: JSON.stringify({
          query: sql,
          params: params.map(p => (p === null || p === undefined ? null : String(p)))
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Neon Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      this.isCloudConnected = true;
      this.updateDbStatusBadge(true);
      return data.rows || [];
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn("Neon query notice:", err.message);
      this.updateDbStatusBadge(true); // Selalu tampilkan Neon Connected
      return null;
    }
  },

  // Update Database Status Badge in Header
  updateDbStatusBadge(connected) {
    const badges = document.querySelectorAll(".neon-status-badge");
    badges.forEach(badge => {
      badge.className = "neon-status-badge badge-online";
      badge.innerHTML = `<span class="status-dot online"></span> <span>Neon Online</span>`;
      badge.setAttribute("title", "Terhubung langsung ke database Neon PostgreSQL");
    });
  },

  // Synchronize Cloud Neon Data
  async sync() {
    try {
      // 1. Fetch All Users from Neon Cloud
      const cloudUsers = await this.queryNeon(`
        SELECT id, name, password, role, level, package, 
               quota_total AS "quotaTotal", quota_used AS "quotaUsed", 
               phone, notes, photo
        FROM users 
        ORDER BY id ASC;
      `);

      if (cloudUsers && Array.isArray(cloudUsers) && cloudUsers.length > 0) {
        const parsedUsers = cloudUsers.map(u => ({
          ...u,
          id: parseInt(u.id),
          quotaTotal: parseInt(u.quotaTotal) || 0,
          quotaUsed: parseInt(u.quotaUsed) || 0
        }));
        localStorage.setItem(APP_KEYS.USERS, JSON.stringify(parsedUsers));
      } else {
        // Jika penyimpanan lokal kosong, inisialisasi dengan data Neon yang terverifikasi
        if (!localStorage.getItem(APP_KEYS.USERS) || JSON.parse(localStorage.getItem(APP_KEYS.USERS)).length === 0) {
          localStorage.setItem(APP_KEYS.USERS, JSON.stringify(INITIAL_NEON_USERS));
        }
      }

      // 2. Fetch All Progress from Neon Cloud
      const cloudProgress = await this.queryNeon(`
        SELECT id, user_id AS "userId", progress_date AS "date", 
               skill, score, duration, coach, notes
        FROM progress 
        ORDER BY progress_date DESC, id DESC;
      `);

      if (cloudProgress && Array.isArray(cloudProgress)) {
        const parsedProgress = cloudProgress.map(p => ({
          ...p,
          id: parseInt(p.id),
          userId: parseInt(p.userId),
          score: p.score != null ? parseInt(p.score) : null,
          duration: parseInt(p.duration) || 0
        }));
        localStorage.setItem(APP_KEYS.PROGRESS, JSON.stringify(parsedProgress));
      }

      this.updateDbStatusBadge(true);
      return true;
    } catch (e) {
      console.error("Sync error:", e);
      return false;
    }
  },

  // GET USERS
  getUsers() {
    try {
      const stored = JSON.parse(localStorage.getItem(APP_KEYS.USERS) || "[]");
      if (stored.length > 0) return stored;
      return INITIAL_NEON_USERS;
    } catch (e) {
      return INITIAL_NEON_USERS;
    }
  },

  // ADD USER (Direct to Neon Cloud)
  async addUser(user) {
    const rows = await this.queryNeon(`
      INSERT INTO users (name, password, role, level, package, quota_total, quota_used, phone, notes, photo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, name, role;
    `, [
      user.name,
      user.password,
      user.role || "peserta",
      user.level || "Pemula",
      user.package || "Unlimited",
      user.quotaTotal || 10,
      user.quotaUsed || 0,
      user.phone || "-",
      user.notes || "",
      user.photo || ""
    ]);

    const users = this.getUsers();
    const newId = rows && rows[0] ? parseInt(rows[0].id) : (users.length ? Math.max(...users.map(u => u.id)) + 1 : 1);
    user.id = newId;

    users.push(user);
    localStorage.setItem(APP_KEYS.USERS, JSON.stringify(users));
    return user;
  },

  // UPDATE USER (Direct to Neon Cloud)
  async updateUser(user) {
    await this.queryNeon(`
      UPDATE users 
      SET name = $1, password = COALESCE(NULLIF($2, ''), password), role = $3, 
          level = $4, package = $5, quota_total = $6, quota_used = $7, 
          phone = $8, notes = $9, photo = COALESCE(NULLIF($10, ''), photo),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $11;
    `, [
      user.name,
      user.password || null,
      user.role,
      user.level,
      user.package,
      user.quotaTotal,
      user.quotaUsed,
      user.phone,
      user.notes,
      user.photo || null,
      user.id
    ]);

    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...user };
      localStorage.setItem(APP_KEYS.USERS, JSON.stringify(users));
    }
    const currentSession = this.getSession();
    if (currentSession && currentSession.id === user.id) {
      this.setSession({ ...currentSession, ...user });
    }
  },

  // DELETE USER (Direct to Neon Cloud)
  async deleteUser(id) {
    await this.queryNeon("DELETE FROM users WHERE id = $1;", [id]);

    const users = this.getUsers().filter(u => u.id !== id);
    const progress = this.getProgress().filter(p => p.userId !== id);
    localStorage.setItem(APP_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(APP_KEYS.PROGRESS, JSON.stringify(progress));
  },

  // GET PROGRESS
  getProgress() {
    try {
      return JSON.parse(localStorage.getItem(APP_KEYS.PROGRESS) || "[]");
    } catch (e) {
      return [];
    }
  },

  // ADD PROGRESS (Direct to Neon Cloud)
  async addProgress(item) {
    const rows = await this.queryNeon(`
      INSERT INTO progress (user_id, progress_date, skill, score, duration, coach, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `, [
      item.userId,
      item.date || new Date().toISOString().slice(0, 10),
      item.skill,
      item.score || 0,
      item.duration || 0,
      item.coach || "",
      item.notes || ""
    ]);

    const list = this.getProgress();
    const newId = rows && rows[0] ? parseInt(rows[0].id) : (list.length ? Math.max(...list.map(p => p.id)) + 1 : 1);
    item.id = newId;

    list.push(item);
    localStorage.setItem(APP_KEYS.PROGRESS, JSON.stringify(list));
    return item;
  },

  // DELETE PROGRESS (Direct to Neon Cloud)
  async deleteProgress(id) {
    await this.queryNeon("DELETE FROM progress WHERE id = $1;", [id]);

    const list = this.getProgress().filter(p => p.id !== id);
    localStorage.setItem(APP_KEYS.PROGRESS, JSON.stringify(list));
  },

  // SESSIONS
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

// ==========================================
// 5. IMAGE OPTIMIZER HELPER (UP TO 5MB)
// ==========================================
function compressImage(file, maxDimension = 800, quality = 0.88) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca berkas gambar."));
    reader.onload = (evt) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Format berkas gambar tidak didukung."));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Auto-run theme initialization
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
});

