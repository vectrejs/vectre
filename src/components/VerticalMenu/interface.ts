export type VerticalMenuItems =
  | Record<string, VerticalMenuDividerData | VerticalMenuItemData>
  | (VerticalMenuItemData | VerticalMenuDividerData)[]
  | Record<string, unknown>;

export interface VerticalMenuDividerData {
  divider: boolean | string;
}
export interface VerticalMenuItemData {
  active?: boolean;
  badge?: string | number;
  text?: string;
  path?: string;
}
