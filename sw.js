// Sadece uygulama kabuğunu önbelleğe alır; panel verileri her zaman canlı gelir.
const ON_BELLEK = "ritmova-kabuk-v1";
const DOSYALAR = ["./", "index.html", "manifest.json", "apple-touch-icon.png", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(ON_BELLEK).then(c => c.addAll(DOSYALAR))));
self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(x => x !== ON_BELLEK).map(x => caches.delete(x))))
));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
