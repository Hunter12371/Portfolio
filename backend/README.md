# Portfolio Backend

This is the backend server for the portfolio website. It serves content from a `data.md` file and provides APIs for managing portfolio content and handling contact form submissions.

## Features

- **Dynamic Content Management**: All content is stored in `data.md` and can be easily updated
- **Contact Form**: Sends emails through Gmail SMTP
- **Resume Download**: Serves resume file for download
- **API-driven**: RESTful API for all operations

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Gmail account with app-specific password (for email functionality)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

3. Update `.env` with your credentials:
```
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

### Getting Gmail App Password

1. Go to [Google Account Security Settings](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Under "App passwords", generate a password for "Mail" and "Windows Computer"
4. Use this password as `EMAIL_PASSWORD` in `.env`

## Running the Backend

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The backend will run on `http://localhost:5000`

## API Endpoints

### Get Content
```
GET /api/content
```
Returns all content from `data.md` including configuration and body content.

### Get Specific Section
```
GET /api/content/:section
```
Returns content of a specific section (e.g., "About", "Projects", etc.)

### Update Configuration
```
PUT /api/config
```
Update email, hero title, or subtitle.

Example body:
```json
{
  "contactEmail": "newemail@gmail.com",
  "heroTitle": "Hello, I'm Siddharth",
  "heroSubtitle": "Updated subtitle here"
}
```

### Update Section Content
```
PUT /api/content/:section
```
Update content of a specific section.

Example body:
```json
{
  "newContent": "# New section content..."
}
```

### Send Contact Email
```
POST /api/send-email
```
Send an email through the contact form.

Example body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration Inquiry",
  "message": "I'd like to discuss a project..."
}
```

### Download Resume
```
GET /api/download-resume
```
Downloads the resume PDF file.

### Health Check
```
GET /api/health
```
Returns backend status.

## Managing Content

All content is stored in `data.md`. The file uses front-matter for configuration:

```markdown
---
contactEmail: "work.srivastav@gmail.com"
heroTitle: "Hi, I'm Siddharth"
heroSubtitle: "AI Engineer | Level 99 Gamer | Tech Enthusast"
---

# About
Content here...

# Education
Content here...

# Experience
Content here...

# Projects
Content here...

# Contact
Content here...
```

### Updating Content Manually

Edit `data.md` directly and the changes will be reflected in the API responses.

### Updating via API

Use the PUT endpoints to update content programmatically:

```bash
# Update config
curl -X PUT http://localhost:5000/api/config \
  -H "Content-Type: application/json" \
  -d '{"contactEmail": "newemail@gmail.com"}'

# Update section
curl -X PUT http://localhost:5000/api/content/About \
  -H "Content-Type: application/json" \
  -d '{"newContent": "New about section content..."}'
```

## Frontend Integration

The frontend is automatically configured to use the backend during development through Vite's proxy settings.

For development (in the frontend directory):
```bash
npm run dev
```

The Vite dev server will proxy `/api` requests to `http://localhost:5000`.

## Deployment

### Frontend Deployment
When deploying, update the API URL in `src/services/contentAPI.ts`:

```typescript
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com'
  : 'http://localhost:5000';
```

### Backend Deployment
Deploy the backend to a service like Heroku, Railway, or your own VPS:

1. Set environment variables on the hosting service
2. Run `npm start` as the start command

## Troubleshooting

### Emails not sending
- Check that 2FA is enabled on Gmail
- Verify the app-specific password is correct
- Check backend logs for error messages

### API calls failing
- Ensure backend is running on port 5000
- Check CORS is properly configured
- Verify the API URL in the frontend service file

### Resume download not working
- Ensure `resume/Sidd.pdf` exists
- Check file permissions on the backend server
- Verify the path is correct in the server code

## File Structure

```
backend/
├── src/
│   └── server.js          # Main server file
├── data.md                # All content stored here
├── package.json           # Dependencies
├── .env                   # Environment variables (not in repo)
└── .env.example           # Example env file
```

## License

This backend is part of the portfolio project and is for personal use only.
