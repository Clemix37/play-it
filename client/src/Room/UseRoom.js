import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SOCKET_EVTS, postApi } from "../fonctions/fonctions";
import { connecterSocket } from "../socket";

function UseRoom(socketRef, roomId, roomPlayer){
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        function retournerErreur500(){
            navigate('/500');
        }

        function recupPlayers(){
            postApi(null, '/get-players', {id:roomId}).then(data => {
                console.log(data);
                if(data.success) setPlayers(data.players);
            });
        }

        const query = {query: { roomId, roomPlayerId:roomPlayer._id }};
        socketRef.current = connecterSocket(query);
        // socketRef.current.emit(SOCKET_EVTS.NEW_USER_EVT, {
        //     body: {roomId,roomPlayerId:roomPlayer._id},
        //     senderId: socketRef.current.id,
        // });

        socketRef?.current?.on(SOCKET_EVTS.NEW_USER_EVT, (message) => {
            // const incomingMessage = {
            //     ...message.body,
            //     ownedByCurrentUser: message.senderId === socketRef.current.id,
            // };
            const ownedByCurrentUser = socketRef.current.id === message.sender;
            console.log(message, ownedByCurrentUser);
            // Pas de messages pour l'utilisateur en cours
            //if(incomingMessage.ownedByCurrentUser) return;
            recupPlayers();
        });

        socketRef?.current?.on(SOCKET_EVTS.USER_DISCONNECT, (message) => {
            // const incomingMessage = {
            //     ...message.body,
            //     ownedByCurrentUser: message.senderId === socketRef.current.id,
            // };
            const ownedByCurrentUser = socketRef.current.id === message.sender;
            recupPlayers();
            console.log(message, ownedByCurrentUser);
        });

        // Au cas où l'Admin supprime la room
        socketRef?.current?.on(SOCKET_EVTS.ROOM_DELETED_EVT, () => {
            retournerErreur500();
        });

        return () => {
            socketRef?.current?.disconnect();
        };
    }, [socketRef, navigate, roomId, roomPlayer]);

    return {players};
}

export default UseRoom;