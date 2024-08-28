import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const statuses = Object.values(Status);

  const countsArray = await Promise.all(
    statuses.map((status) => prisma.issue.count({ where: { status } }))
  );

  const counts = statuses.reduce((acc, status, index) => {
    acc[status] = countsArray[index];
    return acc;
  }, {} as Record<Status, number>);

  const response = NextResponse.json(counts);
  response.headers.set("Cache-Control", "public, max-age=30");
  return response;
}
