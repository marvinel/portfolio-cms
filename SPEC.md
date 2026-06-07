# Developer Portfolio + CMS

## Description

A personal developer portfolio website with a built-in admin panel (CMS) for managing content. The public site showcases projects, skills, and blog posts. The admin panel allows creating and editing content without touching code.

## Public Site (what visitors see)

- **Home:** Hero section with name, title, and a brief intro
- **About:** Bio, skills, experience timeline
- **Projects:** Grid of projects with screenshots, descriptions, tech stack, and links
- **Blog:** Posts written in markdown with syntax highlighting
- **Contact:** Contact form that sends emails

## Admin Panel (what you use to manage content)

- **Login:** Protected with authentication (only you can access)
- **Dashboard:** Quick stats (total posts, projects, views)
- **Posts Manager:** Create, edit, delete blog posts (markdown editor with live preview)
- **Projects Manager:** Add, edit, remove portfolio projects (with image upload)
- **Messages:** View contact form submissions

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL with Prisma |
| Auth | NextAuth.js (credentials or GitHub OAuth) |
| Markdown | react-markdown + rehype-highlight (syntax highlighting) |
| Image Upload | Cloudinary (free tier) or UploadThing |
| Email | Resend (free tier, for contact form) |
| Deploy | Vercel |

## Key Technical Features

- **SSG + ISR:** Blog posts and projects are statically generated for speed, revalidated when content changes
- **Responsive:** Mobile-first design that looks good on all devices
- **SEO:** Meta tags, Open Graph, sitemap.xml, robots.txt
- **Dark mode:** Toggle between light and dark themes
- **Syntax highlighting:** Code blocks in blog posts look professional
- **Admin route protection:** Middleware that redirects unauthenticated users

## Why This Stack

- **Next.js SSG/ISR:** Shows you understand rendering strategies (interview topic)
- **NextAuth:** Industry standard for auth in Next.js apps
- **Prisma + PostgreSQL:** Production-ready database (upgrades from SQLite)
- **Markdown:** Devs write in markdown, it's expected
- **Vercel:** Free deploy, custom domain support, great for portfolios
