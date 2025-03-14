import { io } from "socket.io-client";

const socket = io("http://localhost:1892"); // connexion au server websocket


export { socket };