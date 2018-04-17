import mongoose, { Schema } from 'mongoose'

// This is a provisional schema for the results
const ResultSchema = new Schema({
	U_id: {
		type: String,
		required: true,
		unique: true
		// minlength:  [5, '5 character long at least'],
	},
	S1_Dummy: {
		type: Number
	},
	S2: {
		type: Number
	},
	S3: {
		type: Number
	},
	S4a: {
		type: Number
	},
	S4b: {
		type: Number
	},
	VidDum: {
		type: String
	},
	Q1: {
		type: String
	},
	Q2: {
		type: String
	},
	Q3r1: {
		type: Number
	},
	Q3r2: {
		type: Number
	},
	Q3r3: {
		type: Number
	},
	Q3r4: {
		type: Number
	},
	Q3r5: {
		type: Number
	},
	Q3r6: {
		type: Number
	},
	Q3r7: {
		type: Number
	},
	Q3r8: {
		type: Number
	},
	Q3r9: {
		type: Number
	},
	Q3r10: {
		type: Number
	},
	Q3r11: {
		type: Number
	},
	Q3r12: {
		type: Number
	},
	Q3r13: {
		type: Number
	},
	Q3r14: {
		type: Number
	},
	Q3r15: {
		type: Number
	},
	Q3r16: {
		type: Number
	},
	Q4r1: {
		type: Number
	},
	Q4r2: {
		type: Number
	},
	Q4r3: {
		type: Number
	},
	Q4r4: {
		type: Number
	},
	Q4r5: {
		type: Number
	},
	Q4r6: {
		type: Number
	},
	Q4r7: {
		type: Number
	},
	Q4r8: {
		type: Number
	},
	Q4r9: {
		type: Number
	},
	Q4r10: {
		type: Number
	},
	Q4r11: {
		type: Number
	},
	Q4r12: {
		type: Number
	},
	Q5o1: {
		type: Number
	},
	Q5o2: {
		type: Number
	},
	Q5o3: {
		type: Number
	},
	Q6: {
		type: Number
	},
	Q7r1: {
		type: Number
	},
	Q7r2: {
		type: Number
	},
	Q7r3: {
		type: Number
	},
	Q7r4: {
		type: Number
	},
	Q7r5: {
		type: Number
	},
	Q7r6: {
		type: Number
	},
	Q7r7: {
		type: Number
	},
	Q7r8: {
		type: Number
	},
	Q7r9: {
		type: Number
	},
	Q7r10: {
		type: Number
	},
	Q8: {
		type: Number
	},
	S5: {
		type: Number
	}
})

export default mongoose.model('Result', ResultSchema)
