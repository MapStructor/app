import {Map, MapFilterGroup, MapFilterItem, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Auth } from "../auth/auth"
const prisma = new PrismaClient();

export async function GET(request: Request) {//get

    const groups = await prisma.mapFilterGroup.findMany({ //find all groups 
        include: {
            maps: true,            
            mapfilteritems: true,   
        },
    }); 

    return NextResponse.json({
        groups
    })
}

export async function POST(request: Request) { // create
    if(!Auth(request)){ //protected endpoint
        return NextResponse.json({
            message: "Not Authorized",
            error: "Auth Token Invaild",
        }, {status: 401});
    }
  try {
      const group: MapFilterGroup = await request.json(); // parse the JSON

      console.log(group);
      const existingGroup = await prisma.mapFilterGroup.findFirst({ //check if group exsit 
          where: {
            groupId: group.groupId,
          },
      });

      if (existingGroup) {
          console.log("ERROR: ATTEMPTED REPEATED RECORDS -- SENDING 400");
          console.error("REPEATED RECORD ERROR: Missing required fields");
          return NextResponse.json({
              message: "group ID exists",
              error: "REPEATED RECORDS ARE NOT ALLOWED",
          }, { status: 400 });
      }

      const newgroup = await prisma.mapFilterGroup.create({ //creates the group and its nested tables
        data: {
            groupName: group.groupName,
            label: group.label,
            groupId: group.groupId,
            maps: {
                create: group.maps?.map(m => ({ //creates the maps
                    mapId: m.mapId,
                    longitude: m.longitude,
                    latitude: m.latitude,
                    mapName: m.mapName,
                    zoom: m.zoom,
                    bearing: m.bearing,
                    styleId: m.styleId,
                    zoomLabelId: m.zoomLabelId
                })) || [],
            },
            mapfilteritems: {
                create: group.mapfilteritems?.map(item => ({ //creates the items
                    itemName: item.itemName,
                    label: item.label,
                    itemId: item.itemId,
                    defaultCheckedForBeforeMap: item.defaultCheckedForBeforeMap,
                    defaultCheckedForAfterMap: item.defaultCheckedForAfterMap,
                    showInfoButton: item.showInfoButton,
                    showZoomButton: item.showZoomButton,
                })) || [],
            },
        },
    });

      return NextResponse.json({ // send success and the new map data back 
          message: "Success",
          map_id: newgroup
      });
      
  } catch (error) { // catch error if try fails
      console.error("Error creating map:", error); // log to server
      return NextResponse.json({ // send 500 (Internal Server Error) and what the error is to frontend
          message: "Failed to create map",
          error: error.message,
      }, { status: 500 });
  }
}

export async function DELETE(request: Request){ //delete 
    if(!Auth(request)){ //protected endpoint
        return NextResponse.json({
            message: "Not Authorized",
            error: "Auth Token Invaild",
        }, {status: 401});
    }

    const g = await request.json();

    let delitemId: string = g.itemId;
    let delmapid:string  = g.mapId;
    
    let message:string = "failed";

    console.log("DELETE:", delmapid, g.groupId);//logging

    
    try{
        if (!g.groupId && (!g.mapId || !g.itemId)) { //check to see if the JSON is vaild
            console.log("ERROR: MISSING ID DATA -- SENDING 400");
            console.error("Validation error: Missing required fields");
            return NextResponse.json({ //sends error and 400 (Bad Request) if not
                message: "Invalid data",
                error: "Missing required fields",
            }, { status: 400 });
        }

        if(delmapid !== undefined){//want to delete a map
            console.log("delete map")
           await prisma.map.deleteMany({
                where: {
                    groupId: g.groupId,
                    mapId: delmapid, 
                },
            });

            message = "deleted map";
        }

        else if(delitemId !== undefined){ //want to delete a item
            console.log("delete item")
            await prisma.mapFilterItem.deleteMany({
                where: {
                    groupId: g.groupId,
                    itemId: delitemId, 
                },
            });

            message = "deleted item";
        }

        else{ //delete group
            console.log("delete group")
            await prisma.$transaction([ 
                prisma.map.deleteMany({ where: { groupId: g.groupId } }),
                prisma.mapFilterItem.deleteMany({ where: { groupId: g.groupId } }),
                prisma.mapFilterGroup.deleteMany({ where: { groupId: g.groupId } })
            ]);
            message = "deleted group";
        }

          console.log("DELETE COMPLETE: ", g.groupId);//sucess delete map

        return NextResponse.json({ //send success and the delmap data back 
            message: message,
            data: g.groupId
        });
    }
    catch (error: any) { //catch error if try fails
        console.error("Error Deleting:", error); //log to server
        return NextResponse.json({ //send 500 (Internal Server Error) and what the error is to frontend
            message: "Failed to delete",
            error: error.message,
        }, { status: 500 });
    } 
}

export async function PUT(request: Request){ //modify
    if(!Auth(request)){ //protected endpoint
        return NextResponse.json({
            message: "Not Authorized",
            error: "Auth Token Invaild",
        }, {status: 401});
    }

    const g  = await request.json();
    
    const gmap = { 
        groupId: g.groupId,
        longitude: g.longitude,
        latitude: g.latitude,
        mapName: g.mapName,
        mapId: g.mapId,
        zoom: g.zoom,
        bearing: g.bearing,
        styleId: g.styleId,
        zoomLabelId: g.zoomLabelId
    }

    const gitem = {
        itemName                   :  g.itemName,
        groupId                    :  g.groupId,
        label                      :  g.label,
        defaultCheckedForBeforeMap :  g.defaultCheckedForBeforeMap,
        defaultCheckedForAfterMap  :  g.defaultCheckedForAfterMap,
        showInfoButton             :  g.showInfoButton,
        showZoomButton             :  g.showZoomButton,
        itemId                     :  g.itemId,
    }

    console.log("PUT \n");

    try{
        if (!g.groupId && (!g.mapId || !g.itemId)){ //check to see if the JSON is vaild
            console.log("ERROR: MISSING DATA -- SENDING 400");
            console.error("Validation error: Missing required fields");
            return NextResponse.json({ //sends error and 400 (Bad Request) if not
                message: "Invalid data",
                error: "Missing required fields",
            }, { status: 400 });
        }

        if(g.mapId){
            console.log(" Map upsert ");
            await prisma.map.upsert({
                where: {
                    mapId: g.mapId,
                    groupId: g.groupId
                  },
                  update:
                    gmap,
                  create: 
                    gmap,
            });
        }

        if(g.itemId){
          console.log(" item upsert ");
          await prisma.mapFilterItem.upsert({
              where: {
                  itemId: g.itemId,
                  groupId: g.groupId
                },
                update:
                  gitem,
                create: 
                  gitem,
          });
      }
        
        //update a group
            console.log("group update")
            await prisma.mapFilterGroup.updateMany({
                where: {
                    groupId: g.groupId
                  },
                  data: {
                    groupName: g.groupName,
                    label: g.label
                  },
            });

        // console.log(await prisma.map.findFirst({where:{id: m.id}}));
        console.log(" PUT COMPELETE ");
        return NextResponse.json({ //send success and the newmap data back 
        message: "Success",
        data: g.groupId
        });
}
    catch (error: any) { //catch error if try fails
        console.error("Error Updating map:", error); //log to server
        return NextResponse.json({ //send 500 (Internal Server Error) and what the error is to frontend
            message: "Failed to Updating map",
            error: error.message,
        }, { status: 500 });
    } 
}