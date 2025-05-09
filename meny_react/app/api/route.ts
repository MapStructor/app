import { NextResponse } from "next/server";
import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import { PrismaClient, Map } from "@prisma/client";
import { info } from "console";

export async function GET() {
    const prisma = new PrismaClient();
    const map = (await prisma.map.findMany());

    return NextResponse.json({
        map
    })
}
/*
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

 name         String
  checked      Boolean
  infoId       String
  zoomFunction String
*/
// export async function POST(request: Request) {
//         const prisma = new PrismaClient();
//         const m:Map = await request.json();

//         await prisma.m.create({
//         data: {
//             id: m.id,
//             name: m.name,
//             checked: m.checked,
//             infoId: m.infoId,
//             zoomFunction: m.zoomFunction
//         },
//     })
    
//     return NextResponse.json({
//         message: "Success"
//     })
// }


