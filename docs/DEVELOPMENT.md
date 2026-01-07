# Development Guide

## Setup Development Environment

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git
- VS Code (recommended)

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/kambium-id/mitrax.git
cd mitrax
npm install
```

### 2. Environment Setup

Create `.env.local`:

```env
# n8n Webhook for AI Chat
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n.com/webhook/logistics-chat

# Add other environment variables as needed
```

### 3. Run Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## Project Architecture

### Component Structure

```
src/components/
├── Chat/
│   └── ChatInterface.tsx    # AI chat component
├── Dashboard/
│   ├── SummaryCard.tsx      # Metric cards
│   ├── ShipmentChart.tsx    # Analytics chart
│   └── RecentActivity.tsx   # Activity list
└── Layout/
    ├── Sidebar.tsx          # Left navigation
    └── ChatHistoryPanel.tsx # Right panel
```

### Data Flow

1. **Data Service** (`src/services/dataService.ts`)
   - Fetch data from backend API
   - Mock data for development
   - Data transformation

2. **Custom Hooks** (`src/hooks/`)
   - `useDashboardData.ts` - Dashboard metrics
   - Add custom hooks as needed

3. **Components**
   - Consume data from hooks
   - Handle UI state
   - Render with Tailwind styles

## Styling Guidelines

### Tailwind CSS

**Using Utility Classes:**

```tsx
// Good - Use Tailwind utilities
<div className="bg-purple-500 rounded-xl p-4 hover:bg-purple-600 transition-colors">
  Content
</div>

// Avoid - Inline styles
<div style={{ backgroundColor: '#8B5CF6', borderRadius: '12px' }}>
  Content
</div>
```

**Custom Classes:**

Defined in `globals.css`:

```css
.glass-card {
  background: rgba(26, 26, 46, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 92, 246, 0.2);
}
```

### Color System

Use CSS variables defined in `globals.css`:

```css
:root {
  --primary: #8B5CF6;
  --revenue: #10B981;
  --status: #EF4444;
  --operational: #F59E0B;
}
```

## Adding New Features

### 1. Create New Component

```tsx
// src/components/YourComponent.tsx
"use client";

import React from 'react';

interface YourComponentProps {
  // Define props
}

const YourComponent: React.FC<YourComponentProps> = ({ ...props }) => {
  return (
    <div className="glass-card p-6 rounded-2xl">
      {/* Component content */}
    </div>
  );
};

export default YourComponent;
```

### 2. Add Data Service

```typescript
// src/services/yourService.ts
export interface YourData {
  id: string;
  // Define interface
}

export const fetchYourData = async (): Promise<YourData[]> => {
  // Implement data fetching
  return [];
};
```

### 3. Create Custom Hook

```typescript
// src/hooks/useYourData.ts
"use client";

import { useState, useEffect } from 'react';
import { fetchYourData } from '@/services/yourService';

export const useYourData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchYourData();
      setData(result);
      setLoading(false);
    };
    loadData();
  }, []);

  return { data, loading };
};
```

## Testing

### Running Tests

```bash
# If tests are configured
npm test
```

### Manual Testing Checklist

- [ ] Desktop responsiveness (1920x1080)
- [ ] Tablet responsiveness (768px)
- [ ] Mobile responsiveness (375px)
- [ ] Chat interface functionality
- [ ] Chart data rendering
- [ ] Card animations and hover effects
- [ ] Navigation between sections

## Common Issues & Solutions

### Issue: Tailwind styles not applying

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: Chart not rendering

**Solution:**
Check that Chart.js is properly registered:
```typescript
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  // ... other imports
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  // ... register all
);
```

### Issue: Environment variables not loading

**Solution:**
- Ensure `.env.local` exists
- Prefix with `NEXT_PUBLIC_` for client-side variables
- Restart dev server after changes

## Code Style

### TypeScript

```typescript
// Use interfaces for props
interface MyComponentProps {
  title: string;
  count: number;
  onAction?: () => void;
}

// Use type for unions
type Status = 'idle' | 'loading' | 'success' | 'error';
```

### Naming Conventions

- **Components**: PascalCase (`SummaryCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useDashboardData.ts`)
- **Services**: camelCase (`dataService.ts`)
- **CSS Classes**: kebab-case or Tailwind utilities

## Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Code refactoring
- `docs/documentation-type` - Documentation updates

### Commit Messages

Follow conventional commits:

```
feat: Add new metric card for delivery time
fix: Resolve chart rendering issue on mobile
refactor: Simplify chat interface logic
docs: Update development guide
style: Format code with Prettier
```

## Performance Optimization

### Image Optimization

Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="Logo" 
  width={100} 
  height={100}
  priority // For above-fold images
/>
```

### Code Splitting

Use dynamic imports for heavy components:

```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});
```

## Debugging

### Next.js Debugging

Add to `package.json`:

```json
{
  "scripts": {
    "dev:debug": "NODE_OPTIONS='--inspect' next dev"
  }
}
```

Then connect Chrome DevTools to `chrome://inspect`

### React DevTools

Install React Developer Tools extension for debugging component tree and state.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook)

---

**Happy Coding! 🚀**
