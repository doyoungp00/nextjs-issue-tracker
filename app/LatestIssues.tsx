import { IssueStatus, ProfileHoverCard } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";

async function LatestIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });

  return (
    <Card>
      <Heading size="4" m="3">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex align="center" justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatus status={issue.status} />
                  </Flex>
                  {issue.assignedToUserId && (
                    <ProfileHoverCard id={issue.assignedToUserId} />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}

export default LatestIssues;
