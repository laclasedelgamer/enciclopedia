// Service worker de La Clase del Gamer: la app abre sin internet y las portadas quedan guardadas.
const SHELL = 'lcg-shell-v1';
const IMGS = 'lcg-img-v1';
const SHELL_FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/logo.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== SHELL && k !== IMGS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

async function networkFirst(req, key) {
  const cache = await caches.open(SHELL);
  try {
    const res = await fetch(req, {cache: 'no-store'});
    if (res.ok) cache.put(key || req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(key || req, {ignoreSearch: true});
    if (hit) return hit;
    throw err;
  }
}
async function cacheFirst(req, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (url.pathname.endsWith('/catalogo.json')) { e.respondWith(networkFirst(req, new URL('catalogo.json', self.registration.scope).href)); return; }
    if (url.pathname.includes('/img/')) { e.respondWith(cacheFirst(req, IMGS)); return; }
    if (req.mode === 'navigate') { e.respondWith(networkFirst(req, new URL('./', self.registration.scope).href)); return; }
    e.respondWith(networkFirst(req));
    return;
  }
  if (url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(cacheFirst(req, SHELL));
  }
});
