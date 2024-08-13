"use dynamic"
const express = require("express");
const JSON = require("JSON");
const app = express();
const cors = require('cors')
const port = 8080;
const { connection } = require("./db");
console.log(connection);
app.use(cors())
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/all", async (req, res) => {
  const result = (
    await connection.promise().query("select * from fliptable")
  )[0];
  res.json(result);
});

app.post("/api/new", async (req, res) => {
  const { question, answer } = req.body;
  const result = await connection
    .promise()
    .query(
      `insert into fliptable values(default,"${question}","${answer}");`
    );
  res.json(result[0]["insertId"]);
});

app.get("/api/card/:id", async (req, res) => {
  const id = req.params.id;
  const result = await connection
    .promise()
    .query(`select * from fliptable where id=${id};`);
  res.json(result[0]);
});

app.delete("/api/card/:id", async (req, res) => {
  const id = req.params.id;
  const result = await connection
    .promise()
    .query(`delete from fliptable where id=${id};`);
  res.json("deleted");
});

app.patch("/api/card/:id", async (req, res) => {
  const id = req.params.id;
  const { question, answer } = req.body;
  const result = await connection
    .promise()
    .query(`update fliptable set question="${question}", answer="${answer}" where id=${id};`);
  res.json("updated");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
