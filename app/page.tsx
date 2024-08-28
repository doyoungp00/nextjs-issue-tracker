import { Flex, Grid } from "@radix-ui/themes";
import IssuesChart from "./IssuesChart";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";

export default function Home() {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="1">
        <IssuesSummary />
        <Flex direction="column" flexGrow="1">
          <IssuesChart />
        </Flex>
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
