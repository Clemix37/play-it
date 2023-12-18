import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SOCKET_EVTS, postApi } from "../fonctions/fonctions";
import { connecterSocket } from "../socket";

function UseRoom(socketRef, roomId, roomPlayer){
    const [players, setPlayers] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [showingScore, setShowingScore] = useState(false);
    const [userAnswered, setUserAnswered] = useState(false);
    const [question, setQuestion] = useState(null);
    const [possibleAnswers, setPossibleAnswers] = useState([]);
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

        socketRef?.current?.on(SOCKET_EVTS.NEW_USER_EVT, (message) => {
            const ownedByCurrentUser = socketRef.current.id === message.sender;
            console.log(message, ownedByCurrentUser);
            // Pas de messages pour l'utilisateur en cours
            //if(incomingMessage.ownedByCurrentUser) return;
            recupPlayers();
        });

        socketRef?.current?.on(SOCKET_EVTS.USER_DISCONNECT, (message) => {
            const ownedByCurrentUser = socketRef.current.id === message.sender;
            recupPlayers();
            console.log(message, ownedByCurrentUser);
        });

        // Au cas où l'Admin supprime la room
        socketRef?.current?.on(SOCKET_EVTS.ROOM_DELETED_EVT, () => {
            setShowingScore(false);
            retournerErreur500();
        });

        socketRef?.current?.on(SOCKET_EVTS.SHOWING_SCORE, () => {
            // SHOW SCORE
            setShowingScore(true);
        });

        socketRef?.current?.on(SOCKET_EVTS.PLAYING, () => {
            // Game has started
            setGameStarted(true);
        });

        //#region QUIZ

        socketRef?.current?.on(SOCKET_EVTS.QUIZ.NEW_QUESTION, (data) => {
            setUserAnswered(false);
            setQuestion(data.question);
            setPossibleAnswers(data.answers);
            console.log("new question");
        });
        
        socketRef?.current?.on(SOCKET_EVTS.QUIZ.NEW_ANSWER, () => {
            console.log("new answer");
        });
        
        socketRef?.current?.on(SOCKET_EVTS.QUIZ.TRANSITION, () => {
            console.log("transition");
        });

        //#endregion

        return () => {
            socketRef?.current?.disconnect();
        };
    }, [socketRef, navigate, roomId, roomPlayer]);

    const showScore = () => {
        socketRef?.current?.emit(SOCKET_EVTS.SHOWING_SCORE);
    };

    const play = () => {
        socketRef?.current?.emit(SOCKET_EVTS.PLAYING);
    };

    const answer = () => {
        if(roomPlayer.estAdmin) return;
        socketRef?.current?.emit(SOCKET_EVTS.QUIZ.NEW_ANSWER);
        setUserAnswered(true);
    };

    return {
        players, 
        showScore, showingScore, 
        play, 
        gameStarted,
        answer,
        userAnswered, setUserAnswered,
        question,
        possibleAnswers,
    };
}

export default UseRoom;