import { type ReactElement } from "react";
import { getId } from "@/helpers.ts";
import type QuestListAttributes from "@/interfaces/props/QuestListAttributes.ts";

export default function QuestList({ list, onValidateQuest }: QuestListAttributes): ReactElement {
    const lastCompletedIndex: number = list.findLastIndex(q => q.isCompleted);
    const startIndex: number = lastCompletedIndex !== -1 ? lastCompletedIndex : 0;

    return (
        <div className="fixed top-16 right-4 w-72 bg-black/40 backdrop-blur-sm rounded-lg p-4 text-white">
            <h2 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Quests</h2>
            {list
                .slice(startIndex, startIndex + 3)
                .map((quest, index) => (
                    <div
                        key={getId()}
                        className="mb-4 pb-4 border-b border-white/10 last:border-b-0"
                    >
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`quest-${quest.title}`}
                                onChange={() => onValidateQuest(quest.id)}
                                checked={quest.isCompleted}
                                disabled={index > 1 || quest.isCompleted}
                                className="mr-3 w-4 h-4
                                           bg-transparent
                                           border-white/50
                                           rounded cursor-pointer
                                           focus:ring-2 focus:ring-white/30"
                            />
                            <label htmlFor={`quest-${quest.title}`} className="font-semibold text-md cursor-pointer">{quest.title}</label>
                        </div>
                        <p className="text-sm text-white/70">{quest.description}</p>
                    </div>
                ))
            }
        </div>
    );
}
