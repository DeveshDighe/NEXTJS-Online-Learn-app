import { getUserIdFromToken } from "@/BackendServices/Jwt.service";
import { getAllLectures } from "@/BackendServices/user.servise";
import { NextResponse } from "next/server";


export async function GET(req) {
  await connectDB()
  try {
    const token = req.headers.get('authorization').split(' ')[1];
    
  const tokenWithJWT = {jwt : token}
   
  const userId =await getUserIdFromToken(tokenWithJWT)
  

    const lectures = await getAllLectures(userId)

    return NextResponse.json({message : 'Lectures Fetched', success : true, lectures},{status : 200})
  } catch (error) {
    return NextResponse.json({message : 'Lectures not Fetched', success : false}, {status : 400})
  }
}