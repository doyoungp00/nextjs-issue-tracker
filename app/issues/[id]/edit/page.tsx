import prisma from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

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

export default EditIssuePage;
