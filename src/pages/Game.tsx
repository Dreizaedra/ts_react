import questList from "@/data/quests.json";
import { type ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import QuestList from "@/components/QuestList.tsx";
import Map from "@/components/Map.tsx";
import ResourceBar from "@/components/ResourceBar.tsx";
import { useGame } from "@/hooks/useGame.ts";

export default function Game(): ReactElement {
    const {
        survivor,
        workingSurvivors,
        food,
        wood,
        stone,
        addResourceCount,
        time,
        addTime,
        grid
    } = useGame();

    const navigate = useNavigate();

    // Getting quests from json file
    const [quests, setQuests] = useState(questList);

    /**
     * Marks a quest as completed by updating its `isCompleted` property to `true`.
     * This function updates the state of quests where the quest's `id` matches the provided `id`.
     *
     * @param {number} id - The identifier of the quest to be marked as completed.
     * @returns {void}
     */
    const validateQuest = (id: number): void => {
        setQuests(quests.map(q => q.id === id ? { ...q, isCompleted: true } : q));
    }

    useEffect(() => {
        const timer = setInterval(() => {
            addTime(1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (time % 5 === 0) {
            const forestResources = { "food": 0, "wood": 0 };

            grid.forEach(row => {
                row.forEach(tile => {
                    if (tile.type === "forest") {
                        forestResources.food += tile.workers;
                        forestResources.wood += tile.workers;
                    }
                });
            });

            addResourceCount("food", forestResources.food);
            addResourceCount("wood", forestResources.wood);
        }

        if (time % 10 === 0) {
            addResourceCount("food", -survivor.count);
        }
    }, [time, grid]);

    useEffect(() => {
        if (food.count <= 0) {
            navigate("/leaderboard");
        }
    }, [food.count, navigate]);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
            <div className="fixed top-0 left-0 right-0 flex justify-between items-center
                            bg-black/30 backdrop-blur-sm
                            px-4 py-2 z-10">
                <Link
                    to="/"
                    className="flex items-center space-x-2
                               text-white/80 hover:text-white
                               bg-white/10 hover:bg-white/20
                               px-3 py-1 rounded-full
                               transition-all duration-300
                               focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Return</span>
                </Link>

                <ResourceBar
                    resources={[survivor, food, wood, stone]}
                    workers={workingSurvivors}
                />
            </div>

            <div className="pt-16 relative">
                <Map />

                <QuestList
                    list={quests}
                    onValidateQuest={validateQuest}
                />
            </div>
        </div>
    );
}
