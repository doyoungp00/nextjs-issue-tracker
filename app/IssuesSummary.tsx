"use client";

import { LoadingSpinner } from "@/app/components";
import { Status } from "@prisma/client";
import { Card, Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import useIssuesStats from "./hooks/useIssuesStats";

function IssuesSummary() {
  const router = useRouter();
  const containers: { label: string; status: Status }[] = [
    { label: "Open Issues", status: "OPEN" },
    { label: "In-Progress Issues", status: "IN_PROGRESS" },
    { label: "Closed Issues", status: "CLOSED" },
  ];

  const { stats, loading, error } = useIssuesStats();

  if (error) return null;

  return (
    <ScrollArea scrollbars="horizontal" className="pb-3">
      <Flex gap="4">
        {containers.map((container) => (
          <Card
            key={container.label}
            onClick={() => router.push(`/issues?status=${container.status}`)}
            className="border transition-all duration-300 hover:border-gray-700 hover:border-1.5 cursor-pointer"
          >
            <Flex direction="column" gap="2" width="9rem">
              {loading && (
                <Heading>
                  <LoadingSpinner />
                </Heading>
              )}
              {stats && <Heading>{stats[container.status]}</Heading>}
              <Text size="2" className="font-medium">
                {container.label}
              </Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </ScrollArea>
  );
}

export default IssuesSummary;
