import OlumRouter from "olum-router";
import Home from "../views/Home.js";
import About from "../views/About.js";

const routes = [ { path: "/", comp: Home }, { path: "/about", comp: About } ];

const router = new OlumRouter({ routes });

export default router;