const express = require('express')
const mongoose = require('mongoose');
const app = express()







app.get('/',(req,res)=>{
    res.send('Hello from nodeapi server');
})

mongoose.connect('mongodb+srv://gsad3604:passworddb@backendb.mirkywe.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=backendb')
  .then(() => {console.log('Connected!');
    app.listen(3000,()=>{
        console.log('server is runninh on poert 3000');
    });

  })
  .catch(()=>{
    console.log("connection failed");
  });

