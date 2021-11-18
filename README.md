# Lista de usuarios whatsapp

- Se está desarrollando una app que almacena en una hoja de excel,
  una lista de usuarios a partir del envío de mensajes con la ubicación en tiempo real.

## Instrucciones de uso:

- $npm start para levantar servidor
- Si no se ha validado el usuario, debe escanearse desde la app Whatsapp el QR que se despliega en el terminal
- Luego de validarse se abre http://localhost:3000, y al presionar el boton "Actualizar", se muestra una lista la fecha y
  el telefono de los mensajes entrantes

## Notas:

- La app esta en desarrollo, por lo que aún no cumple el objetivo y tiene algunos errores en despliegue

## Usando las librerías:

- [Express](https://expressjs.com/es/)
- [fs](https://nodejs.org/api/fs.html)
- [chalk](https://www.npmjs.com/package/chalk)
- [qrcode](https://www.npmjs.com/package/qrcode)

## Autor ✒️

- **Mario Montenegro**
  **Usando como referencia el tutorial de [Leifer Martinez](https://www.youtube.com/watch?v=A_Xu0OR_HkE&t=1443s&ab_channel=LeiferMendez)**
