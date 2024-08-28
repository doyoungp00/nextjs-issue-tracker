"use client";

import { LoadingSpinner } from "@/app/components";
import { Status } from "@prisma/client";
import { Card, Flex } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import useIssuesStats from "./hooks/useIssuesStats";

function IssuesChart() {
  const { stats, loading, error } = useIssuesStats();

  if (error) return null;

  const statsArray = stats
    ? [
        { label: "Open", value: stats[Status.OPEN] },
        { label: "In Progress", value: stats[Status.IN_PROGRESS] },
        { label: "Closed", value: stats[Status.CLOSED] },
      ]
    : [];

  return (
    <Card>
      {loading && (
        <Flex
          align="center"
          justify="center"
          style={{ height: "300px", width: "100%" }}
        >
          <LoadingSpinner />
        </Flex>
      )}
      {stats && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statsArray}>
            <XAxis dataKey="label" />
            <YAxis />
            <Bar
              dataKey="value"
              barSize={50}
              style={{ fill: "var(--accent-9)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

export default IssuesChart;
