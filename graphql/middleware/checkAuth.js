const jwt = require('jsonwebtoken');
const userSchema = require('../../models/userSchema');

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    const user = await userSchema.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user data to the request for further use in resolvers
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = checkAuth;
