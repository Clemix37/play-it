import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseRoom from "./UseRoom";

function Room({socketRef, player,setPlayer,room,setRoom}){
    const {uid} = useParams();
    const navigate = useNavigate();
    const {players} = UseRoom(socketRef, room._id, player);

    useEffect(() => {
        if(uid !== room.uid) return navigate('/500');
    }, [players, room.uid, uid, navigate]);

    return (
        <>
            <div>
                ROOM - {room?.nom}
            </div>
            <div>
                Rejoindre avec le code: {room?.code}
            </div>
            <div>
                {
                    players.map(p => (
                        <div key={p._id}>
                            {p.username}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Room;