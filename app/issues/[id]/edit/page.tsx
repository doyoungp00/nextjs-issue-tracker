import prisma from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { cache } from "react";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const fetchIssue = cache((id: number) =>
  prisma.issue.findUnique({ where: { id } })
);

interface Props {
  params: { id: string };
}

async function EditIssuePage({ params: { id } }: Props) {
  const issue = await fetchIssue(parseInt(id));

  if (!issue || typeof issue.id !== "number") notFound();

  return (
    <Box className="max-w-xl">
      <IssueForm issue={issue} />
    </Box>
  );
}

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(parseInt(id));
  return {
    title: `${issue?.title} - Issue Tracker`,
    description: `Edit details of issue ${issue?.id}`,
  };
}

export default EditIssuePage;
