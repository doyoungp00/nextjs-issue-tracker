"use client";

import { Box } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

function NavBar() {
  const { status, data: session } = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const currentLink = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-6 px-6 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
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
      <Box>
        {status === "authenticated" && (
          <Link
            href="/api/auth/signout"
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            Log Out
          </Link>
        )}
        {status === "unauthenticated" && (
          <Link
            href="/api/auth/signin"
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            Log In
          </Link>
        )}
      </Box>
    </nav>
  );
}

export default NavBar;
