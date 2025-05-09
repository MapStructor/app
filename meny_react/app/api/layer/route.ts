import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Layer } from "@prisma/client";


export async function GET() {
 const prisma = new PrismaClient();
 const layer = (await prisma.layer.findMany());
 
 return NextResponse.json({
    layer
 })
}

export async function POST(request: Request) {
    const Layer:Layer = await request.json()
    const prisma = new PrismaClient();
    await prisma.layer.create({
        data: {
            id: Layer.id,
            layerName: Layer.layerName,
            sectionName: Layer.sectionName,
            sourceUrl: Layer.sourceUrl,
            type:Layer.type,
            paint:Layer.paint,
            sourceType:Layer.sourceType,
            visibility:Layer.visibility
        },
    })
    return NextResponse.json({
        message: "Success"
    })
}