import { Dialog } from "radix-ui";
import { useGame } from "@app/hooks/useGame";
import type { ReactElement } from "react";
import type SeasonPopUpAttributes from "@app/interfaces/props/SeasonPopUpAttributes.ts";

export default function SeasonPopUp({isOpen, setOpen}: SeasonPopUpAttributes): ReactElement {
    const season = useGame().season;

    return (
        <Dialog.Root open={isOpen} onOpenChange={setOpen}>
            <Dialog.Trigger />
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-xl">
                    <Dialog.Title className="text-lg font-bold mb-2">
                        Season change !
                    </Dialog.Title>
                    <Dialog.Description className="mb-4">
                        Season is now {season} !
                    </Dialog.Description>
                    <Dialog.Close className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                        Close
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
