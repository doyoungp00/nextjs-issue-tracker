"use client";

import { IssueStatus } from "@/app/components";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

function IssueStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function queryChange(status: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "all") params.delete("status");
    else params.set("status", status);

    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`/issues${query}`);
  }

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "all"}
      onValueChange={(status) => queryChange(status)}
    >
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
