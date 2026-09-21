import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
const root=document.getElementById("root")!;
const app=<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>;
// Marketing pages hydrate their complete build-time HTML; funnel state stays client-only.
if(root.dataset.prerendered === (location.pathname.replace(/\/+$/, "") || "/")) hydrateRoot(root,app);
else createRoot(root).render(app);
