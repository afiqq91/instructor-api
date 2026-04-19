const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

// ✅ CONNECT TO DATABASE (IMPORTANT)
async function connectDB() {
    await client.connect();
    db = client.db("SchoodDB");
    console.log("Connected to MongoDB");
}

connectDB();


// =========================
// (Exercise 2)
// =========================
app.get("/api/instructors/search", async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const result = await db.collection("instructors").find({
            name: { $regex: keyword, $options: "i" }
        }).toArray();

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// =========================
// (Exercise 3)
// =========================
app.get("/api/instructors", async (req, res) => {
    try {
        const specialization = req.query.specialization;

        console.log("SPECIALIZATION:", specialization);

        let query = {};

        if (specialization) {
            query = { specialization: specialization };
        }

        console.log("QUERY:", query);

        const result = await db.collection("instructors")
            .find(query)
            .toArray();

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// =========================
// START SERVER
// =========================
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});