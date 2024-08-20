import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

function IssueActions() {
  return (
    <div className="mb-5">
      <Button>
        <AiOutlinePlus />
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}

export default IssueActions;
