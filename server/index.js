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

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (req, res) => res.sendFile(path.join(mirrorRoot, 'www.squarespace.com', 'index.html')));
app.use(express.static(mirrorRoot));

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`[server] Running at http://localhost:${PORT}`);
  });
});
