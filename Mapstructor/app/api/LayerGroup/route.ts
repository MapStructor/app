import { PrismaClient} from "@prisma/client";
import { NextResponse } from "next/server";
import { LayerGroup } from "@prisma/client";
import { Auth } from "../auth/auth";


export async function GET() {
    const prisma = new PrismaClient();
    const groups = (await prisma.layerGroup.findMany({
        orderBy:{
            order: 'asc'
        },
        include: {
            layers:true
        }
    }))

    return NextResponse.json({
        groups
    })
}

export async function POST(request: Request) {
    if(!Auth(request)){ //protected endpoint
        return NextResponse.json({
            message: "Not Authorized",
            error: "Auth Token Invaild",
        }, {status: 401});
    }
    const LayerGroup:LayerGroup = await request.json()
    const prisma = new PrismaClient(); 
    try{
        const idx = await prisma.layerGroup.count({
            where: {
                layerSectionId: LayerGroup.layerSectionId
            }
        }) + 1
        const r = await prisma.layerGroup.create({
            data: {
                name:LayerGroup.name,
                layerSectionId:LayerGroup.layerSectionId,
                longitude:LayerGroup.longitude,
                latitude:LayerGroup.latitude,
                zoom:LayerGroup.zoom,
                bearing:LayerGroup.bearing,
                order:idx
            }
        })
        return NextResponse.json({
            r
        })
    }
    
    catch(e) {
        console.log(e)
    }

}

export async function PUT(request: Request) {
    const LayerGroup:LayerGroup = await request.json()
    const prisma = new PrismaClient()

    try {
        const r = await prisma.layerGroup.update({
            where: {
                id: LayerGroup.id
            },
            data: {
                name:LayerGroup.name,
                layerSectionId:LayerGroup.layerSectionId,
                longitude:LayerGroup.longitude,
                latitude:LayerGroup.latitude,
                zoom:LayerGroup.zoom,
                bearing:LayerGroup.bearing  
            }
        })
        return NextResponse.json({
            r
        })
    }
    catch(e) {
        console.log(e)
        throw(e)
    }
}