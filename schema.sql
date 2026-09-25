-- ============================================================
-- TIRTA CENDANA AQUATIC — Database Schema (Neon PostgreSQL)
-- Jalankan seluruh file ini di Neon SQL Editor jika ingin mereset/memperbarui tabel
-- ============================================================

-- 1. TABEL PENGGUNA (ADMIN & PESERTA)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'peserta')),
  phone VARCHAR(30),
  level VARCHAR(50) DEFAULT 'Pemula',
  package VARCHAR(50) DEFAULT 'Unlimited',
  quota_total INTEGER DEFAULT 10,
  quota_used INTEGER DEFAULT 0,
  notes TEXT,
  photo TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABEL PROGRES & EVALUASI LATIHAN
CREATE TABLE IF NOT EXISTS progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  progress_date DATE DEFAULT CURRENT_DATE,
  skill VARCHAR(100) NOT NULL,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  duration INTEGER DEFAULT 45,
  coach VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABEL JADWAL SESI LATIHAN (OPSIONAL)
CREATE TABLE IF NOT EXISTS lessons (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  day_of_week VARCHAR(20),
  time_start TIME,
  time_end TIME,
  coach_name VARCHAR(100),
  location VARCHAR(150) DEFAULT 'Kolam Tirta Cendana',
  status VARCHAR(30) DEFAULT 'aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. INDEKS UNTUK PERFORMA QUERY
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_date ON progress(progress_date);
