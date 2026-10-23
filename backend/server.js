
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Quotation = require("./models/Quotation");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("BuildWise MongoDB connected successfully!");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

// Main backend route
app.get("/", (req, res) => {
    res.json({
        message: "BuildWise Backend is running!"
    });
});

// View all quotations from MongoDB
app.get("/api/quotations", async (req, res) => {
    try {
        const quotations = await Quotation.find().sort({ createdAt: -1 });
        res.json(quotations);
    } catch (error) {
        console.error("Quotation fetch error:", error.message);

        res.status(500).json({
            message: "Failed to fetch quotations."
        });
    }
});

// Submit a quotation to MongoDB
app.post("/api/quotations", async (req, res) => {
    try {
        const { projectId, amount, duration, description } = req.body;

        if (
            typeof projectId !== "string" ||
            !projectId.trim() ||
            typeof amount !== "number" ||
            !Number.isFinite(amount) ||
            amount <= 0 ||
            !Number.isInteger(duration) ||
            duration <= 0 ||
            typeof description !== "string" ||
            !description.trim()
        ) {
            return res.status(400).json({
                message: "Please provide valid quotation details."
            });
        }

        const quotation = await Quotation.create({
            projectId: projectId.trim(),
            amount,
            duration,
            description: description.trim(),
            status: "Submitted"
        });

        res.status(201).json({
            message: "Quotation submitted successfully!",
            quotation
        });

    } catch (error) {
        console.error("Quotation submission error:", error.message);

        res.status(500).json({
            message: "Failed to submit quotation."
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`BuildWise backend running on http://localhost:${PORT}`);
});
