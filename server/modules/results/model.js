import mongoose, { Schema } from 'mongoose'

// This is a provisional schema for the results
const ResultSchema = new Schema({
	U_id: {
		type: String,
		required: true,
		unique: true
		// minlength:  [5, '5 character long at least'],
	},
	S1_Dummy: Number,
	S2: Number,
	S3: Number,
	S4a: Number,
	S4b: Number,
	VidDum: String,
	Q1o1: String,
	Q1o2: Number,
	Q2: Number,
	Q3r1: Number,
	Q3r2: Number,
	Q3r3: Number,
	Q3r4: Number,
	Q3r5: Number,
	Q3r6: Number,
	Q3r7: Number,
	Q3r8: Number,
	Q3r9: Number,
	Q3r10: Number,
	Q3r11: Number,
	Q3r12: Number,
	Q3r13: Number,
	Q3r14: Number,
	Q3r15: Number,
	Q3r16: Number,
	Q4r1: Number,
	Q4r2: Number,
	Q4r3: Number,
	Q4r4: Number,
	Q4r5: Number,
	Q4r6: Number,
	Q4r7: Number,
	Q4r8: Number,
	Q4r9: Number,
	Q4r10: Number,
	Q4r11: Number,
	Q4r12: Number,
	Q5o1: Number,
	Q5o2: Number,
	Q5o3: Number,
	Q6: Number,
	Q7r1: Number,
	Q7r2: Number,
	Q7r3: Number,
	Q7r4: Number,
	Q7r5: Number,
	Q7r6: Number,
	Q7r7: Number,
	Q7r8: Number,
	Q7r9: Number,
	Q7r98: Number,
	Q8: Number,
	S5: Number
})

export default mongoose.model('Result', ResultSchema)
