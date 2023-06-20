import { Link, Route, Routes } from "react-router-dom";
import Accueil from "../Accueil/Accueil";
import ErreurPage from "../ErreurPage";
import JoinRoom from "../Room/JoinRoom";
import Room from "../Room/Room";
import "../Styles/NavBar.css";
import { Button } from "@mui/material";

function NavBar({socketRef, player,setPlayer, room, setRoom}){
    return (
        <>
            <div className="ligne navbar">
                <Button>
                    <Link to="/room/join">Rejoindre</Link>
                </Button>
                <Button>
                    <Link to="/">Créer</Link>
                </Button>
            </div>
            <Routes>
                <Route path="/" element={<Accueil socketRef={socketRef} player={player} setPlayer={setPlayer} room={room} setRoom={setRoom} />} />
                <Route path="/room/join" element={<JoinRoom socketRef={socketRef} player={player} setPlayer={setPlayer} room={room} setRoom={setRoom} />} />
                <Route path="/room/:uid" element={<Room socketRef={socketRef} player={player} setPlayer={setPlayer} room={room} setRoom={setRoom} />} />
                <Route path="*" element={<ErreurPage />} />
            </Routes>
        </>
    );
}

export default NavBar;