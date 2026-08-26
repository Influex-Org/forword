#!/usr/bin/env python3
"""ForWord CMS Server — Python backend for blog posts API + static file serving."""

import json
import os
import re
import time
import cgi
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

PORT = 3456
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'posts.json')
UPLOAD_DIR = os.path.join(BASE_DIR, 'assets', 'blog')

# Ensure directories
os.makedirs(os.path.join(BASE_DIR, 'data'), exist_ok=True)
os.makedirs(UPLOAD_DIR, exist_ok=True)


def read_posts():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        return json.load(f)


def write_posts(posts):
    with open(DATA_FILE, 'w') as f:
        json.dump(posts, f, indent=2)


def slugify(text):
    slug = re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')
    return slug


class ForWordHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/api/posts':
            posts = read_posts()
            posts.sort(key=lambda p: p.get('date', ''), reverse=True)
            self._json_response(posts)
        elif path.startswith('/api/posts/'):
            slug = path.split('/api/posts/')[1]
            posts = read_posts()
            post = next((p for p in posts if p['slug'] == slug), None)
            if post:
                self._json_response(post)
            else:
                self._json_response({'error': 'Post not found'}, 404)
        else:
            super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/api/posts':
            data = self._read_json_body()
            posts = read_posts()
            slug = data.get('slug') or slugify(data.get('title', 'untitled'))
            if any(p['slug'] == slug for p in posts):
                slug += f'-{int(time.time())}'
            post = {
                'slug': slug,
                'title': data.get('title', ''),
                'type': data.get('type', 'article'),
                'excerpt': data.get('excerpt', ''),
                'body': data.get('body', ''),
                'featuredImage': data.get('featuredImage', ''),
                'videoUrl': data.get('videoUrl', ''),
                'audioUrl': data.get('audioUrl', ''),
                'date': data.get('date') or time.strftime('%Y-%m-%d'),
                'published': data.get('published', True),
            }
            posts.append(post)
            write_posts(posts)
            self._json_response(post, 201)

        elif path == '/api/upload':
            content_type = self.headers.get('Content-Type', '')
            if 'multipart/form-data' in content_type:
                # Parse multipart form data
                boundary = content_type.split('boundary=')[1] if 'boundary=' in content_type else None
                if boundary:
                    length = int(self.headers.get('Content-Length', 0))
                    body = self.rfile.read(length)
                    # Simple multipart parser
                    parts = body.split(('--' + boundary).encode())
                    for part in parts:
                        if b'filename="' in part:
                            # Extract filename
                            header_end = part.find(b'\r\n\r\n')
                            headers_str = part[:header_end].decode('utf-8', errors='ignore')
                            file_data = part[header_end + 4:]
                            if file_data.endswith(b'\r\n'):
                                file_data = file_data[:-2]

                            fn_match = re.search(r'filename="([^"]+)"', headers_str)
                            if fn_match:
                                original = fn_match.group(1)
                                name, ext = os.path.splitext(original)
                                safe_name = re.sub(r'[^a-z0-9]', '-', name.lower())
                                filename = f'{safe_name}-{int(time.time())}{ext}'
                                filepath = os.path.join(UPLOAD_DIR, filename)
                                with open(filepath, 'wb') as f:
                                    f.write(file_data)
                                self._json_response({'url': f'assets/blog/{filename}'})
                                return
                self._json_response({'error': 'No file found'}, 400)
            else:
                self._json_response({'error': 'Expected multipart/form-data'}, 400)
        else:
            self._json_response({'error': 'Not found'}, 404)

    def do_PUT(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path.startswith('/api/posts/'):
            slug = path.split('/api/posts/')[1]
            data = self._read_json_body()
            posts = read_posts()
            idx = next((i for i, p in enumerate(posts) if p['slug'] == slug), None)
            if idx is None:
                self._json_response({'error': 'Post not found'}, 404)
                return
            posts[idx].update(data)
            write_posts(posts)
            self._json_response(posts[idx])
        else:
            self._json_response({'error': 'Not found'}, 404)

    def do_DELETE(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path.startswith('/api/posts/'):
            slug = path.split('/api/posts/')[1]
            posts = read_posts()
            idx = next((i for i, p in enumerate(posts) if p['slug'] == slug), None)
            if idx is None:
                self._json_response({'error': 'Post not found'}, 404)
                return
            posts.pop(idx)
            write_posts(posts)
            self._json_response({'success': True})
        else:
            self._json_response({'error': 'Not found'}, 404)

    def _read_json_body(self):
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length)
        return json.loads(body) if body else {}

    def _json_response(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def log_message(self, format, *args):
        if '/api/' in (args[0] if args else ''):
            super().log_message(format, *args)


if __name__ == '__main__':
    server = HTTPServer(('', PORT), ForWordHandler)
    print(f'ForWord server running at http://localhost:{PORT}')
    print(f'Admin panel: http://localhost:{PORT}/admin.html')
    print(f'Blog: http://localhost:{PORT}/words.html')
    server.serve_forever()
