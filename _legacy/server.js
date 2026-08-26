const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3456;
const DATA_FILE = path.join(__dirname, 'data', 'posts.json');
const UPLOAD_DIR = path.join(__dirname, 'assets', 'blog');

// Ensure directories exist
if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, '').replace(/[^a-z0-9]/gi, '-').toLowerCase();
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

// Helpers
function readPosts() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writePosts(posts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

// ============================================
// API Routes
// ============================================

// List all posts (newest first)
app.get('/api/posts', (req, res) => {
  const posts = readPosts().sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(posts);
});

// Get single post
app.get('/api/posts/:slug', (req, res) => {
  const posts = readPosts();
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// Create post
app.post('/api/posts', (req, res) => {
  const posts = readPosts();
  const post = {
    slug: req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: req.body.title,
    type: req.body.type || 'article',
    excerpt: req.body.excerpt || '',
    body: req.body.body || '',
    featuredImage: req.body.featuredImage || '',
    videoUrl: req.body.videoUrl || '',
    audioUrl: req.body.audioUrl || '',
    date: req.body.date || new Date().toISOString().split('T')[0],
    published: req.body.published !== false
  };

  // Check for duplicate slug
  if (posts.find(p => p.slug === post.slug)) {
    post.slug += '-' + Date.now();
  }

  posts.push(post);
  writePosts(posts);
  res.status(201).json(post);
});

// Update post
app.put('/api/posts/:slug', (req, res) => {
  const posts = readPosts();
  const idx = posts.findIndex(p => p.slug === req.params.slug);
  if (idx === -1) return res.status(404).json({ error: 'Post not found' });

  posts[idx] = { ...posts[idx], ...req.body };
  writePosts(posts);
  res.json(posts[idx]);
});

// Delete post
app.delete('/api/posts/:slug', (req, res) => {
  let posts = readPosts();
  const idx = posts.findIndex(p => p.slug === req.params.slug);
  if (idx === -1) return res.status(404).json({ error: 'Post not found' });

  posts.splice(idx, 1);
  writePosts(posts);
  res.json({ success: true });
});

// Upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `assets/blog/${req.file.filename}` });
});

// Start server
app.listen(PORT, () => {
  console.log(`ForWord server running at http://localhost:${PORT}`);
});
