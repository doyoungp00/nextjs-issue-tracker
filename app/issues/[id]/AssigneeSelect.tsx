"use client";

import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function AssigneeSelect() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60,
    retry: 3,
  });

  if (error) return null;
  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Select a user..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name} {user.email ? `(${user.email})` : null}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
