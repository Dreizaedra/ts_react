import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import packageJson from "../package.json";
import Game from "./pages/Game.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";
import Error404 from "./pages/errors/Error404.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<Error404 />} />
            <Route index element={<Home version={packageJson.version} />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />}/>
        </Routes>
    </BrowserRouter>
);
