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
  const { status, data: session } = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const currentLink = usePathname();

  return (
    <nav className="border-b mb-6 px-3 py-3">
      <Container>
        <Flex justify="between">
          <Flex gap="4">
            <Link href="/" className="content-center">
              <AiFillBug size="1.5rem" />
            </Link>
            <ul className="flex space-x-4">
              {links.map((link) => (
                <li key={link.href} className="content-center">
                  <Link
                    href={link.href}
                    className={classNames({
                      "text-zinc-900 font-semibold": link.href === currentLink,
                      "text-zinc-500": link.href !== currentLink,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Flex content="center">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session?.user?.image!}
                  fallback={<AiOutlineUser />}
                  size="2"
                  radius="full"
                  className="cursor-pointer"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">{session?.user?.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  {status === "authenticated" && (
                    <Link href="/api/auth/signout">Log Out</Link>
                  )}
                  {status === "unauthenticated" && (
                    <Link href="/api/auth/signin">Log In</Link>
                  )}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            <Box></Box>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar;
