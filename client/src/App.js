import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar/NavBar";
import './Styles/FlexIt.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider, createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#6c25ea',
    },
    secondary: {
      main: '#0dd4cb',
    },
    error: {
      main: '#ff1000',
    },
  },
});

function App(){
    const [player, setPlayer] = useState({});
    const [room, setRoom] = useState({});
    const socketRef = useRef();

    useEffect(() => {
        return () => socketRef?.current?.disconnect();
    }, [socketRef]);

    return (
        <ThemeProvider theme={theme}>
            <div className="colonne padding-none">
                <NavBar socketRef={socketRef} player={player} setPlayer={setPlayer} room={room} setRoom={setRoom} />
            </div>
        </ThemeProvider>
    );
}

export default App;