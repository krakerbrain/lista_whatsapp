// //Comando para establecer conexion

// let socket = io();

// let label = $("#lblNuevoTicket");

// //Escuchar
// socket.on("connect", function () {
//   console.log("Conectado al servidor");
// });
// //Escuchar
// socket.on("disconnect", function () {
//   console.log("Perdimos conexion con el servidor");
// });

// //on 'estadoActual'
// socket.on("estadoActual", function (resp) {
//   console.log(resp);
//   label.text(resp.actual);
// });

// // $("button").on("click", function () {
// //   console.log("click");
// //   //Escuchar informacion

// //   socket.emit("siguienteTicket", null, function (siguienteTicket) {
// //     label.text(siguienteTicket);
// //   });
// // });

var loading = document.getElementById("lblNuevoTicket");

var boton = document.getElementById("carga_ajax");

boton.addEventListener("click", function () {
  axios
    .get("pickers.json")
    .then(function (res) {
      if (res.status == 200) {
        res.data.forEach((element, i) => {
          console.log(loading);
          loading.innerHTML += `<tr>
          <th scope="row">${i + 1}</th>
          <td>${element.fecha}</td>
          <td>${element.nombre}</td>
        </tr>`;
        });
      }
      console.log(res);
    })
    .catch(function (err) {
      loading.innerText = "Error de conexión " + err;
    });
});
