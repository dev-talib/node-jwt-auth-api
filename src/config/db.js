const mongoose = require('mongoose');
const dotenv = require('dotenv');


const connectDb = () => {
	const CONNECTION_URL = process.env.DB_URL;
	mongoose.connect(CONNECTION_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	}).then(()=>{
		console.log('database is connected successfully')
	}).catch((e)=>{
		console.log(e)
	})
}

module.exports = connectDb;
