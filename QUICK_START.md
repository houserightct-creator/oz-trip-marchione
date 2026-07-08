# Quick Start — Deploy in 15 Minutes

## ✅ What You Have

- Complete Next.js app with all crew, flights, activities, checklists, contacts
- Dates: October 26 - December 2, 2026
- Passkey: `australia-2026-marchione-family-secret-7hK2m`
- 9 tabs: Overview, Schedule, Itinerary, Checklists, Budget, Explore, Contacts, Docs, Notes
- Full editability across all sections
- No login required — anyone with the link can edit!

---

## Step 1: Upload to GitHub (3 minutes)

1. Go to **[github.com/new](https://github.com/new)**
2. Create new repo called `oz-trip-marchione`
3. Click **"Create repository"**
4. Click **"uploading an existing file"** link
5. Upload ALL files from this folder
6. Click **"Commit changes"**

---

## Step 2: Deploy to Vercel (5 minutes)

1. Go to **[vercel.com](https://vercel.com)**
2. Sign in with GitHub
3. Click **"Add New" → "Project"**
4. Select your `oz-trip-marchione` repo
5. Click **"Import"**

### Add Environment Variables

Before deploying, click **"Environment Variables"** and add these 3:

```
NEXT_PUBLIC_SUPABASE_URL = https://aycqebaivuyeltjzmbzq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Y3FlYmFpdnV5ZWx0anptYnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODk5NTQsImV4cCI6MjA5MjI2NTk1NH0.Z5HVd-R0sHIQ_tLqII4DoQEO9_F97Up3C4PnJpcs-Q8
NEXT_PUBLIC_ACCESS_PASSKEY = australia-2026-marchione-family-secret-7hK2m
```

Then click **"Deploy"** and wait 2-5 minutes.

---

## Step 3: Set Up Supabase Database (IMPORTANT!)

Before you can use the app, you need to create the database table:

1. Go to **[supabase.com](https://supabase.com)** and log in
2. Open your `Australia Trip` project
3. Go to **SQL Editor** (left sidebar)
4. Create a new query and paste this:

```sql
CREATE TABLE trip_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passkey TEXT UNIQUE NOT NULL,
  crew JSONB NOT NULL DEFAULT '[]',
  flights JSONB NOT NULL DEFAULT '[]',
  itinerary JSONB NOT NULL DEFAULT '[]',
  schedule JSONB NOT NULL DEFAULT '[]',
  checklists JSONB NOT NULL DEFAULT '[]',
  budget JSONB NOT NULL DEFAULT '[]',
  contacts JSONB NOT NULL DEFAULT '[]',
  docs JSONB NOT NULL DEFAULT '[]',
  dayTrips JSONB NOT NULL DEFAULT '[]',
  notes TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_passkey ON trip_data(passkey);
```

5. Click **"Run"**

✅ **Done!** Table created.

---

## Step 4: Test It (2 minutes)

1. Visit your Vercel URL (like `https://oz-trip-marchione-xyz.vercel.app`)
2. The app loads automatically — no login screen!
3. You're in! Start editing. 🎉

---

## 📤 Share with Family

Send them this:

```
https://your-vercel-url.vercel.app
```

Everyone can:
- View all itinerary, flights, activities
- Edit checklists, budget, contacts, notes
- Add schedule events
- Vote on day trips
- **All changes sync instantly** across all devices!

---

## 🆘 If Something Goes Wrong

**Error: 404 or "NOT_FOUND"**
- Check that Vercel deployed successfully (green checkmark)
- Make sure environment variables are set
- Make sure Supabase table was created

**Changes not saving**
- Check browser console (F12 → Console) for errors
- Verify Supabase credentials in Vercel environment variables
- Verify the table exists in Supabase

---

**You're all set!** Enjoy planning your OZ adventure! 🇦🇺
