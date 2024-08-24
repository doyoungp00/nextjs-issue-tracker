import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Grid, Heading } from "@radix-ui/themes";

function IssueDetailsLoadingPage() {
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="4">
      <Box className="md:col-span-4">
        <Heading>
          <Skeleton />
        </Heading>
        <Flex gap="2" my="2">
          <Skeleton width="4rem" />
          <Skeleton width="10rem" />
        </Flex>
        <Card mt="4">
          <Skeleton width="6rem" />
          <Skeleton width="16rem" />
          <Skeleton width="10rem" />
        </Card>
      </Box>
      <Box>
        <Flex direction="column" gap="2">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Flex>
      </Box>
    </Grid>
  );
}

export default IssueDetailsLoadingPage;
