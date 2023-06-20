const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    gameStarted: {
        type: Boolean,
        default: false,
    }
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;