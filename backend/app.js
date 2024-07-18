import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();

dotenv.config({ path: "./config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);

// app.post('/reservation', (req, res) => {
//   // Handle the reservation request here
//   res.json({ message: 'Reservation successful!' });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT,console.log("server is Running"))

app.use("/api/v1/", reservationRouter);
app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})

dbConnection();




app.use(errorMiddleware);

export default app;
