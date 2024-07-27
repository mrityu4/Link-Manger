import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, User, HomeIcon, MoreHorizontal } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: User },
];

export const additionalLinks: AdditionalLinks[] = [];
