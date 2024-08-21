"use client";

import { Select } from "@radix-ui/themes";

function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Select a user..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Doyoung Park</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
