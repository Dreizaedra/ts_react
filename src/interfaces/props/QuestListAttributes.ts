import type Quest from "@app/interfaces/Quest.ts";

export default interface QuestListAttributes {
    list: Quest[];
    onValidateQuest: (id: number) => void;
}
