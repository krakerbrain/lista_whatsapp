const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { Client } = require("whatsapp-web.js");
const chalk = require("chalk");

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
      const { from, to, body } = msg;
      console.log(from, to, body);
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

fs.existsSync(SESSION_FILE_PATH) ? withSession() : withOutSession();
