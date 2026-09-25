# 🌊 Tirta Cendana Aquatic — Portal Web Les Renang Premium Bali

Aplikasi web manajemen les renang eksklusif **Tirta Cendana Aquatic**, terhubung langsung secara real-time ke cloud database **Neon PostgreSQL**, dirancang dengan visual mewah (*White, Gold & Blue*), sistem tema ganda (Terang & Gelap), manajemen kuota dan evaluasi progres renang real-time, serta transisi modern.

![Tirta Cendana Aquatic](assets/logo.png)

---

## ✨ Fitur-Fitur Terbaru & Integrasi Database Cloud

1. **Terhubung Langsung ke Database Cloud (Neon PostgreSQL)**
   - Menggunakan connection string Neon PostgreSQL secara aman via HTTP SQL Serverless API.
   - Setiap penambahan peserta, pembaruan kuota, dan catatan evaluasi progres latihan langsung tersimpan dan dialirkan (*streamed*) ke database Neon secara real-time.
   - Dilengkapi *status indicator badge* (`🟢 Neon Database Terkoneksi`) di setiap portal.
   - Memiliki *offline cache fallback* (`localStorage`) sehingga aplikasi tetap responsif meskipun jaringan internet terputus sesaat.

2. **Skema Basis Data Terverifikasi (`schema.sql`)**
   - Struktur tabel PostgreSQL yang bersih, lengkap dengan *primary keys*, *foreign keys*, indeks, dan batasan nilai (*constraints*):
     - `users`: Menyimpan kredensial akun, peran (admin/peserta), tingkat level, paket, total & sisa kuota, serta kontak.
     - `progress`: Menyimpan evaluasi capaian renang, skor nilai (0-100), durasi latihan, nama pelatih, dan catatan.
     - `lessons`: Tabel opsional untuk penjadwalan sesi.

3. **Penyempurnaan Tipografi & Gradasi Latar Belakang**
   - Menggunakan perpaduan tipografi berkelas (*Playfair Display* & *Plus Jakarta Sans*) dengan hierarki yang jelas, tajam, dan mudah dibaca di seluruh portal.
   - Gradasi warna keseluruhan diselaraskan dengan palet **Putih, Emas, dan Biru Laut** (*White, Gold, and Aquatic Blue*), memancarkan aura eksklusif resort Bali.

4. **Logo Resmi Brand Tirta Cendana Aquatic**
   - Menggantikan semua representasi logo/ikon lama dengan logo baru resmi beresolusi tinggi di semua halaman portal (`index.html`, `dashboard.html`, dan `admin.html`), serta ikon tab (*favicon*).

5. **Dual Theme (Tema Terang ☀️ & Tema Gelap 🌙)**
   - Tersedia tombol beralih tema instan di semua halaman.
   - Pilihan tema tersimpan secara otomatis di memori browser (*localStorage*) sehingga konsisten saat berpindah halaman atau membuka tab baru.

6. **Tanda Mata pada Kotak Kata Sandi (Password Visibility Toggle 👁️)**
   - Tersedia tombol ikon mata interaktif pada input kata sandi di portal login dan formulir admin untuk mengecek kebenaran kata sandi sebelum masuk atau menyimpan data.

7. **Animasi & Transisi Kartu Login ke Dashboard**
   - Transisi kartu interaktif saat verifikasi berhasil, menampilkan indikator gelombang/portal emas-biru dengan efek *smooth morphing & fade-out*, dilanjutkan animasi kedatangan halus di dashboard.

8. **Bebas Akun Demo & Siap Repositori GitHub**
   - Semua akun contoh/demo hardcoded telah dihilangkan sepenuhnya.
   - Dilengkapi sistem **Inisialisasi Otomatis**: Jika database masih kosong, aplikasi secara cerdas memandu pembuatan Akun Administrator Utama langsung ke Neon.
   - Dilengkapi fitur **Backup & Restore (Ekspor/Impor JSON)** di Admin Panel.

---

## 📁 Struktur Berkas Proyek

```text
tirta-cendana-aquatic/
├── index.html          # Portal login & inisialisasi awal ke Neon
├── dashboard.html      # Portal dashboard khusus peserta les renang
├── admin.html          # Panel kontrol admin (kelola peserta, kuota, progres, backup)
├── schema.sql          # Skema database resmi untuk Neon PostgreSQL SQL Editor
├── assets/
│   └── logo.png        # Logo resmi baru Tirta Cendana Aquatic
├── css/
│   └── style.css       # Desain sistem warna Putih-Emas-Biru, dual theme, & status badge
├── js/
│   └── app.js          # Driver Neon PostgreSQL, tema, toggle sandi, & transisi
├── .gitignore          # Konfigurasi pengecualian berkas git
└── README.md           # Dokumentasi lengkap proyek
```

---

## 🗄️ Menjalankan Skema di Neon SQL Editor

Skema database sudah tersedia di berkas [`schema.sql`](schema.sql). Jika Anda ingin mereset atau mengecek kembali tabel di Neon:
1. Buka [Neon Console](https://console.neon.tech/) → Pilih project Anda.
2. Masuk ke menu **SQL Editor**.
3. Buka atau salin seluruh isi berkas `schema.sql` dan klik **Run**.

---

## 🚀 Panduan Menjalankan Proyek

1. **Melalui Browser Langsung**:
   - Cukup klik dua kali berkas `index.html` pada File Explorer untuk membukanya di browser.

2. **Menggunakan Live Server**:
   - Jika menggunakan VS Code, klik kanan pada `index.html` dan pilih **Open with Live Server**.
   - Atau via terminal:
     ```bash
     npx serve .
     ```

---

## 📤 Menghubungkan & Push ke Repositori GitHub

Repositori ini terhubung ke:
`https://github.com/CendanaVisual/tirta-cendana-aquatic.git`

Untuk mengirimkan pembaruan terkini ke GitHub:

```bash
git add .
git commit -m "feat: integrasi langsung cloud database Neon PostgreSQL dan skema SQL"
git push origin main
```

---

© 2026 **Tirta Cendana Aquatic** • All Rights Reserved.
