import express from "express";
import cors from "cors";
import { Users } from "./users.js";
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const keys = ["first_name", "last_name", "email"];

  const { q } = req.query;

  const search = (data) => {
    return data.filter((item) => {
      return keys.some((key) => item[key].toLowerCase().includes(q));
    });
  };

  res.json(search(Users).splice(0, 10));
});

app.listen(5000, (req, res) => {
  console.log("server is running");
});
