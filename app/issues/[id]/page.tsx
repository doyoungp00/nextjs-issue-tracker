import authOptions from "@/app/api/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

const fetchIssue = cache((id: number) =>
  prisma.issue.findUnique({ where: { id } })
);

interface Props {
  params: { id: string };
}

async function IssueDetailsPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(parseInt(id));
  if (!issue || typeof issue?.id !== "number") notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="2">
            <AssigneeSelect issue={issue} />
            <EditIssueButton id={issue.id} />
            <DeleteIssueButton id={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(parseInt(id));
  return {
    title: `${issue?.title} - Issue Tracker`,
    description: `Details of issue ${issue?.id}`,
  };
}

export default IssueDetailsPage;
