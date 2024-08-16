"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillExclamationCircle } from "react-icons/ai";
import SimpleMDE from "react-simplemde-editor";

interface IssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const { handleSubmit, register, control } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data);
          router.push("/issues");
        } catch (error) {
          setError("An unexpected error occurred.");
        }
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field: props }) => (
          <SimpleMDE placeholder="Description" {...props} />
        )}
      />
      {error && (
        <Callout.Root color="red" role="alert">
          <Callout.Icon>
            <AiFillExclamationCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Button>Submit new Issue</Button>
    </form>
  );
}

export default NewIssuePage;
