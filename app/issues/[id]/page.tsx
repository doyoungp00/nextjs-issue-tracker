import { IssueStatus } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiOutlineEdit } from "react-icons/ai";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

async function IssueDetailsPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue || typeof issue?.id !== "number") notFound();

  await delay(1000);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Box>
        <Heading>{issue?.title}</Heading>
        <Flex gap="2" my="2">
          <IssueStatus status={issue.status} />
          <Text>{issue?.createdAt.toLocaleString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue?.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <AiOutlineEdit />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
}

export default IssueDetailsPage;
