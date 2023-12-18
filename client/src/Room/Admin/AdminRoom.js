import { Button } from "@mui/material";

// Only admin players are going to see this page
function AdminRoom({
    players,
    showingScore,showScore,
    play,
    gameStarted,
    answer,
    question,
    possibleAnswers,
}){
    return (
        <>
            <div className="ligne">
                <Button onClick={showScore}>Afficher Score</Button>
            </div>
            {
                gameStarted ? (<></>) : (
                    <>
                        <div className="ligne">
                            <Button onClick={play}>Play</Button>
                        </div>
                    </>
                )
            }
            {
                showingScore ? (
                    <div className="ligne">SHOWING SCORE</div>
                ) : (<></>)
            }
        </>
    )
}

export default AdminRoom;