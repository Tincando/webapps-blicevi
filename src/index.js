const express = require("express");
import connect from "./db.js";
var mongo = require("mongodb");

const app = express();
const port = 3000;

app.post("/saveItem", async (req, res) => {
  let db = await connect();
  let doc = req.body;
  let result = await db.collection("items").insertOne(doc);

  if (result.insertedCount == 1) {
    res.json({
      status: "OK",
      mesagge: "Item " + doc + " saved in db",
    });
  } else {
    res.json({
      status: "fail",
    });
  }
});

app.get("/getItemById/:id", async (req, res) => {
  let id = req.params.id;
  let db = await connect();
  let document = await db
    .collection("items")
    .findOne({ _id: mongo.ObjectId(id) });
  res.json(document);
});

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
