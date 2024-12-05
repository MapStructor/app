import { PrismaClient} from "@prisma/client";
import { NextResponse } from "next/server";
import { LayerSectionData } from "@prisma/client";
import { Auth } from "../auth/auth";

export async function GET() {
    const prisma = new PrismaClient();
    const sections = (await prisma.layerSectionData.findMany({
        include: {layers: true}
    }))

    return NextResponse.json({
        sections
    })
}


export async function POST(request: Request) {
    if(!Auth(request)){ //protected endpoint
        return NextResponse.json({
            message: "Not Authorized",
            error: "Auth Token Invaild",
        }, {status: 401});
    }
    const LayerSectionData:LayerSectionData = await request.json()
    const prisma = new PrismaClient();
    try {
        await prisma.layerSectionData.create({
            data: {
                name:LayerSectionData.name,
                sectionName:LayerSectionData.sectionName,
                iconColor:LayerSectionData.iconColor,
                iconType:LayerSectionData.iconType,
                label:LayerSectionData.label,
                longitude:LayerSectionData.longitude,
                latitude:LayerSectionData.latitude,
                zoom:LayerSectionData.zoom,
                bearing:LayerSectionData.bearing,
                topLayerClass:LayerSectionData.topLayerClass,
                infoId:LayerSectionData.infoId,
            }
        })
        return NextResponse.json({
            message: "Success"
        })
    } catch(e) {
        console.log(e)
        throw(e)
    }
}

export async function PUT(request: Request) {
    const LayerSectionData:LayerSectionData = await request.json()
    const prisma = new PrismaClient();
    try {
        await prisma.layerSectionData.update({
            where: {
                id: LayerSectionData.id
            },
            data: {
                name:LayerSectionData.name,
                sectionName:LayerSectionData.sectionName,
                iconColor:LayerSectionData.iconColor,
                iconType:LayerSectionData.iconType,
                label:LayerSectionData.label,
                longitude:LayerSectionData.longitude,
                latitude:LayerSectionData.latitude,
                zoom:LayerSectionData.zoom,
                bearing:LayerSectionData.bearing,
                topLayerClass:LayerSectionData.topLayerClass,
                infoId:LayerSectionData.infoId,
            }
        })
        return NextResponse.json({
            message: "Success"
        })
    }
    catch(e) {
        console.log(e)
        throw(e)
    }
}