import express from "express";
import cors from "cors";
import auth from "./routes/auth";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`[+] API running on http://localhost:${PORT}`);
});
