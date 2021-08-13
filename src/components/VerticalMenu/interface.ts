export type VerticalMenuItems = Record<string, VerticalMenuItemData> | VerticalMenuItemData[];

export interface VerticalMenuItemData {
  active: boolean;
  badge: string | number;
  text: string;
  path: string;
  divider: boolean;
}
