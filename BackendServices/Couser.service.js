import Course from "@/lib/config/models/course.model";
import Lecture from "@/lib/config/models/lectures.model";
import User from "@/lib/config/models/user.model";



const createCourseData = async (userData) => {
  try {
    const { CourseName, CourseLevel, CourseDescription, CourseImgURL, CourseDuration } = userData;
    // console.log({ CourseName, CourseLevel, CourseDescription, CourseImgURL, CourseDuration } , '{ CourseName, CourseLevel, CourseDescription, CourseImgURL, CourseDuration }');

    const createdCourse = new Course({
      CourseName,
      CourseLevel,
      CourseDescription,
      CourseImgURL,
      CourseDuration
    });

    // Save the course to the database
    const course = await createdCourse.save();
    return course;
  } catch (error) {
    console.error('Error creating course data:', error);
    throw error; // Throw the error to be caught by the caller
  }
};

const getAllCoursesService =async () => {

  try {
    const allCoursesData = await Course.find().populate('lectures')
    
    if (allCoursesData) {
      return allCoursesData
    }
  } catch (error) {
    throw new Error(error)
  }
}

const getSingleCourseService = async (id) => {
  try {
    const singleCourseData = await Course.findById(id).populate({
      path: 'lectures', populate: { path: 'lecturer' } // Populate the lecturer field inside the lectures array
    });

    
    
    if (singleCourseData) {
      return singleCourseData
    }
  } catch (error) {
    throw new Error(error)
  }
}

export  {
  createCourseData,
  getAllCoursesService,
  getSingleCourseService
};
