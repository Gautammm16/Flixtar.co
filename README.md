# FLIXTAR — Dynamic Media & Marketing Agency

A full-stack website built with **React + Vite** (frontend) and **Node/Express** (backend).

![Flixtar](https://img.shields.io/badge/Flixtar-Agency-ff3cac?style=for-the-badge)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the project
cd flixtar

# Install root dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

### Development

```bash
# Run both frontend + backend concurrently
npm run dev

# Or run separately:
npm run server    # Express API on port 5000
npm run client    # Vite dev server on port 3000
```

### Production Build

```bash
npm run build     # Builds the React client
npm start         # Serves the built app via Express
```

---

## 📁 Project Structure

```
flixtar/
├── client/                    # React Frontend (Vite)
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Sticky nav with glass effect
│   │   │   ├── Footer.jsx     # Site footer
│   │   │   └── BookCallModal.jsx  # CTA booking modal
│   │   ├── hooks/
│   │   │   ├── api.js         # API helper functions
│   │   │   └── useInView.js   # Scroll animation hook
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Landing page with hero + services
│   │   │   ├── SEOMarketing.jsx   # SEO services + horizontal portfolio
│   │   │   └── UGCPage.jsx    # AI UGC + vertical portfolio + lead form
│   │   ├── styles/
│   │   │   └── global.css     # Full design system
│   │   ├── App.jsx            # Router setup
│   │   └── main.jsx           # React entry
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                    # Express Backend
│   ├── index.js               # API routes (leads, portfolio, testimonials)
│   └── package.json
├── package.json               # Root scripts
└── README.md
```

---

## 🎨 Design System

- **Aesthetic**: Dark cinematic / editorial agency
- **Fonts**: Syne (display), DM Sans (body), Space Mono (mono)
- **Colors**: Electric magenta → Deep purple → Ocean blue gradient
- **Animations**: Scroll-triggered reveals, hover states, marquee stats

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leads` | Capture new lead |
| POST | `/api/book-call` | Book a strategy call |
| GET | `/api/portfolio/seo` | Get SEO portfolio items |
| GET | `/api/portfolio/ugc` | Get UGC portfolio items |
| GET | `/api/testimonials` | Get client testimonials |
| GET | `/api/stats` | Get agency stats |

---

## 🔧 Production Recommendations

1. **Database**: Connect MongoDB or PostgreSQL for lead storage
2. **Email**: Add Nodemailer or SendGrid for lead notifications
3. **CRM**: Integrate HubSpot/Salesforce webhook
4. **Analytics**: Add Google Analytics 4 + Meta Pixel
5. **Hosting**: Deploy on Vercel (frontend) + Railway/Render (backend)
6. **Images**: Replace Unsplash placeholders with real portfolio content
7. **Calendly**: Embed Calendly for actual call booking
8. **SSL**: Ensure HTTPS in production

---

## 📄 Pages

### Home (`/`)
- Hero with tagline and CTA
- Stats marquee bar
- Two service cards (SEO Marketing + AI UGC)
- Client testimonials
- Bottom CTA section

### SEO Marketing (`/seo-marketing`)
- Service-specific hero with metrics
- 6 detailed service cards
- 5-step process timeline
- Horizontal video portfolio with filtering
- CTA banner

### AI UGC (`/ai-ugc`)
- Hero with phone mockups and stats
- Traditional vs AI UGC comparison
- 4 service detail cards
- Vertical content portfolio (9:16)
- Lead capture form with benefits
- FAQ accordion

---

Built with ❤️ by Flixtar
