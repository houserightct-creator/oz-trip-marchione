# 🇦🇺 OZ Trip 2026 — Marchione Family Trip Planner

A beautiful, fully-editable, real-time synced trip planner for planning your Australia adventure. Built with Next.js, Supabase, and deployed on Vercel.

## Features

✨ **9 Interactive Tabs**
- 🏠 **Overview** — Crew, flights, home base
- 📅 **Schedule** — Daily events and activities
- 🗺️ **Itinerary** — Stay-by-stay stops (fully editable)
- ✓ **Checklists** — Trip logistics, packing, to-dos
- 💰 **Budget** — Track expenses by category
- 🌏 **Explore** — 18 day trip ideas with voting
- 👥 **Contacts** — Family and friends directory
- 📋 **Docs** — Important travel details
- 📝 **Notes** — Free-form trip reminders

🔄 **Real-Time Sync**
- Changes sync instantly across all devices
- Anyone with the link can access and edit
- No login required

📱 **Fully Editable**
- Edit every detail: locations, dates, descriptions, budgets
- Add/remove checklist items
- Add events to the schedule
- Update contacts and documents on the fly

🎨 **Beautiful Design**
- Rust & ochre color scheme
- Card-based layout
- Responsive on all devices
- Dark theme for easy reading

---

## Data Included

- **Crew:** Armando, Rachel, Davina, Armando Jr, Jaxon
- **Dates:** October 26 – December 2, 2026 (37 days)
- **Flights:** Pre-populated with all bookings (Qantas, Alaska Airlines)
- **Itinerary:** 8 major stops from Melbourne to home
- **Checklists:** 3 lists with 30+ items pre-loaded
- **Contacts:** 10 family members with locations
- **Day Trips:** 18 Australian activities to explore
- **Budget:** 8 categories totaling $16,000

---

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Backend:** Supabase (PostgreSQL database)
- **Hosting:** Vercel (free tier)
- **Styling:** Inline CSS (DM Sans + Playfair Display fonts)

---

## Quick Start

1. **Upload to GitHub**
   - Create a repo at github.com/new with name: `oz-trip-marchione`
   - Upload all files from this folder

2. **Deploy to Vercel**
   - Connect your GitHub repo
   - Add 3 environment variables (see QUICK_START.md)
   - Deploy!

3. **Create Database Table**
   - Run the SQL from QUICK_START.md in Supabase SQL Editor

4. **Access Your App**
   - Visit your Vercel URL
   - No login needed — anyone with the link can edit!

---

## Environment Variables

Copy these into Vercel's Environment Variables section:

```
NEXT_PUBLIC_SUPABASE_URL=https://aycqebaivuyeltjzmbzq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Y3FlYmFpdnV5ZWx0anptYnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODk5NTQsImV4cCI6MjA5MjI2NTk1NH0.Z5HVd-R0sHIQ_tLqII4DoQEO9_F97Up3C4PnJpcs-Q8
NEXT_PUBLIC_ACCESS_PASSKEY=australia-2026-marchione-family-secret-7hK2m
```

---

## Project Structure

```
oz-trip-marchione/
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── next.config.js            # Next.js config
├── vercel.json               # Vercel settings
├── .env.example              # Environment template
├── .gitignore                # Git exclusions
├── README.md                 # This file
├── QUICK_START.md            # Deployment guide
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   └── supabase.ts           # Database operations
└── pages/
    ├── _app.tsx              # App wrapper
    ├── _document.tsx         # HTML template
    └── index.tsx             # Main trip planner
```

---

## Development

Run locally before deploying:

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

---

## Cost

- **Supabase:** FREE (generous free tier)
- **Vercel:** FREE (100GB bandwidth/month included)
- **Domains:** FREE (.vercel.app) or optional custom domain ($15/yr)

---

**Ready to plan the adventure?** Follow QUICK_START.md and you'll be live in 15 minutes!
