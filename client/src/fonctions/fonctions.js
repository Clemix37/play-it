const SOCKET_EVTS = {
    NEW_USER_EVT: "newUser",
    USER_DISCONNECT: "userDisconnected",
    ROOM_DELETED_EVT: "roomDeleted",
    SOCKET_SERVER_URL: "http://localhost:4000",
    SHOWING_SCORE: "showingScore",
    PLAYING: "playing",
    QUIZ: {
      NEW_QUESTION: "newQuestion",
      NEW_ANSWER: "newAnswer",
      TRANSITION: "transition",
    },
};

const getApi = (controller = null, lien) => {
    return new Promise((resolve, reject) => {
        const obj = {};
        if(!!controller) obj.signal = controller.signal;
        fetch(`/api${lien}`, obj)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
            .catch(err => reject(err));
    });
};

const postApi = (controller = null, lien, corps = {}, autre = {}, envoyerHeader = true, headers = { 'Content-Type': 'application/json' }) => {
    return new Promise((resolve, reject) => {
        const obj = {
            method: "POST",
            body: JSON.stringify(corps),
            ...autre,
        };
        if(!!controller) obj.signal = controller.signal;
        if(envoyerHeader) obj.headers = headers;
        fetch(`/api${lien}`, obj)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
            .catch(err => reject(err));
    });
};

export {getApi, postApi, SOCKET_EVTS};