import { getSingleCourseService } from "@/BackendServices/Couser.service";
import connectDB from "@/Db";
import Lecture from "@/lib/config/models/lectures.model";
import User from "@/lib/config/models/user.model";
import { NextResponse } from "next/server";



export async function POST (req){
  await connectDB()
  try {
    // const id = req.params.id;
    const id = req.url.match(/([^\/]+)\/?$/)[1];
    const lectures =await req.json();

    
    const singleCourse = await getSingleCourseService(id);
    const singleCourseId = singleCourse._id;
    

    for (let lecture of lectures) {
      const lecturerName = lecture.lecturer.trim();

      const lecturer = await User.findOne({ name: lecturerName }).populate('lectures');

      for (const lectureItem of lecturer.lectures) {

        if (lectureItem.date.toISOString().slice(0, 10) === lecture.date) {
            return NextResponse.json({message : "Lecture is assigned for lecturer on same date, can't assign another on the same date", success : false} , {status : 500})
        }
    }

    // Iterate through all lectures of the lecturer
for (const lectureItem of singleCourse.lectures) {
  // Split the time strings to extract the hour part
  const oldHours = parseInt(lectureItem.time.split(':')[0], 10); // Extract old hour and convert to number
  const newHours = parseInt(lecture.time.split(':')[0], 10); // Extract new hour and convert to number

  // Add 5 hours to the old hour
  const oldHoursPlusFive = oldHours + 5;
  const hourDifference = newHours - oldHours;

  // Check if the new hour is within 5 hours of the old hour
  if (
    lectureItem.date.toISOString().slice(0, 10) === lecture.date &&
    // Check if the difference between the times is more than 5 hours
    hourDifference < 5
  ) {
      // If the gap condition is not met for any lecture, return the error response
      return NextResponse.json({ message: 'Next lecture can be scheduled after a five-hour gap from the previous lecture.', success: false }, {status : 503});
  }
}


// If the loop completes without returning, proceed with adding the new lecture
// ...

  
      
      if (lecturer) {
        // If lecturer found, save the lecture document with their ID
        const createdLecture = new Lecture({
          Course: singleCourseId,
          date: lecture.date,
          time: lecture.time,
          lecturer: lecturer._id // Save the ID of the lecturer
        });

        await createdLecture.save();

        // Update user's lectures array
        lecturer.lectures.push(createdLecture._id);
        await lecturer.save();

        // Update course's lectures array
        singleCourse.lectures.push(createdLecture._id);
        await singleCourse.save();
      } else {
        console.error(`Lecturer '${lecturerName}' not found`);
        // Handle the case where the lecturer is not found (e.g., throw an error or skip saving the lecture)
      }
    }

    return NextResponse.json({ message: 'Lecture created', success: true }, {status : 200});
  } catch (error) {
    console.error('Error creating lectures:', error.message);
    return NextResponse.json({ message: 'Lectures creation failed', success: false }, {status : 500});
  }
}