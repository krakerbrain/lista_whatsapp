const fs = require("fs");
const express = require("express");
const router = express.Router();
const { getList } = require("../consultas/consultas");
const { cambioStatus } = require("../consultas/consultas");

const picker = fs.readFileSync("./public/pickers.json", "utf-8");
let newPicker = JSON.parse(picker);

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/user", async (req, res) => {
  const usuarios = await getList();
  res.render("user", {
    usuarios,
  });
});
router.get("/admin", async (req, res) => {
  const usuarios = await getList();
  res.render("admin", {
    usuarios,
  });
});

router.put("/status:user", async (req, res) => {
  let idUsuario = req.params.user;
  const usuarios = await cambioStatus(idUsuario);
  res.render("admin", {
    usuarios,
  });
});
//router.put("/admin", changeStatus);

module.exports = router;
