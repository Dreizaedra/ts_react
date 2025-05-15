import { create } from "zustand";
import survivorIcon from "../assets/icons/survivor.svg";
import foodIcon from "../assets/icons/meat.svg";
import woodIcon from "../assets/icons/wood.svg";
import stoneIcon from "../assets/icons/stone.svg";
import mapGrid from "../data/map.json";
import type GameState from "../interfaces/GameState.ts";
import type Tile from "../interfaces/Tile.ts";
import type Score from "../interfaces/Score.ts";
import type { ResourceType } from "../types/ResourceType.ts";
import type Resource from "../interfaces/Resource.ts";
import type { TileType } from "../types/TileType.ts";

export const useGame = create<GameState>((set, get) => ({
    scores: [],
    survivor: {
        "icon": survivorIcon,
        "alt": "survivor icon",
        "count": 2,
        "limit": 10,
    },
    food: {
        "icon": foodIcon,
        "alt": "food icon",
        "count": 20,
        "limit": null,
    },
    wood: {
        "icon": woodIcon,
        "alt": "wood icon",
        "count": 50,
        "limit": null,
    },
    stone: {
        "icon": stoneIcon,
        "alt": "stone icon",
        "count": 0,
        "limit": null,
    },
    grid: mapGrid as Tile[][],
    time: 0,
    registerScore: (newScore: Score): void => {
        // Checking for cheeky cheaters
        if (get().time === newScore.value) {
            set({scores: [...get().scores, {...newScore}]});
        }
    },
    clearScores: (): void => set({scores: []}),
    checkLength: (): boolean => get().scores.length > 0,
    getTop5: (): Score[] => {
        return get().scores
            .sort((a, b) => b.value - a.value)
            .slice(0, 5)
        ;
    },
    addResourceCount: (type: ResourceType, value: number): void => {
        const currentResource: Resource = get()[type];

        set({
            [type]: {
                ...currentResource,
                count: currentResource.limit !== null
                    ? Math.min(currentResource.count + value, currentResource.limit)
                    : currentResource.count + value
            }
        });
    },
    addResourceLimit: (type: ResourceType, value: number): void => {
        const currentResource = get()[type];

        if (currentResource.limit !== null) {
            set({
                [type]: {
                    ...currentResource,
                    limit: currentResource.limit + value
                }
            });
        }
    },
    createHouse(tile: Tile): Tile {
        const { wood, addResourceCount } = get();

        if (wood.count >= 5){
            addResourceCount("wood", -5);
            addResourceCount("survivor", 2);

            tile.type = "house";
        }

        return tile;
    },
    updateTileType: (newType: TileType, rowIndex: number, colIndex: number): void => {
        const { grid, createHouse } = get();

        const updatedTiles = grid.map((row: Tile[]) => row.map((tile: Tile) => ({ ...tile })));
        let tile = updatedTiles[rowIndex][colIndex];

        if (tile.type !== null) {
            return;
        }

        if (newType === 'house') {
            tile = createHouse(tile);
        }

        updatedTiles[rowIndex][colIndex] = tile;
        set({ grid: updatedTiles });
    },
    addTime: (value: number): void => set({time: get().time + value}),
    reset: (): void => {
        const { survivor, food, wood, stone } = get();

        set({
            survivor: {
                ...survivor,
                count: 2,
                limit: 10,
            },
            food: {
                ...food,
                count: 20,
                limit: null,
            },
            wood: {
                ...wood,
                count: 50,
                limit: null,
            },
            stone: {
                ...stone,
                count: 0,
                limit: null,
            },
            time: 0,
            grid: mapGrid as Tile[][],
        });
    }
}));
