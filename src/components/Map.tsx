import { type ReactElement } from "react";
import { getId } from "../helpers.ts";
import forestIcon from "../assets/icons/tree.svg";
import houseIcon from "../assets/icons/shed.svg";
import mountainIcon from "../assets/icons/mountain.svg";
import { useGame } from "../hooks/useGame.ts";
import type Tile from "../interfaces/Tile.ts";

export default function Map(): ReactElement {
    const { grid, updateTileType } = useGame();

    /**
     * Renders an icon based on the type of the provided cell.
     *
     * @param {Tile} cell - The cell object containing the type information.
     * @returns {ReactElement | null} A React element representing the icon corresponding to the cell type, or null if the type is unrecognized.
     */
    const renderCellIcon = (cell: Tile): ReactElement | null => {
        switch (cell.type) {
            case "forest":
                return (<img src={forestIcon} alt="forest"/>);
            case "house":
                return (<img src={houseIcon} alt="house"/>);
            case "mountain":
                return (<img src={mountainIcon} alt="mountain"/>);
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center mt-6">
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-5 gap-1">
                    {grid.map((row, rowIndex) => (
                        row.map((tile, colIndex) => (
                            <div
                                key={getId()}
                                className="
                                    bg-gray-700
                                    w-16 h-16 
                                    flex items-center justify-center 
                                    rounded-md shadow-md 
                                    cursor-pointer
                                    transition-all duration-300
                                    hover:opacity-80 hover:scale-105
                                    border border-white/10
                                "
                                onClick={() => updateTileType("house", rowIndex, colIndex)}
                            >
                                {renderCellIcon(tile)}
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
}
