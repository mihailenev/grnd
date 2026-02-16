import express from "express";
import cors from "cors";
import auth from "./routes/auth";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/auth", auth);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[+] API running on http://localhost:${PORT}`);
});
