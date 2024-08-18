import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import { IconType } from "react-icons";
import {
  AiFillCheckCircle,
  AiFillPlusCircle,
  AiFillRightCircle,
} from "react-icons/ai";

const statusStyles: Record<
  Status,
  {
    label: string;
    badgeColor: "orange" | "blue" | "green";
    icon: IconType;
    textColor: string;
  }
> = {
  OPEN: {
    label: "Open",
    badgeColor: "orange",
    icon: AiFillPlusCircle,
    textColor: "text-orange-400",
  },
  IN_PROGRESS: {
    label: "In Progress",
    badgeColor: "blue",
    icon: AiFillRightCircle,
    textColor: "text-blue-600",
  },
  CLOSED: {
    label: "Closed",
    badgeColor: "green",
    icon: AiFillCheckCircle,
    textColor: "text-green-600",
  },
};

function IssueStatus({ status }: { status: Status }) {
  const {
    label,
    badgeColor,
    icon: StatusIcon,
    textColor,
  } = statusStyles[status];
  return (
    <Badge className="flex items-center gap-1" color={badgeColor}>
      <StatusIcon color={badgeColor} />
      <span className={textColor}>{label}</span>
    </Badge>
  );
}

export default IssueStatus;
