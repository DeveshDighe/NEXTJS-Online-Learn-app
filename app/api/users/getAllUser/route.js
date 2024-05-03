import connectDB from "@/Db"
import { NextResponse } from "next/server"

const { getAllUsers } = require("@/BackendServices/user.servise")

export async function GET(req){
  await connectDB()
  try {
    const allUserData = await getAllUsers()

    return NextResponse.json({message : 'All users fetched' , success : true , allUserData}, {status : 200})
  } catch (error) {
    return NextResponse.json({message : 'error in fetching users' , success : false }, {status : 400})
  }
}