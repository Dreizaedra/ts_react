import type Quest from "./Quest.ts";

export default interface QuestListAttributes {
    list: Quest[];
    onValidateQuest: (id: number) => void;
}
