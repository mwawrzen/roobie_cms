
# Roobie CMS - API

Api server for Roobie CMS created with [ElysiaJS](https://elysiajs.com/)


## 🛠️ Tech Stack

* **Bun**: JavaScript runtime and package manager.
* **ElysiaJS**: Fast and minimalist web framework.
* **Drizzle ORM**: TypeScript ORM for SQL databases, ensuring type safety.
* **SQLite**: Lightweight, file-based relational database.
## 🚀 Run Locally

1. Install dependencies: `bun install`
2. Generate migrations: `bun run db:generate`
3. Start dev server: `bun run dev`


## 📦 Build Process

This repository is integrated as a submodule. The distribution repository compiles this code into a standalone `build_server.exe` using Bun's native compilation.

See more in distribution repository: [roobie_dist](https://github.com/mwawrzen/roobie_dist)
