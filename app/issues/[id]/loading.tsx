import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function IssueDetailsLoadingPage() {
  return (
    <Box>
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="2" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="10rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton width="6rem" />
        <Skeleton />
        <Skeleton width="10rem" />
      </Card>
    </Box>
  );
}

export default IssueDetailsLoadingPage;
