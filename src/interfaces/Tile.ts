import type { TileType } from "@app/types/TileType.ts";

export default interface Tile {
    type: TileType | null;
    workers: number;
}
