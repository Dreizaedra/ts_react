import { type ReactElement } from "react";
import GameIcon from "@/assets/icons/shed.svg";
import { Link } from "react-router";
import type HomeAttributes from "@/interfaces/props/HomeAttributes.ts";

export default function Home({ version }: HomeAttributes): ReactElement {
    const subtitles: string[] = [
        "Survive the Chaos",
        "Outlast and Overcome",
        "Strategy is Key",
    ];

    const handleCreditsClick = (): void => {
        alert("Credits clicked!");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md text-center">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={GameIcon}
                        alt="game icon"
                        className="w-24 h-24 mb-4 animate-bounce transform transition-transform duration-300 hover:rotate-12"
                    />
                    <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-2">
                        Survive React
                    </h1>
                    <p className="text-white/80 italic text-lg">
                        {subtitles[Math.floor(Math.random() * subtitles.length)]}
                    </p>
                </div>

                <div className="flex flex-col space-y-4">
                    <Link
                        to="/game"
                        className="w-full py-3 bg-white/30 text-white rounded-lg
                                   hover:bg-white/40 cursor-pointer
                                   active:scale-95
                                   transition-all duration-300
                                   focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                        Play
                    </Link>
                    <button
                        onClick={handleCreditsClick}
                        className="w-full py-3 bg-white/30 text-white rounded-lg
                                   hover:bg-white/40 cursor-pointer
                                   active:scale-95
                                   transition-all duration-300
                                   focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                        Credits
                    </button>
                </div>

                <p className="text-sm text-white/70 mt-6">
                    v{version}
                </p>
            </div>
        </div>
    );
}
