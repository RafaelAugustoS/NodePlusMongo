const mongoose = require('../database')
const bcyrpt = require('bcryptjs')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

userSchema.pre('save', async function(next){
	const hash = await bcyrpt.hash(this.password, 10)
	this.password = hash

	next()
})

const User = mongoose.model('user', userSchema)


module.exports = User