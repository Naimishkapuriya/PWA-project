const swDev = () => {
  function determineAppServerKey() {
    const vapidPublicKey =
      "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
    return urlBase64ToUint8Array(vapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn("response", response);

    return response.pushManager.getSubscription().then(function (subscription) {
      response.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: determineAppServerKey(),
        })
        .then(function (sub) {
          console.log(
            "Subscription successful, Subscription endpoint:",
            sub.endpoint
          );
        })
        .catch(function (error) {
          console.log("Error during subscription ", error);
        });
    });
  });
};
export default swDev;


