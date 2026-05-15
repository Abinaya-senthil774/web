# The Portfolio — Unified Site

## File Structure

```
portfolio/
├── index.html          ← Home page (book-spine navigation)
├── about_me.html       ← About Me (with hobbies/timeline integrated)
├── skills.html         ← Skills (bookmark-spine design)
├── projects.html       ← Project gallery (library-shelf layout)
├── project_detail.html ← Single project detail (open-book layout)
├── resume.html         ← Resume / dossier
├── contact.html        ← Contact directory
│
├── site.css            ← Shared custom CSS (torn-edge, shadows, textures, etc.)
├── site.js             ← Unified JavaScript (see below)
└── tailwind-config.js  ← Shared Tailwind theme (colors, spacing, fonts)
```

## What site.js handles

| Feature | Details |
|---------|---------|
| **Active nav** | Auto-highlights the correct sidebar nav item based on the current page filename |
| **Nav links** | Wires all `href="#"` nav anchors to real page URLs at runtime |
| **Mobile menu** | Unified `toggleMobileMenu()` for all pages — call from any hamburger button |
| **Contact form** | Validates name, email, subject, message; shows inline success/error |
| **Scroll animations** | IntersectionObserver fade-in for project cards, skill items, etc. |
| **Book-spine nav** | Clicking any book spine on the index page navigates to its section |
| **Project detail nav** | Back button uses `history.back()` (falls back to projects.html); Home → index.html |
| **Smooth scroll** | In-page `href="#anchor"` links scroll smoothly |

## Deployment to GitHub Pages

```bash
# 1. Initialise git (if not already)
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 2. Add all files
git add .
git commit -m "Initial portfolio deploy"

# 3. Push to main
git push -u origin main

# 4. Enable GitHub Pages
#    → Go to repo Settings → Pages → Source: Deploy from branch → main / (root)
#    Your site will be live at: https://YOUR_USERNAME.github.io/YOUR_REPO/
```

> **Tip:** If deploying to a sub-path (e.g. `/my-portfolio/`), all `href` values in `site.js`
> are relative so no changes are needed.

## Customisation checklist

- [ ] Replace all placeholder profile image URLs with your own photo
- [ ] Update name, title, and bio text in each page
- [ ] Fill in LinkedIn, GitHub, Twitter URLs in `contact.html`
- [ ] Add real project URLs to the "Open Up" and GitHub buttons in `projects.html`
- [ ] Update the resume content (experience, education, skills) in `resume.html`
- [ ] Replace `your.email@example.com` and phone number in `contact.html`
- [ ] Wire the contact form to a backend service (FormSpree / EmailJS / etc.)

## Mobile menu — per-page setup

Every page has a hamburger button in the mobile header. Make sure it has:

```html
<button onclick="toggleMobileMenu()" ...>
  <span class="material-symbols-outlined">menu</span>
</button>
```

And the sidebar `<aside>` or `<nav>` must have `id="mobile-menu"`.
