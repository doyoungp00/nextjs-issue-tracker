"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

function DeleteIssueButton({ id }: { id: number }) {
  const router = useRouter();
  const [error, setError] = useState(false);

  return (
    <>
      {/* Deletion confirm dialog */}
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" className="hover:cursor-pointer">
            <AiOutlineDelete />
            <span>Delete Issue</span>
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Issue?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone.
          </AlertDialog.Description>
          <Flex justify="end" className="mt-4 gap-4">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={deleteIssue} color="red">
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {/* Error dialog */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            There was an error deleting this issue.
          </AlertDialog.Description>
          <Flex justify="end" className="mt-4">
            <Button color="gray" variant="soft" onClick={() => setError(false)}>
              Close
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );

  async function deleteIssue() {
    try {
      axios.delete(`/api/issues/${id}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError(true);
    }
  }
}

export default DeleteIssueButton;
