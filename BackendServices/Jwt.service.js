import jwt from 'jsonwebtoken'


const generateToken = async (userId) => {
  console.log(userId, 'usrid'); // Log the provided userId for debugging

  // Convert ObjectId to string
  const userIdString = userId.toString();
  console.log(userIdString, 'userIdString');

  // Generate token with the string representation of ObjectId
  const token = jwt.sign({ userId: userIdString }, process.env.SECRET_KEYY);

  console.log('Generated token:', token); // Log the generated token for debugging

  return token;
}

const getUserIdFromToken = async (token) => {
  try {
    let tokenDest = token.jwt
    console.log("This is token" , tokenDest);
      // console.log('Secret key:', process.env.SECRET_KEYY);
      let splicedToken = tokenDest
      console.log(splicedToken, 'splicedToeken');
      console.log('Received token:', token);
      const decodedToken = await jwt.verify(splicedToken, process.env.SECRET_KEYY);
      console.log(decodedToken ,'decodedToekn');
      return decodedToken.userId;
  } catch (error) {
      console.error('Error verifying token:', error.message);
      return null;
  }
}


export {
  generateToken,
  getUserIdFromToken
}