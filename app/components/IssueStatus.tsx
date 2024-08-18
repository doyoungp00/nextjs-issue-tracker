import {
  AiFillCheckCircle,
  AiFillPlusCircle,
  AiFillRightCircle,
} from "react-icons/ai";

function IssueStatus({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-1">
      {status === "OPEN" && (
        <>
          <AiFillPlusCircle color="orange" />
          <span className="text-orange-400">OPEN</span>
        </>
      )}
      {status === "IN_PROGRESS" && (
        <>
          <AiFillRightCircle color="blue" />
          <span className="text-blue-600">IN PROGRESS</span>
        </>
      )}
      {status === "CLOSED" && (
        <>
          <AiFillCheckCircle color="green" />
          <span className="text-green-600">CLOSED</span>
        </>
      )}
    </div>
  );
}

export default IssueStatus;
