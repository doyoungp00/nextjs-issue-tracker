import { Button, TextArea, TextField } from "@radix-ui/themes";
import Link from "next/link";

function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" />
      <Button>
        <Link href="/">Submit new Issue</Link>
      </Button>
    </div>
  );
}

export default NewIssuePage;
