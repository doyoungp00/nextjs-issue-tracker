import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  const response = NextResponse.json(users);
  response.headers.set("Cache-Control", "public, max-age=30");
  return response;
}
