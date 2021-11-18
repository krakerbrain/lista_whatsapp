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

window.onload = () => {
  actualizarData();
};

boton.addEventListener("click", () => {
  actualizarData();
});

const actualizarData = () => {
  axios
    .get("./pickers.json")
    .then((data) => {
      if (data.status == 200) {
        pickers = data.data;
        loading.innerHTML = "";
        pickers.forEach((element, i) => {
          console.log(loading);
          loading.innerHTML += `<tr>
          <th scope="row">${i + 1}</th>
          <td><input type="checkbox" name="myTextEditBox" value="checked" 
          style="margin-left:auto; margin-right:auto;"></td>
          <td>${element.fecha}</td>
          <td><div>${element.nombre}</div><small class="text-muted">${element.numero}</small></td>
        </tr>`;
        });
      }
      console.log(data);
    })
    .catch(function (data) {
      loading.innerText = "Error de conexión " + err;
    });
};
