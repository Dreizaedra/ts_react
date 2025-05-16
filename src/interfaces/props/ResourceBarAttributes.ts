import type Resource from "@app/interfaces/Resource.ts";
import type { SeasonType } from "@app/types/SeasonType.ts";

export default interface ResourceBarAttributes {
    resources: Resource[];
    workers: number;
    season: SeasonType;
}
