
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Main backend route
app.get("/", (req, res) => {
    res.json({
        message: "BuildWise Backend is running!"
    });
});

// Module C - Temporary quotation storage
const quotations = [];

// View all quotations
app.get("/api/quotations", (req, res) => {
    res.json(quotations);
});

// Submit a quotation
app.post("/api/quotations", (req, res) => {
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

    const quotation = {
        id: quotations.length + 1,
        projectId: projectId.trim(),
        amount,
        duration,
        description: description.trim(),
        status: "Submitted",
        createdAt: new Date().toISOString()
    };

    quotations.push(quotation);

    res.status(201).json({
        message: "Quotation submitted successfully!",
        quotation
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`BuildWise backend running on http://localhost:${PORT}`);
});
