
import { getAllCoursesService } from "@/BackendServices/Couser.service";
import connectDB from "@/Db";
import { NextResponse } from "next/server";


export async function GET(req){
  try {
    await connectDB()
      console.log('This is getAllCorses controller');
  
      const allCoursesData = await getAllCoursesService()
      // console.log(allCoursesData , allCoursesData);
  
      return NextResponse.json({message: 'Courses data is fetched', success: true, allCoursesData},{status : 200})
    } catch (error) {
      return NextResponse.json({message: 'Courses data fetching error', success: false},{status : 400})
    }
}