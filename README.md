## Zipa Frontend

Premium crowdfunding experience for social-impact ventures inspired by Republic. Built with Next.js App Router, TypeScript, and Tailwind CSS.

### Project structure

- `src/app` — App Router entry points, including the home landing page (`page.tsx`) and project detail pages (Maria, Gallikos, SiembraViva)
- `src/lib` — Shared utilities and filesystem helpers
- `public/generated` — Project images and assets

### Development

```bash
npm install
npm run dev -- --port 2020
```

Navigate to [http://localhost:2020](http://localhost:2020).

### Features

- Impact investing crowdfunding platform
- Three featured social-impact projects:
  - **Maria's Olive Loop Furniture** - Circular furniture from olive waste in Cyprus
  - **Gallikos Delta Eco-Corridor** - River delta restoration in Greece
  - **SiembraViva AgriTech Marketplace** - Digital marketplace for Colombian farmers
- Progress tracking, investment details, and project storytelling
- Responsive design with Bank of Cyprus branding
