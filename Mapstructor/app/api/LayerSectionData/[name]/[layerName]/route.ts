import { Auth } from "@/app/api/auth/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function POST(request: Request, context: any) {
    if(!Auth(request)){ //protected endpoint
        return NextResponse.json({
            message: "Not Authorized",
            error: "Auth Token Invaild",
        }, {status: 401});
    }


    const {params} = context
    const prisma = new PrismaClient();
    const s = await prisma.layerSectionData.update({
        where: {
            name: params.name
        },
        data:{
            layers:{
                connect: {
                    layerName: params.layerName
                }
            }
        }

    })
    
    return NextResponse.json({
        message: "success"
    })
}