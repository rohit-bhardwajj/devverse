import express from 'express'
import 'dotenv/config'
import {connectdb} from './db/index.js'
import {app} from './app.js'

//Mongodb connection can be done using IIFEs
// (async()=>{
//     try{
//         mongoose.connect(`${process.env.MONGO_URI}`)
//         .then(()=>console.log("Mongodb connected!")
//     )
//         .catch(err =>console.error('Error:',err))
//     }
//     catch(error){
//         console.error("Error:",error);
//     }
// })()
connectdb().
then(
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on Port:${process.env.PORT}`);
    })
)
.catch((err)=>{
    console.log("Mongodb connection error !!",err);
})

// Static path for image uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));

