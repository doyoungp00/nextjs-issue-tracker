"use client";

import { ErrorText, LoadingSpinner } from "@/app/components";
import { createIssueSchema } from "@/app/validateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillExclamationCircle } from "react-icons/ai";
import { z } from "zod";

// Dynamically import SimpleMDE with no SSR
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

function IssueForm({ issue }: { issue?: Issue }) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <TextField.Root
        placeholder="Title"
        defaultValue={issue?.title}
        {...register("title")}
      />
      <ErrorText>{errors.title?.message}</ErrorText>
      <Controller
        name="description"
        defaultValue={issue?.description}
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <ErrorText>{errors.description?.message}</ErrorText>
      {error && (
        <Callout.Root color="red" role="alert">
          <Callout.Icon>
            <AiFillExclamationCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Button disabled={isSubmitting}>
        Submit new Issue {isSubmitting && <LoadingSpinner />}
      </Button>
    </form>
  );
}

export default IssueForm;
