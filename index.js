const express = require('express')
const mongoose = require('mongoose');
const Product=require('./models/product.model.js')

const app = express()
//middleware
app.use(express.json()); // middleware to deal with json type data
app.use(express.urlencoded({extended:false}));

//routes
app.use("/api/products",productRoute);

//get,post,put.delete mappings
app.get('/',(req,res)=>{
  res.send('Hello from nodeapi server');
});

app.get('/api/products',async(req,res)=>{
  try {
    const product=await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
});

app.get('/api/products/:id',async(req,res)=>{
  try {
    const {id}=req.params;
   const product=await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})


app.post('/api/products',async(req,res)=>{
  try{
      const product= await Product.create(req.body);
      res.status(200).json(product);
  }catch(error){
    res.status(500).json({message:error.message});
  }
});

app.put('/api/products/:id',async(req,res)=>{
try {
  const {id}=req.params;
  const product= await Product.findByIdAndUpdate(id,req.body);
  if(!product){
    return res.status(500).json({message:error.message});
  }
  const updatedProduct=await Product.findById(id);
  res.status(200).json(updatedProduct);
} catch (error) {
  res.status(500).json({message:error.message});
}

})

app.delete('/api/products/:id',async(req,res)=>{
  try {
    const {id}=req.params;
   const product=await Product.findByIdAndDelete(id);
   if(!product){
    return res.status(404).json({message:"Product not found"});
   }
    res.status(200).json({message:"product deleted sucessfully!"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
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




