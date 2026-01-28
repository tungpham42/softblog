import { getImage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const imageStream = await getImage(key);

  if (!imageStream) {
    return new NextResponse("Image not found", { status: 404 });
  }

  return new NextResponse(imageStream as BodyInit, {
    headers: {
      "Content-Type": "image/jpeg", // Generic fallback
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
