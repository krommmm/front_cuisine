import { io } from "socket.io-client";
import { HOST } from "../host";

export const socket = io(HOST, {
    withCredentials: true,
    autoConnect: false // On va gérer la connexion manuellement
  });