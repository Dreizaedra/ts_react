import { create } from "zustand";
import survivorIcon from "@app/assets/icons/survivor.svg";
import foodIcon from "@app/assets/icons/meat.svg";
import woodIcon from "@app/assets/icons/wood.svg";
import stoneIcon from "@app/assets/icons/stone.svg";
import mapGrid from "@app/data/map.json";
import type GameState from "@app/interfaces/GameState.ts";
import type Tile from "@app/interfaces/Tile.ts";
import type Score from "@app/interfaces/Score.ts";
import type { ResourceType } from "@app/types/ResourceType.ts";
import type Resource from "@app/interfaces/Resource.ts";
import type { TileType } from "@app/types/TileType.ts";
import type { SeasonType } from "@app/types/SeasonType.ts";
import type { Dispatch, SetStateAction } from "react";

export const useGame = create<GameState>((set, get) => ({
    scores: [],
    survivor: {
        "icon": survivorIcon,
        "alt": "survivor icon",
        "count": 2,
    },
    workingSurvivors: 0,
    food: {
        "icon": foodIcon,
        "alt": "food icon",
        "count": 20,
    },
    wood: {
        "icon": woodIcon,
        "alt": "wood icon",
        "count": 50,
    },
    stone: {
        "icon": stoneIcon,
        "alt": "stone icon",
        "count": 0,
    },
    season: "summer" as SeasonType,
    grid: mapGrid as Tile[][],
    time: 0,
    harvestForestResources: (): void => {
        const { grid, season, addResourceCount } = get();
        const forestResources = { "food": 0, "wood": 0 };

        grid.forEach(row => {
            row.forEach(tile => {
                if (tile.type === "forest") {
                    if (season === "summer") {
                        forestResources.food += tile.workers;
                    }
                    forestResources.wood += tile.workers;
                }
            });
        });

        addResourceCount("food", forestResources.food);
        addResourceCount("wood", forestResources.wood);
    },
    switchSeason: (openModal: Dispatch<SetStateAction<boolean>>) => {
        const { season } = get();
        set({season: season === "winter" ? "summer" : "winter"});
        openModal(true);
    },
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
                count: currentResource.count + value
            }
        });
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
    assignToForest(tile: Tile): Tile {
        const { survivor, workingSurvivors } = get();

        if (survivor.count >= 1 && survivor.count > workingSurvivors) {
            tile.workers += 1;
            set({workingSurvivors: workingSurvivors + 1});
        }

        return tile;
    },
    updateTileType: (newType: TileType, rowIndex: number, colIndex: number): void => {
        const { grid, createHouse, assignToForest } = get();

        const updatedTiles = grid.map((row: Tile[]) => row.map((tile: Tile) => ({ ...tile })));
        let tile = updatedTiles[rowIndex][colIndex];

        if (tile.type === "forest") {
            tile = assignToForest(tile);
        } else if (newType === 'house' && tile.type !== "house") {
            tile = createHouse(tile);
        }

        updatedTiles[rowIndex][colIndex] = tile;
        set({ grid: updatedTiles });
    },
    start: (): NodeJS.Timeout => setInterval(() => set({time: get().time + 1}), 1000),
    end: (timer: NodeJS.Timeout): void => clearInterval(timer),
    reset: (): void => {
        const { survivor, food, wood, stone } = get();

        set({
            survivor: {
                ...survivor,
                count: 2,
            },
            food: {
                ...food,
                count: 20,
            },
            wood: {
                ...wood,
                count: 50,
            },
            stone: {
                ...stone,
                count: 0,
            },
            time: 0,
            grid: mapGrid as Tile[][],
            workingSurvivors: 0,
            season: "summer" as SeasonType,
        });
    }
}));
