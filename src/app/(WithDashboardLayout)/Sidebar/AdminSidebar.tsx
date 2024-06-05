import { SidebarItem } from "./SidebarItem";
import { SidebarMenu } from "./SidebarMenu";
import { Sidebar } from "./Sidebar.Style";
import { Car, Cog, Home, Torus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../Layout/LayoutContext";
import { CollapseItems } from "./CollapseItem";

export const AdminSidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          {" "}
          <Link className="flex" href="/">
            <Cog />
            <p className="font-bold text-inherit px-4">APOLLO GEARS</p>
          </Link>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              isActive={pathname === "/Dashboard/admin/trip-management"}
              title="cars manage"
              icon={<Home />}
              href="/Dashboard/admin/trip-management"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/Dashboard/admin/trip-management"}
                title="tour manage"
                icon={<Torus />}
                href="/Dashboard/admin/trip-management"
              />
              <SidebarItem
                isActive={pathname === "/Dashboard/admin/users-management"}
                title="users manage"
                icon={<User />}
                href="/Dashboard/admin/users-management"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
