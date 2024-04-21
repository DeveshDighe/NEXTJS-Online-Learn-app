import User from "@/lib/config/models/user.model";
import bcrypt from 'bcrypt'


const findUserbyEmail = async (email) => {
  try {
    console.log('This is email' , email);

      const user = await User.findOne({email : email})

      if (!user) {
          return 
      }

      return user;

  } catch (error) {
      throw new Error(error)
  }
}

const createUser = async (userData) => {
  try {
      let { name, email, password } = userData;
      console.log(userData, 'userData');

      const isEmailExist = await User.findOne({ email });
      const isNameExist = await User.findOne({ name });

      if (isEmailExist) {
          return { error: 'Email already exists' };
      }
      if (isNameExist) {
          return { error: 'Name already exists' };
      }

      password = await bcrypt.hash(password, 10);
      console.log('kakakak');
      const user = await User.create({ name, email, password, })

      return user;
  } catch (error) {
    console.log(error ,'reg error');
      throw new Error(error)
  }
}


export {
  findUserbyEmail,
  createUser
}