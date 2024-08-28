import prisma from "@/prisma/client";
import { Avatar, Flex, Heading, HoverCard, Text } from "@radix-ui/themes";
import { AiOutlineUser } from "react-icons/ai";

async function ProfileHoverCard({ id }: { id: string }) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return null;

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
