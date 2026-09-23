// import mongoose from "mongoose";

// const uri =
//   process.env.MONGODB_URI ||
//   "mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/food-delivery";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(uri);
//     console.log("DB Connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message);
//   }
// };

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "food_delivery",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL Connected");

    connection.release();
  } catch (error) {
    console.error("MySQL connection error:", error.message);
  }
};

export default pool;
