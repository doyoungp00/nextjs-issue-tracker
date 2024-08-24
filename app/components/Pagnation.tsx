import { Button, Flex, Text } from "@radix-ui/themes";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);
  return (
    <Flex align="center" gap="2">
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <AiOutlineDoubleLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <AiOutlineLeft />
      </Button>

      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>

      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <AiOutlineRight />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <AiOutlineDoubleRight />
      </Button>
    </Flex>
  );
}

export default Pagination;
