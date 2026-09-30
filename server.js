require("dotenv").config();

const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3001;

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Naveen@2005",
  database: process.env.DB_NAME || "smart_health_mate",
  waitForConnections: true,
  connectionLimit: 10
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ok:true});
  } catch (err) {
    res.status(500).json({ok:false, error:err.message});
  }
});

app.get("/api/records", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM health_records ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({error:err.message});
  }
});

app.post("/api/records", async (req, res) => {
  const {
    full_name, age, gender, height_cm, weight_kg,
    systolic, diastolic, heart_rate, notes
  } = req.body;

  if (!full_name || !age || !gender || !height_cm || !weight_kg ||
      !systolic || !diastolic || !heart_rate) {
    return res.status(400).json({error:"Please fill all required fields."});
  }

  const numeric = [age,height_cm,weight_kg,systolic,diastolic,heart_rate];
  if (numeric.some(v => Number.isNaN(Number(v)))) {
    return res.status(400).json({error:"Numeric fields must contain valid numbers."});
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO health_records
       (full_name, age, gender, height_cm, weight_kg, systolic, diastolic, heart_rate, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [full_name, age, gender, height_cm, weight_kg, systolic, diastolic, heart_rate, notes || ""]
    );

    res.status(201).json({
      message:"Health record saved.",
      id:result.insertId
    });
  } catch (err) {
    res.status(500).json({error:err.message});
  }
});

app.delete("/api/records/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM health_records WHERE id=?",
      [req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({error:"Record not found."});
    res.json({message:"Record deleted."});
  } catch (err) {
    res.status(500).json({error:err.message});
  }
});

app.get("*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Smart Health Mate running at http://localhost:${PORT}`);
});
