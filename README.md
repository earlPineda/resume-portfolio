# Earl Kevin E. Pineda — Interactive Portfolio & Resume

Professional portfolio and interactive resume website built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **Motion**, **jsPDF**, and **Express**.

---

## 1. Run Locally in VS Code

1. **Open the project folder in VS Code**:
   - Open a terminal in VS Code (`Ctrl + ~` or **Terminal → New Terminal**).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open in your browser**:
   - Visit **[http://localhost:3000](http://localhost:3000)**

---

## 2. Host on Render.com (Full-Stack Web Service — Recommended)

This setup runs both the React frontend and the Express backend (`/api/contact` email notifications and `/api/avatar` custom photo storage).

1. Push this project folder to your **GitHub** repository (e.g., `https://github.com/earlPineda/resume-portfolio`).
2. Go to **[dashboard.render.com](https://dashboard.render.com/)** and click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Use these exact settings on Render:
   - **Runtime**: `Node`
   - **Build Command**:
     ```bash
     npm install --legacy-peer-deps && npm run build && npm run build:server
     ```
   - **Start Command**:
     ```bash
     npm run start:render
     ```
   - **Instance Type**: `Free`
5. Click **Create Web Service**. Render will build and publish your live URL automatically.

*(Alternatively, since this repository includes a `render.yaml` file, you can click **New + → Blueprint** on Render and select your repository for automatic configuration — it applies the exact Build/Start commands above.)*

### Fixing `Error: ENOENT: no such file or directory, stat '.../dist/index.html'`

That error means the server started but `dist/index.html` was never generated, because **`npm run build` did not run** during the Render build. To fix it:

1. Open your Render service → **Settings → Build & Deploy**.
2. Set the **Build Command** to `npm install --legacy-peer-deps && npm run build && npm run build:server` and the **Start Command** to `npm run start:render`.
3. Click **Manual Deploy → Deploy latest commit**.

As a safety net, `package.json` also defines a `postinstall` script (`npm run build && npm run build:server`), so any build command that runs `npm install` automatically generates `dist/` and `server.cjs` too.

---

## 3. Host on Render.com (Static Site Option)

> **Note:** A static site only serves the built frontend — the Express API routes (`/api/contact`, `/api/avatar`) will **not** work. Prefer the Web Service option above unless you only need static hosting.

1. Click **New +** → **Static Site** on Render.
2. Connect your GitHub repository and configure:
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Publish Directory**: `dist`
