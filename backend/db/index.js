import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectdb = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongodb connected! DB HOST:${connectionInstance.connection.host}`);
        
    }
    catch(error){
        console.log("Mongodb connection failed:",error);
        process.exit(1);
    }
}

export {connectdb}