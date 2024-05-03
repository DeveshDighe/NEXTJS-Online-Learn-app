import { NextResponse } from "next/server";
import { getSingleCourseService } from "@/BackendServices/Couser.service";
import connectDB from "@/Db";

export async function GET(req) {
  await connectDB()

  try {
    // Accessing URL parameter (id) using regular expressions
    const id = req.url.match(/([^\/]+)\/?$/)[1];

    // Call the service to get the single course
    const singleCourse = await getSingleCourseService(id);

    // Return the response with fetched data
    return NextResponse.json({ message: 'Course data is fetched', success: true, singleCourse }, { status: 200 });
  } catch (error) {
    // Return error response if there's an issue
    return NextResponse.json({ message: 'Error fetching course data', success: false }, { status: 404 });
  }
}
