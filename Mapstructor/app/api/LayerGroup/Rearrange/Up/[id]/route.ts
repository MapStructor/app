import { LayerGroup, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(request: Request, context: any) {
    const { params } = context;
    const prisma = new PrismaClient();

    let min = 1;
    let max = await prisma.layerGroup.count({
        where: {
            id: params.id
        }
    })
    let currEntry = await prisma.layerGroup.findFirst({
        where: {
            id: params.id
        }
    })
    let currIndex = currEntry?.order;
    if(currIndex != 1 && currIndex != undefined) {

        await prisma.layerGroup.updateMany({
            where:{
                layerSectionId: currEntry?.layerSectionId,
                order: currIndex - 1
            },
            data: {
                order: currIndex
            }
        })

        await prisma.layerGroup.update({
            where: {
                id: params.id
            },
            data: {
                order: currIndex - 1
            }
        })
    }

    if(currIndex == 0) {
        return NextResponse.json({
            message: "Index is 0"
        })
    }

    return NextResponse.json({
        message: "success"
    })

}


