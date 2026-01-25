// sw.js
self.addEventListener("install", () => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker activated");
});

self.addEventListener("message", (event) => {
  if (event.data.type === "notify") {
    self.registration.showNotification("💊 おくすりの時間ですよ〜〜", {
      body: event.data.body,
      icon: "./icon.png"
    });
  }
});