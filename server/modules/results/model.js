import mongoose, { Schema } from 'mongoose';

// This is a provisional schema for the results
const ResultSchema = new Schema({
    U_id: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, '5 character long at least'],
    },
    S1_Dummy: {
        type: Number,
    },
    S2: {
        type: Number,
    },
    S3: {
        type: Number,
    },
    vidDum: {
        type: String,
    },
    Q5r1: {
        type: String,
    },
    Q6r1: {
        type: Number,
    },
    Q6r2: {
        type: Number,
    },
    Q6r3: {
        type: Number,
    },
    Q6r4: {
        type: Number,
    },
    Q6r5: {
        type: Number,
    },
    Q6r6: {
        type: Number,
    },
    Q6r7: {
        type: Number,
    },
    Q6r8: {
        type: Number,
    },
    Q6r9: {
        type: Number,
    },
    Q6r10: {
        type: Number,
    },
    Q6r11: {
        type: Number,
    },
    Q6r12: {
        type: Number,
    },
    Q6r13: {
        type: Number,
    },
    Q6r14: {
        type: Number,
    },
    Q6r15: {
        type: Number,
    },
    Q6r16: {
        type: Number,
    },
    Q6r17: {
        type: Number,
    },
    Q6r18: {
        type: Number,
    },
    Q6r19: {
        type: Number,
    },
    Q7r1: {
        type: Number,
    },
    Q7r2: {
        type: Number,
    },
    Q7r3: {
        type: Number,
    },
    Q7r4: {
        type: Number,
    },
    Q7r5: {
        type: Number,
    },
    Q7r6: {
        type: Number,
    },
    Q7r7: {
        type: Number,
    },
    Q7r8: {
        type: Number,
    },
    Q7r9: {
        type: Number,
    },
    Q7r10: {
        type: Number,
    },
    Q7r11: {
        type: Number,
    },
    Q8r1: {
        type: Number,
    },
    Q8r2: {
        type: Number,
    },
    Q8r3: {
        type: Number,
    },
    Q8r4: {
        type: Number,
    },
    Q8r5: {
        type: Number,
    },
    Q9: {
        type: Number,
    },
    Q10ar1: {
        type: String,
    },
    Q10br1: {
        type: String,
    },
    Q11: {
        type: Number,
    },
    S5: {
        type: Number,
    },
    S6: {
        type: Number,
    },
    S7: {
        type: Number,
    },
    S8: {
        type: Number,
    },
    S9: {
        type: Number,
    },
});

export default mongoose.model('Result', ResultSchema);
