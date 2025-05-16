import type { Dispatch, SetStateAction } from "react";

export default interface SeasonPopUpAttributes {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
