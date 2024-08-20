import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";

function EditIssueButton({ id }: { id: number }) {
  return (
    <Button>
      <AiOutlineEdit />
      <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
    </Button>
  );
}

export default EditIssueButton;
