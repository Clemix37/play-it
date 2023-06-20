import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar/NavBar";

function App(){
    const [player, setPlayer] = useState({});
    const [room, setRoom] = useState({});
    const socketRef = useRef();

    useEffect(() => {
        return () => socketRef?.current?.disconnect();
    }, [socketRef]);

    return (
        <div>
            <NavBar socketRef={socketRef} player={player} setPlayer={setPlayer} room={room} setRoom={setRoom} />
        </div>
    );
}

export default App;