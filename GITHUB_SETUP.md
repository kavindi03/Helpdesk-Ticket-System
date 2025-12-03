# GitHub Submission Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click **"+"** in top right → **"New repository"**
3. Repository name: `HelpdeskAssessment`
4. Description: `Helpdesk Ticket System - Full Stack Assessment (React, Node.js, SQLite, .NET)`
5. Choose **Public** (for visibility)
6. **Do NOT** initialize with README (we have one)
7. Click **"Create repository"**

## Step 2: Connect Local Repository to GitHub

Open PowerShell in `D:\HelpdeskAssessment` and run:

```powershell
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/HelpdeskAssessment.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 3: Verify on GitHub

1. Go to your repository: `https://github.com/YOUR_USERNAME/HelpdeskAssessment`
2. You should see:
   - All folders (frontend, api, dotnet-task, sql)
   - README.md with setup instructions
   - .gitignore
   - All source files

## Step 4: Submit

Share the GitHub link with your assessor:
```
https://github.com/YOUR_USERNAME/HelpdeskAssessment
```

---

## Troubleshooting GitHub Push

### "fatal: no git repository found"
```powershell
cd D:\HelpdeskAssessment
git status  # Should show branch: main
```

### Authentication failed
```powershell
# Use personal access token instead of password
# Go to GitHub → Settings → Developer settings → Personal access tokens
# Generate token and use it when prompted
```

### Need to add files again
```powershell
git add .
git commit -m "Update: Add all files"
git push
```

---

## What Should Be on GitHub

✅ **Folders:**
- `/frontend` - React application
- `/api` - Express.js backend
- `/dotnet-task` - .NET console app
- `/sql` - Database schema and queries

✅ **Files:**
- `README.md` - Setup instructions
- `COMPLETION_CHECKLIST.md` - Task completion status
- `.gitignore` - Git ignore rules
- `package.json` - Project dependencies
- `HelpdeskAssessment.sln` - Visual Studio solution

✅ **Not on GitHub (ignored):**
- `node_modules/`
- `.env` (should be documented but not committed)
- `*.db` (SQLite database files)
- `bin/`, `obj/` (.NET build files)

---

## Quick Reference

| `git commit` | Create commit ✅ (Done) |
| `git remote add origin URL` | Connect to GitHub |
| `git branch -M main` | Rename to main branch |
| `git push -u origin main` | Push to GitHub |
| `git status` | Check status |

---

## Final Submission Steps

### 1. Create Repository
Visit: https://github.com/new
- Name: `HelpdeskAssessment`
- Description: `Helpdesk Ticket System - Full Stack Assessment`
- Select: Public
- Click: Create

### 2. Push Code (Copy-Paste These Commands)
```powershell
cd D:\HelpdeskAssessment
git remote add origin https://github.com/YOUR_USERNAME/HelpdeskAssessment.git
git branch -M main
git push -u origin main
```

### 3. Verify
Visit: `https://github.com/YOUR_USERNAME/HelpdeskAssessment`

### 4. Submit Link
Share: `https://github.com/YOUR_USERNAME/HelpdeskAssessment`

---

## Final Checklist

- [x] Repository initialized locally
- [x] All files committed
- [ ] GitHub repository created (do this first)
- [ ] Code pushed to GitHub (next)
- [ ] Repository link ready to submit
- [ ] README visible on GitHub
- [ ] All folders present on GitHub
| `git commit -m "message"` | Create commit ✅ (Done) |
| `git remote add origin URL` | Connect to GitHub |
| `git branch -M main` | Rename to main branch |
| `git push -u origin main` | Push to GitHub |
| `git status` | Check status |

---

## Final Checklist

- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Local git repository initialized ✅
- [ ] Files committed locally ✅
- [ ] Remote added and pushed to GitHub
- [ ] Repository is public and visible
- [ ] README appears on GitHub
- [ ] All folders visible on GitHub
- [ ] Submission link ready
