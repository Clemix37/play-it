const { gererErreurs, createRoom } = require("../general/fonctions");
const Room = require("../models/room.model");
const RoomPlayer = require("../models/roomPlayer.model");

module.exports.createRoom = async (req, res) => {
    try {
        const {nom} = req.body;
        const {room, roomPlayer} = await createRoom(nom);
        res.status(201).json({room,roomPlayer,success:true});
    } catch (err) {
        gererErreurs(err, "createRoom", "room.controller");
    }
};

module.exports.joinRoom = async (req, res) => {
    try {
        const {username,code} = req.body;
        let room = await Room.find({code});
        const roomPlayer = await RoomPlayer.create({username,points:0,estAdmin:false,});
        if(room.length > 0) room = room[0];
        res.status(201).json({room,roomPlayer,success:true});
    } catch (err) {
        gererErreurs(err, "joinRoom", "room.controller");
    }
};

module.exports.getRoom = async (req,res) => {
    try {
        const {uid} = req.body;
        let room = await Room.find({uid});
        if(room.length > 0) room = room[0];
        console.log(room);
        res.status(201).json({room});
    } catch (err) {
        gererErreurs(err, "getRoom", "room.controller");
    }
};

module.exports.getPlayers = async (req,res) => {
    try {
        const {id} = req.body;
        const players = await RoomPlayer.find({roomId:id,estAdmin:false});
        res.status(201).json({success:true,players});
    } catch (err) {
        gererErreurs(err, "getPlayers", "room.controller");
    }
};