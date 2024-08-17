import IssueStatus from "@/app/components/IssueStatus";
import prisma from "@/prisma/client";
import delay from "delay";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

async function IssueDetailsPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue || typeof issue?.id !== "number") notFound();

  await delay(2000);

  return (
    <div>
      <p>{issue?.title}</p>
      <p>{issue?.createdAt.toLocaleString()}</p>
      <IssueStatus status={issue.status} />
      <p>{issue?.description}</p>
    </div>
  );
}

export default IssueDetailsPage;
