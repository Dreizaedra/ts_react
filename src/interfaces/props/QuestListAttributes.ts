import type Quest from "@/interfaces/Quest.ts";

export default interface QuestListAttributes {
    list: Quest[];
    onValidateQuest: (id: number) => void;
}
