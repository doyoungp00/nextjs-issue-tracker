import { IssueStatus, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Prisma, Status } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Pagination from "../components/Pagnation";
import IssueActions from "./IssueActions";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    orderDir: "asc" | "desc";
    page: string;
  };
}

interface ColumnLink {
  label: string;
  value: keyof Issue;
  className?: string;
}

async function IssuesPage({ searchParams }: Props) {
  // Discard invalid status params
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const columns: ColumnLink[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const defaultOrder: Prisma.IssueOrderByWithRelationInput = {
    createdAt: "desc",
  };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? searchParams.orderDir === "asc" || searchParams.orderDir === "desc"
      ? { [searchParams.orderBy]: searchParams.orderDir }
      : defaultOrder
    : defaultOrder;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });

  function getQuery(column: ColumnLink) {
    const oldOrder = searchParams.orderBy;

    return {
      query: {
        ...searchParams,
        orderBy: column.value,
        orderDir:
          oldOrder === column.value
            ? searchParams.orderDir === "asc"
              ? "desc"
              : "asc"
            : "asc",
      },
    };
  }

  function IssueColumnHead({ column }: { column: ColumnLink }) {
    return (
      <NextLink href={getQuery(column)}>
        {column.label}{" "}
        {searchParams.orderBy === column.value && (
          <>
            {searchParams.orderDir === "asc" && (
              <AiOutlineArrowUp className="inline" />
            )}
            {searchParams.orderDir === "desc" && (
              <AiOutlineArrowDown className="inline" />
            )}
          </>
        )}
      </NextLink>
    );
  }

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <IssueColumnHead column={column} />
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatus status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatus status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toLocaleString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Flex justify="center" mt="4">
        <Pagination
          url="/issues"
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </div>
  );
}

export const dynamic = "force-dynamic";
export default IssuesPage;
