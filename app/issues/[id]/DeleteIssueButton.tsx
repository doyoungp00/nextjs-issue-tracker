import { Button } from "@radix-ui/themes";
import { AiOutlineDelete } from "react-icons/ai";

function DeleteIssueButton({ id }: { id: number }) {
  return (
    <Button color="red">
      <AiOutlineDelete />
      <span>Delete Issue</span>
    </Button>
  );
}

export default DeleteIssueButton;
