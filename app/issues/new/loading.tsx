import { Box } from "@radix-ui/themes";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

function NewIssueLoadingPage() {
  return (
    <Box className="max-w-xl">
      <IssueFormSkeleton />
    </Box>
  );
}

export default NewIssueLoadingPage;
