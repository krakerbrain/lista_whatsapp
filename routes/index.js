const express = require("express");
const router = express.Router();
const { getList, getListAdmin, cambioStatus, agregaChofer } = require("../consultas/consultas");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/agregar", (req, res) => {
  res.render("newUser");
});

router.get("/user", async (req, res) => {
  const usuarios = await getList();
  res.render("user", {
    usuarios,
  });
});

router.post("/agregar", async (req, res) => {
  const { telefono, nombre } = req.body;
  await agregaChofer(telefono, nombre);
  const usuarios = await getListAdmin();
  res.render("admin", {
    usuarios,
  });
});

router.get("/admin", async (req, res) => {
  const usuarios = await getListAdmin();
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

module.exports = router;
