function ErreurPage(){
    return (
        <>
            <div className="ligne">
                <h1>Erreur interne :</h1>
            </div>
            <div className="ligne">
                <p>
                    Une erreur interne est survenue. Nous sommes désolés pour la gêne occasionnée.<br />
                    Si vous souhaitez nous faire part de l'erreur rencontrée, nous ferons de notre mieux pour ne pas qu'elle se reproduise !<br />
                    Pour cela, rendez-vous dans la section paramètres de votre profil, pour signaler une erreur. Merci !
                </p>
            </div>
        </>
    )
}

export default ErreurPage;