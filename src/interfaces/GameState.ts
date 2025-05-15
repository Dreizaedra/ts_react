import type { ResourceType } from "../types/ResourceType";
import type { TileType } from "../types/TileType";
import type Resource from "./Resource";
import type Score from "./Score";
import type Tile from "./Tile";

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
    addResourceCount: (type: ResourceType, value: number) => void;
    addResourceLimit: (type: ResourceType, value: number) => void;
    // Map
    grid: Tile[][];
    createHouse: (tile: Tile) => Tile;
    assignToForest: (tile: Tile) => Tile;
    updateTileType: (newType: TileType, rowIndex: number, colIndex: number) => void;
    // Settings
    time: number;
    addTime: (value: number) => void;
    reset: () => void;
}
