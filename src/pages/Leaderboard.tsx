import reactLogo from "@/assets/react.svg";
import { type FormEvent, type ReactElement, useState } from "react";
import { Link } from "react-router";
import { getId } from "@/helpers.ts";
import { useGame } from "@/hooks/useGame.ts";

export default function Leaderboard(): ReactElement {
    const [username, setUsername] = useState("");
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const { time, checkLength, registerScore, getTop5, reset } = useGame();

    const renderButton = (): ReactElement => {
        if (isFormSubmitted) {
            return (
                <Link
                    to="/game"
                    className="w-full py-3 bg-white/30 text-white rounded-lg
                           hover:bg-white/40 cursor-pointer
                           active:scale-95
                           transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                    Play Again
                </Link>
            );
        }

        return (
            <button
                type="submit"
                className="w-full py-3 bg-white/30 text-white rounded-lg
                           hover:bg-white/40 cursor-pointer
                           active:scale-95 disabled:cursor-not-allowed
                           transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-white/30"
                disabled={isFormSubmitted || time === 0}
            >
                Send
            </button>
        );
    };

    const renderScoreBoard = (): ReactElement => {
        if (!checkLength()) {
            return (
                <div className="flex items-center justify-center h-48 text-white/80 text-lg italic">
                    No high scores to show
                </div>
            );
        }

        return (
            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-6">High Scores</h2>

                {getTop5().map((score, index) => (
                        <div
                            key={getId()}
                            className="mb-4 pb-4 border-b border-white/20 last:border-b-0 flex justify-between items-center"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? "bg-yellow-400 text-yellow-900" : index === 1 ? "bg-gray-300 text-gray-800" : index === 2 ? "bg-amber-700 text-amber-100" : "bg-white/20 text-white"}`}>
                                    {index + 1}
                                </div>
                                <p className="text-xl font-medium text-white">{score.username}</p>
                            </div>
                            <span className="text-xl font-bold bg-white/10 px-4 py-1 rounded-full text-white">
                                {score.value}
                            </span>
                        </div>
                    ))
                }
            </div>
        );
    };

    const handleFormSubmit = (ev: FormEvent<HTMLFormElement>): void => {
        ev.preventDefault();
        const value = username.trim();

        if (value.length >= 3 && time > 0) {
            registerScore({ username: value, value: time});
            setIsFormSubmitted(true);
            setUsername("");
            reset();
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md text-center flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center text-white">
                    <img src={reactLogo} alt="react logo" className="w-64 h-64" />
                    <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-2">Game Over</h1>
                    <p className="text-white/80 italic text-lg">Leaderboard</p>
                </div>

                <div>
                    <form onSubmit={handleFormSubmit} className="flex flex-col items-center gap-2">
                        <input
                            type="text"
                            className="w-full p-4 rounded-lg border-white/20 border-2 disabled:cursor-not-allowed"
                            placeholder="Enter your name"
                            value={username}
                            disabled={isFormSubmitted || time === 0}
                            required={true}
                            onChange={(ev) => setUsername(ev.target.value)}
                        />
                        {renderButton()}
                    </form>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md text-center flex flex-col gap-4">
                {renderScoreBoard()}
            </div>
        </div>
    );
}
