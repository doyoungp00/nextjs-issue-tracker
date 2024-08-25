import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import IssueStatusFilter from "./_components/IssueStatusFilter";

function IssueActions() {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <Button>
        <AiOutlinePlus />
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
}

export default IssueActions;
