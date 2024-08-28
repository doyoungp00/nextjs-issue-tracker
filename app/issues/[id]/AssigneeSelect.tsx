"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Avatar, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineUser } from "react-icons/ai";

function AssigneeSelect({ issue }: { issue: Issue }) {
  const router = useRouter();

  const { data: users, error, isLoading } = useUsers();

  if (error) return null;
  if (isLoading) return <Skeleton height="2rem" />;

  function assignIssue(userId: string) {
    axios
      .patch(`/api/issues/${issue.id}`, {
        title: issue.title,
        description: issue.description,
        assignedToUserId: userId === "unassigned" ? null : userId,
      })
      .then(() => router.refresh())
      .catch(() => toast.error("Changes could not be saved."));
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Select a user..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Users</Select.Label>
            <Select.Item value="unassigned">{"<Unassigned>"}</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                <Avatar
                  src={user.image!}
                  fallback={<AiOutlineUser />}
                  size="2"
                  radius="full"
                />
                {user.name} {user.email ? `(${user.email})` : null}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}

function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60,
    retry: 3,
  });
}

export const dynamic = "force-dynamic";
export default AssigneeSelect;
