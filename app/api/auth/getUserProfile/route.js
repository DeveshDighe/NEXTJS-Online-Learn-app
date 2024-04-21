import { getUserIdFromToken } from "@/BackendServices/Jwt.service";
import User from "@/lib/config/models/user.model";
import { NextResponse } from "next/server";

const { default: connectDB } = require("@/Db");

export async function POST (req){
  try {
    connectDB()
    console.log('katr diya lig');
    const jwt = await req.json();
    // console.log(req.body.jwt , 'jwt');

    if (!jwt) {
      return NextResponse.json({ message: "JWT token is missing", success: false }, {status : 400});
    }
    console.log(jwt, 'jwt');

    const userData = await getUserIdFromToken(jwt);
    const user = await User.findById(userData)

    console.log('user', user);
    return NextResponse.json({ message: "User found", success: true, user }, {status : 200});
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ message: error.message, success: false }, {status : 500});
  }
}