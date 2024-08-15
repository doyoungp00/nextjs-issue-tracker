"use client";

import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import SimpleMDE from "react-simplemde-editor";

function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" />
      <SimpleMDE />
      <Button>
        <Link href="/">Submit new Issue</Link>
      </Button>
    </div>
  );
}

export default NewIssuePage;
