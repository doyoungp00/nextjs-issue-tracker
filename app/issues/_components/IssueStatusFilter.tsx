"use client";

import { IssueStatus } from "@/app/components";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

function IssueStatusFilter() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || "all"}>
            {status.value ? <IssueStatus status={status.value!} /> : "All"}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter;
