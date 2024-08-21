"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug, AiOutlineUser } from "react-icons/ai";

function NavBar() {
  return (
    <nav className="border-b mb-6 px-3 py-3">
      <Container>
        <Flex justify="between">
          <Flex gap="4">
            <Link href="/" className="content-center">
              <AiFillBug size="1.5rem" />
            </Link>
            <NavBarLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

function NavBarLinks() {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const currentLink = usePathname();

  return (
    <ul className="flex space-x-4">
      {links.map((link) => (
        <li key={link.href} className="content-center">
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900 font-semibold": link.href === currentLink,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AuthStatus() {
  const { status, data: session } = useSession();

  if (status === "loading") return null;
  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Log In
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session?.user?.image!}
            fallback={<AiOutlineUser />}
            size="2"
            radius="full"
            referrerPolicy="no-referrer"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session?.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}

export default NavBar;
