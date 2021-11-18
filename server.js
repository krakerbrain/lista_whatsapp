const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");
const { Client } = require("whatsapp-web.js");
const chalk = require("chalk");
const moment = require("moment");
const { getUser } = require("./consultas/consultas");
const express = require("express");
const { json } = require("express");
const app = express();

//importing routes
const indexRoutes = require("./routes/index");

// //settings
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
const publicPath = path.resolve(__dirname, "./public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//routes
app.use("/", indexRoutes);

//socket io
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//whatsapp Session
const SESSION_FILE_PATH = "./session.json";
let client;
let sessionData;

const withSession = () => {
  sessionData = require(SESSION_FILE_PATH);
  console.log(`Cargando ${chalk.yellow("Validando sesion con Whatsapp...")}`);

  client = new Client({
    session: sessionData,
  });

  client.on("ready", () => {
    listenMessage();
    console.log("Client is ready");
    server.listen(port, () => console.log(`Connected on port ${port}`));
  });

  client.on("auth_failure", () => {
    console.log("**Error de autentificacion, vuelve a generar el QRCODE");
  });
  client.initialize();
};

const withOutSession = () => {
  console.log("No tenemos una sesion iniciada");
  const client = new Client();
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("authenticated", (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
  client.initialize();
};

//Funcion de escucha de mensajes

const listenMessage = () => {
  client.on("message", (msg) => {
    try {
      const { from, to, body, author, type } = msg;

      saveHistorial(from, author, type);
    } catch (error) {
      console.log(error);
    }
  });
};

const sendMessage = (to, message) => {
  client.on("message", (message) => {
    if (message.body === "!ping") {
      message.reply("pong");
    }
  });
};

const pickerLoaded = fs.readFileSync("./public/pickers.json", "utf-8");
let newPicker = JSON.parse(pickerLoaded);

io.on("connection", (socket) => {
  // server-side
  io.on("connection", (socket) => {
    socket.emit("hello", newPicker);
  });
});

const saveHistorial = async (from, number, type) => {
  try {
    //se obtiene el numero de telefono en formato de 9 numeros
    //let numeroPicker = number.slice(2, 11);
    let numeroPicker = from.slice(2, 11);
    console.log(numeroPicker);
    //se obtiene un array de objetos con el nombre del picker desde la base de datos
    //let nombre = await getUser(numeroPicker);

    //se guarda en la variable "picker" el string del nombre del picker
    //let picker = nombre[0].nombre;

    //location contiene el numero que identifica a los grupos de whatsapp
    //const grupoWhatsappID = from.slice(12, 22);

    const today = moment().format("DD-MM-YYYY hh:mm");

    //solo si el numero contiene el identificacor "grupoWhatsappID" y el tipo de mensaje
    //es desconocido el usuario se guarda en la hoja de excel
    // (esto porque lo que queremos almacenar es un usuario que envíe su ubicacion en tiempo real)

    //if (grupoWhatsappID == 1626627314) {

    let pickerTurno = {
      fecha: today,
      nombre: numeroPicker,
    };

    newPicker.push(pickerTurno);
    const jsonPicker = JSON.stringify(newPicker);
    fs.writeFileSync("./public/pickers.json", jsonPicker, "utf-8");
  } catch (error) {
    console.log("Nombre no existe en la base de datos", {
      number,
      error,
    });
  }
};

fs.existsSync(SESSION_FILE_PATH) ? withSession() : withOutSession();
