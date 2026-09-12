import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRouter from './routes/api.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mirrorRoot = path.resolve(__dirname, '..', '..', 'squarespace');
const homepagePath = path.join(mirrorRoot, 'www.squarespace.com', 'index.html');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

// The mirror's own relative links assume the page is served from
// /www.squarespace.com/, not from the site root. A <base> tag makes every
// relative link and asset on the homepage resolve against the real mirror
// path even though the browser's address bar stays at "/".
app.get('/', (req, res) => {
  const html = fs.readFileSync(homepagePath, 'utf8')
    .replace('<base #href="">', '<base href="/www.squarespace.com/">');
  res.type('html').send(html);
});

app.use(express.static(mirrorRoot));

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`[server] Running at http://localhost:${PORT}`);
  });
});
