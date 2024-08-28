"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

interface Props {
  url: string;
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

function Pagination({ url, itemCount, pageSize, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;
  if (!currentPage) currentPage = 1;
  if (currentPage > pageCount) currentPage = pageCount;

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${url}?${params}`);
  }

  return (
    <Flex align="center" gap="2">
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
        className={`${
          currentPage === 1 ? "cursor-not-allowed" : "hover:cursor-pointer"
        }`}
      >
        <AiOutlineDoubleLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className={`${
          currentPage === 1 ? "cursor-not-allowed" : "hover:cursor-pointer"
        }`}
      >
        <AiOutlineLeft />
      </Button>

      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
        className={`${
          currentPage === pageCount
            ? "cursor-not-allowed"
            : "hover:cursor-pointer"
        }`}
      >
        <AiOutlineRight />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
        className={`${
          currentPage === pageCount
            ? "cursor-not-allowed"
            : "hover:cursor-pointer"
        }`}
      >
        <AiOutlineDoubleRight />
      </Button>
    </Flex>
  );
}

export default Pagination;
