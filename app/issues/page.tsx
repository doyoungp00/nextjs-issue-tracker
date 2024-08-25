import prisma from "@/prisma/client";
import { Prisma, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "../components/Pagnation";
import IssueActions from "./IssueActions";
import IssueTable, { columns, IssueQuery } from "./_components/IssueTable";

interface Props {
  searchParams: IssueQuery;
}

async function IssuesPage({ searchParams }: Props) {
  // Discard invalid status params
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const defaultOrder: Prisma.IssueOrderByWithRelationInput = {
    createdAt: "desc",
  };

  // Prisma parameters
  const where = { status };
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? searchParams.orderDir === "asc" || searchParams.orderDir === "desc"
      ? { [searchParams.orderBy]: searchParams.orderDir }
      : defaultOrder
    : defaultOrder;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  // Prisma query
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify="center">
        <Pagination
          url="/issues"
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </Flex>
  );
}

export const dynamic = "force-dynamic";
export default IssuesPage;
