import { useState } from "react";
import { postApi } from "../fonctions/fonctions";
import { useNavigate } from "react-router-dom";

function JoinRoom({socketRef, player,setPlayer,room,setRoom}){
    const [codeSaisi, setCodeSaisi] = useState("");
    const [usernameSaisi, setUsernameSaisi] = useState("");
    const [etape, setEtape] = useState(0);
    const navigate = useNavigate();

    const rejoindre = () => {
        if(codeSaisi.length <= 0) return;
        postApi(null, '/room/join', {code:parseInt(codeSaisi), username:usernameSaisi}).then(data => {
            if(!data.success) return navigate('/500');
            setPlayer(data.roomPlayer);
            setRoom(data.room);
            navigate(`/room/${data.room.uid}`);
        });
    };

    return (
        <div>
            <h1>Rejoindre</h1>
            {
                etape === 0 ? (
                    <>
                        <input placeholder="Nom" type="text" value={usernameSaisi} onChange={(e) => setUsernameSaisi(e.target.value)} />
                        <button onClick={() => setEtape(1)}>Suivant</button>
                    </>
                ) : (<></>)
            }
            {
                etape === 1 ? (
                    <>
                        <input type="tel" value={codeSaisi} onChange={(e) => setCodeSaisi(e.target.value)} />
                        <button onClick={rejoindre}>Rejoindre</button>
                    </>
                ) : (<></>)
            }
        </div>
    )
}

export default JoinRoom;