import type { TileType } from "../types/TileType.ts";

export default interface Tile {
    type: TileType | null;
    workers: number;
}
