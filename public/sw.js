let cacheData = "appV1";
let cacheList = [
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/index.html",
  "/",
  "/about",
  "/users",
  "/favicon.ico",
  "/pwa1.png",
];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(cacheList);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    if (event.request.url === "http://localhost:3000/static/js/bundle.js") {
      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "internet not working",
          icon: "/pwa1.png"
        })
      );
    }
    event.respondWith(
      caches.match(event.request).then((resq) => {
        if (resq) {
          return resq || fetch(event.request.clone());
        }
      })
    );
  }
});

