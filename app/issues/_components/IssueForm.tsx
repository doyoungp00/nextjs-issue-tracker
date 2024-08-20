"use client";

import { ErrorText, LoadingSpinner } from "@/app/components";
import { issueSchema } from "@/app/validateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillExclamationCircle, AiOutlineSend } from "react-icons/ai";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

function IssueForm({ issue }: { issue?: Issue }) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (!issue) {
        await axios.post("/api/issues", data);
        router.push("/issues");
      } else {
        await axios.patch(`/api/issues/${issue.id}`, data);
        router.push(`/issues/${issue.id}`);
      }
      router.refresh();
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
        <AiOutlineSend /> {issue ? "Update Issue" : "Submit new Issue"}{" "}
        {isSubmitting && <LoadingSpinner />}
      </Button>
    </form>
  );
}

export default IssueForm;
