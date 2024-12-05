import { PrismaClient, ButtonLink } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const buttonLinks: ButtonLink[] = await prisma.buttonLink.findMany();

    return NextResponse.json({
      buttonLinks,
    });
  } catch (error) {
    console.error("Error fetching button links:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch button links",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const prisma = new PrismaClient();
  const { id } = await request.json();

  try {
    await prisma.buttonLink.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Button link deleted successfully" });
  } catch (error) {
    console.error("Error deleting button link:", error);
    return NextResponse.json(
      { error: "Failed to delete button link" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const buttonLink: ButtonLink = await request.json();

    if (!buttonLink.label || !buttonLink.url) {
      return NextResponse.json(
        { error: "Label and URL are required fields" },
        { status: 400 }
      );
    }

    const newButtonLink = await prisma.buttonLink.create({
      data: {
        label: buttonLink.label,
        url: buttonLink.url,
      },
    });

    return NextResponse.json({
      buttonLink: newButtonLink,
    });
  } catch (error) {
    console.error("Error creating button link:", error);
    return NextResponse.json(
      { error: "Failed to create button link" },
      { status: 500 }
    );
  }
}
