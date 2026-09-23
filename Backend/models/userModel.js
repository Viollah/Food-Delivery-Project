// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     cartData: { type: Object, default: {} },
//   },
//   { minimize: false }
// );

// const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// export default userModel;

import pool from "../config/db.js";

const userModel = {
  async findOne(email) {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email],
    );

    return rows[0] || null;
  },

  async create(name, email, password) {
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
    );

    return {
      id: result.insertId,
      name,
      email,
      password,
    };
  },
};

export default userModel;
