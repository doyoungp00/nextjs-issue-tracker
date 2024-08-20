import { Box } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

function NewIssuePage() {
  return (
    <Box className="max-w-xl">
      <IssueForm />
    </Box>
  );
}

export default NewIssuePage;
