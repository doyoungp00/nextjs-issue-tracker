import { IssueStatus } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gap="2" my="2">
        <IssueStatus status={issue.status} />
        <Text>{issue?.createdAt.toLocaleString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </>
  );
}

export default IssueDetails;
