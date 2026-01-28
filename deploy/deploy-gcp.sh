#!/bin/bash

# Script Deployment ke Google Cloud Run untuk Mitrax

# Konfigurasi Default
SERVICE_NAME="mitrax-web"
REGION="asia-southeast2"

echo "=========================================="
echo "   Mitrax - Google Cloud Run Deployment   "
echo "=========================================="

# 1. Cek Gcloud CLI
if ! command -v gcloud &> /dev/null
then
    echo "[ERROR] gcloud CLI tidak ditemukan. Silakan install Google Cloud SDK terlebih dahulu."
    exit 1
fi

# 2. Konfirmasi Project
CURRENT_PROJECT=$(gcloud config get-value project)
echo "Project saat ini: $CURRENT_PROJECT"
read -p "Apakah ini project yang benar? (y/n): " confirm
if [[ $confirm != "y" ]]; then
    echo "Silakan jalankan 'gcloud config set project [PROJECT_ID]' terlebih dahulu."
    exit 1
fi

# 3. Enable APIs (Hanya perlu sekali, tapi aman dijalankan ulang)
echo "[INFO] Memastikan API Cloud Run & Cloud Build aktif..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# 4. Deploy
echo "[INFO] Memulai proses deployment..."
echo "       Region: $REGION"
echo "       Service: $SERVICE_NAME"
echo "       Source: ."
echo "------------------------------------------"

gcloud run deploy $SERVICE_NAME \
    --source . \
    --region $REGION \
    --allow-unauthenticated \
    --min-instances 0 \
    --max-instances 5

echo "------------------------------------------"
echo "[SUCCESS] Deployment selesai!"
echo "Silakan cek URL di atas."
echo "JANGAN LUPA: Set Environment Variable DATABASE_URL di Cloud Console jika belum."
