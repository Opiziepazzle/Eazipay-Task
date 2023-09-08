const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../../models/userSchema'); // Import your User model

const userResolver = {
  Query: {
    getUser: async (_, { userId }) => {
      try {
        const user = await userSchema.findById(userId);
        if (!user) throw new Error('User not found');
        return user;
      } catch (error) {
        throw error;
      }
    },
    // Add other query resolvers
  },

  Mutation: {
    registerUser: async (_, { email, password }) => {
      try {
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) throw new Error('Email already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, {
          expiresIn: '1hr',
        });

        return { ...newUser._doc, password: null, token };
      } catch (error) {
        throw error;
      }
    },

    loginUser: async (_, { email, password }) => {
      try {
        const user = await userSchema.findOne({ email });
        if (!user) throw new Error('User not found');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password');

        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
          expiresIn: '1hr',
        });

        return { ...user._doc, password: null, token };
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = userResolver;
