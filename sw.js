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

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {
      // すでにアプリが開いてたら前面に出す
      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }

      // 開いてなければ新しく開く
      if (clients.openWindow) {
        return clients.openWindow("./");
      }
    })
  );
});