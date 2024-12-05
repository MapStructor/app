import { LayerSection, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
    const {params} = context; 
    const prisma = new PrismaClient();
    const layerSection:LayerSection = await prisma.layerSection.findFirst({
        where: {
            id: params.id
        },
        include: {
            layerGroups: {
                include: {
                    layers: true
                }
            }
        }
    })

    return NextResponse.json({
        layerSection
    })

}

export async function PUT(request: Request, context: any) {
    const { params } = context;
    const LayerrSection: LayerSection = await request.json()
    const prisma = new PrismaClient();
    const layer = await prisma.layerSection.update({
        where: {
            id: params.id
        },
        data: {
            name: LayerrSection.name,
        }
    })

    return NextResponse.json({
        layer
    })
}

export async function DELETE(request: Request, context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    try {
        await prisma.layerSection.delete({
            where: {
                id: params.id
            }
        })

        return NextResponse.json({
            Messgae: "Success"
        })
    }
    catch(e) {
        console.log(e) 
        throw(e)
    }

}