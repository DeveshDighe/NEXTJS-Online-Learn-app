// Import necessary modules
import { createCourseData } from "@/BackendServices/Couser.service";
import connectDB from "@/Db";
import { NextResponse } from "next/server";


// Define the async function to handle the request
export async function POST(req) {

  // Ensure database connection
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });
  }

  // Check request method
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed', success: false }, { status: 405 });
  }

  // Create course
  try {
    const data = await req.json();
    const course = await createCourseData(data);
    return NextResponse.json({ message: 'Course created successfully', success: true, course }, { status: 201 });
  } catch (error) {
    console.error('Failed to create course:', error);
    return NextResponse.json({ message: 'Course creation failed', success: false }, { status: 500 });
  }
}
