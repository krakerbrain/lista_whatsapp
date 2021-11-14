const fs = require("fs");
const express = require("express");
const router = express.Router();

const picker = fs.readFileSync("pickers.json", "utf-8");
let newPicker = JSON.parse(picker);

router.get("/", (req, res) => {
  res.render("index", {
    newPicker,
  });
});

module.exports = router;
