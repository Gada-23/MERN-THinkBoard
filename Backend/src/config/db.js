import mongoose from "mongoose";


export const connectDB = async () =>{
	try{
		await mongoose.connect("mongodb+srv://gadaakiyya003_db_user:92DHINhPI3Y6uc4d@cluster0.2jf73ge.mongodb.net/notes_db?appName=Cluster0")
		console.log("Database is connected")
	}catch(e){
		console.error("error",e);
		process.exit(1)  //exit with failure
	}
}