# Mitrax - Logistics Dashboard

Dashboard manajemen operasional logistik dengan AI Assistant terintegrasi.

![Dashboard Preview](docs/images/dashboard-preview.png)

## 🚀 Fitur Utama

- **📊 Real-time Metrics**: Monitor total pengiriman, pengiriman bermasalah, pendapatan, dan armada aktif
- **📈 Analytics Dashboard**: Visualisasi fluktuasi harian pengiriman dan pendapatan
- **🤖 AI Assistant**: Chat interface untuk query data dan analisis cepat
- **💎 Premium UI**: Modern design dengan purple gradient theme dan glassmorphism effects
- **📱 Responsive Design**: Optimized untuk desktop dan mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 3.4.17
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **Fonts**: Inter + Space Grotesk (Google Fonts)
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- Git

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/kambium-id/mitrax.git
cd mitrax
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configuration (Optional)

Buat file `.env.local` untuk konfigurasi:

```env
# n8n Webhook URL untuk AI Chat
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/logistics-chat
```

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
mitrax/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles & theme
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Dashboard page
│   ├── components/
│   │   ├── Chat/           # Chat interface
│   │   ├── Dashboard/      # Dashboard components
│   │   └── Layout/         # Layout components
│   ├── hooks/              # Custom React hooks
│   └── services/           # Data services
├── public/                 # Static assets
├── docs/                   # Documentation
└── package.json
```

## 📊 Dashboard Metrics

Dashboard menampilkan 6 metrik operasional utama:

1. **Total Pengiriman** - Total shipments all-time
2. **Pengiriman Hari Ini** - Today's shipments
3. **Pengiriman Bermasalah** - Problematic deliveries
4. **Pendapatan Hari Ini** - Today's revenue (Rp)
5. **Armada Aktif** - Active fleet count
6. **Rata-rata Waktu Kirim** - Average delivery time (days)

## 🎨 Design System

**Color Palette:**
- Primary: Purple `#8B5CF6`
- Revenue: Emerald `#10B981`
- Warning: Red `#EF4444`
- Info: Amber `#F59E0B`
- Accent: Pink `#EC4899`

**Typography:**
- Headings: Space Grotesk
- Body: Inter

## 🔧 Configuration

### Tailwind CSS

Configuration di `tailwind.config.js`. PostCSS configuration di `postcss.config.js`.

### Data Service

Modify `src/services/dataService.ts` untuk integrasi dengan backend API.

### n8n Integration

Set `NEXT_PUBLIC_N8N_WEBHOOK_URL` di environment variables untuk menghubungkan chat dengan n8n workflow.

## 📚 Documentation

- [Development Guide](docs/DEVELOPMENT.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [UI Design System](docs/UI_DESIGN.md)
- [Changelog](docs/CHANGELOG.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

Copyright © 2026 Kambium ID

## 👥 Contact

- Organization: [Kambium ID](https://github.com/kambium-id)
- Repository: [mitrax](https://github.com/kambium-id/mitrax)

---

**Made with ❤️ by Kambium ID Team**
