import { PrismaClient, ZoomLabel } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient();
    const zoomLabel:ZoomLabel = await prisma.zoomLabel.findMany()

    return NextResponse.json({
        zoomLabel
    })
}

export async function POST(request: Request) {
const prisma = new PrismaClient();
const zoomLabel:ZoomLabel = await request.json()
try {
const l = await prisma.zoomLabel.create({
    data: {
        title: zoomLabel.title,
        minZoom: zoomLabel.minZoom,
        zoom: zoomLabel.zoom,
        bearing: zoomLabel.bearing,
        centerLatitude: zoomLabel.centerLatitude,
        centerLongitude: zoomLabel.centerLongitude,
        topLeftBoundLatitude: zoomLabel.topLeftBoundLatitude,
        topLeftBoundLongitude: zoomLabel.topLeftBoundLongitude,
        bottomRightBoundLatitude: zoomLabel.bottomRightBoundLatitude,
        bottomRightBoundLongitude: zoomLabel.bottomRightBoundLongitude,
        zoomToBounds: zoomLabel.zoomToBounds,
        useTextSizeZoomStyling: zoomLabel.useTextSizeZoomStyling,
        textSizeDefault: zoomLabel.textSizeDefault,
        textSizeStopsZoom1: zoomLabel.textSizeStopsZoom1,
        textSizeStopsVal1: zoomLabel.textSizeStopsVal1,
        textSizeStopsZoom2: zoomLabel.textSizeStopsZoom2,
        textSizeStopsVal2: zoomLabel.textSizeStopsVal2,
        useTextColorZoomStyling: zoomLabel.useTextColorZoomStyling,
        textColorDefault: zoomLabel.textColorDefault,
        textColorStopsZoom1: zoomLabel.textColorStopsZoom1,
        textColorStopsVal1: zoomLabel.textColorStopsVal1,
        textColorStopsZoom2: zoomLabel.textColorStopsZoom2,
        textColorStopsVal2: zoomLabel.textColorStopsVal2,
        useTextHaloWidthZoomStyling: zoomLabel.useTextHaloWidthZoomStyling,
        textHaloWidthDefault: zoomLabel.textHaloWidthDefault,
        textHaloWidthStopsZoom1: zoomLabel.textHaloWidthStopsZoom1,
        textHaloWidthStopsVal1: zoomLabel.textHaloWidthStopsVal1,
        textHaloWidthStopsZoom2: zoomLabel.textHaloWidthStopsZoom2,
        textHaloWidthStopsVal2: zoomLabel.textHaloWidthStopsVal2,
        useTextHaloBlurZoomStyling: zoomLabel.useTextHaloBlurZoomStyling,
        textHaloBlurDefault: zoomLabel.textHaloBlurDefault,
        textHaloBlurStopsZoom1: zoomLabel.textHaloBlurStopsZoom1,
        textHaloBlurStopsVal1: zoomLabel.textHaloBlurStopsVal1,
        textHaloBlurStopsZoom2: zoomLabel.textHaloBlurStopsZoom2,
        textHaloBlurStopsVal2: zoomLabel.textHaloBlurStopsVal2,
        useTextHaloColorZoomStyling: zoomLabel.useTextHaloColorZoomStyling,
        textHaloColorDefault: zoomLabel.textHaloColorDefault,
        textHaloColorStopsZoom1: zoomLabel.textHaloColorStopsZoom1,
        textHaloColorStopsVal1: zoomLabel.textHaloColorStopsVal1,
        textHaloColorStopsZoom2: zoomLabel.textHaloColorStopsZoom2,
        textHaloColorStopsVal2: zoomLabel.textHaloColorStopsVal2,
        useTextOpacityZoomStyling: zoomLabel.useTextOpacityZoomStyling,
        textOpacityDefault: zoomLabel.textOpacityDefault,
        textOpacityStopsZoom1: zoomLabel.textOpacityStopsZoom1,
        textOpacityStopsVal1: zoomLabel.textOpacityStopsVal1,
        textOpacityStopsZoom2: zoomLabel.textOpacityStopsZoom2,
        textOpacityStopsVal2: zoomLabel.textOpacityStopsVal2,
    }
})
return NextResponse.json({
    l
})

}
catch(e) {
    console.log(e);
    throw(e);
}
}