const io = require("socket.io-client");
const socket = io("http://localhost:3001");

socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("sendMessage", { text: 'Hola desde el cliente terminal', sender: 'Cliente' }); 
});

socket.on("receiveMessage", (message) => {
    console.log("Mensaje recibido: ", message);
}); 