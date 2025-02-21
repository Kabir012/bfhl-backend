

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Backend is running! Use /bfhl for GET and POST requests.");
});


// GET Endpoint (Hardcoded Response)
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST Endpoint (Processing Input)
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const highest_alphabet = alphabets.length ? [alphabets.sort().pop()] : [];

        res.json({
            is_success: true,
            user_id: "kabir_21052003",  // Replace with your actual format
            email: "your_email@domain.com",
            roll_number: "CU123456",   // Replace with your actual roll number
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server Error" });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
