import Olum from "olum";
import router from "./router";

new Olum().$("#app").use(router);

// if ("serviceWorker" in navigator) { // uncomment to enable service worker when deploying
//   window.on("load", () => navigator.serviceWorker.register("/service-worker.js").catch(console.error));
// }