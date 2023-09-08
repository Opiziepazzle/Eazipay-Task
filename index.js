const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./graphql/server');
const checkAuth = require('./graphql/middleware/checkAuth'); 
const app = express();

const PORT = process.env.PORT || 3020; // Define the port here




require('./Config/db')
 require('dotenv').config();
// ...

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { user: req.user }; // Make the authenticated user available to resolvers
  },
});


server.applyMiddleware({ app });

// Use the authMiddleware to authenticate requests before they reach your resolvers
app.use('/graphql', checkAuth);

// ...

// app.use(bodyParser.urlencoded({extended: false}))
//  app.use(bodyParser.json());

 

 //Handling CORS Error
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization "
  );
  if ( req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({});
  }
  next();
})


//Error Handling
app.use((req, res, next)=>{
    const error = new Error('Not found')
    error.status = 404;
    next(error)
  })
  
  app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
  error: {
    message: error.message
  }
    })
  })
  
  
  
  
  
  
  
  


app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});


