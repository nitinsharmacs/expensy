if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, r) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let o = {};
    const c = (e) => i(e, t),
      l = { module: { uri: t }, exports: o, require: c };
    s[t] = Promise.all(n.map((e) => l[e] || c(e))).then((e) => (r(...e), o));
  };
}
define(['./workbox-27b29e6f'], function (e) {
  'use strict';
  self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: 'assets/index-3b2ac6e8.css', revision: null },
        { url: 'assets/index-3b669906.js', revision: null },
        { url: 'index.html', revision: '53c39ac062f1254ea339dd0427933ffe' },
        { url: 'registerSW.js', revision: '1872c500de691dce40960bb85481de07' },
        {
          url: 'manifest.webmanifest',
          revision: '489c04693897066ca4988c0c2b3c7ed8',
        },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL('index.html'))
    );
});
