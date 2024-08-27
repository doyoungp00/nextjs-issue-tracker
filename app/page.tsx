import { Flex } from "@radix-ui/themes";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";

export default function Home() {
  return (
    <Flex direction="column" gap="4">
      <IssuesSummary />
      <LatestIssues />
    </Flex>
  );
}
