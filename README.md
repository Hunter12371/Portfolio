# Siddharth's 3D Interactive Portfolio

A modern, interactive 3D portfolio website built with React, TypeScript, Three.js, and Tailwind CSS. Features a dynamic backend for content management and email functionality.

## 🚀 Deploy to Vercel in 5 Minutes

This project is fully configured for one-click Vercel deployment!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo)

**Quick Start:** See [QUICK_START_VERCEL.md](./QUICK_START_VERCEL.md) for 5-minute deployment guide.

**Detailed Guide:** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete instructions.

**Checklist:** Use [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) before deploying.

## Features

✨ **Modern UI**: Beautiful gradient designs with smooth animations  
🎮 **3D Elements**: Interactive 3D scenes using Three.js and React Three Fiber  
📝 **Dynamic Content**: All content managed from a `data.md` file  
📧 **Contact Form**: Email submissions through backend  
📄 **Resume Download**: One-click resume download  
🎨 **Responsive Design**: Fully responsive on all devices  
⚡ **Fast Performance**: Optimized with Vite and React  

## Project Structure

```
portfolio-3d/
├── src/
│   ├── components/          # React components
│   ├── services/            # API service (contentAPI)
│   ├── hooks/               # Custom hooks (useContent)
│   ├── assets/              # Images and other assets
│   ├── canvas/              # 3D canvas components
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css             # Global styles
├── public/                  # Static assets
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install frontend dependencies**:
```bash
cd portfolio-3d
npm install
```

2. **Install backend dependencies** (in separate terminal):
```bash
cd backend
npm install
```

3. **Setup backend environment**:
```bash
cp .env.example .env
# Edit .env with your Gmail credentials
```

### Running the Project

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend**:
```bash
cd portfolio-3d
npm run dev
```
Frontend will run on `http://localhost:5173`

Visit `http://localhost:5173` in your browser.

## Managing Content

All content is stored in `backend/data.md`. This file uses YAML front-matter for configuration:

```markdown
---
contactEmail: "your-email@gmail.com"
heroTitle: "Hi, I'm Siddharth"
heroSubtitle: "Your tagline here"
---

# About
Your about section content...

# Education
Education details...

# Experience
Work experience...

# Projects
Project descriptions...

# Contact
Contact information...
```

### To Update Content

Simply edit `backend/data.md` and the changes will automatically appear on your website. No need to rebuild!

### To Change Contact Email

Edit the `contactEmail` in `backend/data.md`:
```yaml
---
contactEmail: "newemail@gmail.com"
---
```

Or use the API endpoint:
```bash
curl -X PUT http://localhost:5000/api/config \
  -H "Content-Type: application/json" \
  -d '{"contactEmail": "newemail@gmail.com"}'
```

## Backend API

The backend provides these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/content` | GET | Get all content |
| `/api/content/:section` | GET | Get specific section |
| `/api/config` | PUT | Update configuration |
| `/api/content/:section` | PUT | Update section content |
| `/api/send-email` | POST | Send contact email |
| `/api/download-resume` | GET | Download resume |
| `/api/health` | GET | Health check |

For detailed API documentation, see [Backend README](../backend/README.md).

## Email Setup

To enable contact form emails:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an app-specific password at [Google Account Security](https://myaccount.google.com/security)
3. Add to `.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

## Resume Download

Place your resume at `resume/Sidd.pdf`. The download button will automatically serve this file.

## Build & Deployment

### Deploy to Vercel (Recommended)

This project is fully configured for Vercel deployment with both frontend and backend.

**Quick Deploy:**
1. Push your code to GitHub
2. Import to [Vercel](https://vercel.com/new)
3. Add environment variables: `EMAIL_USER` and `EMAIL_PASSWORD`
4. Deploy!

For detailed instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

### Build for Production Locally

```bash
npm run build
```

Creates optimized production build in `portfolio-3d/dist/` folder.

### Other Deployment Options

- **Netlify**: Use the same `vercel.json` configuration
- **Your own server**: Build frontend and deploy with Node.js backend

## Technologies Used

- **Frontend**:
  - React 19
  - TypeScript
  - Vite
  - Tailwind CSS
  - Framer Motion (animations)
  - Three.js & React Three Fiber (3D)
  - Lucide React (icons)
  - Axios (HTTP client)

- **Backend**:
  - FastAPI
  - Python 3.8+
  - Uvicorn (ASGI server)
  - Pydantic (data validation)
  - python-frontmatter (markdown parsing)
  - python-dotenv

## Development

### Component Structure

- **Hero**: Landing section with 3D animation
- **About**: Quick bio and skills
- **Education**: Education details
- **Experience**: Work experience
- **Projects**: Portfolio projects
- **Contact**: Contact form and information
- **Navbar**: Navigation menu
- **Background3D**: 3D background effects

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add to `src/App.tsx`
3. Add content to `backend/data.md`
4. Use hooks to fetch content dynamically

Example:
```tsx
import { useContent } from '../hooks/useContent';

export const MySection = () => {
  const { content } = useContent();
  // Use content...
};
```

## Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Styling

Uses Tailwind CSS with custom configuration. Key color variables:
- `primary`: Dark background (#0a0e27)
- `secondary`: Secondary background
- `accent`: Cyan/blue accent (#38bdf8)
- `text-primary`: Main text color
- `text-secondary`: Secondary text color

## Performance Optimization

- Code splitting with Vite
- Lazy-loaded components
- Optimized 3D scene with React Three Fiber
- Image optimization
- CSS minification

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**Backend not connecting?**
- Ensure backend is running on port 5000
- Check `.env` file is properly configured
- Check CORS is enabled in `vite.config.ts`

**Emails not sending?**
- Verify Gmail credentials in `.env`
- Check 2FA is enabled on Gmail account
- Verify app-specific password is correct

**3D not rendering?**
- Check browser WebGL support
- Try a different browser
- Clear browser cache

## Future Enhancements

- [ ] Admin dashboard for content management
- [ ] Real-time content updates
- [ ] Blog section
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Analytics integration

## License

This project is personal and for portfolio purposes only.

## Contact

For questions or feedback, please use the contact form on the website!

---

**Made with ❤️ by Siddharth**
#   P o r t f o l i o 
 
 