import User from "@/lib/config/models/user.model";
import Lecture from "@/lib/config/models/lectures.model";


const getAllLectures = async  (id) => {
  try {
    console.log(id , 'isisisisis');
    const newId =await id.toString()
    console.log(newId, 'newId');
    const userWithLectures = await User.findById(newId)
    .populate({
        path: 'lectures',
        populate: {
            path: 'Course' // Populate the Course field inside the lectures array
        }
    });

    console.log(userWithLectures, 'userWithLectures');
    if (!userWithLectures) {
      throw new Error('no lectures Found')
    }
    return userWithLectures
  } catch (error) {
    throw new Error(error)
  }
}
const getAllUsers = async () => {
  try {
      const users = await User.find();

      return users;
  } catch (error) {
      throw new Error(error)
  }
}

export {
  getAllLectures,
  getAllUsers
}