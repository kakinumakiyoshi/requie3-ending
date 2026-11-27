// オフライン用：一度開いたアプリ本体と映像・BGMをPCに保存し、ネットがなくても動くようにする。
// ネットがあるときは常に最新を取りに行き、取れなかったときだけ保存済みのものを使う。
const CACHE = "requie3-offline-v2";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([
    "./", "index.html", "control.html", "judge.html", "theater.html", "theater-config.js"
  ])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("requie3-offline-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const isMedia = new URL(req.url).pathname.includes("/media/");
  // 動画の部分読み込み（Range）は保存済みの完全なファイルから返す
  const key = new Request(req.url.split("#")[0]);
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const ctrl = new AbortController();
      const timer = isMedia ? null : setTimeout(() => ctrl.abort(), 4000);
      const res = await fetch(key, { signal: ctrl.signal, cache: "no-cache" });
      if (timer) clearTimeout(timer);
      if (res.ok && res.status === 200) { cache.put(key, res.clone()); }
      return res;
    } catch (err) {
      const hit = await cache.match(key, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === "navigate") { const page = await cache.match(new URL(req.url).pathname.endsWith("/") ? "index.html" : key, { ignoreSearch: true }); if (page) return page; }
      return new Response("オフラインで、このファイルはまだ保存されていません。", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }
  })());
});
