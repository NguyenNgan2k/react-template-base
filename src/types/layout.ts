import type { FC, SVGProps } from "react";

export type SidebarMode = "full" | "mini" | "hidden";

export interface SidebarItem {
  id: string;
  title: string;
  path: string;
  icon?: FC<SVGProps<SVGSVGElement>>; // component type
  requiresLogin?: boolean;
  children?: SidebarItem[];
}

export type ModeTableSynThetic = "INDAY" | "FOREIGN";
