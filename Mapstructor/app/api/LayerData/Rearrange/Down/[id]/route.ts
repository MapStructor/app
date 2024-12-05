import { LayerData, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(request: Request, context: any) {
    const { params } = context;
    const prisma = new PrismaClient();

    let min = 1;
    let currEntry = await prisma.layerData.findFirst({
        where: {
            id: params.id
        }
    })
    let max = await prisma.layerData.count({
        where: {
            topLayerClass: currEntry?.topLayerClass
        }
    })
    let currIndex = currEntry?.order;
    if(currIndex != max && currIndex != undefined) {

        await prisma.layerData.updateMany({
            where:{
                topLayerClass: currEntry?.topLayerClass,
                order: currIndex + 1
            },
            data: {
                order: currIndex
            }
        })

        await prisma.layerData.update({
            where: {
                id: params.id
            },
            data: {
                order: currIndex + 1
            }
        })
    }

    if(currIndex == 0) {
        return NextResponse.json({
            message: "cannot move down anymore"
        })
    }

    return NextResponse.json({
        message: "success"
    })

}