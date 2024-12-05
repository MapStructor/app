import { LayerGroup } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    const layerGroup:LayerGroup = await prisma.layerGroup.findFirst({
        where: {
            id: params.id
        },
        include: {
            layers:true
        }
    })

    return NextResponse.json({
        layerGroup
    })
}

export async function PUT(request: Request, context: any) {
    const { params } = context;
    const LayerrGroup: LayerGroup = await request.json()
    const prisma = new PrismaClient();
    const layer = await prisma.layerGroup.update({
        where: {
            id: params.id
        },
        data: {
            name: LayerrGroup.name,
            layerSectionId: LayerrGroup.layerSectionId,
            longitude: LayerrGroup.longitude,
            latitude: LayerrGroup.latitude,
            zoom: LayerrGroup.zoom,
            bearing: LayerrGroup.bearing,
        }
    })

    return NextResponse.json({
        layer
    })
}

export async function DELETE(request: Request, context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    await prisma.layerGroup.delete({
        where:{
            id: params.id
        }
    })

    return NextResponse.json({
        message: "deleted"
    })
}