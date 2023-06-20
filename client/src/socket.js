import { io } from "socket.io-client";
import { SOCKET_EVTS } from "./fonctions/fonctions";

const connecterSocket = (params) => {
    const socket = io(SOCKET_EVTS.SOCKET_SERVER_URL, params);
    socket.connect();
    return socket;
};

export {connecterSocket};