import express from "express";
import cors from "cors";
import { config } from "dotenv";
import axios from "axios";

const app = express();
config();

// ✅ Correct CORS setup
app.use(
  cors({
    origin: "*",   // allow all
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/convert", async (req, res) => {
  const { base_currency, currencies } = req.query;
  console.log("Request:", base_currency, currencies);

  try {
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.API_KEY}&base_currency=${base_currency}&currencies=${currencies}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message, error.response?.data);
    res.status(500).json({
      message: "Error fetching data",
      error: error.response?.data || {},
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
