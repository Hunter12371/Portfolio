# Portfolio Architecture

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     USER'S BROWSER                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         React Frontend (portfolio-3d/)               │  │
│  │                                                      │  │
│  │  Components:                                         │  │
│  │  • Hero.tsx      → Shows name, title, 3D animation  │  │
│  │  • About.tsx     → Bio and skills                   │  │
│  │  • Education.tsx → Academic background              │  │
│  │  • Experience.tsx→ Work history                     │  │
│  │  • Projects.tsx  → Portfolio projects               │  │
│  │  • Contact.tsx   → Contact information              │  │
│  │                                                      │  │
│  │  Data Flow:                                          │  │
│  │  1. Load fallback data (instant)                    │  │
│  │  2. Fetch from API (if available)                   │  │
│  │  3. Update UI with fresh data                       │  │
│  │  4. Poll every 5 seconds                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↕                                 │
│                    HTTP Requests                            │
│                   (GET /api/content)                        │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND SERVER                            │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         FastAPI Backend (backend/)                   │  │
│  │                                                      │  │
│  │  Endpoints:                                          │  │
│  │  • GET  /api/health          → Server status        │  │
│  │  • GET  /api/content         → All content          │  │
│  │  • GET  /api/content/{section} → Specific section   │  │
│  │  • GET  /api/download-resume → Resume PDF           │  │
│  │                                                      │  │
│  │  Process:                                            │  │
│  │  1. Receive request                                  │  │
│  │  2. Read data.md file                                │  │
│  │  3. Parse YAML frontmatter                           │  │
│  │  4. Parse markdown sections                          │  │
│  │  5. Return JSON response                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↕                                 │
│                    File System Read                         │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   CONTENT SOURCE                            │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              data.md File                            │  │
│  │                                                      │  │
│  │  Structure:                                          │  │
│  │  ---                                                 │  │
│  │  contactEmail: "email@example.com"                   │  │
│  │  heroTitle: "Hi, I'm Name"                           │  │
│  │  heroSubtitle: "Title"                               │  │
│  │  phone: "+1-234-567-8900"                            │  │
│  │  location: "City, Country"                           │  │
│  │  ---                                                 │  │
│  │                                                      │  │
│  │  # About                                             │  │
│  │  Bio content...                                      │  │
│  │                                                      │  │
│  │  # Education                                         │  │
│  │  ## University                                       │  │
│  │  **Degree:** ...                                     │  │
│  │                                                      │  │
│  │  # Experience                                        │  │
│  │  ## Company | Role                                   │  │
│  │  **Period:** ...                                     │  │
│  │                                                      │  │
│  │  # Projects                                          │  │
│  │  ## Project Name                                     │  │
│  │  **Tech:** ...                                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Scenario 1: Backend Available (Production/Local with Backend)

```
1. User opens website
   ↓
2. Frontend loads
   ↓
3. Components render with FALLBACK data (instant)
   ↓
4. useContent hook fetches from API
   ↓
5. Backend reads data.md
   ↓
6. Backend parses and returns JSON
   ↓
7. Frontend receives fresh data
   ↓
8. Components update with FRESH data
   ↓
9. Poll every 5 seconds (repeat steps 4-8)
```

**Result**: User sees content immediately, then gets fresh data from data.md

### Scenario 2: Backend Unavailable (API Down/Not Running)

```
1. User opens website
   ↓
2. Frontend loads
   ↓
3. Components render with FALLBACK data (instant)
   ↓
4. useContent hook tries to fetch from API
   ↓
5. API request fails (timeout/error)
   ↓
6. Frontend catches error
   ↓
7. Components continue showing FALLBACK data
   ↓
8. Poll every 5 seconds (keeps trying)
```

**Result**: User sees content (fallback), website never blank

## 📦 Component Architecture

### Frontend Structure

```
portfolio-3d/
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx         # Landing section
│   │   ├── About.tsx        # About section
│   │   ├── Education.tsx    # Education section
│   │   ├── Experience.tsx   # Experience timeline
│   │   ├── Projects.tsx     # Projects grid
│   │   ├── Contact.tsx      # Contact section
│   │   └── Navbar.tsx       # Navigation
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── useContent.ts    # Content fetching hook
│   │
│   ├── services/            # API services
│   │   └── contentAPI.ts    # API client
│   │
│   ├── utils/               # Utility functions
│   │   └── parseContent.ts  # Data parsing
│   │
│   ├── data/                # Static data
│   │   └── content.ts       # Fallback data
│   │
│   └── App.tsx              # Main app component
```

### Backend Structure

```
backend/
├── main.py              # FastAPI application
├── data.md              # Content source
├── requirements.txt     # Python dependencies
├── test_api.py          # API test script
└── README.md            # Backend documentation
```

## 🔌 API Contract

### Request: GET /api/content

**Response**:
```json
{
  "config": {
    "contactEmail": "email@example.com",
    "heroTitle": "Hi, I'm Name",
    "heroSubtitle": "Title",
    "phone": "+1-234-567-8900",
    "location": "City, Country"
  },
  "sections": {
    "About": "Bio content with skills...",
    "Education": "## University\n**Degree:**...",
    "Experience": "## Company | Role\n**Period:**...",
    "Projects": "## Project\n**Tech:**...",
    "Contact": "Contact info..."
  },
  "raw_content": "Full markdown content..."
}
```

### Request: GET /api/content/About

**Response**:
```json
{
  "content": "Bio content with skills..."
}
```

## 🎨 Component Data Flow

### Example: Hero Component

```typescript
// 1. Import hook and fallback
import { useContent } from '../hooks/useContent';
import { portfolioData } from '../data/content';

// 2. Use hook to get data
const { config } = useContent();

// 3. Use API data OR fallback
const heroTitle = config?.heroTitle || portfolioData.config.heroTitle;
const heroSubtitle = config?.heroSubtitle || portfolioData.config.heroSubtitle;

// 4. Render with data
return <h1>{heroTitle}</h1>
```

**Flow**:
1. Component mounts
2. `useContent()` returns fallback data immediately
3. Component renders with fallback
4. Hook fetches from API in background
5. If API succeeds, `config` updates
6. Component re-renders with fresh data
7. If API fails, keeps showing fallback

## 🔐 Security & Performance

### CORS Configuration
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Caching Strategy
- **Frontend**: No caching, always fresh data
- **Backend**: Reads file on every request (small file, fast)
- **Polling**: 5-second interval (configurable)

### Error Handling
- **API Timeout**: 10 seconds
- **Fallback**: Immediate on any error
- **Retry**: Every 5 seconds via polling

## 🚀 Deployment Architecture

### Vercel Deployment

```
┌─────────────────────────────────────────┐
│         Vercel Platform                 │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Static Frontend                  │  │
│  │  (portfolio-3d/dist/)             │  │
│  │  • Served from CDN                │  │
│  │  • Fast global delivery           │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Serverless Backend               │  │
│  │  (backend/main.py)                │  │
│  │  • Python runtime                 │  │
│  │  • Auto-scaling                   │  │
│  │  • Cold start: ~1s                │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Routes:                                │
│  • /api/* → Backend function            │
│  • /*     → Static frontend             │
└─────────────────────────────────────────┘
```

### Local Development

```
┌─────────────────────────────────────────┐
│         Your Computer                   │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Frontend Dev Server              │  │
│  │  Port: 5173                       │  │
│  │  Command: npm run dev             │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Backend Server                   │  │
│  │  Port: 8000                       │  │
│  │  Command: python main.py          │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Frontend connects to:                  │
│  http://localhost:8000/api/*            │
└─────────────────────────────────────────┘
```

## 📊 Performance Characteristics

### Initial Load
- **Fallback Data**: 0ms (instant)
- **API Request**: 100-500ms (first time)
- **Total Time to Interactive**: <1s

### Subsequent Updates
- **Polling Interval**: 5s
- **API Response**: 50-200ms
- **UI Update**: <50ms

### Build Size
- **Frontend Bundle**: ~1.3MB (gzipped: ~370KB)
- **Backend**: Serverless (no bundle)

## 🔄 Update Workflow

### Content Update Process

```
1. Edit data.md
   ↓
2. Save file
   ↓
3. (Local) Backend reads new content immediately
   ↓
4. (Production) Commit → Push → Vercel redeploys
   ↓
5. Frontend polls API
   ↓
6. Receives updated content
   ↓
7. UI updates automatically
```

**Time to Update**:
- **Local**: 5 seconds (next poll)
- **Production**: 2-3 minutes (Vercel deploy) + 5 seconds (next poll)

## 🎯 Key Design Decisions

### Why Fallback Data?
- **Reliability**: Website never blank
- **Performance**: Instant initial render
- **User Experience**: Always shows content

### Why 5-Second Polling?
- **Balance**: Fresh data vs. server load
- **User Experience**: Quick enough for live editing
- **Configurable**: Easy to change interval

### Why FastAPI?
- **Performance**: Fast Python framework
- **Type Safety**: Pydantic validation
- **Documentation**: Auto-generated API docs
- **Modern**: Async support, easy deployment

### Why Vercel?
- **Simplicity**: Zero-config deployment
- **Performance**: Global CDN
- **Serverless**: Auto-scaling backend
- **Free Tier**: Generous limits

## 📚 Technology Stack

### Frontend
- **React**: UI framework
- **TypeScript**: Type safety
- **Three.js**: 3D graphics
- **Framer Motion**: Animations
- **Tailwind CSS**: Styling
- **Vite**: Build tool

### Backend
- **FastAPI**: Web framework
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation
- **python-frontmatter**: Markdown parsing
- **python-dotenv**: Environment variables

### Deployment
- **Vercel**: Hosting platform
- **Git**: Version control
- **GitHub**: Repository hosting

---

**This architecture ensures**:
- ✅ Reliability (never blank)
- ✅ Performance (instant load)
- ✅ Maintainability (single source of truth)
- ✅ Scalability (serverless backend)
- ✅ Developer Experience (easy updates)
