const Room = require("../models/room.model");
const uuid = require("uuid");
const RoomPlayer = require("../models/roomPlayer.model");

const NUMBERS = "0123456789";
const errs = [];
let roomsOpened = [];
let codeGenerated = [];

module.exports.createUrlFromBase = (url) => {
    return `/api${url}`;
};

module.exports.gererErreurs = (err, nomFct, fichier) => {
    errs.push({
        err,
        nomFct,
        fichier,
    });
    console.log(errs);
};

module.exports.createRoom = async (nom) => {
    const code = generateCode();
    const uid = uuid.v4();
    const room = await Room.create({nom,uid,code});
    const roomPlayer = await RoomPlayer.create({estAdmin:true,roomId: room._id});
    return {room,roomPlayer};
};

const generateCode = () => {
    let existing = false;
    let generated = false;
    let code = "";
    while(existing || !generated){
        for (let i = 0; i < 6; i++) {
            code += NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
        }
        existing = codeGenerated.includes(parseInt(code));
        generated = true;
    }
    return parseInt(code);
};

module.exports.deleteCode = (code) => {
    roomsOpened = roomsOpened.filter(r => r.code !== code);
    codeGenerated = codeGenerated.filter(c => c !== code);
};

module.exports.deleteRoom = async (idRoom) => {
    const deletedRoomPlayers = await RoomPlayer.deleteMany({roomId:idRoom});
    const room = await Room.findByIdAndDelete(idRoom);
};