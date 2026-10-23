
const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
    {
        projectId: {
            type: String,
            required: true,
            trim: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        duration: {
            type: Number,
            required: true,
            min: 1
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            default: "Submitted"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Quotation", quotationSchema);
