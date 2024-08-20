import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";

function IssueDetailsLoadingPage() {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="2" my="2">
        <Skeleton width="4rem" />
        <Skeleton width="10rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton width="6rem" />
        <Skeleton width="16rem" />
        <Skeleton width="10rem" />
      </Card>
    </Box>
  );
}

export default IssueDetailsLoadingPage;
