"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  Button,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { getCurrentUser, logout } from "@/app/redux/api/AuthRedux/AuthSlice";
import { useRouter } from "next/navigation";

export default function NavArea() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(getCurrentUser);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = ["Features", "Customers", "Int", "Log Out"];

  return (
    <div className="">
      <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">
              <Link color="foreground" href="/">
                <AcmeLogo />
              </Link>
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 " justify="center">
          <NavbarItem isActive={router.pathname === "/"}>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={router.pathname === "/about-us"}>
            <Link href="about-us">About Us</Link>
          </NavbarItem>
          <NavbarItem isActive={router.pathname === "/my-profile"}>
            {user?.role === "user" && (
              <Link color="foreground" href="my-profile">
                My Profile
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>

        {user?.role === "user" ? (
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="my-profile">
                  <Link href="my-profile">My Profile</Link>
                </DropdownItem>
                <DropdownItem key="post_trip">
                  <Link href="postTravel">My Trips</Link>
                </DropdownItem>
                <DropdownItem key="travel-post-page">
                  <Link href="travel-post-page">Post a Trip</Link>
                </DropdownItem>
                <DropdownItem key="travel-request-history">
                  <Link href="travel-request-history">
                    Travel Request History
                  </Link>
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem>
              <Button color="primary" href="/login" variant="flat">
                <Link href="/login">Login / Sign Up</Link>
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
