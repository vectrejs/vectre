import * as tsx from 'vue-tsx-support';
export declare enum IconSides {
    left = "has-icon-left",
    right = "has-icon-right"
}
export declare type IconSide = keyof typeof IconSides;
export declare const IconContainer: import("vue").VueConstructor<{
    _tsxattrs: tsx.TsxComponentAttrs<{} & {
        side?: "left" | "right";
    }, {}, {}>;
} & import("vue").default & {
    side: "left" | "right";
}>;
