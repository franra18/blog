# ✍️ Personal Portfolio & Tech Blog

> **My corner of the internet: the projects I build, what I learn along the way, and my path toward becoming an AI Engineer.**

A personal website that combines a **developer portfolio** and a **technical blog** (written in Spanish), built with [Astro](https://astro.build/), Tailwind CSS and Markdown.

[![Live site](https://img.shields.io/badge/🌐_Live_site-franra18.github.io%2Fblog-2ea44f?style=for-the-badge)](https://franra18.github.io/blog)
![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Content](#-content)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Writing a New Post](#️-writing-a-new-post)
- [Deployment](#-deployment)

---

## 🚀 Features

- **⚡ Fast by default:** static site generation with zero JavaScript unless a component needs it (Preact islands).
- **📝 Markdown blog:** posts written in Markdown and managed with Astro **Content Collections**, validated with Zod schemas.
- **🗂️ Posts grouped by project:** each project folder bundles its own series of posts plus a `project.json` with metadata, so the portfolio and the blog stay in sync.
- **🏠 Home page:** hero, tech ribbon, featured projects, recent posts and a career timeline.
- **🌗 Dark / light mode** toggle.
- **📡 RSS feed** at [`/rss.xml`](https://franra18.github.io/blog/rss.xml).
- **📄 Downloadable CV** in English and Spanish.
- **♿ Accessible code highlighting:** Shiki `github-dark-default` theme for AA contrast in code comments.
- **🔗 Safe external links:** opened in a new tab with `noopener noreferrer` via `rehype-external-links`.
- **🤖 Automated deployment** to GitHub Pages with GitHub Actions.

---

## 🛠️ Tech Stack

| Area | Technology |
|---|---|
| Framework | [Astro](https://astro.build/) |
| UI islands | [Preact](https://preactjs.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (Vite plugin) |
| Content | Markdown + Astro Content Collections + Zod |
| Languages | TypeScript, JavaScript, HTML, CSS |
| Package manager | `pnpm` |
| Hosting & CI/CD | GitHub Pages + GitHub Actions |

---

## 📚 Content

Posts are organised into series, one per project:

| Series | What it covers |
|---|---|
| **Blog Astro** | How this site was built: introduction, Tailwind CSS v4 and deploying Astro to GitHub Pages. |
| **Job Hunt MCP** | Building an MCP server with Spring Boot, Spring AI and PostgreSQL to track job applications, analyse skill gaps and prepare interviews ([repo](https://github.com/franra18/job-hunt-copilot-mcp)). |
| **Aprendizajes** | Notes on tools, good practices and technologies, such as RAG (Retrieval-Augmented Generation). |

---

## 📁 Project Structure

```
blog/
├── .github/workflows/deploy.yml   # GitHub Pages deployment
├── public/assets/                 # CVs (EN / ES) and static files
├── src/
│   ├── blog/                      # Content: one folder per project
│   │   ├── <project>/
│   │   │   ├── project.json       # Project metadata (portfolio card)
│   │   │   └── 1-post.md, 2-post.md, ...
│   ├── components/
│   │   ├── blog/                  # PostRow, PostNavigation
│   │   ├── home/                  # Hero, TechRibbon, FeaturedProjects, RecentPosts, Timeline
│   │   ├── layout/                # Header, Navigation, Footer, Socials
│   │   ├── project/               # ProjectCard, ProjectLinks, TechChip
│   │   └── ui/                    # ProgressBar, ThemeIcon, ViewAllLink
│   ├── layouts/                   # BaseLayout, MarkdownPostLayout
│   ├── pages/
│   │   ├── index.astro            # Home
│   │   ├── posts/                 # Post list and post pages
│   │   ├── projects/              # Project list and project pages
│   │   └── rss.xml.js             # RSS feed
│   ├── styles/global.css
│   └── content.config.ts          # Content Collection schemas
└── astro.config.mjs
```

---

## 💻 Getting Started

**Requirements:** Node.js `>= 22.12.0` and `pnpm`.

```bash
# 1. Clone the repository
git clone https://github.com/franra18/blog.git
cd blog

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

Then open [http://localhost:4321/blog/](http://localhost:4321/blog/) in your browser.

| Command | Action |
|---|---|
| `pnpm dev` | Start the local dev server |
| `pnpm build` | Build the production site into `./dist/` |
| `pnpm preview` | Preview the production build locally |

---

## ✍️ Writing a New Post

1. Create (or reuse) a project folder in `src/blog/<project>/`.
2. If it's a new project, add a `project.json`:
   ```json
   {
     "name": "Project name",
     "type": "Backend",
     "description": "Short description shown on the project card.",
     "image": "https://...",
     "technologies": ["Java", "Spring Boot"],
     "github": "https://github.com/...",
     "demo": "https://...",
     "featured": true
   }
   ```
3. Add a Markdown file such as `1-my-post.md` with this frontmatter:
   ```markdown
   ---
   title: 'Post title'
   pubDate: 2026-10-21
   description: 'Short summary of the post.'
   image:
       url: 'https://...'
       alt: 'Image description'
   ---
   ```
4. Files starting with `_` are ignored, which is handy for drafts.

---

## 🚢 Deployment

The site is deployed to **GitHub Pages** at [franra18.github.io/blog](https://franra18.github.io/blog) with the official [`withastro/action`](https://github.com/withastro/action):

- Runs **automatically every Sunday at 00:00 UTC**.
- Can be triggered **manually** from the *Actions* tab (`workflow_dispatch`).

Since the site is served from a subdirectory, `astro.config.mjs` sets `site: 'https://franra18.github.io'` and `base: '/blog/'`.

---

<p align="center">Made by <a href="https://github.com/franra18">Francisco Ramírez Cañadas</a></p>
