# CareerSearch – Smart Job Match

An AI-powered job matching platform that connects candidates and job offers based on professional skills, experience, soft skills, and preferences.

## Features

- **Candidate Profile System** – Full profile with CV/Video CV upload, skills, experience, education, and job preferences
- **AI Job Matching Engine** – Match scores with "Why this job matches you" explanations
- **Job Listings** – Advanced filters (industry, salary, remote, experience) and sorting
- **Messaging System** – Real-time chat interface for recruiter communication
- **Notifications** – New matches, application updates, recruiter messages
- **Analytics** – Profile strength, compatibility graphs, performance tracking

## Tech Stack

- React 19
- Vite
- React Router DOM

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the app, prepares it for GitHub Pages (404.html for SPA routing, .nojekyll), and pushes to the `gh-pages` branch.

**GitHub setup:** In your repo → Settings → Pages → Source: **Deploy from a branch** → Branch: `gh-pages` → Folder: `/ (root)`.

Live site: [https://luc1342as2.github.io/CareerSearch](https://luc1342as2.github.io/CareerSearch)

## Project Structure

```
src/
├── components/     # Navbar, Footer, Dashboard cards
├── context/        # AppContext for global state
├── data/           # Mock data
├── pages/          # Home, Jobs, Profile, Messages, Account
└── App.jsx
```
