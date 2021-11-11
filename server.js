const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { Client } = require("whatsapp-web.js");
const chalk = require("chalk");
const ExcelJS = require("exceljs");
var moment = require("moment");

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
      const { from, to, body, author } = msg;
      saveHistorial(from, author);
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

const saveHistorial = (number, message) => {
  //location contiene el numero que identifica a los grupos de whatsapp
  const location = number.slice(12, 22);
  //pathChat crea el archivo excel que contendra la lista de usuarios
  const pathChat = `./chats/ubicaciones.xlsx`;
  const workbook = new ExcelJS.Workbook();
  const today = moment().format("DD-MM-YYYY hh:mm");
  if (location == 1626627314) {
    if (fs.existsSync(pathChat)) {
      workbook.xlsx.readFile(pathChat).then(() => {
        const worksheet = workbook.getWorksheet(1);
        const lastRow = worksheet.lastRow;
        let getRowInsert = worksheet.getRow(++lastRow.number);
        getRowInsert.getCell("A").value = today;
        getRowInsert.getCell("B").value = message;
        getRowInsert.commit();
        workbook.xlsx
          .writeFile(pathChat)
          .then(() => {
            console.log("Chat Agregado");
          })
          .catch(() => {
            console.log("Algo Fallo");
          });
      });
    } else {
      const worksheet = workbook.addWorksheet("Chats");
      worksheet.columns = [
        { header: "Fecha", key: "date" },
        { header: "Mensaje", key: "message" },
      ];
      worksheet.addRow([today, message]);
      workbook.xlsx
        .writeFile(pathChat)
        .then(() => {
          console.log("Historial creado");
        })
        .catch(() => {
          console.log("Algo Fallo");
        });
    }
  }
};

fs.existsSync(SESSION_FILE_PATH) ? withSession() : withOutSession();
