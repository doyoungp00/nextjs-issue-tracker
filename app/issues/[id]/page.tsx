import IssueStatus from "@/app/components/IssueStatus";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
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
      <Heading>{issue?.title}</Heading>
      <Flex gap="2" my="2">
        <IssueStatus status={issue.status} />
        <Text>{issue?.createdAt.toLocaleString()}</Text>
      </Flex>
      <Card>{issue?.description}</Card>
    </div>
  );
}

export default IssueDetailsPage;
