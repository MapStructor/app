import { LayerSection, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Auth } from "../auth/auth";


export async function GET() {
    const prisma = new PrismaClient();
    const LayerSections = (await prisma.layerSection.findMany({
        orderBy:{
            order: 'asc'
        },
        include: {
        layerGroups: {
            orderBy: {
                order: 'asc'
            },
            include: {
                layers: {
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        }
    }
    }));

    return NextResponse.json({
        LayerSections
    })
}

export async function POST(request: Request) {
    if(!Auth(request)){ //protected endpoint
        return NextResponse.json({
            message: "Not Authorized",
            error: "Auth Token Invaild",
        }, {status: 401});
    }
    const sectionLayer:LayerSection = await request.json();
    const prisma = new PrismaClient();
    const idx = await prisma.layerSection.count() + 1
    const r = await prisma.layerSection.create({
        data: {
            name: sectionLayer.name,
            order: idx
        }
    })

    return NextResponse.json({
        r
    })
}

export async function PUT(request: Request) {
    const layerSection:LayerSection = await request.json();
    const prisma = new PrismaClient();
    try {
        const r = await prisma.layerSection.update({
            where: {
                id: layerSection.id
            },
            data: {
                name:layerSection.name
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



