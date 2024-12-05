import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

const prisma = new PrismaClient();
const crypto = require('crypto');

// Register 
export async function POST(request: Request) {
    const user: User = await request.json();

    if (!user.username || !user.password) { //check username and password
        return NextResponse.json(
            { message: "Missing username and password" },
            { status: 400 }
        );
    }

    try {
       
        const existingUser = await prisma.user.findFirst({ // Check if the username already exists 
            where: {
                username: user.username,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Username already taken" },
                { status: 400 }
            );
        }

        //decryt password
       let decrypted = decryted(user.password);
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(decrypted, 10);

        
        await prisma.user.create({// add the user in the database
            data: {
                username: user.username,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "User successfully registered"},
            { status: 201 }
        );
    } catch (err) {
        console.error("REGISTER ERROR: ", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}


function decryted(password : string){
    let algorithm = process.env.ALGORITHM as string;
    let key = process.env.KEY as string;
    let iv = process.env.IV as string;

    let decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(password, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted as string;
}