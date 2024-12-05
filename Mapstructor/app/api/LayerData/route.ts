import { PrismaClient} from "@prisma/client";
import { NextResponse } from "next/server";
import { LayerData } from "@prisma/client";

export async function GET() {
    const prisma = new PrismaClient();
    const LayerData = (await prisma.layerData.findMany())

    return NextResponse.json({
        LayerData
    })
}

export async function POST(request: Request) {
    const layerData:LayerData = await request.json()
    const prisma = new PrismaClient();

    const idx = await prisma.layerData.count({
        where: {
            topLayerClass: layerData.topLayerClass
        }
    })

    try {
        const r = await prisma.layerData.create({
            data:{
                name:layerData.name,
                iconColor:layerData.iconColor,
                iconType:layerData.iconType,
                label:layerData.label,
                longitude:layerData.longitude,
                latitude:layerData.latitude,
                zoom:layerData.zoom,
                bearing:layerData.bearing,
                topLayerClass:layerData.topLayerClass,
                infoId:layerData.infoId,
                type:layerData.type,
                sourceType:layerData.sourceType,
                sourceUrl:layerData.sourceUrl,
                sourceId:layerData.sourceId,
                paint:layerData.paint,
                sourceLayer:layerData.sourceLayer,
                hover:layerData.hover,
                time:layerData.time,
                click:layerData.click,
                hoverStyle:layerData.hoverStyle,
                clickStyle:layerData.clickStyle,
                clickHeader:layerData.clickHeader,
                hoverContent:layerData.hoverContent,
                order:idx + 1
            }
        })
        return NextResponse.json({
            r
        })
    }
    catch (e) 
    {
        throw(e)
    }

}

export async function PUT(request: Request) {
    const layerData:LayerData = await request.json();
    const prisma = new PrismaClient();

    try{
        const r = await prisma.layerData.update({
            where:{
                id: layerData.id
            },
            data: {
                name:layerData.name,
                iconColor:layerData.iconColor,
                iconType:layerData.iconType,
                label:layerData.label,
                longitude:layerData.longitude,
                latitude:layerData.latitude,
                zoom:layerData.zoom,
                bearing:layerData.bearing,
                topLayerClass:layerData.topLayerClass,
                infoId:layerData.infoId,
                type:layerData.type,
                sourceType:layerData.sourceId,
                sourceUrl:layerData.sourceUrl,
                sourceId:layerData.sourceId,
                paint:layerData.paint,
                sourceLayer:layerData.sourceLayer,
                hover:layerData.hover,
                time:layerData.time,
                click:layerData.click
            }
        })
        return NextResponse.json({
            r
        })
    }
    catch(e) {
        throw(e)
    }
}


