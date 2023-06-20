import { useState } from "react";
import { postApi } from "../fonctions/fonctions";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

function Accueil({socketRef, player,setPlayer,room,setRoom}){
    const [nomSaisi, setNomSaisi] = useState("");
    const navigate = useNavigate();
  
    const creerRoom = () => {
		if(nomSaisi.trim().length <= 0) return;
		postApi(null, '/room/create', {nom:nomSaisi}).then(data => {
			if(!data.success) return navigate('/500');
			setPlayer(data.roomPlayer);
			setRoom(data.room);
			navigate(`/room/${data.room.uid}`);
		});
    };

    return (
		<div className="ligne padding-10">
			<div className="colonne">
				<div className="ligne">
					<h1>Créer :</h1>
				</div>
				<div className="ligne">
					<TextField placeholder="Nom du serveur" value={nomSaisi} onChange={(e) => setNomSaisi(e.target.value)} />
				</div>
				<div className="ligne">
					<Button size="large" variant="outlined" onClick={creerRoom}>Créer</Button>
				</div>
			</div>
		</div>
    );
}

export default Accueil;