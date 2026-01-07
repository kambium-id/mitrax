# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-07

### 🎨 Major UI Redesign

Complete dashboard redesign with premium purple gradient theme based on modern design principles.

### Added

- **Purple Gradient Theme**: Modern purple gradient design system throughout the application
- **Glassmorphism Effects**: Frosted glass effects on cards and panels
- **Premium Animations**: Smooth transitions, hover effects, and micro-interactions
- **Enhanced Metrics Cards**: 6 logistics operation metrics with trend indicators
  - Total Pengiriman (Total Shipments)
  - Pengiriman Hari Ini (Today's Shipments)
  - Pengiriman Bermasalah (Problematic Deliveries)
  - Pendapatan Hari Ini (Today's Revenue)
  - Armada Aktif (Active Fleet)
  - Rata-rata Waktu Kirim (Average Delivery Time)
- **Multi-line Analytics Chart**: Visualize shipments, revenue, and issues over 10 months
- **Enhanced Chat Interface**: AI assistant with Indonesian localization
- **Interactive Chat History Panel**: Chat history with quick stats display
- **Premium Sidebar**: Gradient background with floating logo animation
- **Google Fonts Integration**: Inter + Space Grotesk for premium typography
- **PostCSS Configuration**: Proper Tailwind CSS compilation setup

### Changed

- **Layout Structure**: Improved 3-panel horizontal layout (Sidebar, Main, Right Panel)
- **Color Palette**: Updated from generic colors to vibrant purple/emerald/pink theme
- **Card Design**: Enhanced summary cards with icon backgrounds and glow effects
- **Chart Styling**: Updated chart colors and tooltips for better visibility
- **Message Bubbles**: Redesigned chat messages with glassmorphism
- **Loading States**: Added shimmer animation for skeleton loaders

### Fixed

- **Layout Panel Separation**: Fixed issue where panels stacked vertically instead of horizontally
- **Tailwind CSS Compilation**: Resolved Tailwind v4 compatibility issues
- **CSS Not Applying**: Fixed missing PostCSS configuration causing styles not to load
- **Responsive Layout**: Ensured proper flex layout across all screen sizes

### Technical Changes

- **Downgraded**: Tailwind CSS from v4 to v3.4.17 for stability
- **Added**: `postcss.config.js` for proper CSS processing
- **Updated**: Global styles with CSS variables and custom animations
- **Modified**: 11 component files with enhanced UI elements
- **Reorganized**: Remote repository moved to `kambium-id` organization

### Removed

- Old card styling without glassmorphism
- Generic color scheme
- Basic hover effects
- Tailwind v4 incompatible configurations

## [1.0.0] - 2025-12-13

### Added

- Initial dashboard implementation
- Basic logistics metrics display
- Chat interface with n8n integration
- Chart visualization for shipment trends
- Sidebar navigation
- Chat history panel
- Responsive grid layout

### Technical Stack

- Next.js 16 (App Router)
- Tailwind CSS
- Chart.js
- Lucide React icons
- TypeScript

---

## Version History Summary

| Version | Date | Description |
|---------|------|-------------|
| 2.0.0 | 2026-01-07 | Complete UI redesign with purple gradient theme |
| 1.0.0 | 2025-12-13 | Initial release |

---

**For detailed technical changes, see commit history on GitHub.**
