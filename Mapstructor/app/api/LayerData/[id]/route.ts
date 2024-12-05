import { LayerData, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    const layerData:LayerData = await prisma.layerData.findFirst({
        where:{
            id: params.id
        }
    })

    return NextResponse.json({
        layerData
    })
}

export async function PUT(request: Request, context: any) {
    const { params } = context;
    const Layerr: LayerData = await request.json()
    const prisma = new PrismaClient();
    const layer = await prisma.layerData.update({
        where: {
            id: params.id
        },
        data: {
            name: Layerr.name,
            type: Layerr.type,
            iconColor: Layerr.iconColor,
            iconType: Layerr.iconType,
            label: Layerr.label,
            longitude: Layerr.longitude,
            latitude: Layerr.latitude,
            zoom: Layerr.zoom,
            bearing: Layerr.bearing,
            groupName: Layerr.groupName,
            topLayerClass: Layerr.topLayerClass,
            infoId: Layerr.infoId,
            sourceType: Layerr.sourceType,
            sourceUrl: Layerr.sourceUrl,
            sourceId: Layerr.sourceId,
            paint: Layerr.paint,
            sourceLayer: Layerr.sourceLayer,
            hover: Layerr.hover,
            time: Layerr.time,
            click: Layerr.click,
            hoverStyle:Layerr.hoverStyle,
            clickStyle:Layerr.clickStyle,
            clickHeader:Layerr.clickHeader,
            hoverContent:Layerr.hoverContent
        }
    })

    return NextResponse.json({
        layer
    })
}

export async function DELETE(request: Request, context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    await prisma.layerData.delete({
        where:{
            id: params.id
        }
    })

    return NextResponse.json({
        message: "deleted"
    })
}