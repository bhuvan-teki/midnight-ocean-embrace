# https://loveuladdu.lovable.app

A digital monument and interactive cinematic timeline built to celebrate a long-distance relationship bridging 4,968 kilometers—from Hyderabad, India to Sogod, Cebu. Originally created as a 19th birthday gift, this project documents every milestone, memory, and promise through a highly customized, immersive web experience.

## ✨ The Experience

This isn't just a static website; it's a living scrapbook. 

* **Cinematic Architecture:** A two-scene flow with video backgrounds, smooth opacity transitions, and browser history synchronization (`pushState`/`popstate`).
* **Live Precision Timer:** A real-time counter tracking the exact time since the journey began (July 10, 2025) down to the millisecond, running on a rapid 10ms interval loop.
* **Interactive Storytelling:** A custom typewriter hook (`StoryTypingAnimation`) that reveals the story paragraph by paragraph at a deliberate, reading-optimized pace (30ms per letter) complete with a blinking cursor.
* **The "Auto-Swipe Brain":** Independent scroll controllers attached to horizontal media carousels. They detect bounds and automatically pan through memories, combined with CSS `@keyframes floatY` to give a dreamy, floating aesthetic.
* **Ambient Audio Controller:** A silent-start audio player that smoothly fades into a comfortable medium volume to complement the reading experience without startling the user.
* **Universal Lightbox:** A custom-built, fully responsive modal to zoom into images and videos seamlessly, featuring keyboard accessibility (Escape to close) and fluid scaling.

## 🛠️ Tech Stack

* **Framework:** [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router)
* **Frontend Library:** [React 19](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **UI Components:** [Radix UI](https://www.radix-ui.com/) & Lucide Icons
* **Language:** TypeScript
* **Package Manager:** Bun

## 📂 Project Structure

```text
├── public/                 # Static assets (images, videos, fonts, audio)
├── src/
│   ├── components/ui/      # Reusable Radix UI & Tailwind components
│   ├── lib/                # Utility functions and error handling
│   ├── routes/             # TanStack file-based routing
│   │   ├── __root.tsx      # Root layout and query providers
│   │   └── index.tsx       # The core cinematic experience & story logic
│   ├── styles.css          # Global styles and custom @keyframes
│   └── router.tsx          # TanStack router configuration
├── package.json            # Scripts and dependencies
└── bun.lock                # Bun lockfile
