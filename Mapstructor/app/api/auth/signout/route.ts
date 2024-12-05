import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {addToBlackList} from '../blacklist/blacklist';
import { Auth } from "../auth";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request:Request) {

  const authHeader = request.headers.get('authorization');

  Auth(request);
    
  if (!authHeader) {
      return NextResponse.json(
        { message: "Authorization token required"},
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { message: "token missing"},
        { status: 401 }
      );
    }

  try {
      
    const decode = await jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      const tokenId = decode.userId as string; //ends being undefined
      
      if(Date.now() < (decode.exp! * 1000)){
        addToBlackList(tokenId);

      return NextResponse.json(
        { message: "Sign out successful"},
        { status: 200 }
    );
      }

      // DEBUG
      return NextResponse.json(
          { message: "did nothing"},
          { status: 200 }
      );
  } 
  
  catch (err) {
      console.error("LOGIN ERROR: ", err);
      return NextResponse.json(
          { message: "Internal server error" },
          { status: 500 }
      );
  }
}