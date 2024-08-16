"use client";

import ErrorText from "@/app/components/ErrorText";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { createIssueSchema } from "@/app/validateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillExclamationCircle } from "react-icons/ai";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

function NewIssuePage() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="max-w-xl">
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setIsSubmitting(false);
            setError("An unexpected error occurred.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorText>{errors.title?.message}</ErrorText>
        <Controller
          name="description"
          control={control}
          render={({ field: props }) => (
            <SimpleMDE placeholder="Description" {...props} />
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
    </div>
  );
}

export default NewIssuePage;
