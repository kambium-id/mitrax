# Rencana Implementasi Deployment: Mitrax ke Google Cloud Run

Dokumen ini mencatat rencana teknis untuk men-deploy aplikasi Mitrax ke Google Cloud Run menggunakan database Neon.

## 1. Arsitektur
-   **Frontend/Backend**: Next.js App Router (Node.js).
-   **Platform Deployment**: Google Cloud Run (Serverless Container).
-   **Database**: Neon (PostgreSQL External).
-   **Domain**: Custom domain via Cloudflare.

## 2. Strategi Deployment
Kita menggunakan metode **Containerization (Docker)** dengan **Multi-stage Build**.
-   **Keunggulan**: Ukuran image kecil (~100MB vs ~1GB), aman (tanpa devDependencies), dan startup cepat.
-   **Config**: `output: 'standalone'` pada Next.js.

## 3. Langkah-Langkah (Action Items)

### A. Dilakukan oleh AI (Otomatis)
1.  **Optimasi Config**: Update `next.config.ts` dan install `sharp`.
2.  **Dockerisasi**: Membuat `Dockerfile` dan `.dockerignore`.
3.  **Scripting**: Membuat helper script `deploy/deploy-gcp.sh`.
4.  **Panduan**: Membuat `deploy/INSTRUCTIONS.md`.

### B. Dilakukan oleh User (Manual)
1.  **Setup GCP**: Buat Project & Aktifkan Billing.
2.  **Autentikasi**: `gcloud auth login`.
3.  **Deploy**: Jalankan script deploy.
4.  **Environment Variables**: Set `DATABASE_URL` di Cloud Run.
5.  **DNS Mapping**: Konfigurasi Cloudflare CNAME.

## 4. Struktur File Baru
```
mitrax/
├── deploy/
│   ├── deploy-gcp.sh      # Script deployment otomatis
│   └── INSTRUCTIONS.md    # Panduan manual
├── Dockerfile             # Definisi container
├── .dockerignore          # File yang diabaikan Docker
└── ...
```
