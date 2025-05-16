import { getId } from "@/helpers.ts";
import type { ReactElement } from "react";
import type ResourceBarAttributes from "@/interfaces/ResourceBarAttributes.ts";
import type Resource from "@/interfaces/Resource.ts";

export default function ResourceBar({ resources, workers }: ResourceBarAttributes): ReactElement {
    return (
        <div className="flex items-center space-x-4 bg-black/40 rounded-full px-4 py-1">
            {resources.map((resource: Resource) => (
                <div
                    key={getId()}
                    className="flex items-center cursor-pointer hover:bg-white/20 rounded transition-colors duration-200"
                >
                    <img
                        src={resource.icon}
                        alt={resource.alt}
                        className="w-8 h-8 mr-1"
                    />
                    <span className="text-sm text-white font-bold">
                        {resource.alt === "survivor icon" && `${workers}/`}
                        {resource.count}
                    </span>
                </div>
            ))}
        </div>
    );
}