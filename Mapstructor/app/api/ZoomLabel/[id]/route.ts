import { LayerSection, PrismaClient, ZoomLabel } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(context: any) {
    const {params} = context; 
    const prisma = new PrismaClient();
    const zoomLabel:ZoomLabel | null = await prisma.zoomLabel.findFirst({
        where: {
            id: params.id
        }
    })

    if(zoomLabel == null) {
        return NextResponse.error()
    }

    return NextResponse.json({
        zoomLabel
    })

}

export async function PUT(request: Request, context: any) {
    const ZoomLabel:ZoomLabel = await request.json()
    const prisma = new PrismaClient()
    const { params } = context;

    try {
        const r = await prisma.zoomLabel.update({
            where: {
                id: params.id
            },
            data: {
                title: ZoomLabel.title,
                minZoom: ZoomLabel.minZoom,
                zoom: ZoomLabel.zoom,
                bearing: ZoomLabel.bearing,
                centerLatitude: ZoomLabel.centerLatitude,
                centerLongitude: ZoomLabel.centerLongitude,
                topLeftBoundLatitude: ZoomLabel.topLeftBoundLatitude,
                topLeftBoundLongitude: ZoomLabel.topLeftBoundLongitude,
                bottomRightBoundLatitude: ZoomLabel.bottomRightBoundLatitude,
                bottomRightBoundLongitude: ZoomLabel.bottomRightBoundLongitude,
                zoomToBounds: ZoomLabel.zoomToBounds,
                useTextSizeZoomStyling: ZoomLabel.useTextSizeZoomStyling,
                textSizeDefault: ZoomLabel.textSizeDefault,
                textSizeStopsZoom1: ZoomLabel.textSizeStopsZoom1,
                textSizeStopsVal1: ZoomLabel.textSizeStopsVal1,
                textSizeStopsZoom2: ZoomLabel.textSizeStopsZoom2,
                textSizeStopsVal2: ZoomLabel.textSizeStopsVal2,
                useTextColorZoomStyling: ZoomLabel.useTextColorZoomStyling,
                textColorDefault: ZoomLabel.textColorDefault,
                textColorStopsZoom1: ZoomLabel.textColorStopsZoom1,
                textColorStopsVal1: ZoomLabel.textColorStopsVal1,
                textColorStopsZoom2: ZoomLabel.textColorStopsZoom2,
                textColorStopsVal2: ZoomLabel.textColorStopsVal2,
                useTextHaloWidthZoomStyling: ZoomLabel.useTextHaloWidthZoomStyling,
                textHaloWidthDefault: ZoomLabel.textHaloWidthDefault,
                textHaloWidthStopsZoom1: ZoomLabel.textHaloWidthStopsZoom1,
                textHaloWidthStopsVal1: ZoomLabel.textHaloWidthStopsVal1,
                textHaloWidthStopsZoom2: ZoomLabel.textHaloWidthStopsZoom2,
                textHaloWidthStopsVal2: ZoomLabel.textHaloWidthStopsVal2,
                useTextHaloBlurZoomStyling: ZoomLabel.useTextHaloBlurZoomStyling,
                textHaloBlurDefault: ZoomLabel.textHaloBlurDefault,
                textHaloBlurStopsZoom1: ZoomLabel.textHaloBlurStopsZoom1,
                textHaloBlurStopsVal1: ZoomLabel.textHaloBlurStopsVal1,
                textHaloBlurStopsZoom2: ZoomLabel.textHaloBlurStopsZoom2,
                textHaloBlurStopsVal2: ZoomLabel.textHaloBlurStopsVal2,
                useTextHaloColorZoomStyling: ZoomLabel.useTextHaloColorZoomStyling,
                textHaloColorDefault: ZoomLabel.textHaloColorDefault,
                textHaloColorStopsZoom1: ZoomLabel.textHaloColorStopsZoom1,
                textHaloColorStopsVal1: ZoomLabel.textHaloColorStopsVal1,
                textHaloColorStopsZoom2: ZoomLabel.textHaloColorStopsZoom2,
                textHaloColorStopsVal2: ZoomLabel.textHaloColorStopsVal2,
                useTextOpacityZoomStyling: ZoomLabel.useTextOpacityZoomStyling,
                textOpacityDefault: ZoomLabel.textOpacityDefault,
                textOpacityStopsZoom1: ZoomLabel.textOpacityStopsZoom1,
                textOpacityStopsVal1: ZoomLabel.textOpacityStopsVal1,
                textOpacityStopsZoom2: ZoomLabel.textOpacityStopsZoom2,
                textOpacityStopsVal2: ZoomLabel.textOpacityStopsVal2,
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

export async function DELETE(request: Request, context: any) {
    const {params} = context;
    const prisma = new PrismaClient();
    await prisma.zoomLabel.delete({
        where:{
            id: params.id
        }
    })
}