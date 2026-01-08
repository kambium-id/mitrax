# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-01-08

### 🎨 Theme Update: Purple to Green/Teal

Complete color palette conversion from purple gradient theme to modern green/teal theme.

### Changed

- **Color Palette**: Converted entire design system from purple/pink to teal/cyan/green
  - Primary: `#8B5CF6` (Purple) → `#14B8A6` (Teal)
  - Primary Dark: `#7C3AED` → `#0D9488`
  - Primary Light: `#A78BFA` → `#2DD4BF`
  - Secondary: `#EC4899` (Pink) → `#06B6D4` (Cyan)
  - Background: `#0F0F1E` → `#0A1F1F` (Dark teal)
  - Card Background: `#1A1A2E` → `#0F2A2A`
  - Card Border: `#2A2A3E` → `#1A3A3A`
- **Sidebar Gradient**: Updated from purple (`#7C3AED` to `#5B21B6`) to teal (`#0D9488` to `#0F766E`)
- **Chat Interface**: All purple accents replaced with teal/cyan gradients
- **Chart Colors**: Shipment metrics line changed from purple to teal
- **Chart Legend**: Updated indicators to teal (shipments), emerald (revenue), amber (problems)
- **Summary Cards**: Default card color changed from purple to teal
- **Glassmorphism**: Border colors updated to teal transparency
- **Gradient Effects**: All purple gradients replaced with teal/cyan combinations

### Fixed

- **Hardcoded Colors**: Replaced all hardcoded purple/blue hex values in CSS
- **Chart Grid**: Updated grid color to match teal theme
- **Border Colors**: Fixed component borders to use teal palette
- **Ambient Effects**: Updated glow effects from purple to teal

### Files Modified

- `src/app/globals.css` - Complete color variable updates
- `src/components/Layout/Sidebar.tsx` - Teal gradient background
- `src/app/page.tsx` - Ambient backgrounds and accent colors
- `src/components/Chat/ChatInterface.tsx` - Teal gradients and borders
- `src/components/Layout/ChatHistoryPanel.tsx` - Teal accents
- `src/components/Dashboard/SummaryCard.tsx` - Default teal color
- `src/components/Dashboard/ShipmentChart.tsx` - Teal line and legend

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
| 2.1.0 | 2026-01-08 | Theme conversion from purple to green/teal |
| 2.0.0 | 2026-01-07 | Complete UI redesign with purple gradient theme |
| 1.0.0 | 2025-12-13 | Initial release |

---

**For detailed technical changes, see commit history on GitHub.**
