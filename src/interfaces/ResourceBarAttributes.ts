import type Resource from "./Resource.ts";

export default interface ResourceBarAttributes {
    resources: Resource[];
    workers: number;
}
