# 🌊 Tirta Cendana Aquatic — Portal Web Les Renang Premium Bali

Aplikasi web manajemen les renang eksklusif **Tirta Cendana Aquatic**, dirancang dengan visual mewah (White, Gold & Blue), sistem tema ganda (Terang & Gelap), manajemen kuota dan evaluasi progres renang real-time, serta transisi modern.

![Tirta Cendana Aquatic](assets/logo.png)

---

## ✨ Fitur-Fitur Terbaru & Penyempurnaan

1. **Penyempurnaan Tipografi & Gradasi Latar Belakang**
   - Menggunakan perpaduan tipografi berkelas (*Playfair Display* & *Plus Jakarta Sans*) dengan hierarki yang jelas, tajam, dan mudah dibaca di seluruh portal.
   - Gradasi warna keseluruhan diselaraskan dengan palet **Putih, Emas, dan Biru Laut** (*White, Gold, and Aquatic Blue*), memancarkan aura eksklusif resort Bali.

2. **Logo Resmi Brand Tirta Cendana Aquatic**
   - Menggantikan semua representasi logo/ikon lama dengan logo baru resmi beresolusi tinggi di semua halaman portal (`index.html`, `dashboard.html`, dan `admin.html`), serta ikon tab (*favicon*).

3. **Dual Theme (Tema Terang ☀️ & Tema Gelap 🌙)**
   - Tersedia tombol beralih tema instan di semua halaman.
   - Pilihan tema tersimpan secara otomatis di memori browser (*localStorage*) sehingga konsisten saat berpindah halaman atau membuka tab baru.

4. **Tanda Mata pada Kotak Kata Sandi (Password Visibility Toggle 👁️)**
   - Tersedia tombol ikon mata interaktif pada input kata sandi di portal login dan formulir admin untuk mengecek kebenaran kata sandi sebelum masuk atau menyimpan data.

5. **Animasi & Transisi Kartu Login ke Dashboard**
   - Transisi kartu interaktif saat verifikasi berhasil, menampilkan indikator gelombang/portal emas-biru dengan efek *smooth morphing & fade-out*, dilanjutkan animasi kedatangan halus di dashboard.

6. **Bebas Akun Demo & Siap Repositori GitHub**
   - Semua akun contoh/demo hardcoded telah dihilangkan sepenuhnya.
   - Dilengkapi sistem **Inisialisasi Otomatis**: Jika aplikasi dibuka pertama kali tanpa database, aplikasi secara cerdas menampilkan panduan pembuatan Akun Administrator Utama.
   - Dilengkapi fitur **Backup & Restore (Ekspor/Impor JSON)** di Admin Panel untuk mengamankan data peserta dan progres latihan.

---

## 📁 Struktur Berkas Proyek

```text
tirta-cendana-aquatic/
├── index.html          # Portal login & inisialisasi awal
├── dashboard.html      # Portal dashboard khusus peserta
├── admin.html          # Panel kontrol admin (peserta, kuota, progres, backup)
├── assets/
│   └── logo.png        # Logo resmi baru Tirta Cendana Aquatic
├── css/
│   └── style.css       # Desain sistem, palet Putih-Emas-Biru, dual theme, animasi
├── js/
│   └── app.js          # Pengelola tema, penyimpanan lokal, toggle sandi, & notifikasi
├── .gitignore          # Konfigurasi pengecualian berkas git
└── README.md           # Dokumentasi lengkap proyek
```

---

## 🚀 Panduan Menjalankan Proyek

Aplikasi ini berbasis client-side modern yang ringan dan dapat dijalankan langsung:

1. **Melalui Browser Langsung**:
   - Cukup klik dua kali berkas `index.html` pada File Explorer untuk membukanya di browser (Chrome, Edge, Firefox, Safari).

2. **Menggunakan Live Server (Direkomendasikan)**:
   - Jika menggunakan VS Code, instal ekstensi **Live Server**, klik kanan pada `index.html` dan pilih **Open with Live Server**.
   - Atau melalui terminal:
     ```bash
     npx serve .
     ```

---

## 📤 Menghubungkan & Push ke Repositori GitHub

Repositori ini telah dikonfigurasi untuk link remote GitHub:
`git@github.com:CendanaVisual/tirta-cendana-aquatic.git`

Untuk mengirimkan (*push*) kode ke GitHub, jalankan perintah berikut pada terminal:

```bash
# 1. Pastikan branch utama bernama main
git branch -M main

# 2. Push ke remote origin GitHub
git push -u origin main
```

*(Pastikan kunci SSH GitHub Anda sudah terkonfigurasi di komputer).*

---

## 🏊 Alur Penggunaan Aplikasi

1. **Langkah Awal (Admin Utama)**:
   - Buka `index.html`. Karena data demo sudah dibersihkan, sistem akan menampilkan formulir pendaftaran Administrator Utama pertama kali.
   - Buat nama dan kata sandi admin Anda, lalu klik **"Buat Akun Admin & Mulai"**.
2. **Kelola Peserta & Kuota**:
   - Di Admin Panel, klik **"+ Tambah Peserta Baru"** untuk mendaftarkan nama peserta, paket les renang (Unlimited 10 sesi, Semi Privat 4 sesi, dll), dan kuota awal.
3. **Catat Evaluasi Latihan**:
   - Di tab **"Progres & Evaluasi Latihan"**, pilih nama peserta, masukkan materi latihan (misal: *Freestyle Breathing*), skor nilai (0-100), durasi, dan catatan dari pelatih.
   - Centang opsi *“Otomatis kurangi 1 kuota pertemuan peserta”* agar kuota terpotong secara otomatis.
4. **Akses Peserta**:
   - Peserta dapat masuk ke `index.html` dengan memilih nama akun mereka dan mengetikkan kata sandi yang telah didaftarkan untuk memantau sisa sesi dan catatan pelatih.
5. **Cadangan Data (Backup)**:
   - Masuk ke tab **"Cadangan & Pemulihan Data"** di Admin Panel kapan saja untuk mengunduh berkas `.json` berisi seluruh data terkini.

---

© 2026 **Tirta Cendana Aquatic** • All Rights Reserved.
