import { getUserIdFromToken } from "@/BackendServices/Jwt.service";
import { getAllLectures } from "@/BackendServices/user.servise";
import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    const token = req.headers.get('authorization').split(' ')[1];
    

  console.log(token , 'Headersheasers');
  const tokenWithJWT = {jwt : token}
   
  const userId =await getUserIdFromToken(tokenWithJWT)
  
  console.log(userId, 'userID');

    const lectures = await getAllLectures(userId)
    console.log(lectures , 'i found lectures');

    return NextResponse.json({message : 'Lectures Fetched', success : true, lectures},{status : 200})
  } catch (error) {
    return NextResponse.json({message : 'Lectures not Fetched', success : false}, {status : 400})
  }
}