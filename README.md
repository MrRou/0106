Video Library

A minimal static site showcasing embedded streaming videos (YouTube, Vimeo, Google Drive, and MP4).

Run locally

- Using Python 3:

```powershell
python -m http.server 3000
```

- Using npm (recommended if you want a simple server):

```powershell
npm install
npm run start
```

Open http://localhost:3000 in your browser.

Files

- index.html - main UI
- styles.css - styles
- app.js - client logic
- videos.json - sample video list

You can add videos to `videos.json` or use the admin UI. Supported types:

- **YouTube**: `type: "youtube"`, provide `id` (video ID from URL)
- **Vimeo**: `type: "vimeo"`, provide `id` (video ID from URL)
- **Google Drive**: `type: "gdrive"`, provide `id` (file ID from share link)
- **MP4**: `type: "mp4"`, provide `src` (URL to MP4 file)

Optional fields: `poster` (thumbnail image URL), `duration` (display string like "10:34")

Admin UI

- Open `admin.html` to add, remove, and manage videos in the browser.
- Changes can be saved to `localStorage` so the site will use the saved library when present.
- Use the "Download JSON" button to export an updated `videos.json` file for manual replacement on the server.

Notes

- This is a static demo. Writing directly to `videos.json` on the server requires a backend. The admin UI stores edits in `localStorage` and provides an export option for manual updates.

Deploy

- **GitHub Pages (repo root or `gh-pages` branch):**
	- Create a new repository and push the project.
	- In repo settings, enable GitHub Pages (select `main` branch or `gh-pages` branch depending on your workflow).
	- If you prefer a branch deploy, install the `gh-pages` package and run:

```powershell
npm install --save-dev gh-pages
# package.json scripts: "deploy": "gh-pages -d ."
npm run deploy
```

- **Netlify (drag-and-drop or repo connect):**
	- Drag-and-drop the project folder to Netlify, or connect your GitHub repo and set the build command to none (static) and publish directory to `/`.

- **Vercel:**
	- `vercel` will detect a static site; run `vercel` in the project folder and follow prompts.

- **AWS S3 + CloudFront:**
	- Upload the site files to an S3 bucket configured for static website hosting.
	- (Optional) Put CloudFront in front of the bucket for CDN and HTTPS.

- **Simple VPS / Nginx:**
	- Copy files to server and serve with `nginx` or any static file server.

Notes about data and admin UI

- The admin UI writes edits to the browser `localStorage` and will not modify `videos.json` on the server. To persist changes for all visitors, export the JSON in `admin.html` and replace `videos.json` on the deployed site, then redeploy.
- If you want live editing via the admin UI, you'll need a small backend (example: Node.js API to accept and write `videos.json`). I can scaffold that if you want.