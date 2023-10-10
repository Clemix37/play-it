import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseRoom from "./UseRoom";
import { Button } from "@mui/material";

function Room({socketRef, player,setPlayer,room,setRoom}){
    const {uid} = useParams();
    const navigate = useNavigate();
    const {players,showingScore,showScore,play,gameStarted} = UseRoom(socketRef, room._id, player);

    useEffect(() => {
        if(uid !== room.uid) return navigate('/500');
    }, [players, room.uid, uid, navigate]);

    return (
        <>
            <div className="ligne">
                ROOM - {room?.nom}
            </div>
            <div className="ligne">
                Rejoindre avec le code: {room?.code}
            </div>
            {
                !gameStarted ? (
                    <div className="ligne">
                        {
                            players.map(p => (
                                <div key={p._id}>
                                    {p.username}
                                </div>
                            ))
                        }
                    </div>
                ) : (<></>)
            }
            {
                player.estAdmin ? (
                    <>
                        <div className="ligne">
                            <Button onClick={showScore}>Afficher Score</Button>
                        </div>
                        <div className="ligne">
                            <Button onClick={play}>Play</Button>
                        </div>
                    </>
                ) : (<></>)
            }
            {
                showingScore ? (
                    <div className="ligne">SHOWING SCORE</div>
                ) : (<></>)
            }
        </>
    )
}

export default Room;