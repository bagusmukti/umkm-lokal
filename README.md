# 🏆 Direktori UMKM Lokal: Digitalisasi & Promosi Bisnis Setempat

### Deskripsi Singkat Project

**Direktori UMKM Lokal** adalah platform direktori digital yang dirancang untuk mempromosikan dan mempermudah masyarakat dalam menemukan serta mendukung Usaha Mikro, Kecil, dan Menengah (UMKM) di wilayah setempat.

### 💻 Tech Stack yang Digunakan

* **Frontend Framework:** React.js (menggunakan Vite/Create React App)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Backend & Database:** Supabase (sebagai BaaS untuk menyimpan data UMKM, menu, rating, dan kategori)

### ⚙️ Cara Menjalankan Project (Lokal)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di mesin lokal Anda:

1.  **Kloning Repositori:**
    ```bash
    git clone <URL_REPOSITORY_ANDA>
    cd direktori-umkm-lokal
    ```

2.  **Instalasi Dependensi:**
    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Konfigurasi Environment (Penting):**
    Buat file `.env` di root proyek dan tambahkan kredensial Supabase Anda. Pastikan nama variabel sesuai dengan yang diakses di kode (`../lib/supabase.js`).
    ```
    REACT_APP_SUPABASE_URL="<URL_SUPABASE_PROJECT_ANDA>"
    REACT_APP_SUPABASE_ANON_KEY="<ANON_KEY_SUPABASE_ANDA>"
    ```

4.  **Menjalankan Aplikasi:**
    ```bash
    npm start
    # atau
    npm run dev  # (Jika menggunakan setup Vite)
    ```
    Aplikasi akan terbuka di `http://localhost:3000`.

### 🚀 Progress Saat Ini (First Draft Submission)

Saat ini, proyek sudah mencakup fungsionalitas inti:

* **Landing Page (`/`)** sudah fungsional, menampilkan kategori populer dan UMKM rekomendasi dari Supabase.
* **Halaman Jelajahi (`/explore`)** sudah fungsional dengan fitur pencarian, filter multi-select berdasarkan kategori utama, dan filter berdasarkan tags/situasional.
* **Halaman Detail UMKM (`/detail/:id`)** sudah fungsional, menampilkan data UMKM, informasi lokasi/maps, dan daftar menu yang dikelompokkan berdasarkan kategori menu.
* **Struktur Aplikasi** (Navbar, Footer, Routing) sudah terimplementasi penuh menggunakan React Router DOM.

---