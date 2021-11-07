import Olum from "olum";
import App from "./App";

new Olum().$("#root").use(App); 

// if ("serviceWorker" in navigator) { // uncomment to enable service worker when deploying
//   window.on("load", () => navigator.serviceWorker.register("/service-worker.js").catch(console.error));
// }