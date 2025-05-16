import type Resource from "@/interfaces/Resource.ts";

export default interface ResourceBarAttributes {
    resources: Resource[];
    workers: number;
}
