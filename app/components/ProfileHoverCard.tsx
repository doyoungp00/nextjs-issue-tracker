import { User } from "@prisma/client";
import { Avatar, Flex, Heading, HoverCard, Text } from "@radix-ui/themes";
import { AiOutlineUser } from "react-icons/ai";

function ProfileHoverCard({ user }: { user: User }) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Avatar
          src={user.image!}
          fallback={<AiOutlineUser />}
          size="2"
          radius="full"
        />
      </HoverCard.Trigger>
      <HoverCard.Content>
        <Flex direction="column" gap="2">
          <Heading size="2">{user.name}</Heading>
          <Text size="2">{user.email}</Text>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}

export default ProfileHoverCard;
