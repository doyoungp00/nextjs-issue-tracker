import { Flex } from "@radix-ui/themes";
import IssuesChart from "./IssuesChart";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";

export default function Home() {
  return (
    <Flex direction="column" gap="4">
      <IssuesSummary />
      <LatestIssues />
      <IssuesChart />
    </Flex>
  );
}
