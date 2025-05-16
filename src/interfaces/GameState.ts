import type { ResourceType } from "@app/types/ResourceType";
import type { TileType } from "@app/types/TileType.ts";
import type Score from "@app/interfaces/Score.ts";
import type Resource from "@app/interfaces/Resource.ts";
import type Tile from "@app/interfaces/Tile.ts";
import type { SeasonType } from "@app/types/SeasonType.ts";
import type { Dispatch, SetStateAction } from "react";

/**
 * Represents the state of the game, including leaderboard, resources, map, and game reset functionality.
 */
export default interface GameState {
    // Leaderboard
    scores: Score[];
    registerScore: (newScore: Score) => void;
    clearScores: () => void;
    checkLength: () => boolean;
    getTop5: () => Score[];
    // Resources
    survivor: Resource;
    workingSurvivors: number;
    food: Resource;
    wood: Resource;
    stone: Resource;
    season: SeasonType;
    addResourceCount: (type: ResourceType, value: number) => void;
    // Map
    grid: Tile[][];
    createHouse: (tile: Tile) => Tile;
    assignToForest: (tile: Tile) => Tile;
    updateTileType: (newType: TileType, rowIndex: number, colIndex: number) => void;
    harvestForestResources: () => void;
    switchSeason: (openModal: Dispatch<SetStateAction<boolean>>) => void;
    // Settings
    time: number;
    start: () => NodeJS.Timeout;
    end: (timer: NodeJS.Timeout) => void;
    reset: () => void;
}
