import { useState } from "react";
import { postApi } from "../fonctions/fonctions";
import { useNavigate } from "react-router-dom";

function Accueil({socketRef, player,setPlayer,room,setRoom}){
    const [nomSaisi, setNomSaisi] = useState("");
    const navigate = useNavigate();
  
    const creerRoom = () => {
      postApi(null, '/room/create', {nom:nomSaisi}).then(data => {
        if(!data.success) return navigate('/500');
        setPlayer(data.roomPlayer);
        setRoom(data.room);
        navigate(`/room/${data.room.uid}`);
      });
    };

    return (
      <>
        <div>
            <input type="text" placeholder="Ex: Films" value={nomSaisi} onChange={(e) => setNomSaisi(e.target.value)} />
            <button onClick={creerRoom}>Créer et rejoindre</button>
        </div>
      </>
    )
}

export default Accueil;