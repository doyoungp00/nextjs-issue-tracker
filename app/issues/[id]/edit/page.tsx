import prisma from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

async function EditIssuePage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue || typeof issue.id !== "number") notFound();

  return (
    <Box className="max-w-xl">
      <IssueForm issue={issue} />
    </Box>
  );
}

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  return {
    title: `${issue?.title} - Issue Tracker`,
    description: `Edit details of issue ${issue?.id}`,
  };
}

export default EditIssuePage;
