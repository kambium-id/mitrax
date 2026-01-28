# Panduan Deployment Mitrax ke Google Cloud Run

Panduan ini menjelaskan cara men-deploy aplikasi Mitrax ke Google Cloud Run.

## Prasyarat
1.  **Google Cloud Platform (GCP)**:
    -   Memiliki akun GCP.
    -   Sudah membuat Project.
    -   Billing sudah diaktifkan.
2.  **Software Lokal**:
    -   `gcloud CLI` sudah terinstall ([Panduan Install](https://cloud.google.com/sdk/docs/install)).

## Langkah 1: Login ke GCP
Buka terminal dan jalankan:
```bash
gcloud auth login
gcloud config set project [PROJECT_ID_ANDA]
```

## Langkah 2: Jalankan Script Deployment
Jalankan script otomatis yang telah disediakan:
```bash
./deploy/deploy-gcp.sh
```
Script ini akan:
1.  Mengaktifkan API yang diperlukan.
2.  Membangun Docker Image dari source code.
3.  Men-deploy ke Cloud Run region `asia-southeast2`.

## Langkah 3: Konfigurasi Database (PENTING!)
Aplikasi akan gagal connect ke database jika langkah ini dilewatkan.
1.  Buka [Google Cloud Run Console](https://console.cloud.google.com/run).
2.  Pilih service `mitrax-web`.
3.  Klik **Edit & Deploy New Revision**.
4.  Ke tab **Variables & Secrets**.
5.  Tambahkan Environment Variable:
    -   Name: `DATABASE_URL`
    -   Value: (Copy connection string dari Neon Dashboard Anda)
6.  Klik **Deploy**.

## Langkah 4: Setup Custom Domain (Cloudflare)
1.  Di Cloud Run Console, pilih **Manage Custom Domains**.
2.  Klik **Add Mapping**.
3.  Pilih "Service to map" -> `mitrax-web`.
4.  Masukkan domain Anda (misal: `app.mitrax.com`).
5.  Google akan memberikan instruksi DNS Record (biasanya tipe `CNAME` atau `A`).
6.  Buka Dashboard Cloudflare -> DNS.
7.  Tambahkan record sesuai instruksi Google.
8.  Tunggu propagasi DNS (biasanya hitungan menit jika pakai Cloudflare).

## Troubleshooting
-   **Error 500**: Cek log di Cloud Run Console. Biasanya karena `DATABASE_URL` belum diset atau salah.
-   **Cold Start**: Cloud Run scale to zero saat tidak dipakai. Request pertama mungkin butuh 5-10 detik. Ini wajar.
