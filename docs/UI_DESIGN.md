# UI Design System

## Overview

Mitrax Dashboard menggunakan design system modern dengan green/teal gradient theme, glassmorphism effects, dan premium animations untuk menciptakan user experience yang menarik dan profesional.

## 🎨 Color Palette

### Primary Colors

| Color | Hex | Usage | Example |
|-------|-----|-------|---------|
| **Teal Primary** | `#14B8A6` | Primary actions, Shipment metrics | Buttons, Links, Pengiriman |
| **Teal Dark** | `#0D9488` | Sidebar gradient start | Navigation sidebar |
| **Teal Deep** | `#0F766E` | Sidebar gradient end | Sidebar bottom |
| **Teal Light** | `#2DD4BF` | Hover states, accents | Hover effects |

### Status Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Emerald** | `#10B981` | Success, Revenue, Positive trends |
| **Red** | `#EF4444` | Errors, Problems, Warnings |
| **Amber** | `#F59E0B` | Information, Operational data |
| **Cyan** | `#06B6D4` | Secondary accents, Gradients |
| **Blue** | `#3B82F6` | Info states (alternate) |

### Neutral Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Background** | `#0A1F1F` | Main background |
| **Card Background** | `#0F2A2A` | Card containers |
| **Border** | `#1A3A3A` | Card borders |
| **Text Primary** | `#FFFFFF` | Headings, important text |
| **Text Secondary** | `#9CA3AF` | Descriptions, metadata |
| **Text Muted** | `#6B7280` | Less important text |

## 📝 Typography

### Font Families

**Primary Font - Inter**
- Usage: Body text, UI elements
- Weights: 300, 400, 500, 600, 700, 800
- Import: Google Fonts

**Display Font - Space Grotesk**
- Usage: Headings, titles
- Weights: 500, 600, 700
- Import: Google Fonts

### Font Scale

```css
/* Headings */
h1: 2.5rem (40px) - Bold - Space Grotesk
h2: 2rem (32px) - Bold - Space Grotesk
h3: 1.5rem (24px) - Semibold - Space Grotesk
h4: 1.25rem (20px) - Semibold - Inter

/* Body */
Large: 1rem (16px) - Medium - Inter
Base: 0.875rem (14px) - Regular - Inter
Small: 0.75rem (12px) - Regular - Inter
Tiny: 0.625rem (10px) - Medium - Inter
```

## 🎭 Components

### 1. Summary Cards

**Design Specs:**
- Background: `#0F2A2A` with glassmorphism
- Border: `1px solid #1A3A3A`
- Border Radius: `2rem` (32px)
- Padding: `1.5rem` (24px)
- Shadow: Dynamic color-based shadow

**States:**
- **Default**: Subtle border
- **Hover**: Scale 1.02, border glow, teal shadow
- **Loading**: Shimmer animation

**Elements:**
- Icon container: Gradient background with color glow
- Value: 2.5rem bold white text
- Label: 0.875rem medium gray text
- Trend: Badge with colored background

### 2. Chat Interface

**Container:**
- Background: Glassmorphism `rgba(15, 42, 42, 0.7)`
- Backdrop filter: `blur(20px)`
- Border: `1px solid rgba(20, 184, 166, 0.2)`
- Border radius: `1.5rem` (24px)
- Top accent: Gradient line teal to cyan

**Message Bubbles:**

**User Message:**
- Background: Gradient teal to cyan
- Text: White
- Border radius: `1rem` with bottom-right small radius
- Shadow: Teal glow

**Bot Message:**
- Background: Glassmorphism `rgba(15, 42, 42, 0.8)`
- Text: Light gray `#E5E7EB`
- Border: `1px solid rgba(20, 184, 166, 0.2)`
- Border radius: `1rem` with bottom-left small radius

### 3. Sidebar

**Design:**
- Background: Linear gradient `#0D9488` to `#0F766E`
- Width: `6rem` (96px)
- Position: Fixed left
- Shadow: `2xl` with teal glow

**Navigation Items:**
- Size: `3rem` x `3rem` (48px)
- Background default: Transparent
- Background hover: `white/10`
- Background active: `white/20`
- Text: White with 60% opacity (inactive), 100% (active)
- Icon size: 24px
- Transition: 200ms ease

**Active Indicator:**
- Left border: 4px white rounded
- Position: Absolute left center

### 4. Analytics Chart

**Container:**
- Background: `#0F2A2A`
- Border: `1px solid #1A3A3A`
- Border radius: `1.5rem` (24px)
- Padding: `1.5rem` (24px)

**Chart Config:**
- Line tension: 0.4 (smooth curves)
- Point radius: 0 (hidden by default)
- Point hover radius: 6px
- Line width: 3px
- Fill: Gradient with 10% opacity

**Colors:**
- Shipments: Teal `#14B8A6`
- Revenue: Emerald `#10B981`
- Problems: Amber `#F59E0B`

### 5. Chat History Panel

**Container:**
- Background: Glassmorphism
- Border left: `1px solid rgba(139, 92, 246, 0.2)`
- Width: `20rem` (320px)
- Position: Fixed right

**History Items:**
- Background: `white/5`
- Hover: `white/10` with teal border
- Border radius: `0.75rem` (12px)
- Padding: `0.75rem` (12px)
- Transition: All 300ms

## ✨ Effects & Animations

### Glassmorphism

```css
.glass-card {
  background: rgba(15, 42, 42, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(20, 184, 166, 0.2);
}
```

### Hover Effects

**Scale Transform:**
```css
.hover-scale {
  transition: transform 300ms ease;
}
.hover-scale:hover {
  transform: scale(1.02);
}
```

**Glow Effect:**
```css
.hover-glow:hover {
  box-shadow: 0 10px 30px rgba(20, 184, 166, 0.3);
}
```

### Animations

**Shimmer (Loading):**
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

**Float (Logo):**
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

**Slide Up (Messages):**
```css
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Pulse Glow:**
```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(20, 184, 166, 0.6);
  }
}
```

## 📐 Spacing System

Based on Tailwind's spacing scale:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 0.5rem (8px) | Tight spacing |
| sm | 0.75rem (12px) | Small gaps |
| md | 1rem (16px) | Default spacing |
| lg | 1.5rem (24px) | Section spacing |
| xl | 2rem (32px) | Large gaps |
| 2xl | 3rem (48px) | Extra large spacing |

## 🔘 Border Radius

| Size | Value | Usage |
|------|-------|-------|
| sm | 0.5rem (8px) | Small elements |
| md | 0.75rem (12px) | Buttons, badges |
| lg | 1rem (16px) | Cards, inputs |
| xl | 1.5rem (24px) | Large cards |
| 2xl | 2rem (32px) | Summary cards |
| full | 9999px | Circular elements |

## 🎯 Interactive States

### Focus States

```css
.focus-ring {
  outline: none;
  ring: 2px solid rgba(20, 184, 166, 0.5);
  ring-offset: 2px;
}
```

### Disabled States

```css
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Active States

```css
.active {
  transform: scale(0.95);
  transition: transform 100ms;
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }
```

## 🌈 Gradient Patterns

### Sidebar Gradient

```css
background: linear-gradient(180deg, #0D9488 0%, #0F766E 100%);
```

### Button Gradient

```css
background: linear-gradient(135deg, #14B8A6, #06B6D4);
```

### Ambient Backgrounds

```css
/* Top Right */
background: radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%);

/* Bottom Left */
background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
```

## 🎨 Usage Guidelines

### Do's ✅

- Use glassmorphism for overlays and modals
- Apply subtle animations (300-500ms)
- Maintain consistent spacing
- Use color-coded categories
- Add hover feedback on interactive elements
- Use teal as primary brand color

### Don'ts ❌

- Don't use pure black backgrounds
- Avoid mixing too many gradient directions
- Don't create jarring animations (>1s)
- Avoid low contrast text combinations
- Don't overuse shadows and glows
- Avoid mixing different design patterns

---

**Design System Version: 2.1.0**  
**Last Updated: 2026-01-08**
