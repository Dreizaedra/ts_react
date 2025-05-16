import type Resource from "@app/interfaces/Resource.ts";

export default interface ResourceBarAttributes {
    resources: Resource[];
    workers: number;
}
