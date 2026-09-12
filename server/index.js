import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRouter from './routes/api.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mirrorRoot = path.resolve(__dirname, '..', '..', 'squarespace');
const siteRoot = path.join(mirrorRoot, 'www.squarespace.com');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

// The mirror was captured with www.squarespace.com as the site's real root,
// so every same-host link (e.g. "templates/get-started.html") and the page's
// own client-side router expect to run from "/". Cross-host assets use
// relative "../assets.squarespace.com/..." links, which resolve to
// "/assets.squarespace.com/..." once we're serving from "/" — so a second
// static mount for the sibling host folders (assets.squarespace.com,
// images.squarespace-cdn.com, etc.) is served at the same root.
app.use(express.static(siteRoot));
app.use(express.static(mirrorRoot));

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`[server] Running at http://localhost:${PORT}`);
  });
});
