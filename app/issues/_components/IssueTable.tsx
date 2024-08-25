import { IssueStatus } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { default as Link, default as NextLink } from "next/link";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  orderDir: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

async function IssueTable({ searchParams, issues }: Props) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <IssueColumnHead searchParams={searchParams} column={column} />
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
  );
}

function IssueColumnHead({
  searchParams,
  column,
}: {
  searchParams: IssueQuery;
  column: Column;
}) {
  return (
    <NextLink href={getQuery(searchParams, column)}>
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

function getQuery(searchParams: IssueQuery, column: Column) {
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

interface Column {
  label: string;
  value: keyof Issue;
  className?: string;
}

export const columns: Column[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export default IssueTable;
