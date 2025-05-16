import { createRoot } from "react-dom/client";
import "@app/index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@app/pages/Home.tsx";
import packageJson from "@root/package.json";
import Game from "@app/pages/Game.tsx";
import Leaderboard from "@app/pages/Leaderboard.tsx";
import Error404 from "@app/pages/errors/Error404.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename="/ts_react/">
        <Routes>
            <Route path="*" element={<Error404 />} />
            <Route index element={<Home version={packageJson.version} />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />}/>
        </Routes>
    </BrowserRouter>
);
