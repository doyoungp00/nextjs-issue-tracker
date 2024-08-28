import { Box } from "@radix-ui/themes";
import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "New Issue - Issue Tracker",
  description: "Create a new issue",
};

export default NewIssuePage;
