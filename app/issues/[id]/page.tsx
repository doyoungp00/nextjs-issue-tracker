import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

async function IssueDetailsPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue || typeof issue?.id !== "number") notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="2">
          <EditIssueButton id={issue.id} />
          <DeleteIssueButton id={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
}

export default IssueDetailsPage;
