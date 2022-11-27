const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

	email: {
    	type: String,
    	required: [true, "Please provide an Email!"],
    	unique: [true, "Email Exist"],
	},
	password: {

    	type: String,
    	required: [true, "Please provide a password!"],
    	unique: false,
	}, 
	glevel: {

    	type: String,
    	required: [true, "Please give a grade level as a number 2-5!"],
    	unique: false,
	},
	score: {

    	type: Number,
    	required: false,
    	default: 0,
    	unique: false,
	},
	isLoggedIn: {

    	type: Boolean,
    	required: false,
    	default: true,
    	unique: false,
	}
})

module.exports = mongoose.model("User", UserSchema, "authDB");