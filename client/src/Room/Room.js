import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseRoom from "./UseRoom";
import AdminRoom from "./Admin/AdminRoom";
import UserRoom from "./User/UserRoom";

function Room({socketRef, player,setPlayer,room,setRoom}){
    const {uid} = useParams();
    const navigate = useNavigate();
    const {
        players,
        showingScore,showScore,
        play,
        gameStarted,
        answer,
        question,
        possibleAnswers,} = UseRoom(socketRef, room._id, player);

    useEffect(() => {
        if(uid !== room.uid) return navigate('/500');
    }, [players, room.uid, uid, navigate]);

    return (
        <>
            {/* EVERY USER IS GOING TO SEE THIS */}
            {
                !gameStarted ? (
                    <>
                        <div className="ligne">
                            ROOM - {room?.nom}
                        </div>
                        <div className="ligne">
                            Rejoindre avec le code: {room?.code}
                        </div>
                        <div className="ligne">
                            {
                                players.map(p => (
                                    <div key={p._id}>
                                        {p.username}
                                    </div>
                                ))
                            }
                        </div>
                    </>
                ) : (<></>)
            }
            {
                player.estAdmin 
                    ? <AdminRoom 
                        players={players} 
                        showingScore={showingScore} showScore={showScore} 
                        play={play} 
                        gameStarted={gameStarted} 
                        answer={answer}
                        question={question}
                        possibleAnswers={possibleAnswers}></AdminRoom> 
                    : <UserRoom
                        players={players} 
                        showingScore={showingScore} showScore={showScore} 
                        play={play} 
                        gameStarted={gameStarted} 
                        answer={answer}
                        question={question}
                        possibleAnswers={possibleAnswers}></UserRoom>
            }
            { /* EVERY USER HAS TO SEE THIS */}
            {
                question ? (
                    <>
                        <div className="ligne"><h1>{question}</h1></div>
                        {
                            possibleAnswers.map((ans,ind) => (  
                                <div className="ligne" key={ind} onClick={answer}>{ans.text}</div>
                            ))
                        }
                    </>
                ) : (<></>)
            }
        </>
    )
}

export default Room;