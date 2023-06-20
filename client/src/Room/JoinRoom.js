import { useState } from "react";
import { postApi } from "../fonctions/fonctions";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
// ICONS
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

function JoinRoom({socketRef, player,setPlayer,room,setRoom}){
    const [codeSaisi, setCodeSaisi] = useState("");
    const [usernameSaisi, setUsernameSaisi] = useState("");
    const [etape, setEtape] = useState(0);
    const navigate = useNavigate();

    const passerAuSuivant = () => {
        if(usernameSaisi.trim().length <= 0) return;
        setEtape(1);
    };

    const passerAuPrecedent = () => {
        setCodeSaisi("");
        setEtape(0);
    };

    const rejoindre = () => {
        if(codeSaisi.trim().length <= 0) return;
        postApi(null, '/room/join', {code:parseInt(codeSaisi), username:usernameSaisi}).then(data => {
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
                    <h1>Rejoindre</h1>
                </div>
                {
                    etape === 0 ? (
                        <div className="ligne">
                            <div className="colonne">
                                <div className="ligne">
                                    <TextField placeholder="Nom d'utilisateur" value={usernameSaisi} onChange={(e) => setUsernameSaisi(e.target.value)} />
                                </div>
                                <div className="ligne">
                                    <Button endIcon={<ArrowForwardRoundedIcon />} size="large" variant="outlined" onClick={passerAuSuivant}>Suivant</Button>
                                </div>
                            </div>
                        </div>
                    ) : (<></>)
                }
                {
                    etape === 1 ? (
                        <div className="ligne">
                            <div className="colonne">
                                <div className="ligne">
                                    <TextField type="tel" placeholder="Code" value={codeSaisi} onChange={(e) => setCodeSaisi(e.target.value)} />
                                </div>
                                <div className="ligne">
                                    <Button startIcon={<ArrowBackRoundedIcon />} size="large" variant="outlined" onClick={passerAuPrecedent}>Précédent</Button>
                                    <Button endIcon={<PersonAddAltRoundedIcon />} size="large" variant="outlined" onClick={rejoindre}>Rejoindre</Button>
                                </div>
                            </div>
                        </div>
                    ) : (<></>)
                }
            </div>
        </div>
    )
}

export default JoinRoom;