
// Every user other than the admin is going to see this page
function UserRoom({
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
            <div className="ligne">Tu es connecté ;)</div>
        </>
    )
}

export default UserRoom;