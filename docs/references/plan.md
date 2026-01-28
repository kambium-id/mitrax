⚠️ DEPLOYMENT PLAN: Local Website to Google Cloud Run
Project Overview: Memindahkan website hasil kreasi AI Agent dari lingkungan lokal ke Google Cloud Platform (GCP) menggunakan akun Google Workspace, dengan database eksternal (Neon).

1. Spesifikasi Infrastruktur
Platform: Google Cloud Run (Serverless).

Region: asia-southeast2 (Jakarta).

Database: Neon Database (PostgreSQL) - Tetap di luar GCP.

Metode Deployment: Container-based (Docker) via Gemini CLI / gcloud SDK.

Billing Mode: Pay-as-you-go (Request-based scaling).

2. Daftar Kebutuhan (Prerequisites)
AI Agent harus memastikan komponen berikut tersedia sebelum eksekusi:

GCP Project ID: [MASUKKAN_PROJECT_ID_ANDA]

Neon Connection String: [MASUKKAN_URL_KONEKSI_NEON]

GCP Service Account: Memiliki role Cloud Run Admin dan Storage Admin.

Local Tools: gcloud CLI dan docker sudah terinstal di mesin lokal.

3. Langkah Eksekusi (Action Items)
Fase 1: Persiapan Environment
Inisialisasi project: gcloud config set project [PROJECT_ID].

Aktivasi API yang dibutuhkan:

run.googleapis.com (Cloud Run)

artifactregistry.googleapis.com (Penyimpanan Image)

cloudbuild.googleapis.com (Proses Build)

Fase 2: Konfigurasi Container (Dockerfile)
AI Agent perlu membuat file Dockerfile jika belum ada. Contoh standar:

Dockerfile

FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
(Catatan: Sesuaikan perintah CMD dengan bahasa pemrograman yang digunakan).

Fase 3: Deployment via Gemini CLI
AI Agent akan menjalankan perintah melalui terminal menggunakan Gemini CLI:

Prompt untuk Gemini CLI:

"Deploy current directory to Cloud Run in region asia-southeast2. Name the service 'web-ai-project'. Set environment variable DATABASE_URL from Neon. Use minimum instances 0 for cost efficiency."

Fase 4: Pengaturan Keamanan & Database
Injeksi Environment Variable untuk koneksi Neon.

(Opsional) Simpan kredensial Neon di GCP Secret Manager untuk keamanan tambahan.

4. Konfigurasi Billing & Skalabilitas
Untuk menjaga biaya tetap rendah (mendekati $0 pada trafik rendah):

Min Instances: 0 (Agar tidak ada biaya saat tidak ada pengunjung).

Max Instances: 5-10 (Limit untuk mencegah lonjakan biaya).

Concurrency: 80 (Default - jumlah request per kontainer).

5. Rencana Monitoring (Pasca-Deploy)
Setup Budget Alert di Google Billing Console pada ambang batas $5 (sekitar Rp 80.000).

Cek log error melalui gcloud beta run services logs tail.