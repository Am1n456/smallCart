import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";
import path from "path"

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173", // Explicitly allow your frontend URL
    credentials: true, // Allow credentials (cookies, auth headers)
  })
);

app.options(
  "*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
  dbConnect();
});
