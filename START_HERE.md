# 🚀 START YOUR PORTFOLIO

## Quick Start (2 Steps)

### Step 1: Start Frontend
```bash
cd portfolio-3d
npm install
npm run dev
```

Your website will open at: **http://localhost:5173**

### Step 2 (Optional): Start Backend for Live Updates
Open a NEW terminal:
```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs at: **http://localhost:8000**

## ✅ What You Should See

When you open **http://localhost:5173**, you should see:

1. **Hero Section**: "Hi, I'm Siddharth" with 3D animation
2. **About Section**: Your bio and skills
3. **Education Section**: CHRIST University details
4. **Experience Section**: 4 experiences (Intel, Faramond, Acmegrade, IEEE AESS)
5. **Projects Section**: 3 projects
6. **Contact Section**: Email, phone, location

## 🐛 If You See Blank Page

### Check 1: Is the dev server running?
Look for this message in terminal:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Check 2: Open browser console (F12)
- Press F12 in your browser
- Click "Console" tab
- Look for any RED errors
- Share the errors if you see any

### Check 3: Hard refresh
- Press `Ctrl + Shift + R` (Windows)
- Or `Cmd + Shift + R` (Mac)

### Check 4: Clear cache
- Close browser completely
- Reopen and go to http://localhost:5173

## 📝 Update Your Content

Edit this file: `backend/data.md`

Changes will appear:
- **With backend running**: In 5 seconds
- **Without backend**: After you restart frontend

## 🎯 Current Status

✅ Build successful (no errors)
✅ All components fixed
✅ Fallback data working
✅ TypeScript errors resolved
✅ Ready to run!

## 🆘 Still Having Issues?

1. Stop all running processes (Ctrl+C in terminals)
2. Delete `portfolio-3d/node_modules` folder
3. Run:
```bash
cd portfolio-3d
npm install
npm run dev
```

4. If still blank, check browser console (F12) and share the error messages

## 📞 What Was Fixed

- ✅ Components now use fallback data when API unavailable
- ✅ Hero shows your name and title
- ✅ About shows your bio and skills
- ✅ Education shows CHRIST University
- ✅ Experience shows all 4 positions
- ✅ Projects show all 3 projects
- ✅ Contact shows your email, phone, location

**The website should NEVER be blank now!**
