Video Library

A simple static HTML page for embedding and streaming videos from YouTube, Vimeo, Google Drive, MP4 links, and custom embed codes.

Quick Start

1. Open `index.html` in a text editor
2. Edit video sections directly (see examples below)
3. Run a local server:

```powershell
python -m http.server 3000
```

Then visit `http://localhost:3000` in your browser.

Adding Videos

Edit `index.html` and copy one of the existing sections. Each video is wrapped in:

```html
<section class="video-section">
  <h2>Video Title Here</h2>
  <div class="video-wrapper">
    <!-- Embed code goes here -->
  </div>
</section>
```

YouTube Example

```html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

Replace `VIDEO_ID` with the 11-character ID from the YouTube URL (e.g., `dQw4w9WgXcQ`).

Vimeo Example

```html
<iframe src="https://player.vimeo.com/video/VIDEO_ID" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
```

Replace `VIDEO_ID` with the Vimeo video ID (e.g., `90509568`).

Google Drive Example

```html
<iframe src="https://drive.google.com/file/d/FILE_ID/preview" allow="autoplay"></iframe>
```

Replace `FILE_ID` with your Google Drive file ID. Share link format: `https://drive.google.com/file/d/FILE_ID/view`.

MP4 Video Example

```html
<video controls>
  <source src="https://example.com/video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

Custom Embed Example

Any HTML embed code (iframe, script, etc.):

```html
<!-- Paste your embed code here -->
<iframe src="https://example.com/embed" allowfullscreen></iframe>
```

Styling

All videos use the `.video-wrapper` class with a 16:9 aspect ratio. The CSS is embedded in `index.html`. Modify the `<style>` block to customize colors, spacing, etc.

Deploy

- **GitHub Pages:** Push to GitHub, enable Pages in repo settings
- **Netlify:** Drag-and-drop folder or connect repo
- **Vercel:** Run `vercel` in the project folder
- **AWS S3 + CloudFront:** Upload files to S3 bucket
- **Any static host:** Copy files to web server

Notes

- This is a static HTML file—no JavaScript, no database needed
- Edit `index.html` directly to add, remove, or change videos
- Videos are embedded, not hosted (they stream from their original source)
- All video platforms and custom embeds are supported as long as they provide embed/iframe codes